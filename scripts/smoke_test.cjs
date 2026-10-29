const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert');
const base=__dirname+'/../';
const storage=new Map();
const elements=new Map();
const context={console,Intl,Date,Math,Object,Array,JSON,String,Number,Set,Map,TextEncoder,URL,Blob,FormData,structuredClone,
 document:{addEventListener(){},body:{classList:{add(){},remove(){}}},querySelector(){return null},getElementById(id){if(!elements.has(id))elements.set(id,{innerHTML:'',value:'',focus(){},select(){}});return elements.get(id)}},
 window:{scrollTo(){}},localStorage:{getItem(k){return storage.get(k)||null},setItem(k,v){storage.set(k,v)}},setTimeout(){},clearTimeout(){},confirm(){return true},alert(){},navigator:{}};
context.window.window=context.window;
vm.createContext(context);
vm.runInContext(fs.readFileSync(base+'src/data.js','utf8'),context);
vm.runInContext(fs.readFileSync(base+'src/radar.js','utf8'),context);
context.window.ATLAS_WORLD=[];
context.window.ATLAS_MONITOR={};
const app=fs.readFileSync(base+'src/app.js','utf8').replace(/render\(\);\s*\}\)\(\);\s*$/,'globalThis.TEST={store,occurrences,toPanama,calendar,ics,syncRadar,showEvent};render();\n})();');
vm.runInContext(app,context);
const {store,occurrences,toPanama,calendar,ics,syncRadar}=context.TEST;
assert.equal(store.events.length,20);
assert.equal(store.events.filter(x=>x.type==='class').length,3);
assert.equal(store.events.filter(x=>x.tentative).length,10);
assert.equal(store.entries.filter(x=>x.id==='hackutd-2026')[0].stage,'applied');
assert.equal(store.entries.filter(x=>x.id==='hackcanada-2027')[0].stage,'applied');
assert.equal(store.entries.filter(x=>x.id==='radar-op-westlake-2027').length,1);
assert.equal(store.events.filter(x=>x.title.includes('TreeHacks')).length,0);
const oct=occurrences('2026-10-29','2026-10-31'),nov=occurrences('2026-11-07','2026-11-07');
const capaOct=oct.find(x=>x.id==='radar-a3'),capaNov=nov.find(x=>x.id==='radar-a3');
assert.equal(capaOct.clock,'11:30 AM–12:30 PM · Panama local');
assert.equal(capaNov.clock,'12:30 PM–1:30 PM · Panama local');
const last=occurrences('2026-12-19','2026-12-26').filter(x=>x.id==='radar-a3');
assert.equal(last.length,1);
const b1=occurrences('2026-11-06','2026-11-06').filter(x=>x.title.includes('Jiangnan') && x.type==='deadline');
assert.equal(b1.length,1,'no duplicate Jiangnan deadline');
syncRadar();syncRadar();assert.equal(store.events.length,20,'idempotent event import');
assert.equal(store.entries.filter(x=>x.id==='radar-op-aaai-27').length,1,'idempotent opportunity import');
const output=calendar();assert(output.includes('Radar Global calendar'));assert(output.includes('Classes'));assert(output.includes('Deadlines'));
// Validate browser-generated calendar export without opening a GUI.
context.document.createElement=()=>({click(){},set href(v){},set download(v){}});
context.URL.createObjectURL=blob=>{context.exportBlob=blob;return 'blob:fake'};
context.URL.revokeObjectURL=()=>{};
ics();
context.exportBlob.text().then(data=>{
 assert.equal((data.match(/BEGIN:VEVENT/g)||[]).length,21); // 20 Radar entries plus one distinct starter deadline (ASEE)
 assert(data.includes('TZID=America/New_York:20261031T123000'));
 assert(data.includes('UNTIL=20261219T235959Z'));
 assert(data.includes('TRIGGER:-P7D'));
 assert(data.includes('STATUS:TENTATIVE'));
 console.log('ICS export verified:',(data.match(/BEGIN:VEVENT/g)||[]).length,'records');
}).catch(e=>{console.error(e);process.exitCode=1});
console.log(JSON.stringify({passed:true,programs:store.entries.length,events:store.events.length,tentative:store.events.filter(e=>e.tentative).length,capaOct:capaOct.clock,capaNov:capaNov.clock,nov7:nov.map(x=>x.title),calendarMarkup:output.length},null,2));
