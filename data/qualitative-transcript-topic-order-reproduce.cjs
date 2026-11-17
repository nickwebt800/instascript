const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const source={id:'ROOM-R19',version:1,fictional:true,turns:[
{id:'T01',role:'I',text:'How did you find the room?'},
{id:'T02',role:'P',text:'The blue arrows helped.'},
{id:'T03',role:'I',text:'Was the booking form clear?'},
{id:'T04',role:'P',text:'That was confusing.'},
{id:'T05',role:'I',text:'Anything else about finding the room?'},
{id:'T06',role:'P',text:'The arrows stopped at the lift.'}]};
const before=JSON.stringify(source);
function resolve(row){
 assert.equal(row.source,source.id,'wrong source');assert.equal(row.version,source.version,'wrong version');
 const index=source.turns.findIndex(t=>t.id===row.turn);assert(index>=0,'missing turn');
 assert.equal(row.text,source.turns[index].text,'copied text changed');
 assert.equal(row.preceding,index?source.turns[index-1].id:null,'wrong preceding source turn');
 return {...row,sourceIndex:index,interpretation:'not approved by mechanical checks'};
}
const row=(turn,preceding,topic)=>({source:source.id,version:1,turn,preceding,topic,text:source.turns.find(t=>t.id===turn).text});
const view=[row('T06','T05','Finding the room'),row('T02','T01','Finding the room')];
let checks=0;const check=f=>{f();checks++};
const resolved=view.map(resolve);
check(()=>assert.deepEqual(resolved.map(r=>r.turn),['T06','T02']));
const chronological=[...resolved].sort((a,b)=>a.sourceIndex-b.sourceIndex);
check(()=>assert.deepEqual(chronological.map(r=>r.turn),['T02','T06']));
check(()=>assert.deepEqual(chronological.map(r=>r.preceding),['T01','T05']));
for(const [patch,reason] of [[{source:'OTHER'},/wrong source/],[{version:2},/wrong version/],[{turn:'T99'},/missing turn/],[{text:'Edited words.'},/copied text changed/],[{preceding:'T01'},/wrong preceding source turn/]])check(()=>assert.throws(()=>resolve({...view[0],...patch}),reason));
const misleading=row('T04','T01','Finding the room');check(()=>assert.throws(()=>resolve(misleading),/wrong preceding source turn/));
const traceable=resolve({...misleading,preceding:'T03'});check(()=>assert.equal(traceable.interpretation,'not approved by mechanical checks'));
check(()=>assert.equal(resolve(row('T01',null,'Context')).preceding,null));
check(()=>assert.throws(()=>resolve(row('T01','T06','Context')),/wrong preceding source turn/));
check(()=>assert.equal(JSON.stringify(source),before));
check(()=>assert.equal(source.turns.length,6));
const output={fixture:'Fictional ROOM-R19; no recording or participant',assertions:checks,source,topicView:resolved,selectedTurnsInSourceOrder:chronological,misleadingRowRejected:misleading,traceableButNotInterpretivelyApproved:traceable,limits:'Reference consistency only; preceding turn is not a verified question-answer or semantic relation. Selected subset is not a reconstruction of the complete source.'};
fs.writeFileSync(path.join(__dirname,'qualitative-transcript-topic-order-example.json'),JSON.stringify(output,null,2));
console.log(checks+' assertions passed; source remains in order; misleading preceding-turn reference rejected.');
