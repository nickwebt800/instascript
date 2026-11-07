const assert=require('node:assert/strict');
function status(r){
 if(!r.accessAccount||r.selectedAccount!==r.accessAccount||r.route!=='permitted')return 'HOLD ROUTE';
 if(!r.transcript||!r.workingVersion||r.reviewVersion!==r.workingVersion)return 'ROUTE RECORDED, REVIEW OPEN';
 return 'REVIEW RECORDED';
}
const d={selectedAccount:'TRAIN-A',accessAccount:'TRAIN-A',route:'permitted',transcript:'LANTERN-T1',workingVersion:1,reviewVersion:1};
assert.equal(status({...d,route:'unknown'}),'HOLD ROUTE');
assert.equal(status({...d,selectedAccount:'TRAIN-B'}),'HOLD ROUTE');
assert.equal(status({...d,reviewVersion:null}),'ROUTE RECORDED, REVIEW OPEN');
assert.equal(status(d),'REVIEW RECORDED');
assert.equal(status({...d,workingVersion:2}),'ROUTE RECORDED, REVIEW OPEN');
assert.equal(status({...d,accessAccount:null}),'HOLD ROUTE');
console.log('6 fictional planning-rule assertions passed; no NVivo/service/recording test');
