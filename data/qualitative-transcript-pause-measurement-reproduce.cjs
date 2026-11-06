const assert=require('node:assert/strict');
function gap(a,b){ if(!a||!b)return null; if(a.end<a.start||b.end<b.start)throw Error('invalid interval');return +(b.start-a.end).toFixed(3); }
const a={start:2,end:4,text:'I waited'},b={start:5,end:7,text:'Then I left'};
assert.equal(gap(a,b),1);
assert.equal(gap({...a,end:4.6},b),0.4);
const layoutB={start:2,end:7,text:'I waited. Then I left.'};
const words=s=>s.toLowerCase().match(/[a-z]+/g);
assert.deepEqual(words([a.text,b.text].join(' ')),words(layoutB.text));
assert.equal(gap({start:2,end:7},null),null);
assert.throws(()=>gap({start:5,end:4},b),/invalid/);
assert.equal(gap({start:2,end:5.5},b),-0.5);
console.log('6 assertions passed; synthetic cue arithmetic only; no audio measured');
