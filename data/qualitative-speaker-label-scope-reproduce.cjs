'use strict';
const assert = require('node:assert/strict');
const key = row => JSON.stringify([row.project, row.interview, row.version, row.label]);
const cards = [
  {project:'BRIDGE-R23', interview:'IA',version:'V1',label:'Speaker 1',passage:'T01',text:'I used the side entrance.'},
  {project:'BRIDGE-R23', interview:'IB',version:'V1',label:'Speaker 1',passage:'T01',text:'I waited by the noticeboard.'},
  {project:'BRIDGE-R23', interview:'IC',version:'V1',label:'Speaker 2',passage:'T01',text:'I returned on Thursday.'},
  {project:'BRIDGE-R23', interview:'ID',version:'V1',label:'Speaker 1',passage:'T01',text:'The corridor was quiet.'}
];
const mappings = cards.slice(0,3).map((c,i)=>({project:c.project,interview:c.interview,version:c.version,label:c.label,person:['PA','PB','PA'][i],status:'decided',basis:'Author-declared fictional relationship; no identity evidence'}));
function resolve(card, rows) {
  const matches = rows.filter(row=>key(row)===key(card));
  if(matches.length!==1) return {status:'unresolved',reason:matches.length?'duplicate mapping':'missing mapping'};
  const row=matches[0];
  if(row.status!=='decided'||!row.person?.trim()||!row.basis?.trim()) return {status:'unresolved',reason:'incomplete decision'};
  return {status:'declared fixture link',person:row.person};
}
const checks=[];
function check(name,fn) {fn();checks.push({name,result:'PASS'});}
const results=cards.map(card=>({...card,link:resolve(card,mappings)}));
check('same local label, different declared people',()=>{assert.equal(cards[0].label,cards[1].label);assert.notEqual(results[0].link.person,results[1].link.person);});
check('different local labels, same declared person',()=>{assert.notEqual(cards[0].label,cards[2].label);assert.equal(results[0].link.person,results[2].link.person);});
check('two local label strings',()=>assert.equal(new Set(cards.slice(0,3).map(c=>c.label)).size,2));
check('three source tuples',()=>assert.equal(new Set(cards.slice(0,3).map(key)).size,3));
check('two declared participants',()=>assert.equal(new Set(results.slice(0,3).map(c=>c.link.person)).size,2));
check('equal group counts conceal different membership',()=>{assert.equal(cards[0].label===cards[1].label,true);assert.equal(results[0].link.person===results[1].link.person,false);});
check('missing mapping does not assign new participant',()=>assert.deepEqual(results[3].link,{status:'unresolved',reason:'missing mapping'}));
check('changed version has no implicit carryover',()=>assert.equal(resolve({...cards[0],version:'V2'},mappings).status,'unresolved'));
check('another project has no implicit match',()=>assert.equal(resolve({...cards[0],project:'OTHER'},mappings).status,'unresolved'));
check('conflicting mapping refused',()=>assert.equal(resolve(cards[0],[...mappings,{...mappings[0],person:'PB'}]).reason,'duplicate mapping'));
check('identical duplicate refused',()=>assert.equal(resolve(cards[0],[...mappings,{...mappings[0]}]).reason,'duplicate mapping'));
check('pending mapping does not resolve',()=>assert.equal(resolve(cards[0],[{...mappings[0],status:'pending'}]).reason,'incomplete decision'));
check('blank basis does not resolve',()=>assert.equal(resolve(cards[0],[{...mappings[0],basis:'  '}]).reason,'incomplete decision'));
check('blank participant does not resolve',()=>assert.equal(resolve(cards[0],[{...mappings[0],person:''}]).reason,'incomplete decision'));
check('label spelling not silently normalised',()=>assert.equal(resolve({...cards[0],label:'speaker 1'},mappings).status,'unresolved'));
check('mapping order does not change unique result',()=>assert.deepEqual(resolve(cards[0],mappings),resolve(cards[0],[...mappings].reverse())));
check('separator joining can collide; structured tuple stays distinct',()=>{const a=['A|B','C'],b=['A','B|C'];assert.equal(a.join('|'),b.join('|'));assert.notEqual(JSON.stringify(a),JSON.stringify(b));});
check('source fields and original wording preserved',()=>{assert.equal(results[0].text,'I used the side entrance.');assert.equal(results[0].label,'Speaker 1');assert.equal(results[0].passage,'T01');});
console.log(JSON.stringify({fixture:'BRIDGE-R23',notice:'All cards and relationships are fictional. PASS checks bookkeeping only, never identity, listening or permission.',cards,mappings,results,checks},null,2));
