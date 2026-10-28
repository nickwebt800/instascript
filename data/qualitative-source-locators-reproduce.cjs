'use strict';
const assert = require('node:assert/strict');
// Fictional teaching fixture only. This code does not enforce access control or detect disclosure.
const working = {caseRef:'CASE-X7', version:'V1', excerpt:'I waited at [place removed] before the appointment.', review:'pending'};
const restricted = [{caseRef:'CASE-X7', version:'V1', sourceRef:'SOURCE-R2', start:42, end:50}];
function resolve(copy, records) {
  const matches = records.filter(r => r.caseRef === copy.caseRef && r.version === copy.version);
  if (matches.length !== 1) return {status:'unresolved'};
  const r = matches[0];
  if (!Number.isFinite(r.start) || !Number.isFinite(r.end) || r.start < 0 || r.end <= r.start) return {status:'unresolved'};
  return {status:'matched', sourceRef:r.sourceRef, start:r.start, end:r.end};
}
const checks = {
  exactMatch: resolve(working, restricted).status === 'matched',
  missingMapping: resolve(working, []).status === 'unresolved',
  wrongVersion: resolve({...working, version:'V2'}, restricted).status === 'unresolved',
  duplicateMapping: resolve(working, [...restricted, {...restricted[0]}]).status === 'unresolved',
  invalidRange: resolve(working, [{...restricted[0], end:42}]).status === 'unresolved',
  copyHasNoSourceFields: !('sourceRef' in working) && !('start' in working) && !('end' in working)
};
assert(Object.values(checks).every(Boolean));
console.log(JSON.stringify({notice:'Entirely fictional; no recording or access control', working, restricted, result:resolve(working, restricted), checks}, null, 2));
