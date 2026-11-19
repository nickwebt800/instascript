const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
let checks = 0;
function check(fn) { fn(); checks++; }
const observation = {card:'WINDOW-R21/C1', text:'I finally found the right room.', event:'[laughs]', origin:'fictional teaching card', review:'not applicable: no recording'};
const alternatives = ['relief after a difficult search', 'embarrassment about arriving late'];
const records = alternatives.map(memo => ({...observation, memo, status:'hypothetical'}));
function eventProjection(r) { return JSON.stringify({card:r.card,text:r.text,event:r.event,origin:r.origin,review:r.review}); }
check(()=>assert.equal(eventProjection(records[0]),eventProjection(records[1])));
check(()=>assert.notEqual(records[0].memo,records[1].memo));
check(()=>assert(records.every(r=>r.status==='hypothetical')));
function possibleSource(modality, claim) {
  const required = {visibleGesture:['video','field-note'],audibleEvent:['audio','video'],spokenWords:['audio','video']}[claim];
  if(!required) throw new Error('Unknown claim');
  return required.includes(modality);
}
check(()=>assert.equal(possibleSource('audio','visibleGesture'),false));
check(()=>assert.equal(possibleSource('audio','audibleEvent'),true));
check(()=>assert.equal(possibleSource('video','visibleGesture'),true));
check(()=>assert.equal(possibleSource('field-note','spokenWords'),false));
check(()=>assert.throws(()=>possibleSource('audio','happiness'),/Unknown claim/));
const unreviewed = {modality:'audio',claim:'audibleEvent',review:'pending'};
check(()=>assert(possibleSource(unreviewed.modality,unreviewed.claim)));
check(()=>assert.notEqual(unreviewed.review,'completed'));
function render(card, convention) {
  return card.text + (convention === 'include-events' ? card.events.map(e=>' '+e).join('') : '');
}
const omitted={text:observation.text,events:['[laughs]']};
const noneListed={text:observation.text,events:[]};
check(()=>assert.equal(render(omitted,'omit-events'),render(noneListed,'include-events')));
check(()=>assert.notEqual(render(omitted,'include-events'),render(noneListed,'include-events')));
const output = {fictional:true,recordingExists:false,checks,observation,alternatives:records,unreviewed,blankAnnotationCounterexample:{omittedUnderConvention:render(omitted,'omit-events'),noneListedUnderOtherConvention:render(noneListed,'include-events')},limits:'Illustrates authored information loss and policy distinctions. No audio recognition, listening, reviewer authentication or emotion validation.'};
fs.writeFileSync(path.join(__dirname,'qualitative-nonverbal-events-example.json'),JSON.stringify(output,null,2)+'\n');
console.log(JSON.stringify({checks,status:'PASS',fictional:true}));
