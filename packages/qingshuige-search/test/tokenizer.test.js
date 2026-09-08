import test from "node:test"
import assert from "node:assert/strict"
import { normalizeText, tokenize, tokenizeQuery } from "../src/index.js"

test("normalizes compatibility characters, case and spaces", () => {
  assert.equal(normalizeText("  Ｈｕｇｏ\n VUE  "), "hugo vue")
})

test("tokenizes mixed Chinese and technical words", () => {
  const values = tokenize("今天使用 Hugo 和 Vue3 学习计算机").map((item) => item.value)
  assert.deepEqual(values, [
    "今天", "天使", "使用",
    "hugo",
    "vue3", "vue",
    "学习", "习计", "计算", "算机"
  ])
})

test("single Han characters are not searchable in body", () => {
  assert.deepEqual(tokenize("这"), [])
  assert.deepEqual(tokenizeQuery("这")[0], {
    raw: "这",
    tokens: [],
    bodySearchable: false,
    type: "han"
  })
})

test("query keeps AND tokens inside Han group and separate word groups", () => {
  assert.deepEqual(tokenizeQuery("计算机 Hugo"), [
    { raw: "计算机", tokens: ["计算", "算机"], bodySearchable: true, type: "han" },
    { raw: "hugo", tokens: ["hugo"], bodySearchable: true, type: "word" }
  ])
})


test("versioned technical words expose a base alias without weakening model numbers", () => {
  assert.deepEqual(tokenize("Vue3 GPT-5 74HC193").map((item) => item.value), [
    "vue3", "vue", "gpt-5", "gpt", "74hc193"
  ])
})
