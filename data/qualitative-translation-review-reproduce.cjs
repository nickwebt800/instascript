const assert = require("node:assert/strict");

const baseline = { A: "key access", B: "after arrival", C: "sheet by entrance" };
const current = { ...baseline, B: "after a call" };

function compare(ids, previous, next) {
  if (!ids.length || ids.some(id => !Object.hasOwn(previous, id) || !Object.hasOwn(next, id))) {
    return "blocked";
  }
  return ids.some(id => previous[id] !== next[id]) ? "reopened" : "eligible";
}

assert.equal(compare(["A", "B"], baseline, current), "reopened");
assert.equal(compare(["C"], baseline, current), "eligible");
assert.equal(compare(["A", "B"], baseline, { A: current.A }), "blocked");
assert.equal(compare(["A", "D"], baseline, current), "blocked");
assert.equal(compare([], baseline, current), "blocked");
assert.equal(compare(["A", "B"], baseline, baseline), "eligible");
console.log("6 fictional dependency assertions passed");
