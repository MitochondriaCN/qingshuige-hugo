import test from "node:test"
import assert from "node:assert/strict"
import { SearchEngine } from "../src/index.js"

const articles = [
  {
    id: "a",
    title: "Hugo 与 Vue 主题开发",
    author: "南木",
    date: "2026-09-07T00:00:00Z",
    categories: ["学"],
    content: "我们使用 Hugo 与 Vue3 开发博客，并设计计算机相关的全文搜索。",
    url: "/a/"
  },
  {
    id: "b",
    title: "今天就让我大哭一场吧",
    author: "猕猴桃教教主",
    date: "2026-05-20T00:00:00Z",
    categories: ["文"],
    content: "今天下雨了。这个故事与技术没有关系。",
    url: "/b/"
  },
  {
    id: "c",
    title: "博客开发记录",
    author: "南木",
    date: "2025-12-01T00:00:00Z",
    categories: ["学"],
    content: "这里偶尔提到 Hugo，也提到了 Vue。",
    url: "/c/"
  },
  {
    id: "d",
    title: "模式匹配实验",
    author: "测试作者",
    date: "2026-01-01T00:00:00Z",
    categories: ["学"],
    content: "我们先进行计算，然后在另一处写下算机，但没有连续写出目标术语。",
    url: "/d/"
  }
]

test("title match outranks body-only match", () => {
  const engine = new SearchEngine({ maxDocumentFrequencyRatio: 1 }).load(articles)
  const results = engine.search("Hugo")
  assert.equal(results[0].externalId, "a")
  assert.equal(results[0].matchedFields.title, "prefix")
})

test("author exact match recalls all author articles", () => {
  const engine = new SearchEngine().load(articles)
  const ids = engine.search("南木").map((result) => result.externalId)
  assert.deepEqual(new Set(ids), new Set(["a", "c"]))
})

test("single Han query searches title but not noisy body", () => {
  const engine = new SearchEngine().load(articles)
  const results = engine.search("今")
  assert.deepEqual(results.map((result) => result.externalId), ["b"])
  assert.equal(results[0].matchedFields.body, false)
})

test("category acts as pre-filter", () => {
  const engine = new SearchEngine({ maxDocumentFrequencyRatio: 1 }).load(articles)
  const results = engine.search("Hugo", { category: "文" })
  assert.equal(results.length, 0)
})

test("Chinese body recall uses bigrams and exact KMP verification", () => {
  const engine = new SearchEngine({ maxDocumentFrequencyRatio: 1 }).load(articles)
  const ids = engine.search("计算机").map((result) => result.externalId)
  assert.deepEqual(ids, ["a"])
  assert.ok(!ids.includes("d"))
})

test("explicit date query is treated structurally", () => {
  const engine = new SearchEngine().load(articles)
  const ids = engine.search("2026").map((result) => result.externalId)
  assert.deepEqual(new Set(ids), new Set(["a", "b", "d"]))
})

test("multi-group queries recall by OR while coverage influences ranking", () => {
  const engine = new SearchEngine({ maxDocumentFrequencyRatio: 1 }).load(articles)
  const results = engine.search("Hugo Vue")
  assert.equal(results[0].externalId, "a")
  assert.equal(results[0].coverage, 1)
})
