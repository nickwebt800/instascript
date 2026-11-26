// Authored fictional SEAM-R27. No network, recordings or listening validation.
'use strict';
const a=require('node:assert/strict');let checks=0;const test=fn=>{fn();checks++;};
const maps=[{file:'A',version:'V1',session:'S27',offset:0,duration:60},{file:'B',version:'V1',session:'S27',offset:50,duration:50}];
const cards=[{id:'A1',file:'A',version:'V1',start:54,end:57,text:'The gate was open.'},{id:'B1',file:'B',version:'V1',start:4,end:7,text:'The gate was open.'},{id:'B2',file:'B',version:'V1',start:24,end:27,text:'The gate was open.'}];
function locate(c,inventory=maps){
 const found=inventory.filter(m=>m.file===c.file&&m.version===c.version);
 if(!found.length)throw Error('missing map or version mismatch');if(found.length!==1)throw Error('ambiguous map');
 const m=found[0];if(![c.start,c.end,m.offset,m.duration].every(Number.isFinite)||c.start<0||c.end<=c.start||c.end>m.duration)throw Error('invalid interval');
 return {session:m.session,start:c.start+m.offset,end:c.end+m.offset};
}
function compare(x,y,inventory=maps){
 let p,q;try{p=locate(x,inventory);q=locate(y,inventory);}catch(e){return {state:'unresolved',reason:e.message};}
 if(p.session!==q.session)return {state:'different-session'};
 if(p.start!==q.start||p.end!==q.end)return {state:'different-range'};
 return {state:x.text===y.text?'candidate-same-range':'wording-conflict',range:p};
}
test(()=>a.deepEqual(locate(cards[0]),{session:'S27',start:54,end:57}));
test(()=>a.deepEqual(locate(cards[1]),locate(cards[0])));
test(()=>a.deepEqual(locate(cards[2]),{session:'S27',start:74,end:77}));
test(()=>a.deepEqual([Math.max(maps[0].offset,maps[1].offset),Math.min(maps[0].offset+maps[0].duration,maps[1].offset+maps[1].duration)],[50,60]));
test(()=>a.equal(compare(cards[0],cards[1]).state,'candidate-same-range'));
test(()=>a.equal(compare(cards[0],cards[2]).state,'different-range'));
test(()=>a.equal(compare(cards[0],{...cards[1],text:'The gate is open.'}).state,'wording-conflict'));
test(()=>a.equal(compare(cards[0],cards[1],maps.slice(0,1)).state,'unresolved'));
test(()=>a.equal(compare(cards[0],{...cards[1],version:'V2'}).state,'unresolved'));
test(()=>a.equal(compare(cards[0],cards[1],[maps[0],{...maps[1],session:'OTHER'}]).state,'different-session'));
test(()=>a.throws(()=>locate({...cards[0],start:-1}),/invalid interval/));
test(()=>a.throws(()=>locate({...cards[0],end:54}),/invalid interval/));
test(()=>a.throws(()=>locate({...cards[1],end:51}),/invalid interval/));
const before=JSON.stringify(cards),decision={id:'D1',basis:'author-declared fictional same event; no listening',retained:'A1',alternate:'B1',sourceLocators:[cards[0],cards[1]]};
test(()=>{a.equal(JSON.stringify(cards),before);a.equal(decision.sourceLocators.length,2);a.equal(cards.length,3);a.equal(new Set(cards.map(c=>c.text)).size,1);});
console.log(JSON.stringify({exercise:'SEAM-R27',fictional:true,status:'PASS',checks,cards,mapped:cards.map(c=>({id:c.id,...locate(c)})),candidate:compare(cards[0],cards[1]),later:compare(cards[0],cards[2]),decision,recordingReviewed:false,synchronizationVerified:false},null,2));
