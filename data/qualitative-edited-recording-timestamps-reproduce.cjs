const assert = require('node:assert/strict');

// Fictional retained sections, in seconds. Start inclusive, end exclusive.
const sections = [
  { editedStart: 0, editedEnd: 40, sourceStart: 10 },
  { editedStart: 40, editedEnd: 75, sourceStart: 63 },
];

function replayRange(start, end) {
  const section = sections.find(row => start >= row.editedStart && end <= row.editedEnd);
  if (!section || !Number.isFinite(start) || !Number.isFinite(end) || start >= end) return null;
  const offset = section.sourceStart - section.editedStart;
  return [start + offset, end + offset];
}

assert.deepEqual(replayRange(12, 15), [22, 25]);
assert.deepEqual(replayRange(44, 47), [67, 70]);
assert.deepEqual(replayRange(37, 40), [47, 50]);
assert.deepEqual(replayRange(40, 43), [63, 66]);
assert.equal(replayRange(38, 42), null);
assert.equal(replayRange(74, 76), null);
assert.equal(replayRange(40, 40), null);
assert.equal(replayRange(NaN, 42), null);
assert.notDeepEqual(replayRange(44, 47), [54, 57]);
console.log('9 assertions passed');
