// Authored HARBOR-R22 exercise. No language classifier, recording or network.
const a=require('node:assert/strict');
const embedded='Use the side entrance.';
const cards=[
 {id:'A',version:'V1',turn:'T04',speaker:'Participant A',reported:'manager',kind:'reported speech',frame:'My manager said',embedded},
 {id:'B',version:'V1',turn:'T05',speaker:'Participant A',reported:'manager',kind:'imagined speech',frame:'I imagined my manager saying',embedded},
 {id:'C',version:'V1',turn:'T06',speaker:'Participant A',reported:'notice',kind:'reported written text',frame:'The notice read',embedded}
];
function render(card,requestedSpeaker=card.speaker){
 if(requestedSpeaker!==card.speaker)throw Error('Cannot promote a reported source into an interview turn');
 return {card:card.id,version:card.version,turn:card.turn,speaker:card.speaker,text:card.frame+', "'+card.embedded+'"',reportedSource:card.reported,relationship:card.kind};
}
let checks=0;function check(fn){fn();checks++;}
check(()=>a.equal(new Set(cards.map(x=>x.embedded)).size,1));
check(()=>a.equal(new Set(cards.map(x=>x.kind)).size,3));
for(const c of cards){
 check(()=>a.equal(render(c).speaker,'Participant A'));
 check(()=>a(render(c).text.startsWith(c.frame)));
 check(()=>a.throws(()=>render(c,c.reported),/Cannot promote/));
}
const unknown={...cards[0],id:'D',reported:null};
check(()=>a.equal(render(unknown).reportedSource,null));
check(()=>a.throws(()=>render(unknown,'Invented colleague'),/Cannot promote/));
check(()=>a.deepEqual(cards.map(c=>c.turn),['T04','T05','T06']));
const output={fixture:'HARBOR-R22',fictional:true,status:'PASS',checks,records:cards.map(c=>render(c)),limits:'Explicit authored categories; no detection, identity or historical-event verification.'};
process.stdout.write(JSON.stringify(output,null,2)+'\n');
