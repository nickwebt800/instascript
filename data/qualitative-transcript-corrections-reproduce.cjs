const crypto=require('node:crypto');
const before='I take the bus unless the route is cancelled. The clinic opens at nine. I wait outside.';
const after='I take the bus only if the route is running. On weekdays: The clinic opens at nine. I wait outside. I wait outside.';
const quotations=[{id:'Q1',text:'unless the route is cancelled',code:'exception condition'},{id:'Q2',text:'The clinic opens at nine.',code:'opening time'},{id:'Q3',text:'I wait outside.',code:'waiting location'}];
const matches=(s,q)=>{const positions=[];for(let n=0;(n=s.indexOf(q,n))!==-1;n+=q.length)positions.push(n);return positions;};
const record={kind:'Authored fictional training text, not recorded speech, model output or research findings',date:'2026-10-24',offsetConvention:'Zero-based UTF-16 start, exclusive end; ASCII exercise so code units equal characters',version1:{id:'training-v1',text:before},version2:{id:'training-v2',text:after},quotations:quotations.map(q=>{const oldStart=before.indexOf(q.text),found=matches(after,q.text);return {...q,oldStart,oldEnd:oldStart+q.text.length,newMatches:found,oldOffsetTextInV2:after.slice(oldStart,oldStart+q.text.length),status:found.length===0?'changed_or_missing':found.length>1?'ambiguous':'relocated_needs_review',decision:'Human review pending; no code automatically transferred'};})};
record.version1.sha256=crypto.createHash('sha256').update(before).digest('hex');record.version2.sha256=crypto.createHash('sha256').update(after).digest('hex');
console.log(JSON.stringify(record,null,2));
