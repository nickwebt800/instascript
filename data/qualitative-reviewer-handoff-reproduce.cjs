const assert = require('node:assert/strict');
const source = Object.freeze({reference:'HANDOFF-R8',version:'V1',cue:'C02',text:'We used the [unclear] board.'});
const issue = {id:'D01',...source,candidates:['notice','message'],state:'open',receipt:'pending',owner:'B',next:'Inspect authorized source; no recording exists in this fictional exercise',review:'none; fictional text only',rationale:''};
function validate(rows, expected=source){
 const ids=new Set();
 for(const r of rows){
  assert(r.id && !ids.has(r.id),'duplicate or missing issue ID');ids.add(r.id);
  for(const k of ['reference','version','cue','text'])assert.equal(r[k],expected[k],k+' mismatch');
  assert.deepEqual(r.candidates,['notice','message']);
  assert(['open','resolved'].includes(r.state));
  if(r.state==='open')assert(r.owner && r.next,'missing next responsibility');
  if(r.state==='resolved')assert(r.rationale && r.review!=='none; fictional text only','no substantive resolution record');
 }
}
let passed=0;function check(name,fn){fn();passed++;return name;}
const checks=[];
checks.push(check('original open ledger accepted',()=>validate([issue])));
const received={...issue,receipt:'acknowledged'};
checks.push(check('receipt preserves open state',()=>{validate([received]);assert.equal(received.state,'open');}));
checks.push(check('both candidates retained',()=>assert.deepEqual(received.candidates,['notice','message'])));
for(const [name,rows] of [
 ['administrative closure rejected',[{...received,state:'resolved'}]],
 ['rationale without review rejected',[{...received,state:'resolved',rationale:'Received'}]],
 ['wrong version rejected',[{...issue,version:'V2'}]],
 ['changed passage rejected',[{...issue,text:'We used the notice board.'}]],
 ['missing owner rejected',[{...issue,owner:''}]],
 ['duplicate ID rejected',[issue,issue]],
 ['silent candidate removal rejected',[{...issue,candidates:['notice']}]]
])checks.push(check(name,()=>assert.throws(()=>validate(rows))));
checks.push(check('working text unchanged',()=>assert.equal(source.text,'We used the [unclear] board.')));
console.log(JSON.stringify({fictional:true,audioReview:false,agreementScore:null,source,received,passed,checks,limitation:'Schema checks do not authenticate reviewers or establish wording accuracy.'},null,2));
