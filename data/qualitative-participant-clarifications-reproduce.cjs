const assert = require('node:assert/strict');
const recordingText = 'I stopped using the evening desk because it was hard to reach.';
const followupText = 'By hard to reach, I meant the bus connection after work, not the desk staff.';
const records = [
  {id:'T01',version:1,kind:'fictional_transcript',date:'2026-10-20',interval:{start:12,end:18},text:recordingText},
  {id:'F01',kind:'written_followup',date:'2026-10-22',relatesTo:['T01'],interval:null,text:followupText},
  {id:'M01',kind:'analyst_memo',date:'2026-10-23',relatesTo:['T01','F01'],interval:null,text:'Consider whether access refers to transport here; do not infer staff availability from T01 alone.'}
];
function checkSource(record) {
  if(record.kind==='written_followup' && record.interval!==null) return 'later_source_has_recording_interval';
  return 'accepted_by_exercise_convention';
}
const mergedCandidate={...records[1],interval:{...records[0].interval}};
const changeRequest={id:'C01',from:'F01',target:'T01',targetVersion:1,proposedReplace:{from:'hard to reach',to:'poorly connected by bus'},status:'pending review',audioCheck:'not applicable to fictional material',useDecision:'pending'};
assert.equal(new Set(records.map(x=>x.kind)).size,3);
assert.equal(records[0].text,recordingText);
assert.equal(records[1].interval,null);
assert(records[1].relatesTo.includes('T01'));
assert.equal(changeRequest.status,'pending review');
assert.equal(checkSource(mergedCandidate),'later_source_has_recording_interval');
const result={fictional:true,notice:'Authored text only. No actual participant, recording, email, verified wording or research finding. Dates and interval are invented.',records,changeRequest,checks:{distinctKinds:3,originalUnchanged:true,followupHasNoRecordingInterval:true,mergedCandidateResult:checkSource(mergedCandidate),decisionsPending:true}};
console.log(JSON.stringify(result,null,2));
