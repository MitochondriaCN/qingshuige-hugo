\
# 架构说明

**简体中文** · [English](./ARCHITECTURE.md)

`qingshuige-search` 把本地全文搜索拆分成明确的层次，使搜索算法能够长期独立于静态站点生成器和 UI 框架。

```text
源内容
  ↓ 数据源适配器
Article[]
  ↓ load / 建索引
SearchEngine
  ├─ 标准化
  ├─ Token 化
  ├─ 字段索引
  ├─ 倒排索引
  ├─ 召回
  └─ 排序
  ↓
SearchResult[]
  ↓ UI 适配器
Vue / React / 原生 JS / 其他 UI
```

## 1. 模块边界

核心包负责：

- 文本标准化与 Token 化；
- 文档索引构建；
- 候选文章召回；
- 精确短语验证；
- 相关度评分；
- 生成适合页面使用的上下文结果数据。

核心包**不负责**：

- 解析 Markdown；
- Hugo/Jekyll/Astro 专用逻辑；
- DOM 渲染；
- 键盘快捷键和弹窗状态；
- 网络传输；
- 第三方托管搜索服务。

依赖方向必须保持单向：

```text
Hugo 适配器 ─┐
Astro 适配器 ├─→ Article[] ─→ qingshuige-search ─→ SearchResult[] ─→ UI 适配器
API 适配器  ─┘
```

核心包永远不反向 import 适配器。

## 2. 统一文章模型

```js
{
  id,
  title,
  author,
  date,
  categories,
  content,
  url
}
```

每篇文章进入核心引擎后都会获得一个紧凑的整数 `docId`。对外公开的原始 ID 则通过 `externalId` 保留。

内部使用整数文档 ID 能降低 PostingList 的复杂度，也便于使用有序数组算法。

## 3. 文本标准化

用于页面展示的原始值保持不变，搜索引擎单独构建标准化字符串。

当前标准化主要解决：

- 英文字母大小写差异；
- Unicode 兼容形式；
- 连续空白；
- 标点边界。

建索引与用户查询必须遵守兼容的标准化规则。索引阶段能生成的 Token，在查询阶段必须能够重新生成。

## 4. Token 化

默认 Tokenizer 刻意保持简单、确定和可解释。

### 中文

连续汉字默认使用滑动 n-gram（`hanGramSize = 2`）：

```text
计算机组成原理
→ 计算 / 算机 / 机组 / 组成 / 成原 / 原理
```

单个汉字不进入正文索引。这样可以避免 `这`、`的`、`我` 等高频字符污染正文召回，但它们仍然可以参与标题等短字段匹配。

### 英文、数字和技术术语

尽量保留连续术语：

```text
Hugo     → hugo
Vue3     → vue3（并可生成 vue 别名）
74HC193  → 74hc193
GitHub   → github
```

标点和空白作为边界。

### 扩展点

Tokenizer 后续应该成为公开策略接口。未来可以接入 Jieba、`Intl.Segmenter`、语言专用词干化或领域词典，而不修改召回引擎。

## 5. 索引结构

### 标题

标题字符串很短，当前直接遍历标准化标题，不为了“使用数据结构”而额外建立标题索引。

### 作者

```text
Map<NormalizedAuthor, ArticleID[]>
```

作者完全匹配直接进行哈希查找；作者部分匹配只需要遍历数量很少的作者 Key，而不是扫描正文。

### 分类

```text
Map<NormalizedCategory, ArticleID[]>
```

分类主要作为搜索前过滤条件，而不是普通相关度 Token。

### 正文倒排索引

```text
Map<Token, PostingList>
```

每个 Posting 保存：

```js
{
  articleId,
  frequency,
  positions
}
```

PostingList 按整数 `articleId` 排序。

因此可以直接得到：

- `postingList.length` → Document Frequency；
- `posting.frequency` → TF；
- `positions` → 上下文摘要以及未来的邻近度评分；
- 有序 PostingList → 线性双指针求交。

## 6. 召回策略

召回阶段只回答：**哪些文章可能与查询有关？** 此阶段不决定最终排序。

当前流程：

1. 标准化 Query；
2. 如果指定分类，先限制 Scope；
3. 遍历短标题字段；
4. 使用作者 HashMap；
5. 把符合日期格式的输入解析为结构化日期；
6. 对允许正文检索的 Query Group Tokenize；
7. 查询倒排表；
8. 必要时跳过超过 Document Frequency 比例阈值的高频 Token；
9. 最短 PostingList 优先；
10. 中文短语组内部对有序倒排表求交；
11. 不同 Query Group 之间采用 OR 式召回；
12. 用 KMP 验证原始连续短语。

### 为什么倒排索引之后还要 KMP？

仅仅“所有 Bigram 都出现”仍可能产生假阳性：这些 Bigram 可能散落在文章不同位置，而没有组成完整短语。

如果对所有文章执行 KMP 又会浪费大量计算，因此采用粗到精流程：

```text
倒排索引 → 少量候选文章 → KMP 精确验证
```

## 7. 排序策略

排序阶段回答：**候选文章中哪一篇最相关？**

当前 Score 综合：

- 标题完全 / 前缀 / 包含匹配权重；
- 作者完全 / 包含匹配权重；
- Query Group Coverage；
- 正文 Posting 的平滑 TF-IDF；
- 标题和正文的完整短语奖励。

当前正文贡献近似为：

```text
TF = 1 + log(termFrequency)
IDF = log((documentCount + 1) / (documentFrequency + 1)) + 1
BodyScore += TF × IDF
```

发布时间不默认获得“越新越高”的奖励。日期首先是结构化查询信息，只有 Score 完全相同时才用发布时间作为 tie-breaker。

### 后续排序研究

MiniSearch 的公开设计文档非常值得作为比较基线：它同样使用倒排索引，并采用 BM25/BM25+ 思路，同时考虑字段长度归一化。后续应该先做 benchmark，再决定是否把当前默认评分替换成 BM25 系列，而不是直接为了“更高级”而更换算法。

## 8. SearchResult

当前结果暴露足够的页面数据，使 UI 不需要理解搜索算法：

```js
{
  article,
  documentId,
  externalId,
  score,
  coverage,
  matchedFields,
  matchedTokens,
  snippet
}
```

未来可以加入安全的高亮分段和 Token 邻近度信息，而无需破坏核心与 UI 的边界。

## 9. 复杂度思路

设：

- `N`：文章数量；
- `L`：所有正文总长度；
- `P`：一次查询涉及的 PostingList 总规模；
- `C`：召回候选文章数量。

大致可以理解为：

- 索引构建：`O(L)` 加 Map/数组维护开销；
- 哈希精确查找：平均 `O(1)`；
- 两个有序表求交：`O(m + n)`；
- KMP 验证：只与 `C` 篇候选文章相关，而非整个语料库；
- 当前完整排序：`O(C log C)`。

语料规模继续增长后，可以自然升级到 Top-K Heap、索引序列化、分片、懒加载以及 Web Worker。

## 10. 与其他开源项目的边界

我们会研究 MiniSearch、Lunr.js、FlexSearch、Fuse.js、Pagefind、Stork 和 Jieba 系列，但当前核心不会整体打包或复制这些项目。

详细调研见 [OPEN_SOURCE_REFERENCES.zh-CN.md](./OPEN_SOURCE_REFERENCES.zh-CN.md)。对我们最重要的架构启发是：

- 核心 API 尽量小，扩展点明确；
- 内部使用紧凑的数字文档引用；
- 排序算法应该通过 benchmark 决策；
- 模糊搜索保持可选，而不是污染精确召回主链；
- 静态索引的分发/懒加载与“搜索语义”分层；
- 语言相关 Tokenizer 必须可以替换。
