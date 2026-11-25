// Authored fictional RELAY-R26. No network, media, private text or translation validation.
'use strict';
const a=require('node:assert/strict');let checks=0;const test=fn=>{fn();checks++;};
const turns=[
 {id:'P01',role:'participant',type:'source',text:'I use the north gate on weekdays.',rendering:'pending'},
 {id:'I02',role:'interpreter',type:'rendering',text:'She uses the north gate on weekdays.',sources:['P01']},
 {id:'I03',role:'interpreter',type:'clarification',text:'Do you mean every weekday?'},
 {id:'P04',role:'participant',type:'source',text:'Only when the workshop is open.',rendering:'pending'},
 {id:'I05',role:'interpreter',type:'rendering',text:'Only when the workshop is open.',sources:['P04']}
];
const derived={id:'D06',role:'editor',type:'reading-copy',sources:['P01','P04'],text:'She uses the north gate on weekdays when the workshop is open.'};
function resolve(record,inventory,document='R26',version='V1'){
 if(document!=='R26'||version!=='V1')throw Error('document-version mismatch');
 const ids=new Set();for(const t of inventory){if(ids.has(t.id))throw Error('duplicate turn');ids.add(t.id);}
 if(!['rendering','reading-copy'].includes(record.type))throw Error('relationship type');
 if(record.type==='rendering'&&record.role!=='interpreter')throw Error('speaker role');
 if(record.type==='reading-copy'&&record.role!=='editor')throw Error('speaker role');
 if(!record.sources?.length||new Set(record.sources).size!==record.sources.length)throw Error('source list');
 return record.sources.map(id=>{const t=inventory.find(x=>x.id===id);if(!t)throw Error('missing source');if(t.role!=='participant'||t.type!=='source')throw Error('source type');return t.id;});
}
test(()=>a.deepEqual(resolve(turns[1],turns),['P01']));
test(()=>a.deepEqual(resolve(derived,turns),['P01','P04']));
test(()=>a.throws(()=>resolve(derived,turns.filter(x=>x.id!=='P04')),/missing source/));
test(()=>a.throws(()=>resolve({...derived,sources:['I03']},turns),/source type/));
test(()=>a.throws(()=>resolve({...turns[1],role:'participant'},turns),/speaker role/));
test(()=>a.throws(()=>resolve(turns[2],turns),/relationship type/));
test(()=>a.throws(()=>resolve(derived,[...turns,turns[0]]),/duplicate turn/));
test(()=>a.throws(()=>resolve(derived,turns,'R26','V2'),/document-version/));
test(()=>a.throws(()=>resolve(derived,turns,'other','V1'),/document-version/));
test(()=>a.throws(()=>resolve({...derived,sources:[]},turns),/source list/));
test(()=>a.throws(()=>resolve({...derived,sources:['P01','P01']},turns),/source list/));
test(()=>{a.equal(turns[3].rendering,'pending');a.equal(turns[3].text,turns[4].text);a.notEqual(turns[3].role,turns[4].role);});
console.log(JSON.stringify({exercise:'RELAY-R26',fictional:true,checks,status:'PASS',spokenTurns:turns.length,derivedRecord:derived.id,dependencies:resolve(derived,turns),translationVerified:false},null,2));
