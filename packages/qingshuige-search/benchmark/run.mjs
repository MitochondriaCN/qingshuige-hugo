import fs from "node:fs"
import { performance } from "node:perf_hooks"
import { SearchEngine } from "../src/index.js"

const [indexPath, ...queryArgs] = process.argv.slice(2)

if (!indexPath) {
  console.error('Usage: npm run benchmark -- <search-index.json> [query ...]')
  process.exit(1)
}

const queries = queryArgs.length > 0
  ? queryArgs
  : ["Hugo", "计算机", "今天", "2026"]

if (global.gc) global.gc()
const heapBefore = process.memoryUsage().heapUsed

const raw = fs.readFileSync(indexPath, "utf8")
const parseStart = performance.now()
const articles = JSON.parse(raw)
const parseMs = performance.now() - parseStart

const buildStart = performance.now()
const engine = new SearchEngine().load(articles)
const buildMs = performance.now() - buildStart

if (global.gc) global.gc()
const heapAfter = process.memoryUsage().heapUsed

const samples = []
for (const query of queries) {
  for (let i = 0; i < 30; i += 1) engine.search(query)

  const iterations = 500
  const start = performance.now()
  let resultCount = 0
  for (let i = 0; i < iterations; i += 1) {
    resultCount = engine.search(query).length
  }
  const elapsed = performance.now() - start

  samples.push({
    query,
    results: resultCount,
    meanMs: elapsed / iterations
  })
}

console.log(JSON.stringify({
  articles: articles.length,
  jsonBytes: Buffer.byteLength(raw),
  parseMs,
  buildMs,
  approximateHeapDeltaBytes: Math.max(0, heapAfter - heapBefore),
  queries: samples
}, null, 2))
