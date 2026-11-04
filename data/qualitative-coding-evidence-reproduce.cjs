const assert = require('node:assert/strict');
const turns = {
  P1: { speaker: 'interviewer', text: 'Was the late shuttle reliable after the timetable changed?' },
  P2: { speaker: 'participant', text: 'On Tuesdays, yes. On Fridays it left before our shift ended.' },
  P4: { speaker: 'participant', text: 'I never asked.' },
};
const evidence = turns.P2.text;
assert.equal(turns.P1.speaker, 'interviewer');
assert.equal(turns.P2.speaker, 'participant');
assert.ok(evidence.includes('On Tuesdays, yes.'));
assert.ok(evidence.includes('On Fridays'));
assert.equal(evidence.slice(evidence.indexOf('yes'), evidence.indexOf('yes') + 3), 'yes');
assert.equal(turns.P4.text, 'I never asked.');
console.log('6 fixture assertions passed. These check the authored text and roles only.');
