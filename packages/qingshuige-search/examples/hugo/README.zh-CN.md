\
# Hugo 适配器示例

**简体中文** · [English](./README.md)

本目录演示 Hugo 如何向 `qingshuige-search` 提供文章数据，同时不让 Hugo 成为搜索核心的依赖。

## 职责边界

```text
Markdown / Hugo Page
        ↓ Hugo Output Format
/search-index.json
        ↓ fetch
Article[]
        ↓
qingshuige-search
```

Hugo 只负责生成统一文章数据。Token 化、倒排索引构建、召回和排序仍然全部属于搜索核心。

## 接入步骤

1. 把 `config.yaml` 中的配置合并到站点配置。
2. 将 `home.searchindex.json` 复制到站点 `layouts/` 或主题 layouts 中。
3. 构建 Hugo。
4. 首页会额外生成 `/search-index.json`。
5. 浏览器读取该 JSON，并传给 `SearchEngine`。

```js
import { SearchEngine } from 'qingshuige-search'

const documents = await fetch('/search-index.json').then(response => response.json())
const engine = new SearchEngine().load(documents)

const results = engine.search('Hugo Vue')
```

## 为什么保持 Adapter 形式？

静态站点生成器擅长收集内容，搜索引擎擅长检索内容。把两者分开后，同一个核心包就可以服务 Hugo、Astro、Jekyll、普通 API，甚至手工提供的 JSON。

当站点变大后，未来 Hugo Adapter 可以在构建阶段生成序列化或分片索引，但这种优化仍应该留在适配/分发层，而不是污染核心搜索语义。
