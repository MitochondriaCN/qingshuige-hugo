\
# 开源搜索项目调研与借鉴边界

**简体中文** · [English](./OPEN_SOURCE_REFERENCES.md)

调研快照时间：**2026-09-07**。

本文记录可从架构、算法、性能 benchmark 或可选适配器角度为 `qingshuige-search` 服务的开源项目。它们目前不是项目默认依赖。

## 调研标准

优先关注至少能解决下列一类问题的项目：

- 浏览器端或静态站点全文搜索；
- 明确的索引与相关度算法；
- CJK / 中文 Token 化；
- 模糊匹配与拼写容错；
- 低带宽静态索引分发；
- 宽松的开源许可证；
- 能提供工程启发，但不要求我们的核心依赖它。

## 总览

| 项目 | 许可证 | 对本项目的主要价值 | 建议 |
| --- | --- | --- | --- |
| [MiniSearch](https://github.com/lucaong/minisearch) | MIT | 与我们定位最接近：紧凑本地索引、自定义 Tokenizer、前缀/模糊检索、字段权重、BM25 系列评分 | **首要设计与 benchmark 参考** |
| [Lunr.js](https://github.com/olivernn/lunr.js) | MIT | 成熟浏览器全文检索、字段限定、Boost、匹配元数据 | **架构参考** |
| [FlexSearch](https://github.com/nextapps-de/flexsearch) | Apache-2.0 | 高性能 JS 搜索、CJK、Worker、持久化索引、高亮、复杂查询 | **性能与扩展性参考** |
| [Fuse.js](https://github.com/krisk/Fuse) | Apache-2.0 | Bitap 模糊匹配、字段权重、匹配位置、Token Search、Web Worker | **未来可选模糊搜索候选** |
| [Pagefind](https://github.com/Pagefind/pagefind) | MIT | 完全静态、低带宽、无搜索基础设施、过滤器、按需加载索引资源 | **静态索引分发参考** |
| [nodejieba](https://github.com/yanyiwu/nodejieba) | MIT | 成熟 Node.js 中文分词 | **可选构建期 Tokenizer** |
| [jieba-wasm](https://github.com/fengkx/jieba-wasm) | MIT | 浏览器 WASM 中文分词 | **可选运行时 Tokenizer** |
| [Stork](https://github.com/jameslittle230/stork) | Apache-2.0 | Rust/WASM 静态站点搜索、预构建索引 | **WASM / 静态索引架构参考** |
| [Orama](https://github.com/oramasearch/orama) | Apache-2.0（仓库 `LICENSE.md`） | 全文 + 向量/混合搜索、Schema 化本地搜索 | **未来语义搜索参考，暂不进入核心范围** |

> 许可证说明：GitHub 当前仓库元数据对 Orama 显示 `NOASSERTION`，但仓库中的 `LICENSE.md` 明确包含 Apache License 2.0 文本。真正复制代码或加入依赖前仍应再次检查上游许可证。

## 1. MiniSearch

仓库：https://github.com/lucaong/minisearch

它是目前与我们的工程目标最接近的参考项目之一：

- 浏览器与 Node 均可运行，零外部依赖；
- 支持完全、前缀、模糊搜索、字段 Boost、过滤和自动建议；
- Tokenizer 和 Term Processing 可自定义；
- 公开了详细的内部设计文档。

MiniSearch 的设计文档尤其值得研究。它使用紧凑的可搜索 Radix Tree 管理 Term，并把倒排信息抽象为类似：

```text
term → field → document → term frequency
```

内部使用短数字 ID。相关度评分建立在 BM25/BM25+ 思想上，同时考虑词的稀有度、非线性 TF 和字段长度归一化。

### 我们应该借鉴

- 核心 API 保持小而明确，同时提供稳定扩展点；
- 内部继续使用数字 ID；
- 前缀/模糊能力可以通过 Term 查找结构升级，而不需要推翻整个引擎；
- BM25 应成为后续排名 benchmark 的重点；
- Tokenizer 属于搜索引擎边界，而不是 UI 逻辑。

### 目前不建议

不要直接用 MiniSearch 替换我们的倒排索引。否则 `qingshuige-search` 会逐渐变成包装器，也会削弱我们以数据结构和算法为核心的开发目标。

## 2. Lunr.js

仓库：https://github.com/olivernn/lunr.js

Lunr 是经典的客户端全文搜索库。它直接索引 JSON 文档，支持多字段、查询/文档 Boost、字段限定和模糊匹配，并返回相关度分数与匹配元数据。

### 我们应该借鉴

- 把“参与索引的字段”和“只用于页面展示/返回的字段”分离；
- SearchResult 返回结构化 Match Metadata，让 UI 不需要再次分析文章来高亮；
- 查询语义与页面呈现保持解耦；
- 字段权重应该成为一等配置能力。

### 在本项目中的角色

Lunr 更适合作为成熟架构与回归 benchmark。它经过长期演化的简洁模型有助于我们判断某个新功能究竟是必要能力还是过度设计。

## 3. FlexSearch

仓库：https://github.com/nextapps-de/flexsearch

FlexSearch 非常强调性能。当前文档包含多字段 Document Search、CJK、Tokenizer/Encoder、Suggestion、Highlighting、Worker、索引导出导入、Persistent Index、复杂 Boolean Resolver 与多种存储后端。

### 我们应该借鉴

- 分别 benchmark 建索引时间、查询延迟和内存，而不是只看一个“速度”；
- 数字 ID 和紧凑数据布局非常重要；
- Web Worker 是把索引/查询计算移出 UI 主线程的自然方式；
- 当运行时建索引开始昂贵后，索引 Export/Import 和 Fast Boot 很有价值；
- 持久化与懒加载是“数据分发层”问题，不应该与相关度算法混在一起。

### 在本项目中的角色

把 FlexSearch 作为高性能对照，而不是默认依赖。当文章规模增长到我们当前结构出现真实瓶颈时，再从它的设计中选择性吸收优化手段。

## 4. Fuse.js

仓库：https://github.com/krisk/Fuse

Fuse.js 的核心定位是模糊搜索。当前版本提供 Bitap 拼写容错、字段权重、字符级匹配位置、Token Search、逻辑查询和 Web Worker。

### 我们应该借鉴

- 模糊搜索应被视作独立能力，保持可选；
- 返回 Match Indices 对安全高亮非常有用；
- 模糊查询可以只在精确/全文召回较弱时作为 fallback，而不是每次查询都运行；
- 大数据集下可以通过 Worker 维持页面响应。

### 推荐接入方式

未来若加入模糊搜索，建议：

```text
精确 / 倒排索引主检索
       ↓ 结果不足
可选 fuzzy provider
       ↓
结果合并 + 重新排序
```

不要默认让模糊匹配取代标题、作者和正文的精确语义。

## 5. Pagefind

仓库：https://github.com/Pagefind/pagefind

Pagefind 的目标是“完全静态、适合大型站点、尽量降低用户带宽、不需要托管搜索基础设施”，同时支持作者、Tag 等过滤数据。

它与我们静态网站的目标高度一致，虽然具体实现方式不同。

### 我们应该借鉴

- 当文章很多时，把索引工作提前到构建阶段；
- 对索引进行分片，避免浏览器一次下载一个巨大的 JSON；
- 用户真正查询时再懒加载必要数据；
- 分类/作者等结构化过滤应与自由文本相关度分开。

### 长期方向

当前 Hugo 方案是把统一 `Article[]` 发到浏览器，再运行时建索引。几百篇文章完全合理。若以后达到几千乃至上万篇，Pagefind 式“构建期索引 + 分片懒加载”比不断优化一个单体 JSON 更值得考虑。

## 6. nodejieba

仓库：https://github.com/yanyiwu/nodejieba

`nodejieba` 是成熟的 Node.js Jieba 中文分词实现/绑定，MIT 许可证。

### 适合

- 构建期 Token 化；
- 通过自定义词典处理人名和技术词汇；
- 对比“词语分词”与我们 Bigram 基线的 Precision / Recall。

### 限制

它的 Node/native 运行方式会增加环境和构建复杂度，因此不适合作为所有浏览器用户都必须加载的默认依赖，更适合放在可选构建适配器里。

## 7. jieba-wasm

仓库：https://github.com/fengkx/jieba-wasm

`jieba-wasm` 通过 WebAssembly 在浏览器 JavaScript 中提供 Jieba 风格分词，并支持自定义词典。

### 适合

- 用户明确需要中文词语分词时的可选 Browser Tokenizer；
- 与 Bigram 方案进行可控的 Precision / Recall 对比；
- 领域词典价值很高的站点。

### 代价

WASM 初始化、词典数据、包体和异步启动都不应该成为所有用户的强制成本。因此建议插件化，而不是默认 Tokenizer。

## 8. Stork

仓库：https://github.com/jameslittle230/stork

Stork 是基于 Rust/WebAssembly 与预构建搜索索引的静态站点搜索项目，Apache-2.0 许可证。

### 我们应该借鉴

- 把昂贵的索引构建工作从浏览器移到构建阶段；
- 大型站点可以传输紧凑的索引文件，而不是完整文章正文；
- 只有真实 benchmark 证明值得时，才引入 WASM 的构建和运行复杂度。

### 维护性提醒

截至 2026-09-07 的调研快照，Stork 的最近 push 明显早于 Pagefind、FlexSearch、Fuse.js 等项目。它依然有很好的架构参考价值，但如果未来考虑成为关键依赖，需要重新确认维护状态。

## 9. Orama

仓库：https://github.com/oramasearch/orama

Orama 提供 JavaScript 本地全文、向量和混合搜索，能力范围明显大于我们当前目标。

### 我们应该借鉴

- Schema 驱动的数据模型有助于通用组件 API；
- 传统全文检索和向量/语义检索可以在统一的 Result Layer 汇合；
- 未来可以通过 Adapter 丰富 `SearchResult`，而不让基础包被迫依赖向量搜索。

### 当前建议

暂时不要把语义/向量搜索加入核心。它会在传统搜索尚未成熟时显著扩大项目范围、包体、数据要求与排序复杂度。

## 采用计划

### 现在

- 核心保持零依赖；
- 建立 benchmark 数据集，在开发工具中与 MiniSearch、Lunr、FlexSearch、Fuse.js 做外部对比；
- 继续保留明确的 `Map<Token, PostingList>` 与 KMP 精确验证；
- 加强 Match Metadata，使 UI 高亮更安全、准确。

### 下一阶段

- 定义公开 `tokenizer` 策略接口；
- 增加可选 Jieba 构建期 / WASM Tokenizer；
- 对比当前 TF-IDF 与 BM25/BM25+；
- 在有质量数据后再决定前缀/模糊搜索；
- 评估 Web Worker Adapter。

### 大型静态站点阶段

- 构建期序列化索引；
- 把索引拆成可懒加载分片；
- Metadata/Filter 索引与正文 Posting 分离加载；
- 研究二进制或压缩索引格式；
- 静态站点 Adapter 继续与核心搜索语义分离。

## 许可证与代码使用原则

以上项目主要采用 MIT 或 Apache-2.0 这类宽松许可证，但“宽松”不等于“不需要遵守许可证”。如果未来不是仅借鉴算法思想或调用公开 API，而是复制、修改具体源代码，就必须履行对应许可证要求并保留要求的版权/许可证声明。

目前 `qingshuige-search` **没有打包上述项目的代码**。本文只是工程调研记录，不构成法律意见。
