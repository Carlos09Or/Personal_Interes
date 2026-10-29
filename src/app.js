(()=>{
'use strict';
const KEY='opportunity-atlas-personal-v1';
const SEED=window.ATLAS_DATA||[];
const WORLD=window.ATLAS_WORLD||[];
const KNOWN=window.ATLAS_COUNTRIES||{};
const MONITOR=window.ATLAS_MONITOR||{};
const RADAR_EVENTS=window.ATLAS_RADAR_EVENTS||[];
const RADAR_OPPORTUNITIES=window.ATLAS_RADAR_OPPORTUNITIES||[];
const CATS=['Hackathon','Conference','Scholarship','Research','Mentorship'];
const STAGES=['saved','preparing','applied','accepted','rejected'];
const STAGE_LABELS={saved:'Saved',preparing:'Preparing',applied:'Applied',accepted:'Accepted',rejected:'Rejected'};
const COLORS={Hackathon:'#8065EF',Conference:'#3478F6',Scholarship:'#F5A33E',Research:'#16AE93',Mentorship:'#E76D9F'};
const ICONS={
 globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
 explore:'<circle cx="12" cy="12" r="9"/><path d="m16.6 7.4-3 6.2-6.2 3 3-6.2z"/>',
 grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
 search:'<circle cx="10.8" cy="10.8" r="7.2"/><path d="m16.2 16.2 4.6 4.6"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18"/>',
 bookmark:'<path d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v18l-7-5-7 5z"/>',
 files:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/>',
 settings:'<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1 1.6-2 2-1.6-1-.2.1-1.3.6-.4 1.9h-3l-.4-1.9-1.5-.6-1.6 1-2-2 1-1.6-.6-1.4L4 13.4v-3l1.9-.4.6-1.5-1-1.6 2-2 1.6 1 1.5-.6.4-1.9h3l.4 1.9 1.4.6 1.6-1 2 2-1 1.6.6 1.5 1.9.4v3l-1.9.4z" transform="translate(-.4 -.3) scale(.97)"/>',
 bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 close:'<path d="M5 5 19 19M19 5 5 19"/>',
 arrow:'<path d="M5 12h14m-6-6 6 6-6 6"/>',
 arrowup:'<path d="m7 17 10-10M8 7h9v9"/>',
 chevron:'<path d="m9 6 6 6-6 6"/>',
 chevronleft:'<path d="m15 6-6 6 6 6"/>',
 pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
 filter:'<path d="M3 4h18l-7.2 8v6l-3.6 2v-8z"/>',
 layers:'<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
 check:'<path d="m5 12 5 5L20 7"/>',
 edit:'<path d="m4 20 5-.9L20 8l-4-4L5 15zM14 6l4 4"/>',
 trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/>',
 external:'<path d="M13 5h6v6M19 5l-9 9"/><path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5"/>',
 download:'<path d="M12 3v13m-5-5 5 5 5-5M4 19v2h16v-2"/>',
 upload:'<path d="M12 17V4m-5 5 5-5 5 5M4 18v3h16v-3"/>',
 globe2:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18m-9-9c-5 5-5 13 0 18m0-18c5 5 5 13 0 18"/>',
 spark:'<path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8zM19 17l.6 1.5L21 19l-1.4.5L19 21l-.5-1.5L17 19l1.5-.5z"/>',
 chart:'<path d="M4 20V4M4 20h17M8 16l4-5 4 2 4-7"/>',
 link:'<path d="M10 14a5 5 0 0 0 7.1 0l2.5-2.5a5 5 0 0 0-7.1-7.1L11 6m3 4a5 5 0 0 0-7.1 0l-2.5 2.5a5 5 0 0 0 7.1 7.1L13 18"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
 shield:'<path d="m12 2 8 4v6c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6z"/><path d="m8 12 3 3 5-6"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v1"/>',
 heart:'<path d="M20.8 9.2c0 4.5-8.8 10.7-8.8 10.7S3.2 13.7 3.2 9.2A5 5 0 0 1 12 6a5 5 0 0 1 8.8 3.2Z"/>',
 building:'<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 7h2m3 0h2M9 11h2m3 0h2M9 15h2m3 0h2M10 21v-4h4v4"/>',
 target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2m-3-7-1.5 1.5M6.5 17.5 5 19m0-14 1.5 1.5M17.5 17.5 19 19"/>'
};
const I=(name,size=18)=>`<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]||ICONS.grid}</svg>`;
const esc=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const idAttr=v=>esc(String(v??'').replace(/[^\w-]/g,''));
const today=()=>{const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'America/Panama',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).map(x=>[x.type,x.value]));return `${p.year}-${p.month}-${p.day}`};
const dateObj=s=>s?new Date(`${s}T12:00:00`):null;
const fmtDate=s=>s?dateObj(s).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):'To be announced';
const monthName=(y,m)=>new Date(y,m,1).toLocaleDateString('en-US',{month:'long',year:'numeric'});
const safeURL=u=>/^https:\/\/[a-z\d.-]+(?:\/|$)/i.test((u||'').trim()) ? u.trim() : '';
const clone=x=>JSON.parse(JSON.stringify(x));
function load(){try{const saved=JSON.parse(localStorage.getItem(KEY));if(saved&&Array.isArray(saved.entries))return saved}catch(e){}return {entries:clone(SEED),prefs:{funded:false,china:true,interests:['AI','Research','Mentorship']}}}
let store=load();
// Non-destructive, idempotent upgrade for older v1 browser backups.
function syncRadar(){
 if(!Array.isArray(store.events))store.events=[];
 const normalized=t=>String(t||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/gi,'').toLowerCase();
 for(const incoming of RADAR_EVENTS){
  const exists=store.events.find(x=>x.id===incoming.id || (normalized(x.title)===normalized(incoming.title)&&x.start===incoming.start));
  if(!exists)store.events.push(clone(incoming));
 }
 for(const incoming of RADAR_OPPORTUNITIES){
  if(!store.entries.some(x=>x.id===incoming.id||normalized(x.title)===normalized(incoming.title)))store.entries.push(clone(incoming));
 }
 // Respect edits made by the user. Correct only the legacy starter status when unchanged.
 const hack=store.entries.find(x=>x.id==='hackutd-2026');
 const oldHack=SEED.find(x=>x.id==='hackutd-2026');
 if(hack&&oldHack&&hack.stage===oldHack.stage && hack.notes===oldHack.notes){
  hack.stage='applied';hack.notes='Radar Global (Oct 29, 2026): application submitted; admission pending. Confirm travel and lodging coverage before attending.';
  hack.summary='HackUTD Zero Day on Nov 7–8, 2026. Submission recorded; admission status pending in the latest supplied Radar Global.';
 }
 const canada=store.entries.find(x=>x.id==='hackcanada-2027');
 if(canada){if(!canada.source)canada.source='https://hackcanada.org/';if(!canada.start)canada.start='2027-01-08'}
 try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){}
}
syncRadar();
let state={view:'explore',country:'CHN',q:'',category:'All categories',funding:'Any funding',format:'Any format',deadline:'Any date',zoom:1,month:Number(today().slice(5,7))-1,year:Number(today().slice(0,4)),selectedDate:'',eventTypes:['class','deadline','result','event'],listMode:'cards',sheetOpen:false,modal:null,tab:'overview',toast:null};
const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){console.warn('Local storage unavailable',e)}};
const countriesInData=()=>[...new Set(store.entries.map(e=>e.country).filter(c=>c!=='GLOBAL'))].sort((a,b)=>countryName(a).localeCompare(countryName(b)));
const countryName=a=>KNOWN[a]?.name || WORLD.find(x=>x.a===a)?.n || (a==='GLOBAL'?'Worldwide':a);
const countryFlag=a=>KNOWN[a]?.flag||'🌍';
const countStage=s=>store.entries.filter(e=>e.stage===s).length;
const getEntry=id=>store.entries.find(e=>e.id===id);
const countDays=s=>s?Math.round((dateObj(s)-dateObj(today()))/86400000):null;
const dateLabel=e=>{if(!e.deadline)return 'Deadline not confirmed';const d=countDays(e.deadline);if(d<0)return `Closed ${fmtDate(e.deadline)}`;if(d===0)return 'Deadline today';if(d<=30)return `${d} days left`;return `Due ${fmtDate(e.deadline)}`};
const formattedFunding=e=>e.funding||'Unknown';
const categoryColor=c=>COLORS[c]||'#64748b';
const uniqueCountryCount=()=>countriesInData().length;
function filtered(entries=store.entries){let a=entries.filter(e=>{
 const text=[e.title,e.org,e.country,countryName(e.country),e.city,e.category,e.summary,...(e.tags||[])].join(' ').toLowerCase();
 if(state.q.trim()&&!text.includes(state.q.toLowerCase().trim()))return false;
 if(state.category!=='All categories'&&e.category!==state.category)return false;
 if(state.funding==='Funded / stipend'&&!['Funded','Stipend'].includes(e.funding))return false;
 if(state.funding==='Partially funded'&&e.funding!=='Partially funded')return false;
 if(state.format!=='Any format'&&e.format!==state.format)return false;
 if(state.deadline==='Next 30 days'&&(!e.deadline||countDays(e.deadline)<0||countDays(e.deadline)>30))return false;
 if(state.deadline==='Upcoming dates'&&(!e.deadline||countDays(e.deadline)<0))return false;
 if(state.deadline==='Undated'&&!!e.deadline)return false;
 return true;
 });
 return a.sort((a,b)=>{
  const p={High:0,Medium:1,Low:2};
  const x=a.deadline&&countDays(a.deadline)>=0?countDays(a.deadline):9999;
  const y=b.deadline&&countDays(b.deadline)>=0?countDays(b.deadline):9999;
  const relevance=e=>(store.prefs.china&&e.country==='CHN'?3:0)+(store.prefs.funded&&['Funded','Stipend'].includes(e.funding)?3:0)+(store.prefs.interests||[]).reduce((n,t)=>n+([e.title,e.category,...(e.tags||[])].join(' ').toLowerCase().includes(t.toLowerCase())?1:0),0);
  return x-y||relevance(b)-relevance(a)||(p[a.priority]??2)-(p[b.priority]??2)||a.title.localeCompare(b.title)
 });
}
function navButton(view,label,icon){return `<button class="nav-link ${state.view===view?'active':''}" data-action="nav" data-view="${view}">${I(icon,18)}<span>${label}</span>${view==='applications'?`<span class="nav-count">${countStage('preparing')+countStage('applied')}</span>`:''}</button>`}
const pageMeta={explore:['Explore the world','Discover opportunities across the globe.'],opportunities:['All opportunities','Your curated catalog, in one focused view.'],calendar:['Radar Global calendar','Deadlines, events and the dates that matter.'],applications:['My applications','One clear place to follow your progress.'],saved:['Saved opportunities','Everything worth coming back to.'],settings:['Preferences & data','Make your atlas work the way you do.'],sources:['Tracked sources','Find the official publishers.']};
function shell(){const [title,subtitle]=pageMeta[state.view];return `<div class="app-shell">
<aside class="sidebar">
 <button class="brand" data-action="nav" data-view="explore"><span class="brand-mark">${I('globe',23)}</span><span>Opportunity<span class="brand-tight">Atlas</span><small>PERSONAL EDITION</small></span></button>
 <div class="nav-group-label">WORKSPACE</div><nav class="nav-links">${navButton('explore','Explore','explore')}${navButton('opportunities','Opportunities','grid')}${navButton('calendar','Calendar','calendar')}${navButton('applications','My applications','files')}${navButton('saved','Saved','bookmark')}</nav>
 <div class="side-separator"></div><div class="nav-group-label">YOUR ATLAS</div><nav class="nav-links">${navButton('settings','Preferences','settings')}</nav>
 <div class="sidebar-bottom"><div class="mini-globe">${I('globe',25)}</div><strong>A world of possibilities.</strong><p>Find your next experience in tech, AI and research.</p><span class="mini-globe-link">Keep exploring ${I('arrow',13)}</span></div>
 <div class="sidebar-footer"><span class="avatar">OA</span><span><b>Personal workspace</b><small>Stored on this device</small></span>${I('more',17)}</div>
</aside>
<div class="app-column"><header class="topbar"><div class="mobile-brand"><span class="brand-mark">${I('globe',20)}</span><b>Opportunity Atlas</b></div><div class="breadcrumb"><span>Workspace</span>${I('chevron',13)}<b>${state.view==='explore'?'Discover':title}</b></div><label class="global-search">${I('search',17)}<input id="global-search" type="search" aria-label="Search opportunities" placeholder="Search programs, countries, organizations..." value="${esc(state.q)}"><kbd>⌘ K</kbd></label><button class="icon-button desktop-only" title="Export application calendar" data-action="ics">${I('calendar',18)}</button><button class="btn-primary top-new" data-action="new">${I('plus',17)}<span>Add opportunity</span></button><span class="top-avatar">OA</span></header>
<main id="main-content" class="main-content">${main()}</main></div>
<nav class="mobile-tabbar">${mobileNav('explore','Explore','explore')}${mobileNav('calendar','Calendar','calendar')}${mobileNav('saved','Saved','bookmark')}${mobileNav('applications','Applications','files')}${mobileNav('settings','Settings','settings')}</nav>
</div><div id="modal-root"></div><div id="toast-root"></div><input id="json-input" type="file" accept="application/json,.json" hidden>`}
function mobileNav(view,label,icon){return `<button class="mobile-nav ${state.view===view?'active':''}" data-action="nav" data-view="${view}">${I(icon,19)}<span>${label}</span></button>`}
function header(eyebrow,title,desc,actions=''){return `<div class="page-heading"><div><div class="eyebrow">${esc(eyebrow)}</div><h1>${title}</h1><p>${esc(desc)}</p></div>${actions?`<div class="heading-actions">${actions}</div>`:''}</div>`}
function chips(){return `<div class="filters"><label class="select-wrap">${I('layers',15)}<select data-filter="category" aria-label="Filter category"><option>All categories</option>${CATS.map(c=>`<option ${state.category===c?'selected':''}>${c}</option>`).join('')}</select></label>
<label class="select-wrap"><select data-filter="funding" aria-label="Filter funding">${['Any funding','Funded / stipend','Partially funded'].map(c=>`<option ${state.funding===c?'selected':''}>${c}</option>`).join('')}</select></label>
<label class="select-wrap"><select data-filter="format" aria-label="Filter format">${['Any format','Remote','In person','Hybrid'].map(c=>`<option ${state.format===c?'selected':''}>${c}</option>`).join('')}</select></label>
<label class="select-wrap"><select data-filter="deadline" aria-label="Filter date">${['Any date','Next 30 days','Upcoming dates','Undated'].map(c=>`<option ${state.deadline===c?'selected':''}>${c}</option>`).join('')}</select></label>
<button class="filter-reset" data-action="reset-filters">Reset ${I('close',12)}</button></div>`}
const totalFor=(c,entries=filtered())=>entries.filter(e=>e.country===c).length;
const project=(lat,lon)=>({x:(lon+180)*1000/360,y:(84-lat)*490/150+5});
function mapSVG(){let groups=filtered();const markers=countriesInData().filter(c=>KNOWN[c]).map(c=>{let n=totalFor(c,groups);if(!n)return '';const p=project(KNOWN[c].lat,KNOWN[c].lon),active=state.country===c;return `<g class="map-marker ${active?'is-active':''}" data-country="${c}" role="button" tabindex="0" aria-label="${countryName(c)}: ${n} saved programs" transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})"><circle class="marker-ring" r="${active?20:15}"/><circle class="marker-core" r="${active?15:11}"/><text text-anchor="middle" dy="4" fill="white" font-size="${n>9?12:13}" font-weight="700">${n}</text></g>`}).join('');
const polys=WORLD.map(w=>`<path class="map-land ${state.country===w.a?'selected-land':''}" data-country="${esc(w.a)}" d="${w.d}"><title>${esc(w.n)}</title></path>`).join('');
const parallels=[-45,0,45].map(lat=>{let y=project(lat,0).y;return `<path class="grid-line" d="M0 ${y.toFixed(1)}H1000"/>`}).join('');
const meridians=[-120,-60,0,60,120].map(lon=>{let x=project(0,lon).x;return `<path class="grid-line" d="M${x.toFixed(1)} 0V500"/>`}).join('');
const z=state.zoom;const trans=`translate(${(500-500*z).toFixed(1)} ${(250-250*z).toFixed(1)}) scale(${z})`;
return `<svg class="world-svg" viewBox="0 0 1000 500" role="img" aria-label="Interactive world map. Select a country to view tracked opportunities"><defs><radialGradient id="ocean"><stop stop-color="#f9fcff"/><stop offset="1" stop-color="#e9f3ff"/></radialGradient></defs><rect width="1000" height="500" fill="url(#ocean)"/><g transform="${trans}">${parallels}${meridians}<g>${polys}</g><g>${markers}</g></g></svg>`}
function mapLegend(){return `<div class="map-legend">${CATS.map(c=>`<span><i style="background:${categoryColor(c)}"></i>${c==='Mentorship'?'Mentorship':c}</span>`).join('')}</div>`}
function categoryPill(cat){return `<span class="cat-pill" style="--cat:${categoryColor(cat)}">${esc(cat)}</span>`}
function statusPill(e){const content=e.verification==='Official source'?'Official source':e.verification==='Personal tracker'?'Personal note':'Date not verified';return `<span class="trust-tag ${e.verification==='Official source'?'trusted':''}" title="${e.verification==='Official source'?'Original official page checked on '+e.checked:'Check current status before applying'}">${I(e.verification==='Official source'?'shield':'info',12)} ${content}</span>`}
function tinyCard(e){return `<button class="tiny-card" data-action="details" data-id="${idAttr(e.id)}"><span class="tiny-icon" style="--cat:${categoryColor(e.category)}">${I(categoryIcon(e.category),18)}</span><span class="tiny-body"><b>${esc(e.title)}</b><small>${esc(e.org)} · ${esc(dateLabel(e))}</small><span class="tiny-meta">${categoryPill(e.category)}<span class="tiny-funding">${esc(e.funding)}</span></span></span>${I('chevron',15)}</button>`}
function categoryIcon(c){return {Hackathon:'target',Conference:'globe',Scholarship:'spark',Research:'layers',Mentorship:'heart'}[c]||'grid'}
function countryPanel(){const c=state.country;const selected=filtered().filter(e=>e.country===c);const all=store.entries.filter(e=>e.country===c);const cn=countryName(c);const valid=selected.filter(e=>e.funding==='Funded'||e.funding==='Stipend').length;const dated=selected.filter(e=>e.deadline&&countDays(e.deadline)>=0).length;
return `<section class="country-panel ${state.sheetOpen?'sheet-open':''}"><div class="sheet-handle"></div><div class="panel-top"><div class="panel-flag">${countryFlag(c)}</div><div class="panel-title"><h2>${esc(cn)}</h2><small>${selected.length} matching · ${all.length} total in your atlas</small></div><button class="icon-button close-mobile" data-action="hide-sheet" title="Close">${I('close',16)}</button></div><div class="panel-underline"></div><div class="country-stats"><div><strong>${selected.length}</strong><span>Opportunities</span></div><div><strong>${valid}</strong><span>Funded / stipend</span></div><div><strong>${dated}</strong><span>Upcoming dates</span></div><div><strong>${all.filter(e=>e.favorite).length}</strong><span>Bookmarked</span></div></div>
<div class="panel-section-title">Tracked in ${esc(cn)} <span>${selected.length}</span></div><div class="country-list">${selected.length?selected.slice(0,5).map(tinyCard).join(''):`<div class="empty-small">${I('globe',26)}<b>No matching programs</b><p>Try removing a filter or add a new opportunity for this country.</p></div>`}</div>
<div class="country-panel-bottom"><button class="btn-primary full" data-action="country-results" data-country="${idAttr(c)}">Explore ${esc(cn)} programs ${I('arrow',16)}</button><button class="btn-secondary full" data-action="new" data-country="${idAttr(c)}">${I('plus',15)} Add a program here</button></div></section>`}
function explore(){const filteredList=filtered();return `${header('WORLD EXPLORER','The world is full of <em>possibilities.</em>','Explore where your next experience in technology, AI or research could take you.',`<div class="heading-metrics"><div><b>${store.entries.length}</b><span>Tracked programs</span></div><div><b>${uniqueCountryCount()}</b><span>Countries</span></div><div><b>${countStage('applied')+countStage('accepted')}</b><span>Applications</span></div></div>`)}
${chips()}<div class="explore-layout"><section class="map-card"><div class="map-title-row"><div><span class="map-overline">YOUR PERSONAL OPPORTUNITY MAP</span><h2>Explore by country</h2></div><div class="map-top-actions"><span class="status-dot"></span>${filteredList.length} matching programs<button class="icon-button" data-action="zoom-reset" title="Reset zoom">${I('target',17)}</button></div></div>
<div class="map-area">${mapSVG()}<div class="map-zoom"><button data-action="zoom-in" aria-label="Zoom in">${I('plus',17)}</button><span>${Math.round(state.zoom*100)}%</span><button data-action="zoom-out" aria-label="Zoom out">−</button></div><div class="map-tip">${I('info',13)} Tap a country or a blue marker</div></div>${mapLegend()}<div class="map-footer"><span>${I('globe',15)} Based on your saved catalog · Not live worldwide totals</span><button data-action="view-worldwide">Explore worldwide programs ${I('arrow',14)}</button></div></section>${countryPanel()}</div><div class="under-map"><div class="under-section-title"><div><h3>On your radar</h3><p>Recent priorities and upcoming deadlines from your collection.</p></div><button class="inline-link" data-action="nav" data-view="opportunities">View catalog ${I('arrow',14)}</button></div><div class="radar-grid">${filteredList.slice(0,3).map(compactCard).join('')}</div></div>`}
function deadlineBadge(e){if(!e.deadline)return '<span class="date-unknown">Date TBD</span>';const days=countDays(e.deadline);return `<span class="date-badge ${days<0?'past':days<=14?'urgent':''}">${I('clock',13)} ${esc(dateLabel(e))}</span>`}
function compactCard(e){return `<button class="radar-card" data-action="details" data-id="${idAttr(e.id)}"><span class="radar-icon" style="--cat:${categoryColor(e.category)}">${I(categoryIcon(e.category),21)}</span><span class="radar-main"><span class="radar-org">${esc(e.org)} · ${countryFlag(e.country)} ${esc(countryName(e.country))}</span><b>${esc(e.title)}</b><span class="radar-foot">${categoryPill(e.category)}${deadlineBadge(e)}</span></span>${I('arrowup',16)}</button>`}
function opportunityCard(e){return `<article class="opportunity-card"><div class="op-card-top"><span class="op-icon" style="--cat:${categoryColor(e.category)}">${I(categoryIcon(e.category),22)}</span><button class="save-btn ${e.favorite?'is-saved':''}" aria-label="${e.favorite?'Unsave':'Save'}" data-action="favorite" data-id="${idAttr(e.id)}">${I('bookmark',18)}</button></div><div class="op-org">${esc(e.org)} · ${countryFlag(e.country)} ${esc(countryName(e.country))}</div><h3>${esc(e.title)}</h3><p>${esc(e.summary)}</p><div class="op-tag-row">${categoryPill(e.category)}<span class="neutral-pill">${esc(e.funding)}</span><span class="neutral-pill">${esc(e.format)}</span></div><div class="op-card-bottom"><div>${deadlineBadge(e)}<small>${statusPill(e)}</small></div><button class="op-action" data-action="details" data-id="${idAttr(e.id)}">View details ${I('arrow',16)}</button></div></article>`}
function opportunities(title='All opportunities',desc='All your possibilities, in one place.',only=null){let list=filtered(only||store.entries);return `${header('YOUR CATALOG',esc(title),desc,`<button class="btn-secondary" data-action="export-json">${I('download',16)} Export data</button>`)}${chips()}<div class="result-bar"><div><b>${list.length}</b> programs found <span class="muted">· Filter by category, date and funding</span></div><span class="record-label">${I('info',14)} A tracked program is not necessarily open</span></div><div class="cards-grid">${list.length?list.map(opportunityCard).join(''):`<div class="empty-content">${I('search',34)}<h3>No programs match your filters</h3><p>Adjust the search or create an opportunity manually.</p><button class="btn-primary" data-action="reset-filters">Clear filters</button></div>`}</div>`}
function saved(){return `${header('YOUR COLLECTION','Saved for later','Your bookmarked opportunities are one click away.',`<button class="btn-primary" data-action="new">${I('plus',16)} Add opportunity</button>`)}<div class="saved-intro">${I('bookmark',21)} <span><strong>${store.entries.filter(e=>e.favorite).length} bookmarked</strong><small>Your collection stays in this browser unless exported.</small></span></div><div class="cards-grid">${store.entries.filter(e=>e.favorite).length?filtered(store.entries.filter(e=>e.favorite)).map(opportunityCard).join(''):'<div class="empty-content">Bookmark a program with the ribbon icon to see it here.</div>'}</div>`}
function dateKey(y,m,d){return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`}
const eventColors={class:'#5474EA',deadline:'#F19A39',result:'#8C65E5',event:'#13A58C'};
const typeLabel={class:'Classes',deadline:'Deadlines',result:'Results',event:'Events'};
const dayCode=['SU','MO','TU','WE','TH','FR','SA'];
function plusDay(d,n){const x=new Date(d+'T12:00:00Z');x.setUTCDate(x.getUTCDate()+n);return x.toISOString().slice(0,10)}
function timezoneOffset(tz,day){
 const label=new Intl.DateTimeFormat('en-US',{timeZone:tz||'America/Panama',timeZoneName:'shortOffset'}).formatToParts(new Date(day+'T12:00:00Z')).find(p=>p.type==='timeZoneName')?.value||'GMT-5';
 const m=label.match(/GMT([+-])(\d{1,2})(?::(\d{2}))?/);
 return m?(m[1]==='-'?-1:1)*(Number(m[2])*60+Number(m[3]||0)):-300;
}
function toPanama(day,time,tz){
 if(!time)return {date:day,time:''};
 const [h,m]=time.split(':').map(Number);
 const epoch=Date.parse(day+'T00:00:00Z')+((h*60+m)+(-300-timezoneOffset(tz,day)))*60000;
 const d=new Date(epoch);return {date:d.toISOString().slice(0,10),time:d.toISOString().slice(11,16)};
}
function fmtClock(time){if(!time)return 'All day';const [h,m]=time.split(':').map(Number);return `${h%12||12}:${String(m).padStart(2,'0')} ${h<12?'AM':'PM'}`}
function occurrenceTime(e,day){
 if(!e.startTime)return 'All day';
 const start=toPanama(day,e.startTime,e.timezone),end=toPanama(day,e.endTime,e.timezone);
 return `${fmtClock(start.time)}–${fmtClock(end.time)}${e.timezone==='America/New_York'?' · Panama local':''}`;
}
// Render recurring events within the visible interval; never create future infinite instances in storage.
function occurrences(from,to){const found=[];const raw=Array.isArray(store.events)?store.events:[];
 for(const e of raw){
  if(e.weekdays?.length){
   let d=from;
   while(d<=to){
    if(d>=e.start&&(!e.until||d<=e.until)&&e.weekdays.includes(dayCode[new Date(d+'T12:00:00Z').getUTCDay()])){
     const pan=toPanama(d,e.startTime,e.timezone);
     if(pan.date>=from&&pan.date<=to)found.push({...e,date:pan.date,sourceDate:d,instanceId:e.id+'-'+d,clock:occurrenceTime(e,d)});
    }
    d=plusDay(d,1);
   }
  }else{
   let d=e.start;
   if(d>=from&&d<=to)found.push({...e,date:d,sourceDate:d,instanceId:e.id+'-'+d,clock:'All day'});
   // Include multi-day events on every displayed calendar date.
   if(e.end>e.start){let x=plusDay(e.start,1);while(x<=e.end&&x<=to){if(x>=from)found.push({...e,date:x,sourceDate:e.start,instanceId:e.id+'-'+x,clock:'All day'});x=plusDay(x,1)}}
  }
 }
 // Normal program deadlines remain visible unless covered by Radar Global's dated deadline.
 for(const e of store.entries.filter(x=>x.deadline&&x.deadline>=from&&x.deadline<=to)){
  if(raw.some(r=>r.type==='deadline'&&r.start===e.deadline&&r.opportunityId===e.id))continue;
  found.push({id:'program-'+e.id,title:'DEADLINE — '+e.title,type:'deadline',date:e.deadline,sourceDate:e.deadline,instanceId:'program-'+e.id,clock:'All day',status:e.stage,notes:e.notes||'',url:e.source||'',opportunityId:e.id,verification:e.verification,sourceProgram:true,reminders:[10080,1440]});
 }
 return found.sort((a,b)=>a.date.localeCompare(b.date)||(a.startTime||'').localeCompare(b.startTime||'')||a.title.localeCompare(b.title));
}
function eventMini(ev){return `<span class="cal-event event-${ev.type} ${ev.tentative?'cal-tentative':''}" style="--cat:${eventColors[ev.type]||'#64748b'}">${ev.type==='class'?'◷ ':ev.tentative?'◌ ':''}${esc(ev.title)}</span>`}
function eventRow(ev){return `<button class="deadline-row radar-row" data-action="event-detail" data-id="${idAttr(ev.id)}" data-date="${esc(ev.sourceDate)}"><span class="deadline-marker" style="background:${eventColors[ev.type]||'#64748b'}"></span><span><b>${esc(ev.title)}</b><small>${esc(fmtDate(ev.date))} · ${esc(ev.clock)}${ev.tentative?' · Tentative':''}</small></span>${I('chevron',15)}</button>`}
function calendar(){
 const {year,month}=state;const first=new Date(year,month,1);const offset=(first.getDay()+6)%7;
 const gridDate=new Date(year,month,1-offset);const gridStart=dateKey(gridDate.getFullYear(),gridDate.getMonth(),gridDate.getDate()),gridEnd=plusDay(gridStart,41);
 const events=occurrences(gridStart,gridEnd).filter(e=>state.eventTypes.includes(e.type));
 const grouped=events.reduce((a,e)=>{(a[e.date]??=[]).push(e);return a},{});
 const cells=[];
 for(let i=0;i<42;i++){
  const dt=new Date(year,month,1+i-offset),key=dateKey(dt.getFullYear(),dt.getMonth(),dt.getDate()),daily=grouped[key]||[];
  cells.push(`<button class="calendar-cell ${dt.getMonth()!==month?'other-month':''} ${key===today()?'is-today':''} ${key===state.selectedDate?'is-selected':''}" data-action="select-day" data-date="${key}"><span class="cell-day">${dt.getDate()}</span><span class="cell-events">${daily.slice(0,2).map(eventMini).join('')}${daily.length>2?`<small>+${daily.length-2}</small>`:''}</span></button>`);
 }
 const next=occurrences(today(),plusDay(today(),90)).filter(e=>state.eventTypes.includes(e.type)&&(!e.end||e.date===e.start||e.weekdays?.length)).slice(0,12);
 const focus=state.selectedDate?(grouped[state.selectedDate]||[]):next;
 const unknown=store.entries.filter(e=>!e.deadline).length;
 return `${header('YOUR PERSONAL RADAR','Radar Global calendar','Live classes, upcoming deadlines, decisions and tentative international plans.',`<button class="btn-secondary" data-action="ics">${I('download',16)} Export with reminders .ics</button>`)}
 <div class="radar-overview"><span>${I('calendar',17)} <b>${store.events.length}</b> imported calendar entries</span><span>${I('clock',17)} Panama time (UTC−5)</span><span>${I('shield',17)} Unconfirmed items marked tentative</span></div>
 <div class="calendar-type-filters">${Object.keys(typeLabel).map(t=>`<button class="type-toggle ${state.eventTypes.includes(t)?'on':''}" data-action="toggle-event-type" data-type="${t}"><i style="background:${eventColors[t]}"></i>${typeLabel[t]}</button>`).join('')}</div>
 <div class="calendar-layout"><section class="calendar-board"><div class="calendar-header"><div><h2>${monthName(year,month)}</h2><p>Click a day to inspect events, notes and official links.</p></div><div class="calendar-controls"><button data-action="month-prev" aria-label="Previous month">${I('chevronleft',17)}</button><button data-action="today">Today</button><button data-action="month-next" aria-label="Next month">${I('chevron',17)}</button></div></div><div class="calendar-weekdays">${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(x=>`<span>${x}</span>`).join('')}</div><div class="calendar-grid">${cells.join('')}</div><div class="calendar-legend">${Object.keys(typeLabel).map(t=>`<span><i style="background:${eventColors[t]}"></i>${typeLabel[t]}</span>`).join('')}</div></section>
 <aside class="calendar-side"><div class="aside-title"><h3>${state.selectedDate?fmtDate(state.selectedDate):'Next on your radar'}</h3><span>${focus.length}</span></div>
 ${focus.length?focus.slice(0,12).map(eventRow).join(''):'<p class="aside-empty">No events on this day. Select another day or change the filters.</p>'}
 <div class="calendar-note">${I('info',17)}<span>Reminders are embedded in the .ics export; browser notifications are not active. ${unknown} tracked programs have no confirmed application deadline.</span></div>
 <button class="btn-secondary full" data-action="show-undated">Browse undated watchlist ${I('arrow',14)}</button></aside></div>`;
}
function applications(){let stages=STAGES.map(s=>`<section class="kanban-column"><div class="column-head stage-${s}"><span class="column-dot"></span><h3>${STAGE_LABELS[s]}</h3><span class="column-count">${countStage(s)}</span></div><div class="column-cards" data-dropstage="${s}">${store.entries.filter(e=>e.stage===s).map(e=>`<article class="kanban-card" draggable="true" data-dragid="${idAttr(e.id)}"><div class="kanban-top"><span class="kanban-category" style="color:${categoryColor(e.category)}">${I(categoryIcon(e.category),17)} ${esc(e.category)}</span><button class="kanban-more" title="Details" data-action="details" data-id="${idAttr(e.id)}">${I('more',16)}</button></div><button class="kanban-title" data-action="details" data-id="${idAttr(e.id)}">${esc(e.title)}</button><p>${esc(e.org)}</p><div class="kanban-footer"><span>${countryFlag(e.country)} ${esc(countryName(e.country))}</span>${e.deadline?`<small>${fmtDate(e.deadline)}</small>`:'<small>Undated</small>'}</div><label class="kanban-select"><select aria-label="Change application stage" data-stage="${idAttr(e.id)}">${STAGES.map(t=>`<option value="${t}" ${t===e.stage?'selected':''}>${STAGE_LABELS[t]}</option>`).join('')}</select></label></article>`).join('')}<button class="kanban-add" data-action="new" data-stage="${s}">${I('plus',14)} Add opportunity</button></div></section>`).join('');return `${header('YOUR JOURNEY','My applications','Track every step, from the first bookmark to the final decision.',`<button class="btn-primary" data-action="new">${I('plus',17)} Add opportunity</button>`)}<div class="application-summary">${STAGES.map(s=>`<div><span class="summary-dot stage-${s}"></span><b>${countStage(s)}</b><span>${STAGE_LABELS[s]}</span></div>`).join('')}</div><div class="kanban-board">${stages}</div><p class="foot-note">${I('info',15)} Drag cards between columns on desktop, or use the stage selector on any device.</p>`}
function settings(){return `${header('PERSONAL SPACE','Preferences & data','Manage your interests, sources and your own opportunity database.')}
<div class="settings-grid"><section class="settings-card"><div class="settings-card-heading">${I('target',19)}<div><h2>Your focus</h2><p>These are local preferences, not an external user profile.</p></div></div><form id="preferences-form"><label class="setting-line"><span><b>Prioritize China programs</b><small>Show China-focused entries in your radar</small></span><input type="checkbox" name="china" ${store.prefs.china?'checked':''}></label><label class="setting-line"><span><b>Prefer fully funded opportunities</b><small>Remember your funding preference</small></span><input type="checkbox" name="funded" ${store.prefs.funded?'checked':''}></label><label class="form-field">Areas of interest<input name="interests" type="text" value="${esc((store.prefs.interests||[]).join(', '))}" placeholder="AI, Research, Mentorship"></label><button class="btn-primary" type="submit">Save preferences ${I('check',16)}</button></form></section>
<section class="settings-card"><div class="settings-card-heading">${I('shield',19)}<div><h2>Source transparency</h2><p>Know which programs have verified original links.</p></div></div><div class="verification-stats"><div><b>${store.entries.filter(e=>e.verification==='Official source').length}</b><span>Official sources checked</span></div><div><b>${store.entries.filter(e=>e.verification==='Personal tracker').length}</b><span>Personal tracking notes</span></div><div><b>${store.entries.filter(e=>e.verification==='Watchlist').length}</b><span>Needs verification</span></div></div><div class="monitor-strip">${I('clock',17)}<span><b>${MONITOR.generated_at?'Latest automated source check: '+fmtDate(MONITOR.generated_at.slice(0,10)):'Automated checks not connected'}</b><small>${MONITOR.generated_at?MONITOR.checked+' checked · '+MONITOR.changed+' changed · '+MONITOR.failed+' unavailable':'Scheduled checks can run after you set up the included GitHub Actions workflow in a new repository.'}</small></span></div><p class="settings-note">${MONITOR.generated_at?'Source changes require manual review before updating any opportunity.':'This initial offline copy cannot check websites in the background.'} Catalog entries are editable and portable. Always check the original publisher before applying.</p><button class="btn-secondary" data-action="show-sources">See tracked sources ${I('arrow',15)}</button></section>
<section class="settings-card"><div class="settings-card-heading">${I('download',19)}<div><h2>Backup & portability</h2><p>Keep your personal records in your control.</p></div></div><div class="data-actions"><button class="btn-secondary" data-action="export-json">${I('download',17)} Export JSON backup</button><button class="btn-secondary" data-action="import-json">${I('upload',17)} Import JSON backup</button><button class="btn-secondary" data-action="ics">${I('calendar',17)} Export Radar calendar + reminders .ics</button></div><p class="settings-note">Data is saved via localStorage in this browser, not synchronized between devices. Export regularly to keep a backup.</p></section>
<section class="settings-card"><div class="settings-card-heading">${I('info',19)}<div><h2>About this build</h2><p>Opportunity Atlas — Personal Edition v1.1</p></div></div><div class="about-row"><b>Design</b><span>Signal · Light / Indigo</span></div><div class="about-row"><b>Map</b><span>Interactive world country outlines</span></div><div class="about-row"><b>Storage</b><span>Browser only · No accounts</span></div><div class="about-row"><b>Update model</b><span>Curated / manually imported</span></div><button class="danger-button" data-action="reset-data">${I('trash',15)} Reset all local data</button></section></div>`}
function sources(){return `${header('RESEARCH SOURCES','Tracked official sources','Open publishers’ websites to confirm upcoming editions and details.',`<button class="btn-secondary" data-action="nav" data-view="settings">${I('chevronleft',15)} Settings</button>`)}<div class="source-list">${store.entries.filter(e=>safeURL(e.source)).map(e=>`<div class="source-row"><span class="source-icon" style="--cat:${categoryColor(e.category)}">${I('link',18)}</span><span><b>${esc(e.org)}</b><small>${esc(e.title)}</small></span><span class="source-verified ${e.verification==='Official source'?'yes':''}">${esc(e.verification)}</span><a class="btn-secondary" href="${esc(safeURL(e.source))}" target="_blank" rel="noopener noreferrer">Official page ${I('arrowup',13)}</a></div>`).join('')}</div>`}
function main(){switch(state.view){case'explore':return explore();case'opportunities':return state.listCountry?opportunities(`${countryName(state.listCountry)} programs`,`Opportunities tracked for ${countryName(state.listCountry)}.`,store.entries.filter(e=>e.country===state.listCountry)):opportunities();case'calendar':return calendar();case'applications':return applications();case'saved':return saved();case'settings':return settings();case'sources':return sources();default:return explore()}}
function render(){document.getElementById('app').innerHTML=shell();updateModal();}
function renderMain(){const el=document.getElementById('main-content');if(el)el.innerHTML=mainContentOverride||main();mainContentOverride=null;}
let mainContentOverride=null;
function switchView(v){state.listCountry=null;state.view=v;state.sheetOpen=false;state.selectedDate='';state.category='All categories';state.funding='Any funding';state.format='Any format';state.deadline='Any date';state.q='';state.listCountry=null;render();document.querySelector('.app-column')?.scrollTo(0,0);window.scrollTo({top:0,behavior:'instant'})}
function toast(msg){let r=document.getElementById('toast-root');if(!r)return;r.innerHTML=`<div class="toast">${I('check',16)} ${esc(msg)}</div>`;clearTimeout(toast.t);toast.t=setTimeout(()=>{if(r)r.innerHTML=''},3400)}
function download(name,content,type){const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)}
function exportJSON(){download('opportunity-atlas-backup.json',JSON.stringify({version:1,exportedAt:new Date().toISOString(),entries:store.entries,events:store.events,prefs:store.prefs},null,2),'application/json')}
function ics(){
 const clean=s=>String(s||'').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\r?\n/g,'\\n');
 const day=s=>s.replace(/-/g,'');
 const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
 const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Opportunity Atlas//Radar Global 2026//EN','CALSCALE:GREGORIAN','METHOD:PUBLISH','X-WR-CALNAME:Opportunity Atlas — Personal Radar',
 'BEGIN:VTIMEZONE','TZID:America/Panama','BEGIN:STANDARD','DTSTART:19700101T000000','TZOFFSETFROM:-0500','TZOFFSETTO:-0500','TZNAME:EST','END:STANDARD','END:VTIMEZONE',
 'BEGIN:VTIMEZONE','TZID:America/New_York','BEGIN:DAYLIGHT','DTSTART:19700308T020000','TZOFFSETFROM:-0500','TZOFFSETTO:-0400','TZNAME:EDT','RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU','END:DAYLIGHT','BEGIN:STANDARD','DTSTART:19701101T020000','TZOFFSETFROM:-0400','TZOFFSETTO:-0500','TZNAME:EST','RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU','END:STANDARD','END:VTIMEZONE'];
 let count=0;
 function add(e){
  const calendarEvent=['BEGIN:VEVENT',`UID:${clean(e.id)}@opportunity-atlas.local`,`DTSTAMP:${stamp}`,`SUMMARY:${clean(e.title+(e.tentative?' (tentative)':''))}`];
  const start=e.start,end=e.end||start;
  if(e.startTime){
   const tz=e.timezone||'America/Panama';
   calendarEvent.push(`DTSTART;TZID=${tz}:${day(start)}T${e.startTime.replace(':','')}00`);
   calendarEvent.push(`DTEND;TZID=${tz}:${day(start)}T${e.endTime.replace(':','')}00`);
   if(e.weekdays?.length){let rule=`RRULE:FREQ=WEEKLY;BYDAY=${e.weekdays.join(',')}`;
    if(e.until)rule+=`;UNTIL=${day(e.until)}T235959Z`;calendarEvent.push(rule)}
  }else{calendarEvent.push(`DTSTART;VALUE=DATE:${day(start)}`,`DTEND;VALUE=DATE:${day(plusDay(end,1))}`)}
  if(e.tentative)calendarEvent.push('STATUS:TENTATIVE');
  else calendarEvent.push('STATUS:CONFIRMED');
  if(e.url)calendarEvent.push(`URL:${e.url}`);
  if(e.location)calendarEvent.push(`LOCATION:${clean(e.location)}`);
  calendarEvent.push(`DESCRIPTION:${clean([e.status?'Status: '+e.status:'',e.notes||'',e.url||'',e.origin||''].filter(Boolean).join('\n'))}`);
  for(const offset of e.reminders||[]){
   const trigger=offset===15?'-PT15M':`-P${Math.round(offset/1440)}D`;
   calendarEvent.push('BEGIN:VALARM','ACTION:DISPLAY',`TRIGGER:${trigger}`,`DESCRIPTION:${clean(e.title)}`,'END:VALARM');
  }
  calendarEvent.push('END:VEVENT');lines.push(...calendarEvent);count++;
 }
 for(const e of store.events)add(e);
 // Include other deadlines in the catalog, except those represented by a Radar Global event.
 for(const e of store.entries.filter(x=>x.deadline)){
  if(store.events.some(x=>x.type==='deadline'&&x.start===e.deadline&&x.opportunityId===e.id))continue;
  add({id:'program-'+e.id,title:'DEADLINE — '+e.title,start:e.deadline,end:e.deadline,notes:e.notes||'',url:e.source||'',origin:e.verification,reminders:[10080,1440]});
 }
 lines.push('END:VCALENDAR');
 // Fold long Unicode lines at 75 UTF-8 octets to avoid splitting a code point mid-byte.
 const folded=[];for(const line of lines){let acc='',bytes=0;for(const ch of line){const n=new TextEncoder().encode(ch).length;if(bytes+n>74){folded.push(acc);acc=' '+ch;bytes=1+n}else{acc+=ch;bytes+=n}}folded.push(acc)}
 download('opportunity-atlas-personal-radar.ics',folded.join('\r\n')+'\r\n','text/calendar;charset=utf-8');toast(`Exported ${count} calendar entries with reminders`);
}
function showEvent(id,when=''){
 const e=store.events.find(x=>x.id===id)||store.entries.find(x=>'program-'+x.id===id);
 if(!e)return;
 const programEvent=!e.type;
 const isClass=e.type==='class';
 state.modal={type:'radar',id,when};
 const dates=programEvent?`Deadline: ${fmtDate(e.deadline)}`:e.start===e.end?fmtDate(e.start):`${fmtDate(e.start)} – ${fmtDate(e.end)}`;
 const clock=isClass?`${fmtClock(e.startTime)}–${fmtClock(e.endTime)} · ${esc(e.timezone)}${e.timezone==='America/New_York'?' (automatically converted to Panama time)':''}`:'All day';
 const whenLabel=isClass&&when?`<div class="event-timezone">Next selected occurrence in Panama: <b>${esc(fmtDate(toPanama(when,e.startTime,e.timezone).date))} · ${esc(occurrenceTime(e,when))}</b></div>`:'';
 modalShell(`<div class="modal-header"><div><div class="modal-overline">PERSONAL RADAR · ${(e.type||'deadline').toUpperCase()}</div><h2 class="form-heading">${esc(e.title)}</h2></div><button class="icon-button" data-action="close-modal" aria-label="Close">${I('close',18)}</button></div>
 <div class="radar-detail"><div class="radar-detail-pills"><span class="radar-pill" style="--cat:${eventColors[e.type]||eventColors.deadline}">${esc(typeLabel[e.type]||'Deadline')}</span>${e.tentative?'<span class="radar-tentative">Tentative · conditional</span>':''}</div>
 <div class="radar-detail-grid"><div><small>DATE</small><strong>${esc(dates)}</strong></div><div><small>TIME</small><strong>${clock}</strong></div><div><small>STATUS</small><strong>${esc(e.status||e.stage||'Tracked')}</strong></div><div><small>REMINDERS</small><strong>${isClass?'15 min before':e.type==='deadline'||programEvent?'7 days + 1 day before':'1 day before'}</strong></div></div>
 ${whenLabel}${e.notes?`<h3>Notes</h3><p class="radar-notes">${esc(e.notes)}</p>`:''}
 ${e.url&&safeURL(e.url)?`<a href="${esc(safeURL(e.url))}" class="btn-primary" target="_blank" rel="noopener noreferrer">${isClass?'Join / open meeting':'Open linked source'} ${I('arrowup',15)}</a>`:''}
 ${!programEvent&&e.opportunityId&&getEntry(e.opportunityId)?`<button class="btn-secondary" data-action="event-opportunity" data-id="${idAttr(e.opportunityId)}">View related opportunity ${I('arrow',14)}</button>`:''}
 ${isClass&&e.id!=='radar-a3'?`<form id="series-end-form" data-id="${idAttr(e.id)}" class="radar-end-form"><label class="form-field">Course end date (optional)<input type="date" name="until" min="${e.start}" value="${esc(e.until||'')}"></label><button class="btn-secondary" type="submit">Save series end</button><small>Leave blank if the end date is still unknown.</small></form>`:''}
 ${!programEvent&&RADAR_EVENTS.find(r=>r.id===e.id)?.tentative?`<button class="radar-confirm" data-action="event-confirm" data-id="${idAttr(e.id)}">${e.tentative?'Mark attendance / plan confirmed':'Mark tentative again'}</button>`:''}
 </div>`,true);
}
function modalShell(content,wide=false){document.getElementById('modal-root').innerHTML=`<div class="modal-backdrop" data-action="close-modal"><section class="modal-dialog ${wide?'wide':''}" role="dialog" aria-modal="true" aria-label="Opportunity details" tabindex="-1">${content}</section></div>`;document.querySelector('.modal-dialog')?.focus();document.body.classList.add('modal-open')}
function updateModal(){if(!state.modal)return; if(state.modal.type==='detail')showDetail(state.modal.id);if(state.modal.type==='radar')showEvent(state.modal.id,state.modal.when);if(state.modal.type==='edit'||state.modal.type==='new')showForm(state.modal.type==='edit'?getEntry(state.modal.id):null)}
function hideModal(){state.modal=null;document.getElementById('modal-root').innerHTML='';document.body.classList.remove('modal-open')}
function detailTabContent(e){if(state.tab==='eligibility')return `<h3>Who can apply?</h3><p>${esc(e.eligibility||'Check the official call for current eligibility conditions.')}</p><div class="detail-hint">${I('shield',17)} Always verify program eligibility, nationality rules and student status on the official site.</div>`;
if(state.tab==='notes')return `<h3>Your notes</h3><p class="notes-box">${esc(e.notes||'No notes yet. Select Edit to add a note.')}</p><p class="detail-hint">To change these notes, use the edit button at the top of this panel.</p>`;
return `<h3>About the opportunity</h3><p>${esc(e.summary||'No description added yet.')}</p><div class="detail-data-grid"><div>${I('pin',16)}<span><small>Country / location</small><b>${countryFlag(e.country)} ${esc(countryName(e.country))}${e.city?` · ${esc(e.city)}`:''}</b></span></div><div>${I('calendar',16)}<span><small>Application deadline</small><b>${esc(fmtDate(e.deadline))}</b></span></div><div>${I('spark',16)}<span><small>Funding</small><b>${esc(e.funding)}</b></span></div><div>${I('globe',16)}<span><small>Format</small><b>${esc(e.format)}</b></span></div></div>`}
function showDetail(id){let e=getEntry(id);if(!e){hideModal();return}state.modal={type:'detail',id};modalShell(`<div class="modal-header"><div class="modal-overline">${countryFlag(e.country)} ${esc(countryName(e.country))} / ${esc(e.category)}</div><button class="icon-button" data-action="close-modal" aria-label="Close">${I('close',18)}</button></div><div class="detail-head"><span class="detail-icon" style="--cat:${categoryColor(e.category)}">${I(categoryIcon(e.category),28)}</span><div><span class="detail-org">${esc(e.org)}</span><h2>${esc(e.title)}</h2><div class="detail-pills">${categoryPill(e.category)}<span class="neutral-pill">${esc(e.funding)}</span>${statusPill(e)}</div></div></div><div class="detail-actions"><button class="btn-secondary" data-action="favorite" data-id="${idAttr(id)}">${I('bookmark',16)} ${e.favorite?'Bookmarked':'Bookmark'}</button><button class="btn-secondary" data-action="edit" data-id="${idAttr(id)}">${I('edit',16)} Edit</button>${safeURL(e.source)?`<a class="btn-primary" href="${esc(safeURL(e.source))}" target="_blank" rel="noopener noreferrer">Official source ${I('arrowup',16)}</a>`:''}</div><div class="detail-tabs">${[['overview','Overview'],['eligibility','Eligibility'],['notes','My notes']].map(([key,label])=>`<button data-action="detail-tab" data-tab="${key}" class="${state.tab===key?'active':''}">${label}</button>`).join('')}</div><div class="detail-body">${detailTabContent(e)}<div class="detail-stage"><div><b>Application stage</b><p>Move this program through your pipeline.</p></div><select data-stage="${idAttr(id)}" aria-label="Application stage">${STAGES.map(s=>`<option ${e.stage===s?'selected':''} value="${s}">${STAGE_LABELS[s]}</option>`).join('')}</select></div><div class="provenance"><div>${I('info',17)}<b>Information provenance</b></div><p>${e.verification==='Official source'?`Original publisher checked ${esc(fmtDate(e.checked))}. This does not guarantee current availability.`:e.verification==='Personal tracker'?'Imported from personal planning notes. Dates and statuses must be confirmed before making travel or application decisions.':'Watchlist item. Next dates and availability have not been officially checked.'}</p></div></div>`,true)}
function optionList(list,current){return list.map(x=>`<option ${x===current?'selected':''} value="${esc(x)}">${esc(x)}</option>`).join('')}
function showForm(e=null){state.modal={type:e?'edit':'new',id:e?.id||null};let countryDefault=e?.country||state.formCountry||'CHN';let stageDefault=e?.stage||state.formStage||'saved';let allCountries=[{a:'GLOBAL',n:'Worldwide'},...WORLD.map(w=>({a:w.a,n:w.n})).filter(x=>x.a)].sort((a,b)=>a.n.localeCompare(b.n));const opts=allCountries.map(c=>`<option value="${esc(c.a)}" ${countryDefault===c.a?'selected':''}>${esc(KNOWN[c.a]?.name||c.n)}</option>`).join('');
modalShell(`<div class="modal-header"><div><div class="modal-overline">PERSONAL CATALOG</div><h2 class="form-heading">${e?'Edit opportunity':'Add an opportunity'}</h2></div><button class="icon-button" data-action="close-modal" aria-label="Close">${I('close',18)}</button></div><p class="form-intro">${e?'Update details and your personal tracking information.':'Save a program you discovered, along with its original source and deadline.'}</p><form id="entry-form" class="entry-form"><label class="form-field wide-field">Program name *<input name="title" required maxlength="160" value="${esc(e?.title||'')}" placeholder="e.g. Research Internship 2027"></label><label class="form-field">Organization *<input name="org" required maxlength="100" value="${esc(e?.org||'')}" placeholder="Institution or organizer"></label><label class="form-field">Country / location<select name="country">${opts}</select></label><label class="form-field">Category<select name="category">${optionList(CATS,e?.category||'Hackathon')}</select></label><label class="form-field">Funding<select name="funding">${optionList(['Unknown','Funded','Stipend','Partially funded','Travel support varies','Not confirmed'],e?.funding||'Unknown')}</select></label><label class="form-field">Format<select name="format">${optionList(['Remote','In person','Hybrid'],e?.format||'In person')}</select></label><label class="form-field">Application deadline<input name="deadline" type="date" value="${esc(e?.deadline||'')}"></label><label class="form-field">Application stage<select name="stage">${optionList(STAGES,stageDefault)}</select></label><label class="form-field">Priority<select name="priority">${optionList(['High','Medium','Low'],e?.priority||'Medium')}</select></label><label class="form-field wide-field">Official URL<input name="source" type="url" value="${esc(e?.source||'')}" placeholder="https://..."></label><label class="form-field wide-field">Description<textarea rows="3" name="summary" placeholder="What makes this relevant?">${esc(e?.summary||'')}</textarea></label><label class="form-field wide-field">Eligibility<textarea rows="2" name="eligibility" placeholder="Important requirements and restrictions">${esc(e?.eligibility||'')}</textarea></label><label class="form-field wide-field">Your private notes<textarea rows="2" name="notes" placeholder="Next actions, email, reminders...">${esc(e?.notes||'')}</textarea></label><div class="form-actions wide-field">${e?.id?.startsWith('custom-')?`<button type="button" class="danger-button" data-action="delete-entry" data-id="${idAttr(e.id)}">${I('trash',16)} Delete</button>`:''}<button type="button" class="btn-secondary" data-action="close-modal">Cancel</button><button class="btn-primary" type="submit">${I('check',16)} ${e?'Save changes':'Add opportunity'}</button></div></form>`,true)}
function validateEntry(obj){return typeof obj==='object'&&obj!==null&&typeof obj.id==='string'&&typeof obj.title==='string'&&typeof obj.org==='string'&&CATS.includes(obj.category)&&STAGES.includes(obj.stage)}
async function importJSON(file){try{if(file.size>10_000_000)throw Error('File exceeds 10 MB');const data=JSON.parse(await file.text());if(!Array.isArray(data.entries))throw Error('Expected a backup containing an entries array');if(!data.entries.every(validateEntry))throw Error('Some records are invalid');if(!confirm(`Import ${data.entries.length} records? This will replace the current local catalog. Export a backup first if needed.`))return;store.entries=data.entries.map(x=>({...x,favorite:!!x.favorite,verification:x.verification||'Personal tracker'}));if(data.prefs)store.prefs=data.prefs;if(Array.isArray(data.events)&&data.events.every(e=>e&&typeof e.id==='string'&&typeof e.title==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(e.start)))store.events=data.events;else store.events=[];syncRadar();persist();switchView('explore');toast('Backup imported successfully')}catch(err){alert('Import failed: '+err.message)}}
function saveForm(form){const fd=new FormData(form),e=state.modal?.type==='edit'?getEntry(state.modal.id):null;const source=String(fd.get('source')||'').trim();if(source&&!safeURL(source)){alert('Use a valid HTTPS URL for the official source.');return}const title=String(fd.get('title')||'').trim(),org=String(fd.get('org')||'').trim();if(!title||!org){alert('Program name and organization are required.');return}
let entry={id:e?.id||'custom-'+Date.now().toString(36),title,org,country:String(fd.get('country')||'GLOBAL'),city:e?.city||'',category:String(fd.get('category')),funding:String(fd.get('funding')),format:String(fd.get('format')),deadline:String(fd.get('deadline')||''),start:e?.start||'',source,verification:e?.verification||'Personal tracker',checked:e?.checked||'',stage:String(fd.get('stage')),favorite:e?.favorite??true,priority:String(fd.get('priority')),summary:String(fd.get('summary')||'').trim(),eligibility:String(fd.get('eligibility')||'').trim(),notes:String(fd.get('notes')||'').trim(),tags:e?.tags||[]};
if(e)Object.assign(e,entry);else store.entries.unshift(entry);persist();hideModal();render();toast(e?'Opportunity updated':'Opportunity added')}
function setStage(id,stage){let e=getEntry(id);if(!e||!STAGES.includes(stage))return;e.stage=stage;persist();if(state.modal?.type==='detail'&&state.modal.id===id)showDetail(id);renderMain();toast(`Moved to ${STAGE_LABELS[stage]}`)}
function resetFilters(){state.category='All categories';state.funding='Any funding';state.format='Any format';state.deadline='Any date';state.q='';const input=document.getElementById('global-search');if(input)input.value='';renderMain()}
function handleAction(b){let a=b.dataset.action,id=b.dataset.id;
switch(a){
case'nav':switchView(b.dataset.view);break;
case'new':state.formCountry=b.dataset.country||state.country;state.formStage=b.dataset.stage||'saved';showForm();break;
case'details':state.tab='overview';showDetail(id);break;
case'close-modal':hideModal();break;
case'edit':showForm(getEntry(id));break;
case'detail-tab':state.tab=b.dataset.tab;showDetail(state.modal.id);break;
case'favorite':{let e=getEntry(id);if(e){e.favorite=!e.favorite;persist();renderMain();if(state.modal?.type==='detail')showDetail(id);toast(e.favorite?'Saved to collection':'Removed from saved')}}break;
case'country':{let c=b.dataset.country;if(!c)return;state.country=c;state.sheetOpen=true;renderMain();break}
case'zoom-in':state.zoom=Math.min(2.25,+(state.zoom+.25).toFixed(2));renderMain();break;
case'zoom-out':state.zoom=Math.max(1,+(state.zoom-.25).toFixed(2));renderMain();break;
case'zoom-reset':state.zoom=1;renderMain();break;
case'hide-sheet':state.sheetOpen=false;renderMain();break;
case'country-results':{let c=b.dataset.country;state.view='opportunities';state.listCountry=c;state.q='';render();renderMain();break}
case'view-worldwide':{state.listCountry='GLOBAL';state.view='opportunities';render();renderMain();break}
case'reset-filters':resetFilters();break;
case'month-prev':{let d=new Date(state.year,state.month-1,1);state.year=d.getFullYear();state.month=d.getMonth();state.selectedDate='';renderMain();break}
case'month-next':{let d=new Date(state.year,state.month+1,1);state.year=d.getFullYear();state.month=d.getMonth();state.selectedDate='';renderMain();break}
case'today':state.month=Number(today().slice(5,7))-1;state.year=Number(today().slice(0,4));state.selectedDate='';renderMain();break;
case'select-day':state.selectedDate=state.selectedDate===b.dataset.date?'':b.dataset.date;renderMain();break;
case'show-undated':{state.view='opportunities';state.listCountry=null;state.deadline='Undated';render();renderMain();break}
case'export-json':exportJSON();toast('Backup downloaded');break;
case'import-json':document.getElementById('json-input').click();break;
case'ics':ics();break;
case'toggle-event-type':{const t=b.dataset.type;if(!typeLabel[t])break;state.eventTypes=state.eventTypes.includes(t)?state.eventTypes.filter(x=>x!==t):[...state.eventTypes,t];renderMain();break}
case'event-detail':showEvent(id,b.dataset.date||'');break;
case'event-opportunity':hideModal();state.tab='overview';showDetail(id);break;
case'event-confirm':{const e=store.events.find(x=>x.id===id);if(e){e.tentative=!e.tentative;persist();renderMain();showEvent(id);toast(e.tentative?'Marked tentative':'Marked as confirmed')}break;}
case'show-sources':switchView('sources');break;
case'back-settings':switchView('settings');break;
case'reset-data':if(confirm('Reset all changes and restore the original starter catalog? Export your backup first.')){store={entries:clone(SEED),events:clone(RADAR_EVENTS),prefs:{funded:false,china:true,interests:['AI','Research','Mentorship']}};syncRadar();persist();switchView('explore');toast('Starter catalog restored')}break;
case'delete-entry':if(confirm('Permanently delete this custom opportunity?')){store.entries=store.entries.filter(e=>e.id!==id);persist();hideModal();render();toast('Opportunity deleted')}break;
}
}
document.addEventListener('click',ev=>{let el=ev.target.closest('[data-action]');if(!el){let country=ev.target.closest('.world-svg [data-country]');if(country&&country.dataset.country){state.country=country.dataset.country;state.sheetOpen=true;renderMain()}return;}if(el.tagName==='A')return; if(el.dataset.action==='close-modal'&&ev.target!==el&&el.classList.contains('modal-backdrop'))return;ev.preventDefault();handleAction(el)});
document.addEventListener('change',ev=>{let el=ev.target;if(el.matches('[data-filter]')){state[el.dataset.filter]=el.value;renderMain()}if(el.matches('[data-stage]'))setStage(el.dataset.stage,el.value);if(el.id==='json-input'&&el.files[0]){importJSON(el.files[0]);el.value=''}});
document.addEventListener('input',ev=>{if(ev.target.id==='global-search'){state.q=ev.target.value;renderMain()}});
document.addEventListener('submit',ev=>{if(ev.target.id==='entry-form'){ev.preventDefault();saveForm(ev.target)}if(ev.target.id==='preferences-form'){ev.preventDefault();const f=new FormData(ev.target);store.prefs={china:f.get('china')==='on',funded:f.get('funded')==='on',interests:String(f.get('interests')||'').split(',').map(s=>s.trim()).filter(Boolean)};persist();toast('Preferences saved')}if(ev.target.id==='series-end-form'){ev.preventDefault();const e=store.events.find(x=>x.id===ev.target.dataset.id);if(e){e.until=String(new FormData(ev.target).get('until')||'');persist();showEvent(e.id);renderMain();toast('Class series updated')}}});
document.addEventListener('keydown',ev=>{if(ev.key==='Escape'&&state.modal)hideModal();if((ev.metaKey||ev.ctrlKey)&&ev.key.toLowerCase()==='k'){ev.preventDefault();document.getElementById('global-search')?.focus();document.getElementById('global-search')?.select()}if((ev.key==='Enter'||ev.key===' ')&&ev.target.classList?.contains('map-marker')){ev.preventDefault();let c=ev.target.dataset.country;if(c){state.country=c;state.sheetOpen=true;renderMain()}}});
let dragId=null;document.addEventListener('dragstart',ev=>{let el=ev.target.closest('[data-dragid]');if(el){dragId=el.dataset.dragid;ev.dataTransfer.effectAllowed='move';ev.dataTransfer.setData('text/plain',dragId)}});
document.addEventListener('dragover',ev=>{let drop=ev.target.closest('[data-dropstage]');if(drop){ev.preventDefault();drop.classList.add('drag-target')}});
document.addEventListener('dragleave',ev=>{let drop=ev.target.closest('[data-dropstage]');if(drop&&!drop.contains(ev.relatedTarget))drop.classList.remove('drag-target')});
document.addEventListener('drop',ev=>{let drop=ev.target.closest('[data-dropstage]');if(drop){ev.preventDefault();drop.classList.remove('drag-target');if(dragId)setStage(dragId,drop.dataset.dropstage);dragId=null}});
render();
})();
