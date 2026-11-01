const assert=require('node:assert/strict');
function scope(duration,spans,version='V1'){
 assert.equal(version,'V1','version mismatch');assert(Number.isFinite(duration)&&duration>0);
 for(const [a,b]of spans)assert(Number.isFinite(a)&&Number.isFinite(b)&&a>=0&&b>a&&b<=duration,'invalid interval');
 const merged=[];for(const [a,b]of spans.map(x=>[...x]).sort((x,y)=>x[0]-y[0])){const last=merged.at(-1);if(last&&a<=last[1])last[1]=Math.max(b,last[1]);else merged.push([a,b]);}
 const unchecked=[];let cursor=0;for(const[a,b]of merged){if(a>cursor)unchecked.push([cursor,a]);cursor=b;}if(cursor<duration)unchecked.push([cursor,duration]);
 return{checked:merged,unchecked,uniqueCheckedSeconds:merged.reduce((n,[a,b])=>n+b-a,0)};
}
const result=scope(120,[[0,20],[35,50]]);let passed=0;const check=f=>{f();passed++;};
check(()=>assert.deepEqual(result.unchecked,[[20,35],[50,120]]));check(()=>assert.equal(result.uniqueCheckedSeconds,35));
check(()=>assert.equal(scope(120,[[0,20],[10,30]]).uniqueCheckedSeconds,30));check(()=>assert.deepEqual(scope(120,[[0,20],[20,35]]).checked,[[0,35]]));
check(()=>assert.deepEqual(scope(120,[]).unchecked,[[0,120]]));check(()=>assert.deepEqual(scope(120,[[0,120]]).unchecked,[]));
for(const span of [[-1,2],[2,2],[4,3],[0,121],[0,NaN]])check(()=>assert.throws(()=>scope(120,[span])));
check(()=>assert.throws(()=>scope(120,[[0,20]],'V2')));check(()=>assert.deepEqual(scope(120,[[35,50],[0,20]]),result));
console.log(JSON.stringify({fictional:true,recordingExists:false,reference:'SCOPE-R9',version:'V1',duration:120,...result,passed,limitation:'Arithmetic validates declarations only; no listening or accuracy evidence.'},null,2));
