const fs=require('fs'); const assert=require('node:assert/strict');
const a=[{person:'F01',turn:'T01',text:'The stairs were steep. The signs were small.'},{person:'F02',turn:'T02',text:'The signs were small.'}];
const b=a.flatMap(x=>x.text.match(/[^.]+\./g).map(t=>({...x,text:t.trim()})));
const count=x=>({rows:x.length,people:new Set(x.map(r=>r.person)).size,turns:new Set(x.map(r=>r.turn)).size});
assert.equal(a.length,2); assert.equal(b.length,3);
assert.equal(count(a).people,count(b).people); assert.equal(count(a).turns,count(b).turns);
for(const source of a) assert.equal(b.filter(x=>x.turn===source.turn).map(x=>x.text).join(' '),source.text);
const repeated=[...b,b[0]];
assert.equal(count(repeated).people,2); assert.equal(count(repeated).rows,4);
const uniqueText=new Set(b.map(x=>x.text)).size;
const signsPeople=new Set(b.filter(x=>x.text.includes('signs')).map(x=>x.person)).size;
const fragmentIdentity=x=>JSON.stringify([x.person,x.turn,x.text]);
const uniqueFragments=new Set(repeated.map(fragmentIdentity)).size;
assert.equal(uniqueText,2); // text-only dedup loses F02's separate source
assert.equal(signsPeople,2);
assert.equal(uniqueFragments,3); // the deliberate copied display adds no new fragment
assert.notEqual(fragmentIdentity(b[1]),fragmentIdentity(b[2]));
const output={uniqueText,signsPeople,uniqueFragments,fixture:'Fictional STEPS-R17; no recording or participants',layoutA:a,layoutB:b,countsA:count(a),countsB:count(b),duplicateCounts:count(repeated),assertions:12,limits:'Mechanical count and exact reconstruction only. No semantic validation, prevalence estimate or real software import.'};
fs.writeFileSync(require('path').join(__dirname,'experiment-output.json'),JSON.stringify(output,null,2));
console.log('12 assertions passed; 2 versus 3 rows, same 2 fictional persons and turns.');
