// Fictional teaching fixture. Embedded browser downloads; no files read, no network.
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const files={
  "plain": "I kept the paper map. The route was [unclear]. I did not use the shortcut.\n",
  "timed": "[00:00:00.000] I kept the paper map.\n[00:00:03.600] The route was [unclear].\n[00:00:07.500] I did not use the shortcut.\n",
  "srt": "1\n00:00:00,000 --> 00:00:03,600\nI kept the paper map.\n\n2\n00:00:03,600 --> 00:00:07,500\nThe route was [unclear].\n\n3\n00:00:07,500 --> 00:00:11,000\nI did not use the shortcut.\n"
};
const fingerprint=s=>crypto.createHash('sha256').update(s,'utf8').digest('hex');
const record={reference:'EXPORT-R7',version:'V1',audioReview:'fictional text only; no recording review',unresolved:'[unclear]',files:Object.fromEntries(Object.entries(files).map(([mode,bytes])=>[mode,{mode,sha256:fingerprint(bytes)}]))};
function match(bytes,version,mode,r=record){assert.equal(version,r.version);assert(r.files[mode]);assert.equal(r.files[mode].mode,mode);assert(r.files[mode].sha256);assert.equal(fingerprint(bytes),r.files[mode].sha256);assert.equal(r.audioReview,'fictional text only; no recording review');return true;}
const checks={};for(const mode of Object.keys(files))checks[mode+'MatchesReference']=match(files[mode],'V1',mode);
function rejects(name,fn){assert.throws(fn);checks[name]=true;}
rejects('wrongVersionRejected',()=>match(files.plain,'V2','plain'));
rejects('wrongModeRejected',()=>match(files.plain,'V1','timed'));
rejects('changedWordsRejected',()=>match(files.plain.replace('not ','NO '),'V1','plain'));
const missing=structuredClone(record);delete missing.files.plain.sha256;rejects('missingFingerprintRejected',()=>match(files.plain,'V1','plain',missing));
const claim=structuredClone(record);claim.audioReview='verified against recording';rejects('unsupportedAudioClaimRejected',()=>match(files.plain,'V1','plain',claim));
const cues=[{"start":0,"end":3.6,"text":"I kept the paper map."},{"start":3.6,"end":7.5,"text":"The route was [unclear]."},{"start":7.5,"end":11,"text":"I did not use the shortcut."}];
const plain=c=>c.map(x=>x.text.trim()).join(' ')+'\n';
const time=s=>'[00:00:'+s.toFixed(3).padStart(6,'0')+'] ';
const timed=c=>c.map(x=>time(x.start)+x.text.trim()).join('\n')+'\n';
assert.equal(plain(cues),files.plain);assert.equal(timed(cues),files.timed);
const regrouped=[{start:0,end:11,text:cues.map(c=>c.text).join(' ')}],differentEnd=structuredClone(cues);differentEnd[2].end=12;
assert.equal(plain(cues),plain(regrouped));checks.differentGroupsSamePlain=true;assert.equal(timed(cues),timed(differentEnd));checks.differentEndsSameTimedText=true;
console.log(JSON.stringify({disclosure:'Invented words in prepared-sample editor. Reused times are test values, not alignment to these words. Matching bytes does not authenticate a reference or establish review.',files,record,counterexamples:{regrouped,differentEnd},checks},null,2));
