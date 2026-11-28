import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';

const repo=resolve(process.argv[2] || '.');
const raw=await readFile(resolve(repo,'js/transcript-search.js'));
const source=raw.toString('utf8');
const asUrl=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const dependency=asUrl(await readFile(resolve(repo,'js/subtitles.js'),'utf8'));
assert.ok(source.includes('./subtitles.js?v=p0-export-20261014'));
const {findTranscriptMatches:find}=await import(asUrl(source.replace('./subtitles.js?v=p0-export-20261014',dependency)));
const cues=['The bus was','late again.','I waited forty minutes before it arrived.',"I can't use the express line. The shuttle was unrelated."].map((text,i)=>({id:'C'+(i+1),text}));
const v1={cues};const before=JSON.stringify(v1);
const joined={cues:[],text:cues.map(c=>c.text).join(' ')};
const v2=structuredClone(v1);v2.cues[1].text='delayed again.';
const observations=[];let checks=0;
function observe(version,surface,result,query,expected){
 const matches=find(result,query);assert.equal(matches.length,expected);checks++;
 for(const m of matches){assert.equal((result.cues.length?result.cues[m.cueIndex].text:result.text).slice(m.start,m.end).toLowerCase(),query.toLowerCase());checks++;}
 observations.push({version,surface,query,count:matches.length,matches,interpretation:'pending'});
 return matches;
}
observe('V1','per-cue',v1,'bus was late',0);
observe('V1','per-cue',v1,'bus',1);
const late=observe('V1','per-cue',v1,'late',2);
assert.deepEqual(late.map(m=>m.cueIndex),[1,3]);checks++;
observe('V1','joined-derived-text',joined,'bus was late',1);
observe('V1','per-cue',v1,'delay',0);
observe('V1','per-cue',v1,"can't",1);
observe('V1','per-cue',v1,'can’t',0);
observe('V1','per-cue',v1,'BUS',1);
observe('V1','per-cue',v1,'late ',1);
observe('V1','per-cue',v1,' late',0);
observe('V2','per-cue',v2,'late',1);
observe('V2','per-cue',v2,'delay',1);
observe('V1','per-cue',v1,'',0);
assert.equal(JSON.stringify(v1),before);checks++;
assert.notEqual(JSON.stringify(v2),before);checks++;
let commit='unavailable';try{commit=execFileSync('git',['rev-parse','HEAD'],{cwd:repo,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim();}catch{}
console.log(JSON.stringify({fixture:'FIND-R28',fictional:true,audioExists:false,sourceCommit:commit,searchSourceSha256:createHash('sha256').update(raw).digest('hex'),checks,cuesV1:cues,cuesV2:v2.cues,observations,scope:'Actual component search on invented input; no browser, audio, semantic retrieval or theme-absence validation'},null,2));
