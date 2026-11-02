const assert=require('node:assert/strict');
const clone=x=>JSON.parse(JSON.stringify(x));
const wording={id:'W03',document:'PURPOSE-R10',version:'V1',passage:'P03',purpose:'wording',state:'pending',rationale:''};
const speaker={id:'S03',document:'PURPOSE-R10',version:'V1',passage:'P03',purpose:'speaker attribution',state:'pending',candidate:null,rationale:''};
function requireDecision(record,request){
 for(const key of ['document','version','passage','purpose'])assert.equal(record[key],request[key],key+' mismatch');
 assert.equal(record.state,'decided','pending decision');
 assert.equal(typeof record.rationale,'string');assert(record.rationale.trim(),'missing rationale');
 return clone(record);
}
let passed=0;const check=fn=>{fn();passed++;};const req=purpose=>({document:'PURPOSE-R10',version:'V1',passage:'P03',purpose});
check(()=>assert.throws(()=>requireDecision(wording,req('wording'))));
const declared={...wording,state:'decided',rationale:'Authored fictional declaration; no recording exists.'};
check(()=>assert.equal(requireDecision(declared,req('wording')).id,'W03'));
check(()=>assert.equal(speaker.state,'pending'));
check(()=>assert.throws(()=>requireDecision(declared,req('speaker attribution')),/purpose mismatch/));
const proposal={...speaker,candidate:'Speaker B'};
check(()=>assert.throws(()=>requireDecision(proposal,req('speaker attribution')),/pending decision/));
check(()=>assert.equal(proposal.state,'pending'));
for(const [field,value]of [['document','OTHER'],['version','V2'],['passage','P04']])check(()=>assert.throws(()=>requireDecision(declared,{...req('wording'),[field]:value})));
check(()=>assert.throws(()=>requireDecision({...declared,rationale:'  '},req('wording')),/missing rationale/));
const inventedSpeakerDecision={...speaker,state:'decided',rationale:'Fictional rejection-test input only; not a supported attribution.'};
check(()=>assert.throws(()=>requireDecision(inventedSpeakerDecision,req('wording')),/purpose mismatch/));
const copy=requireDecision(declared,req('wording'));copy.rationale='changed';check(()=>assert.notEqual(copy.rationale,declared.rationale));
console.log(JSON.stringify({fictional:true,recordingExists:false,passed,wording:declared,speaker:proposal,limitations:'Record consistency only; no listening, identity, accuracy or permission verification.'},null,2));
