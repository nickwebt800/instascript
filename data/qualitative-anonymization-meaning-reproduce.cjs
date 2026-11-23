const a=require('node:assert/strict');
const source='At Lumen Room I could ask privately. At Bracken Hall I had to speak in front of everyone. I went back to Lumen Room.';
const render=labels=>`At ${labels[0]} I could ask privately. At ${labels[1]} I had to speak in front of everyone. I went back to ${labels[2]}.`;
const expected=['A','B','A'];
function relation(xs){if(xs.length!==3||xs.some(x=>typeof x!=='string'||!x))return false;return expected.every((_,i)=>expected.every((_,j)=>(expected[i]===expected[j])===(xs[i]===xs[j])));}
const drafts={A:['[setting]','[setting]','[setting]'],B:['[setting A]','[setting B]','[setting A]'],C:['[setting A]','[setting B]','[setting B]']};
let checks=[];function test(name,fn){fn();checks.push({name,result:'PASS'});}
test('collapsed distinction rejected',()=>a.equal(relation(drafts.A),false));
test('A B A relationship preserved',()=>a.equal(relation(drafts.B),true));
test('wrong return rejected',()=>a.equal(relation(drafts.C),false));
test('missing occurrence rejected',()=>a.equal(relation(['A','B']),false));
test('all distinct loses return',()=>a.equal(relation(['A','B','C']),false));
test('same pattern can use other tokens',()=>a.equal(relation(['X','Y','X']),true));
test('extra occurrence rejected',()=>a.equal(relation(['A','B','A','A']),false));
test('empty label rejected',()=>a.equal(relation(['','B','']),false));
const b=render(drafts.B),d=b.replace('privately','publicly');
test('wording counterexample still passes relationship check',()=>a.equal(relation(drafts.B),true));
test('separate exact text check detects changed wording',()=>a.notEqual(b,d));
test('retained draft contains no fictional source names',()=>a(!b.includes('Lumen')&&!b.includes('Bracken')));
const result={fixture:'CONTRAST-R24',fictional:true,sourceVersion:'V1',source,declaredPattern:expected,drafts:Object.entries(drafts).map(([id,labels])=>({id,labels,text:render(labels),relationshipPreserved:relation(labels),disclosureReview:'pending'})),counterexample:{text:d,relationshipPreserved:true,wordingUnchanged:false,authorDecision:'Reject altered experience; authored decision, not semantic inference by code',disclosureReview:'pending'},checks,limits:'No source file reads, network requests, place detection, semantic assessment or disclosure approval.'};
test('no disclosure approval inherited from passing relation',()=>a(result.drafts.every(x=>x.disclosureReview==='pending')));
console.log(JSON.stringify(result,null,2));
