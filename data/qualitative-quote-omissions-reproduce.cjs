'use strict';
// Authored fictional exercise. No file, recording, network or approval system.
const assert = require('node:assert/strict');
const A = {ref:'EXCERPT-A',version:'V1',text:'I kept the paper card because the screen was hard to read, but I still used the screen at home.'};
const B = {ref:'EXCERPT-B',version:'V1',text:'I kept the [inaudible] card for later.'};
const C = {ref:'COUNTEREXAMPLE-C',version:'V1',text:'I did not prefer the screen.'};
function plan(source,left,right) {
 const end=left.length,start=source.text.indexOf(right,end);
 return {ref:source.ref,version:source.version,spans:[[0,end],[start,source.text.length]],cuts:[{start:end,end:start,text:source.text.slice(end,start)}],rendered:left+' […] '+right};
}
function check(source,p) {
 if(p.ref!==source.ref || p.version!==source.version || !Array.isArray(p.spans)||!p.spans.length||!Array.isArray(p.cuts))return false;
 let end=0;const cuts=[];
 for(const span of p.spans){if(!Array.isArray(span)||span.length!==2)return false;const [s,e]=span;if(!Number.isInteger(s)||!Number.isInteger(e)||s<end||s<0||e<=s||e>source.text.length)return false;if(s>end)cuts.push({start:end,end:s,text:source.text.slice(end,s)});end=e;}
 if(end<source.text.length)cuts.push({start:end,end:source.text.length,text:source.text.slice(end)});
 // Narrow exercise: only internal cuts; unknown markers may not be removed or split.
 if(p.spans[0][0]!==0||end!==source.text.length)return false;
 for(const m of source.text.matchAll(/\[inaudible\]/g))if(!p.spans.some(([s,e])=>s<=m.index&&e>=m.index+m[0].length))return false;
 if(JSON.stringify(cuts)!==JSON.stringify(p.cuts))return false;
 const rendered=p.spans.map(([s,e])=>source.text.slice(s,e)).join(' […] ');
 return rendered===p.rendered;
}
const a=plan(A,'I kept the paper card','but I still used the screen at home.');
const b={ref:B.ref,version:B.version,spans:[[0,B.text.length]],cuts:[],rendered:B.text};
const c=plan(C,'I did','prefer the screen.');
const clone=x=>JSON.parse(JSON.stringify(x));
const tests={};
function test(name,expected,src,record){const result=check(src,record);assert.equal(result,expected,name);tests[name]=true;}
test('A reconstructs with declared cut',true,A,a);test('B preserves unknown marker',true,B,b);
let p=clone(a);p.version='V2';test('wrong version rejected',false,A,p);
p=clone(a);p.cuts=[];test('missing cut record rejected',false,A,p);
p=clone(a);p.cuts[0].text='something else';test('altered cut text rejected',false,A,p);
p=clone(a);p.spans.reverse();test('reversed spans rejected',false,A,p);
p=clone(a);p.spans[1][0]=1;test('overlapping spans rejected',false,A,p);
p=clone(a);p.spans[1][1]++;test('out of bounds rejected',false,A,p);
p=clone(a);p.rendered=p.rendered.replace(' […] ',' ');test('silent omission rejected',false,A,p);
p=plan(B,'I kept the','card for later.');test('hidden unknown marker rejected',false,B,p);
test('meaning reversal can pass mechanical check',true,C,c);
console.log(JSON.stringify({fictional:true,sources:[A,B,C],records:[a,b,c],counterexample:{mechanical:true,editorialDecision:'reject: deleting the negation reverses meaning; this label is authored, not inferred by the checker'},checks:tests},null,2));
