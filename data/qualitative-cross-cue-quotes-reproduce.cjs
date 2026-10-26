// Original fictional teaching fixture. No file reads, network or audio processing.
const assert=require('node:assert/strict');
const source={document:'FICT-T03',version:'v1',fictional:true,cues:[
 {id:'C01',start:10,end:13,text:'At first I waited. The bus'},
 {id:'C02',start:13.4,end:17,text:'arrived late, so I walked home.'},
 {id:'C03',start:18,end:21,text:'The next morning I tried again.'}
]};
const selection={document:'FICT-T03',version:'v1',passage:'Q01',join:' ',spans:[{cue:'C01',from:19,to:26},{cue:'C02',from:0,to:31}]};
function mapPassage(src,s){
 if(s.document!==src.document||s.version!==src.version)throw Error('source_version_mismatch');
 if(!s.spans.length||typeof s.join!=='string')throw Error('empty_selection');
 let previous=-1;const parts=s.spans.map(span=>{
 const i=src.cues.findIndex(c=>c.id===span.cue),c=src.cues[i];
 if(!c)throw Error('unknown_cue');
 if(previous>=0&&i!==previous+1)throw Error('nonadjacent_cues_require_separate_excerpt_review');previous=i;
 if(!Number.isInteger(span.from)||!Number.isInteger(span.to)||span.from<0||span.to<=span.from||span.to>c.text.length)throw Error('invalid_span');
 return{cue:c.id,range:[span.from,span.to],selected:c.text.slice(span.from,span.to),start:c.start,end:c.end};});
 const timingValid=parts.every(p=>Number.isFinite(p.start)&&Number.isFinite(p.end)&&p.start>=0&&p.end>p.start)&&parts.every((p,i)=>!i||p.start>=parts[i-1].end);
 return{text:parts.map(p=>p.selected).join(s.join),parts,replayEnvelope:timingValid?[parts[0].start,parts.at(-1).end]:null,interCueIntervals:timingValid?parts.slice(1).map((p,i)=>Number((p.start-parts[i].end).toFixed(6))):null,contextReview:'pending; no recording exists for this fictional fixture',wordAlignment:false};
}
const result=mapPassage(source,selection);assert.equal(result.text,'The bus arrived late, so I walked home.');assert.deepEqual(result.replayEnvelope,[10,17]);assert.deepEqual(result.interCueIntervals,[.4]);
const reject=s=>{try{mapPassage(source,s);throw Error('unexpected_acceptance');}catch(e){if(e.message==='unexpected_acceptance')throw e;return e.message;}};
const wrongVersion=reject({...selection,version:'v2'}),skippedCue=reject({...selection,spans:[selection.spans[0],{cue:'C03',from:0,to:30}]});
assert.equal(wrongVersion,'source_version_mismatch');assert.equal(skippedCue,'nonadjacent_cues_require_separate_excerpt_review');
const incomplete=structuredClone(source);incomplete.cues[1].end=null;const missingEnd=mapPassage(incomplete,selection);assert.equal(missingEnd.replayEnvelope,null);assert.equal(missingEnd.text,result.text);
assert.throws(()=>mapPassage(source,{...selection,spans:[{cue:'C01',from:-1,to:25}]}),/invalid_span/);
console.log(JSON.stringify({source,selection,result,checks:{wrongVersion,skippedCue,invalidSpan:'rejected',missingEnd:{text:missingEnd.text,replayEnvelope:missingEnd.replayEnvelope}}},null,2));
