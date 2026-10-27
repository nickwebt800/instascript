'use strict';
const assert = require('node:assert/strict');
const source = {id:'FICT-T04',version:'v1',fictional:true,audioAvailable:false,cues:[{id:'C01',start:12,end:16,text:'We used mirror at the workshop.'},{id:'C02',start:27,end:31,text:'A mirror hung beside the door.'}]};
const reviews = [{id:'U01',documentId:'FICT-T04',version:'v1',cueId:'C01',start:8,end:14,draftToken:'mirror',candidates:[{text:'Mirro',source:'LEX-01',sourceType:'fictional project sheet; not audio evidence'}],reviewStatus:'pending',audioChecked:false},{id:'U02',documentId:'FICT-T04',version:'v1',cueId:'C02',start:2,end:8,draftToken:'mirror',candidates:[],reviewStatus:'pending',audioChecked:false}];
function check(item) {
 assert.equal(item.documentId,source.id,'Document mismatch');
 assert.equal(item.version,source.version,'Version mismatch');
 const cue=source.cues.find(c=>c.id===item.cueId);assert(cue,'Unknown cue');
 assert(Number.isInteger(item.start)&&Number.isInteger(item.end)&&item.start>=0&&item.end>item.start&&item.end<=cue.text.length,'Invalid span');
 assert.equal(cue.text.slice(item.start,item.end),item.draftToken,'Selected token mismatch');
 assert.equal(item.audioChecked,false,'No audio exists for this fixture');
 assert.equal(item.reviewStatus,'pending','No decisions established for this fixture');
 return {reviewId:item.id,selected:cue.text.slice(item.start,item.end),replay:[cue.start,cue.end],status:'pending'};
}
const snapshot=JSON.stringify(source),result=reviews.map(check);
function rejected(item){try{check(item);return false;}catch{return true;}}
const checks={wrongVersionRejected:rejected({...reviews[0],version:'v2'}),wrongTokenRejected:rejected({...reviews[0],start:0,end:2}),unsupportedAudioClaimRejected:rejected({...reviews[0],audioChecked:true})};
assert(Object.values(checks).every(Boolean));
const unsafeGlobalReplacement=source.cues.map(c=>({cueId:c.id,text:c.text.replace(/\bmirror\b/g,'Mirro'),approved:false}));
assert.equal(JSON.stringify(source),snapshot);assert.equal(unsafeGlobalReplacement.length,2);
const output={disclosure:'Entirely fictional text exercise; no audio or human verification',source,reviews,result,unsafeGlobalReplacement,summary:{exactOccurrences:source.cues.reduce((n,c)=>n+(c.text.match(/\bmirror\b/g)||[]).length,0),pendingDecisions:2,approvedReplacements:0,sourceUnchanged:JSON.stringify(source)===snapshot},checks};
console.log(JSON.stringify(output,null,2));
