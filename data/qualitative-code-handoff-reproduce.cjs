const assert = require('node:assert/strict');
const crypto = require('node:crypto');
// COLOR-R25 is entirely authored fiction. No recording, participant or software export.
const text = 'The bus was late. I waited outside.';
const digest = s => crypto.createHash('sha256').update(s,'utf8').digest('hex');
const anchor = {source:'COLOR-R25',version:'V1',start:0,end:17,unit:'JS UTF-16 code units',quote:'The bus was late.'};
anchor.end=anchor.quote.length;
const a={text,marks:[{...anchor,code:'C1'}],legend:{C1:'service delay'}};
const b={text,marks:[{...anchor,code:'C2'}],legend:{C2:'travel context'}};
const plain = x => x.text;
const validate = (doc,mark) => mark.source==='COLOR-R25' && mark.version==='V1' && mark.unit==='JS UTF-16 code units' && Number.isInteger(mark.start) && Number.isInteger(mark.end) && mark.start>=0 && mark.end>mark.start && mark.end<=doc.length && doc.slice(mark.start,mark.end)===mark.quote;
let checks=0; function test(label,fn){fn();checks++;return label;}
const passed=[];
passed.push(test('same plain bytes, different code assignments',()=>{assert.equal(plain(a),plain(b));assert.notDeepEqual(a.marks,b.marks)}));
passed.push(test('same fingerprint does not retain coding',()=>assert.equal(digest(plain(a)),digest(plain(b)))));
passed.push(test('unmarked third history also has same bytes',()=>assert.equal(plain({text,marks:[]}),plain(a))));
passed.push(test('different legends can interpret same code differently',()=>assert.notEqual(a.legend.C1,({C1:'travel context'}).C1)));
passed.push(test('valid authored anchor',()=>assert.equal(validate(text,anchor),true)));
passed.push(test('reject missing version',()=>assert.equal(validate(text,{...anchor,version:null}),false)));
passed.push(test('reject wrong source',()=>assert.equal(validate(text,{...anchor,source:'OTHER'}),false)));
passed.push(test('reject stale offsets after inserted prefix',()=>assert.equal(validate('Yesterday. '+text,anchor),false)));
passed.push(test('reject wrong quote',()=>assert.equal(validate(text,{...anchor,quote:'I waited outside.'}),false)));
passed.push(test('reject unsupported coordinate convention',()=>assert.equal(validate(text,{...anchor,unit:'UTF-8 bytes'}),false)));
passed.push(test('reject out-of-bounds span',()=>assert.equal(validate(text,{...anchor,end:1000}),false)));
passed.push(test('reject empty span',()=>assert.equal(validate(text,{...anchor,end:0}),false)));
passed.push(test('reject fractional offsets',()=>assert.equal(validate(text,{...anchor,start:0.5}),false)));
passed.push(test('codes are not transcript words',()=>assert.equal(text.includes(a.legend.C1),false)));
console.log(JSON.stringify({fixture:'COLOR-R25',fictional:true,recordingReviewed:false,exportScope:'Authored JS projection only; no Word, QDA or InstaScript export executed',checks,passed,plainText:text,sha256:digest(text),assignments:[a.marks,b.marks],legends:[a.legend,b.legend],limitation:'Checks test written fixture consistency, not analytical validity, audio accuracy or disclosure approval.'},null,2));
