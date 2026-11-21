'use strict';
const assert=require('node:assert/strict');
// Authored teaching records, not observed ChatGPT sessions or generated outputs.
const route={surface:'Chat',mode:'attached-recording',client:'fictional-client',session:'BEACON-A'};
function classify(request,observation){
  for(const key of ['surface','mode','client','session']){
    if(typeof request[key]!=='string'||!request[key]||request[key]!==observation.route?.[key])throw Error('route mismatch: '+key);
  }
  if(!['preview','notes','transcript'].includes(observation.kind))throw Error('unknown category');
  if(observation.sourceReview!=='pending')throw Error('fixture has no source recording');
  if(observation.kind!=='preview'&&(typeof observation.artifact!=='string'||!observation.artifact.trim()))throw Error('missing artifact reference');
  return {state:{preview:'preview-only',notes:'notes-only',transcript:'transcript-present'}[observation.kind],sourceReview:'pending',capabilityTest:'not executed'};
}
const cards=[{id:'A',route:{...route},kind:'preview',artifact:null,sourceReview:'pending'},
 {id:'B',route:{...route,surface:'Record',mode:'recording',session:'BEACON-B'},kind:'notes',artifact:'fictional-notes-reference',sourceReview:'pending'},
 {id:'C',route:{...route,session:'BEACON-C'},kind:'transcript',artifact:'fictional-transcript-reference',sourceReview:'pending'}];
let checks=0;const test=(name,fn)=>{fn();checks++;};
test('preview stays preview',()=>assert.equal(classify(route,cards[0]).state,'preview-only'));
test('notes stay notes',()=>assert.equal(classify(cards[1].route,cards[1]).state,'notes-only'));
test('declared transcript present',()=>assert.equal(classify(cards[2].route,cards[2]).state,'transcript-present'));
for(const key of ['surface','mode','client','session'])test(key+' mismatch refused',()=>assert.throws(()=>classify({...cards[2].route,[key]:'different'},cards[2]),/route mismatch/));
test('no recording review invented',()=>assert.throws(()=>classify(route,{...cards[0],sourceReview:'complete'}),/no source/));
test('unknown category refused',()=>assert.throws(()=>classify(route,{...cards[0],kind:'audio verified'}),/unknown/));
test('notes require reference',()=>assert.throws(()=>classify(route,{...cards[0],kind:'notes',artifact:''}),/missing artifact/));
test('transcript requires reference',()=>assert.throws(()=>classify(route,{...cards[0],kind:'transcript',artifact:null}),/missing artifact/));
test('extension is not artifact evidence',()=>assert.equal(classify(route,{...cards[0],artifact:'pretend.srt'}).state,'preview-only'));
test('no recognition inferred',()=>assert.equal(classify(cards[2].route,cards[2]).capabilityTest,'not executed'));
test('no source verification inferred',()=>assert.equal(classify(cards[2].route,cards[2]).sourceReview,'pending'));
console.log(JSON.stringify({fixture:'BEACON-G05',provenance:'All cards authored fiction. No recording/account/model response.',cards:cards.map(c=>({id:c.id,request:c.route,observation:c,result:classify(c.route,c)})),checks,status:'PASS',limits:'Manual labels and references are not independently validated; no product capability, accuracy, timing or speed test.'},null,2));
