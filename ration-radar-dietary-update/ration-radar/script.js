
const fmt=n=>Math.round(n).toLocaleString('hu-HU')+' Ft';
// ---- Price source. Swap PriceAPI.get() for fetch('/api/prices') once a backend exists. ----
// [name, emoji, pack label, {tesco,spar,aldi}, flags m=meat p=pork f=fish d=dairy e=egg g=gluten n=nuts]
// Ingredient-screened preferences. These are recipe filters, not medical or religious certification.
const DIETS={
  'Vegetarian':r=>!hasAny(r,['chick','mince','sausage','tuna','turkey','beefmince','whitefish']),
  'Vegan':r=>!hasAny(r,['chick','mince','sausage','tuna','turkey','beefmince','whitefish','egg','milk','yog','cheese','quark']),
  'Pescatarian':r=>!hasAny(r,['chick','mince','sausage','turkey','beefmince']),
  'Gluten-free':r=>!hasAny(r,['bread','pasta','flour','tortilla','noodles','udon','pita','couscous']),
  'Lactose-free':r=>!hasAny(r,['milk','yog','cheese','quark']),
  'Nut-free':r=>!hasAny(r,['pbutter','sunseed','sesame','tahini']),
  'Egg-free':r=>!hasAny(r,['egg']),
  'Soy-free':r=>!hasAny(r,['soy','soymilk','tofu']),
  'Sesame-free':r=>!hasAny(r,['sesame','tahini']),
  'Peanut-free':r=>!hasAny(r,['pbutter']),
  'Fish-free':r=>!hasAny(r,['tuna','whitefish']),
  'Diabetes-aware (no added sugar ingredient)':r=>!hasAny(r,['sugar']),
  'Lower-sodium ingredient screen (not verified)':r=>!hasAny(r,['soy','chili','sausage','tuna','cheese']),
  'Caffeine-free ingredients':r=>!hasAny(r,['coffee','tea','cocoa','chocolate']),
  'Hindu vegetarian (no meat, fish or eggs)':r=>!hasAny(r,['chick','mince','sausage','tuna','turkey','beefmince','whitefish','egg']),
  'Hindu no-beef':r=>!hasAny(r,['beefmince']),
  'Jain-style vegetarian (no root vegetables)':r=>!hasAny(r,['chick','mince','sausage','tuna','turkey','beefmince','whitefish','egg','potato','onion','carrot','ginger','garlic','sweetpot']),
  'No onion or garlic':r=>!hasAny(r,['onion','garlic']),
  'Sikh vegetarian (no meat, fish or eggs)':r=>!hasAny(r,['chick','mince','sausage','tuna','turkey','beefmince','whitefish','egg']),
  'Buddhist vegetarian':r=>!hasAny(r,['chick','mince','sausage','tuna','turkey','beefmince','whitefish']),
  'Buddhist no-alliums':r=>!hasAny(r,['onion','garlic']),
  'Halal ingredient screen (not certified)':r=>!hasAny(r,['mince','sausage'])&&!hasAny(r,['pork','gelatin']),
  'Kosher ingredient screen (not certified)':r=>!hasAny(r,['mince','sausage'])&&!hasAny(r,['pork','whitefish'])&&!(hasAny(r,['chick','turkey','beefmince'])&&hasAny(r,['milk','yog','cheese','quark']))
};
const DIET_GROUPS={
  'Medical & nutrition preferences':['Diabetes-aware (no added sugar ingredient)','Lower-sodium ingredient screen (not verified)','Caffeine-free ingredients','Gluten-free','Lactose-free','Nut-free'],
  'General eating styles':['Vegetarian','Vegan','Pescatarian'],
  'Allergy & intolerance screens':['Nut-free','Egg-free','Soy-free','Sesame-free','Peanut-free','Fish-free'],
  'Religious & cultural preferences':['Hindu vegetarian (no meat, fish or eggs)','Hindu no-beef','Jain-style vegetarian (no root vegetables)','No onion or garlic','Sikh vegetarian (no meat, fish or eggs)','Buddhist vegetarian','Buddhist no-alliums','Halal ingredient screen (not certified)','Kosher ingredient screen (not certified)']
};
function hasAny(recipe,keys){return keys.some(key=>Object.prototype.hasOwnProperty.call(recipe.ing,key));}
function recipeTags(recipe){
  const tags=[];
  if(!hasAny(recipe,['sugar']))tags.push('No added sugar ingredient');
  if(!hasAny(recipe,['soy','chili','sausage','tuna','cheese']))tags.push('No added salt specified');
  if(!hasAny(recipe,['coffee','tea','cocoa','chocolate']))tags.push('No caffeine ingredients');
  if(!hasAny(recipe,['chick','mince','sausage','tuna','turkey','beefmince','whitefish']))tags.push('Meat-free');
  return tags;
}
const dietNote='These are ingredient-based suggestions, not medical advice or certified religious meals. Diabetes suitability depends on total carbohydrates, portions and individual treatment; sodium values are not calculated; kidney diets must be personalised. Check every package label, preparation method and cross-contact risk, and follow your clinician or faith authority where relevant.';
const MEALS={b:'Breakfast',l:'Lunch',d:'Dinner',s:'Snacks'};
const CUIS=['Hungarian','European','American','Mexican','Indian','Middle Eastern','Chinese','Japanese','Korean','Southeast Asian','African'];
const pref=r=>S.cuis.length===0||S.cuis.includes(r.cu)?1:0;
const SAVED_KEY='rationRadarSavedRecipes';
const readSavedRecipes=()=>{try{return new Set(JSON.parse(localStorage.getItem(SAVED_KEY)||'[]').map(Number).filter(id=>Number.isInteger(id)&&id>=0&&id<R.length))}catch(error){return new Set()}};
const persistSavedRecipes=()=>localStorage.setItem(SAVED_KEY,JSON.stringify([...S.saved]));
const toggleSavedRecipe=id=>{if(S.saved.has(id))S.saved.delete(id);else S.saved.add(id);persistSavedRecipes()};
const flags=r=>Object.keys(r.ing).map(k=>PRICES[k][4]).join('');
const cheapest=k=>Math.min(...PRICES[k][3]);
const perServing=r=>Object.entries(r.ing).reduce((s,[k,f])=>s+f*cheapest(k),0);
const S={step:0,budget:'',days:5,people:1,meals:3,diets:[],cuis:[],pool:{},shown:{},sel:new Set(),checked:new Set(),pick:{},open:new Set(),saved:readSavedRecipes()};
const $=s=>document.querySelector(s),app=$('#app');
const types=()=>[...(S.meals==1?['l']:S.meals==2?['l','d']:['b','l','d']),'s'];
const bar=n=>`<div class="steps" aria-hidden="true">${[0,1,2,3].map(i=>`<i class="${i<=n?'on':''}"></i>`).join('')}</div>`;
const head=n=>`<div class="brand">🥘 Ration Radar</div>${bar(n)}`;

function grocery(){
  const per={},A={};
  types().forEach(t=>{const ids=[...S.sel].filter(id=>R[id].meal==t);if(!ids.length)return;const sv=Math.ceil(S.days/ids.length)*S.people;
    ids.forEach(id=>{Object.entries(R[id].ing).forEach(([k,f])=>per[k]=(per[k]||0)+f*sv);R[id].api&&R[id].list.forEach(x=>{const o=A[x.k]=A[x.k]||{k:x.k,name:x.n,img:x.img,m:[],sv:0};o.sv+=sv;if(x.m&&!o.m.includes(x.m))o.m.push(x.m)})})});
  const lines=Object.entries(per).map(([k,q])=>{const packs=Math.max(1,Math.ceil(q-1e-9)),p=PRICES[k][3],mi=p.indexOf(Math.min(...p)),i=S.pick[k]??mi;
    return{k,packs,price:packs*p[i],store:STORES[i],si:i,mi,all:p.map(x=>x*packs)}}).concat(Object.values(A).map(o=>({k:'a:'+o.k,api:1,name:o.name,img:o.img,m:o.m,sv:o.sv,price:0,store:'',si:0,mi:0,all:[0,0,0]})));
  const st=STORES.map((_,i)=>lines.reduce((s,l)=>s+l.all[i],0));
  return{lines,st,best:lines.reduce((s,l)=>s+l.price,0)};
}

function page1(){app.innerHTML=`${head(0)}<h1>Eat well on a student budget.</h1><p class="sub">Tell us what you can spend. We’ll plan the meals and check prices in Debrecen shops.</p>
<label for="bud">Budget (Ft)</label><input id="bud" type="number" inputmode="numeric" min="0" step="500" placeholder="e.g. 15000" value="${S.budget}">
<label for="dn">How many days?</label><input id="dn" type="number" inputmode="numeric" min="1" max="30" placeholder="e.g. 5" value="${S.days}">
<label for="pp">How many people?</label><input id="pp" type="number" inputmode="numeric" min="1" max="20" placeholder="e.g. 2" value="${S.people}">
<label for="mp">Meals per day (1 to 3)</label><input id="mp" type="number" inputmode="numeric" min="1" max="3" placeholder="e.g. 3" value="${S.meals}">
<button class="btn" id="go1" disabled>Next: dietary needs</button><button class="btn ghost" id="savedMenu">♡ Saved recipes (${S.saved.size})</button>`;
  const ok=()=>{$('#go1').disabled=!(+$('#bud').value>0&&+$('#dn').value>0&&+$('#mp').value>=1&&+$('#pp').value>=1)};
  $('#bud').oninput=ok;$('#dn').oninput=ok;$('#mp').oninput=ok;$('#pp').oninput=ok;ok();
  $('#savedMenu').onclick=pageSaved;
  $('#go1').onclick=()=>{S.budget=+$('#bud').value;S.days=Math.min(30,+$('#dn').value);S.people=Math.min(20,Math.max(1,Math.round(+$('#pp').value)));S.meals=Math.min(3,Math.max(1,Math.round(+$('#mp').value)));page2()};
}
function page2(){app.innerHTML=`${head(1)}<h1>Diet, culture & cuisine</h1><p class="sub">Choose any preferences that apply. You can combine them; recipes must meet every selected filter.</p>
${Object.entries(DIET_GROUPS).map(([group,items])=>`<h2>${group}</h2><div class="chips">${items.map(d=>`<button class="chip" aria-pressed="${S.diets.includes(d)}" data-d="${d}">${d}</button>`).join('')}</div>`).join('')}
<h2>Cuisines</h2><div class="chips cuisine-chips"><button class="chip" aria-pressed="${S.cuis.length===0}" data-c-all="true">All</button>${CUIS.map(c=>`<button class="chip" aria-pressed="${S.cuis.includes(c)}" data-c="${c}">${c}</button>`).join('')}</div>
<p class="note diet-warning" style="margin-top:16px">${dietNote} Kidney disease/CKD, potassium or phosphorus limits, heart failure and other complex medical diets are not auto-filtered because the database has no verified nutrient values for these needs. “Halal” and “Kosher” filters only screen listed ingredients; they cannot verify certification, slaughter, utensils or kitchen separation. Hindu, Jain, Sikh and Buddhist practices vary between individuals and traditions.</p>
<button class="btn" id="go2">Plan my meals</button><button class="btn ghost" id="bk">Back</button>`;
  document.querySelectorAll('.chip[data-d]').forEach(c=>c.onclick=()=>{const d=c.dataset.d,on=c.getAttribute('aria-pressed')!=='true';c.setAttribute('aria-pressed',on);S.diets=on?[...S.diets,d]:S.diets.filter(x=>x!==d)});
  document.querySelectorAll('.chip[data-c]').forEach(c=>c.onclick=()=>{const d=c.dataset.c,on=c.getAttribute('aria-pressed')!=='true';if(on&&!S.cuis.includes(d))S.cuis.push(d);else if(!on)S.cuis=S.cuis.filter(x=>x!==d);document.querySelectorAll('.chip[data-c]').forEach(ch=>ch.setAttribute('aria-pressed',String(S.cuis.includes(ch.dataset.c))));document.querySelector('[data-c-all]').setAttribute('aria-pressed',String(S.cuis.length===0))});
  document.querySelector('[data-c-all]').onclick=()=>{S.cuis=[];document.querySelectorAll('.chip[data-c]').forEach(ch=>ch.setAttribute('aria-pressed','false'));document.querySelector('[data-c-all]').setAttribute('aria-pressed','true')};
  $('#bk').onclick=page1;$('#go2').onclick=loading;
}
async function loading(){
  app.innerHTML=`<div class="load" role="status"><div class="pot"><span>🥕</span><span>🍅</span><span>🧅</span><div class="lid"></div><div class="body"></div></div>
  <b id="lt">Finding recipes that fit…</b><div class="bar"><b></b></div><small class="note">Checking Tesco, Spar and Aldi prices</small></div>`;
  const msgs=['Finding recipes that fit…','Checking Tesco prices…','Checking Spar prices…','Checking Aldi prices…'];let i=0;
  const iv=setInterval(()=>{const e=$('#lt');if(e)e.textContent=msgs[++i%msgs.length]},650);
  await new Promise(r=>setTimeout(r,2700));clearInterval(iv);
  S.sel=new Set();S.checked=new Set();S.pick={};S.open=new Set();
  types().forEach(t=>{S.pool[t]=R.filter(r=>r.meal===t&&S.diets.every(d=>DIETS[d](r))&&(S.cuis.length===0||S.cuis.includes(r.cu))).sort(()=>Math.random()-.5).sort((a,b)=>pref(b)-pref(a));S.shown[t]=S.pool[t].slice(0,3).map(r=>r.id)});
  page3();
}
function page3(){
  const g=grocery(),over=g.best>S.budget&&S.sel.size>0;
  app.innerHTML=`${head(2)}<h1>Pick your meals</h1><p class="sub">Tick the ones you like, snacks included. Tap ↻ to swap a recipe. Your budget is about ${fmt(S.budget/S.days/S.people)} per person per day.</p>
  ${types().map(t=>`<h2>${MEALS[t]}</h2>${S.cuis.length&&S.shown[t].some(id=>!S.cuis.includes(R[id].cu))?'<p class="note" style="margin:-6px 0 8px">Few matches in your cuisines, so we added other dishes.</p>':''}${S.shown[t].length?S.shown[t].map(id=>{const r=R[id];return`<div class="meal ${S.sel.has(id)?'sel':''}"><span class="em">${r.img?`<img class="th" src="${r.img}" alt="" loading="lazy" onerror="this.replaceWith('🍽️')">`:r.em}</span>
  <div class="t"><b>${r.name}</b><small>${r.cu} · about ${fmt(perServing(r))} per serving</small><span class="recipe-tags">${recipeTags(r).slice(0,3).map(tag=>`<i>${tag}</i>`).join('')}</span></div>
  <button class="save-recipe ${S.saved.has(id)?'saved':''}" data-save="${id}" type="button" aria-label="${S.saved.has(id)?'Remove from':'Save to'} saved recipes">${S.saved.has(id)?'♥':'♡'}</button><button class="rf" data-t="${t}" data-id="${id}" aria-label="Show another ${MEALS[t].toLowerCase()} recipe"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/></svg></button>
  <input type="checkbox" data-id="${id}" ${S.sel.has(id)?'checked':''} aria-label="Select ${r.name}"></div>`}).join(''):'<p class="note">No recipes match your dietary choices for this meal.</p>'}`).join('')}
  <div class="bottom"><div style="display:flex;justify-content:space-between"><span>${S.api?'Budget':'Estimated groceries'}</span><b>${S.api?fmt(S.budget):fmt(g.best)+' / '+fmt(S.budget)}</b></div>
  <div class="warn">${over?'Budget might not be enough':''}</div>
  <button class="btn" id="go3" ${S.sel.size?'':'disabled'}>Make my grocery list</button><button class="btn ghost" id="bk">Back</button></div>`;
  document.querySelectorAll('.meal input').forEach(c=>c.onchange=()=>{const id=+c.dataset.id;c.checked?S.sel.add(id):S.sel.delete(id);page3()});
  document.querySelectorAll('[data-save]').forEach(b=>b.onclick=()=>{toggleSavedRecipe(+b.dataset.save);page3()});
  document.querySelectorAll('.rf').forEach(b=>b.onclick=()=>{const t=b.dataset.t,id=+b.dataset.id,next=S.pool[t].find(r=>!S.shown[t].includes(r.id));
    if(!next){b.title='No more alternatives';b.style.opacity=.35;return}
    S.shown[t]=S.shown[t].map(x=>x==id?next.id:x);S.sel.delete(id);page3()});
  $('#bk').onclick=page2;$('#go3').onclick=page4;
}

let UNIT_SYSTEM = 'metric';
function servingsForRecipe(recipe) {
  const ids = [...S.sel].filter(id => R[id].meal === recipe.meal);
  return Math.max(1, Math.ceil(S.days / Math.max(1, ids.length)) * S.people);
}
function quantityForIngredient(key, fraction, servings, unitSystem) {
  const base = INGREDIENT_UNITS[key] || 100;
  const unit = INGREDIENT_MEASURES[key] || 'g';
  let amount = fraction * base * servings;
  if (unit === 'pcs' || unit === 'packs') {
    const rounded = Math.max(1, Math.round(amount * 10) / 10);
    return `${rounded} ${unit === 'pcs' ? 'pcs' : 'packs'}`;
  }
  if (unitSystem === 'imperial') {
    if (unit === 'g') return `${(amount / 28.3495).toFixed(amount < 100 ? 1 : 0)} oz`;
    if (unit === 'ml') return `${(amount / 29.5735).toFixed(amount < 100 ? 1 : 0)} fl oz`;
  }
  return `${Math.round(amount)} ${unit}`;
}
function showRecipeDex(id) {
  const recipe = R[id];
  if (!recipe) return;
  const servings = servingsForRecipe(recipe);
  const unit = UNIT_SYSTEM;
  const ingredients = Object.entries(recipe.ing).map(([key,fraction]) => {
    const item = PRICES[key];
    if (!item) return '';
    return `<li><span>${item[1]} ${item[0]}</span><span>${quantityForIngredient(key,fraction,servings,unit)}</span></li>`;
  }).filter(Boolean).join('');
  const temperature = recipe.detail.ovenC
    ? `<div class="dex-temperature">Oven: ${unit === 'metric' ? recipe.detail.ovenC + '°C' : Math.round(recipe.detail.ovenC * 9/5 + 32) + '°F'} (preheated)</div>` : '';
  const overlay = document.createElement('div');
  overlay.className = 'dex-overlay';
  overlay.innerHTML = `<section class="dex-panel" role="dialog" aria-modal="true" aria-labelledby="dex-title">
    <div class="dex-top"><span class="note">RATION RADAR · RECIPE FILE #${String(id+1).padStart(3,'0')}</span><div class="dex-actions"><button class="dex-save" type="button">${S.saved.has(id)?'♥ Saved':'♡ Save recipe'}</button><button class="dex-close" type="button" aria-label="Close recipe">×</button></div></div>
    <div class="dex-hero"><div class="dex-big">${recipe.em || '🍽️'}</div><div><h2 id="dex-title">${recipe.name}</h2><div class="dex-meta">${recipe.cu || 'Everyday'} · ${recipe.detail.time} · ${servings} servings</div><div class="recipe-tags">${recipeTags(recipe).map(tag=>`<i>${tag}</i>`).join('')}</div></div></div>
    <div class="dex-unit-row"><label for="dex-units">Measurement system</label><select id="dex-units"><option value="metric" ${unit==='metric'?'selected':''}>Metric (g, ml, °C)</option><option value="imperial" ${unit==='imperial'?'selected':''}>Imperial (oz, fl oz, °F)</option></select></div>
    <h3>Ingredients</h3><ul class="dex-ingredients">${ingredients}</ul>
    <h3>Necessary tools</h3><div class="dex-tools">${recipe.detail.tools.map(tool=>`<span class="dex-tool">${tool}</span>`).join('')}</div>
    <h3>How to prepare</h3><ol class="dex-steps">${recipe.detail.steps.map(step=>`<li>${step}</li>`).join('')}</ol>
    ${temperature}<p class="note" style="margin-top:14px">Ingredient amounts are estimates based on the planner's recipe data. Labels describe listed ingredients only, not laboratory-tested nutrition. Check packaged foods for hidden sugar, sodium, caffeine and allergens. Follow packet instructions and cook meat thoroughly.</p>
  </section>`;
  document.body.appendChild(overlay);
  requestAnimationFrame(()=>overlay.classList.add('open'));
  const close=()=>{overlay.classList.remove('open');setTimeout(()=>overlay.remove(),240);};
  overlay.querySelector('.dex-close').onclick=close;
  overlay.querySelector('.dex-save').onclick=()=>{toggleSavedRecipe(id);overlay.querySelector('.dex-save').textContent=S.saved.has(id)?'♥ Saved':'♡ Save recipe'};
  overlay.addEventListener('click',e=>{if(e.target===overlay)close();});
  overlay.querySelector('#dex-units').onchange=e=>{UNIT_SYSTEM=e.target.value;close();showRecipeDex(id);};
  const onKey=e=>{if(e.key==='Escape'){close();document.removeEventListener('keydown',onKey);}};
  document.addEventListener('keydown',onKey);
}
function renderRecipeDex() {
  const selected = [...S.sel].map(id=>R[id]).filter(Boolean);
  if (!selected.length) return '';
  return `<section class="dex-section"><h2>Your recipe Pokédex</h2>
    <p class="dex-intro">Your selected meals, collected in one place. Open a recipe or start a voice-guided cooking session.</p>
    <div class="dex-grid">${selected.map((recipe,index)=>`<article class="dex-card-wrap">
      <button class="dex-card" type="button" data-dex="${recipe.id}">
        <span class="dex-number">#${String(index+1).padStart(3,'0')}</span><span class="dex-em">${recipe.em || '🍽️'}</span>
        <strong>${recipe.name}</strong><small>${recipe.cu || 'Everyday'} · ${MEALS[recipe.meal]}</small>
      </button>
      <button class="btn cook-mode-btn" type="button" data-cook="${recipe.id}">🎙️ Hands-Free Cook Mode</button>
    </article>`).join('')}</div></section>`;
}

let cookConversation = null;
let cookOverlay = null;
let cookSdkPromise = null;

function safeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function addCookTranscript(speaker, message) {
  if (!cookOverlay) return;
  const list = cookOverlay.querySelector('.cook-transcript');
  if (!list) return;
  const line = document.createElement('p');
  line.className = 'cook-line ' + (speaker === 'You' ? 'user-line' : 'agent-line');
  const who = document.createElement('strong');
  who.textContent = speaker + ': ';
  const content = document.createElement('span');
  content.textContent = message;
  line.append(who, content);
  list.appendChild(line);
  list.scrollTop = list.scrollHeight;
}
function cookStatus(message, state='') {
  if (!cookOverlay) return;
  const status = cookOverlay.querySelector('.cook-status');
  if (status) { status.textContent = message; status.dataset.state = state; }
}
function closeCookOverlay() {
  if (cookConversation) {
    const active = cookConversation;
    cookConversation = null;
    active.endSession().catch(() => {});
  }
  if (cookOverlay) {
    cookOverlay.classList.remove('open');
    const old = cookOverlay;
    cookOverlay = null;
    setTimeout(() => old.remove(), 220);
  }
}
async function startHandsFreeCook(id) {
  const recipe = R[id];
  if (!recipe) return;
  const servings = servingsForRecipe(recipe);
  const ingredients = Object.entries(recipe.ing).map(([key,fraction]) => {
    const item = PRICES[key];
    return item ? `${item[0]}: ${quantityForIngredient(key,fraction,servings,UNIT_SYSTEM)}` : null;
  }).filter(Boolean);
  const recipeContext = [
    `Current recipe: ${recipe.name}.`,
    `Cuisine: ${recipe.cu || 'Everyday'}. Meal: ${MEALS[recipe.meal]}. Servings: ${servings}.`,
    `Estimated ingredients: ${ingredients.join('; ')}.`,
    `Recipe notes: ${recipeTags(recipe).join(', ')}. These are ingredient-screening notes only, not medical or religious certification.`,
    `Necessary tools: ${recipe.detail.tools.join(', ')}.`,
    `Preparation steps: ${recipe.detail.steps.map((step,index)=>`${index+1}. ${step}`).join(' ')}`,
    recipe.detail.ovenC ? `Oven temperature: ${UNIT_SYSTEM === 'metric' ? recipe.detail.ovenC + ' degrees Celsius' : Math.round(recipe.detail.ovenC*9/5+32) + ' degrees Fahrenheit'}.` : '',
    'Guide the user conversationally, one manageable step at a time. Wait for them to say they are ready before moving on. Answer questions about this recipe, repeat or simplify steps on request, and never claim a timer is running. Mention food safety when relevant.'
  ].filter(Boolean).join('\n');

  cookOverlay = document.createElement('div');
  cookOverlay.className = 'cook-overlay';
  cookOverlay.innerHTML = `<section class="cook-panel" role="dialog" aria-modal="true" aria-labelledby="cook-title">
    <div class="cook-header"><div><span class="note">RATION RADAR · VOICE COOKING</span><h2 id="cook-title">${safeText(recipe.name)}</h2></div><button class="dex-close cook-close" type="button" aria-label="Close cooking mode">×</button></div>
    <p class="cook-intro">Your cooking companion is ready. Talk naturally—ask for the next step, repeat an instruction, or ask a question.</p>
    <div class="cook-status" data-state="idle" aria-live="polite">Ready to connect</div>
    <div class="cook-transcript" aria-live="polite"><p class="cook-line agent-line"><strong>Ration Radar:</strong> Hi! I’ll guide you through ${safeText(recipe.name)}. Start the voice session when you're ready.</p></div>
    <div class="cook-controls"><button class="btn" id="cook-start" type="button">🎙️ Start talking</button><button class="btn ghost" id="cook-stop" type="button" disabled>End session</button></div>
    <p class="note cook-privacy">Your browser will ask for microphone permission. Use headphones if you want to reduce audio feedback.</p>
  </section>`;
  document.body.appendChild(cookOverlay);
  requestAnimationFrame(()=>cookOverlay && cookOverlay.classList.add('open'));
  cookOverlay.querySelector('.cook-close').onclick=closeCookOverlay;
  cookOverlay.addEventListener('click',event=>{if(event.target===cookOverlay)closeCookOverlay()});
  cookOverlay.querySelector('#cook-start').onclick=async()=>{
    const startButton=cookOverlay?.querySelector('#cook-start');
    const stopButton=cookOverlay?.querySelector('#cook-stop');
    if(!startButton||cookConversation)return;
    startButton.disabled=true;
    cookStatus('Connecting to your cooking companion…','connecting');
    try {
      if(!cookSdkPromise) cookSdkPromise=import('https://esm.sh/@elevenlabs/client@latest');
      const {Conversation}=await cookSdkPromise;
      const response=await fetch('/api/elevenlabs/signed-url');
      if(!response.ok) throw new Error(await response.text() || 'Could not authenticate with ElevenLabs.');
      const signedUrl=await response.text();
      await navigator.mediaDevices.getUserMedia({audio:true}).then(stream=>stream.getTracks().forEach(track=>track.stop()));
      cookConversation=await Conversation.startSession({
        signedUrl,
        onConnect:()=>{cookStatus('Connected · I’m listening','listening');if(stopButton)stopButton.disabled=false;},
        onDisconnect:()=>{cookConversation=null;cookStatus('Session ended','idle');if(startButton)startButton.disabled=false;if(stopButton)stopButton.disabled=true;},
        onModeChange:event=>{const mode=typeof event==='string'?event:event?.mode||event?.status||'';cookStatus(mode==='speaking'?'Your cooking companion is speaking…':mode==='listening'?'Listening — go ahead':'Connected',mode);},
        onMessage:event=>{
          const text=typeof event==='string'?event:event?.message||event?.text||'';
          if(text) addCookTranscript(event?.source==='user'?'You':'Ration Radar',text);
        },
        onUserTranscript:event=>{const text=event?.message||event?.text||'';if(text)addCookTranscript('You',text);},
        onError:error=>{cookStatus('Voice connection issue. Check your microphone and try again.','error');console.error('ElevenLabs conversation error:',error);}
      });
      cookConversation.sendContextualUpdate(recipeContext);
      cookConversation.sendUserMessage(`I'm ready to cook ${recipe.name}. Please greet me naturally and guide me through the first step. Keep your instructions conversational and one step at a time.`);
    } catch(error) {
      console.error('Hands-Free Cook Mode:',error);
      cookConversation=null;
      cookStatus(error.message || 'Could not start the voice session.','error');
      if(startButton)startButton.disabled=false;
      if(stopButton)stopButton.disabled=true;
    }
  };
  cookOverlay.querySelector('#cook-stop').onclick=async()=>{
    if(cookConversation){const active=cookConversation;cookConversation=null;try{await active.endSession()}catch(error){console.warn(error)}}
    cookStatus('Session ended','idle');
    const start=cookOverlay?.querySelector('#cook-start');if(start)start.disabled=false;
    const stop=cookOverlay?.querySelector('#cook-stop');if(stop)stop.disabled=true;
  };
}

function pageSaved(){
  const recipes=[...S.saved].map(id=>R[id]).filter(Boolean);
  app.innerHTML=`${head(0)}<h1>Saved recipes</h1><p class="sub">Your personal recipe collection. Saved recipes stay here when you start a new meal plan.</p>
    ${recipes.length?`<div class="dex-grid">${recipes.map(recipe=>`<article class="saved-card"><button class="dex-card" type="button" data-open-saved="${recipe.id}"><span class="dex-em">${recipe.em||'🍽️'}</span><strong>${recipe.name}</strong><small>${recipe.cu||'Everyday'} · ${MEALS[recipe.meal]}</small><span class="recipe-tags">${recipeTags(recipe).slice(0,3).map(tag=>`<i>${tag}</i>`).join('')}</span></button><button class="btn cook-mode-btn" type="button" data-saved-cook="${recipe.id}">🎙️ Hands-Free Cook Mode</button><button class="link saved-remove" type="button" data-remove-saved="${recipe.id}">Remove</button></article>`).join('')}</div>`:'<p class="note">You haven’t saved any recipes yet. Save recipes from the meal results or a recipe card.</p>'}
    <button class="btn ghost" id="savedBack">Back to start</button>`;
  document.querySelectorAll('[data-open-saved]').forEach(button=>button.onclick=()=>showRecipeDex(+button.dataset.openSaved));
  document.querySelectorAll('[data-remove-saved]').forEach(button=>button.onclick=()=>{toggleSavedRecipe(+button.dataset.removeSaved);pageSaved()});
  document.querySelectorAll('[data-saved-cook]').forEach(button=>button.onclick=()=>startHandsFreeCook(+button.dataset.savedCook));
  $('#savedBack').onclick=page1;
}

function page4(){
  const g=grocery(),min=Math.min(...g.st);
  const sumChecked=()=>g.lines.filter(l=>S.checked.has(l.k)).reduce((s,l)=>s+l.price,0);
  app.innerHTML=`${head(3)}<h1>Your grocery list</h1><p class="sub">${S.api?'Everything you need for the meals you picked.':'Cheapest shop picked for each item. Tap “Other shops” to compare or switch.'}</p>
  <div class="stores">${STORES.map((s,i)=>`<div class="${g.st[i]==min?'best':''}"><span>${s}</span><b>${fmt(g.st[i])}</b></div>`).join('')}</div>
  <p class="note p0" style="margin:0">Full list at one shop. Your current picks cost ${fmt(g.best)}.</p>
  <div class="rc"><h3>RATION RADAR</h3><div class="c">Debrecen · ${S.days} days · ${S.people} ${S.people==1?'person':'people'} · ${S.meals} meals/day</div><hr>
  <div id="items">${g.lines.map(l=>`<div class="itw"><label class="it off" data-k="${l.k}"><input type="checkbox" data-k="${l.k}" aria-label="${L(l).n}">
  <span class="pic">${L(l).e}</span><span class="n"><b>${L(l).n}</b><small>${L(l).s}</small></span><span class="p">${L(l).p}</span></label><button class="link sm" data-o="${l.k}">${S.open.has(l.k)?'Hide shops':'Other shops'}</button>${S.open.has(l.k)?`<div class="opts">${STORES.map((s,i)=>`<label class="op"><input type="radio" name="r${l.k}" data-k="${l.k}" data-i="${i}" ${i==l.si?'checked':''}><span>${s}</span><span>${fmt(l.all[i])}${i==l.mi?' · cheapest':''}</span></label>`).join('')}</div>`:''}</div>`).join('')}</div><hr>
  <div class="tot"><span>${S.api?'CHECKED OFF':'TOTAL'} (<span id="cnt">0</span> of ${g.lines.length} items)</span><span id="tt">0 Ft</span></div>
  <div class="c" style="margin:10px 0 0" id="bl"></div></div>
  <button class="link" id="all" style="margin-top:14px">Check all items</button>
  <button class="btn ghost" id="bk">Back to meals</button><button class="btn ghost" id="again">Start over</button>
  <p class="note">Prices are sample data for demo. Connect a price service to show live shelf prices.</p>
  ${renderRecipeDex()}`;
  const upd=()=>{$('#tt').textContent=S.api?'':fmt(sumChecked());$('#cnt').textContent=S.checked.size;
    $('#bl').innerHTML=S.api?'':S.checked.size&&sumChecked()>S.budget?'<span style="color:#C8281D">Over budget by '+fmt(sumChecked()-S.budget)+'</span>':'Budget: '+fmt(S.budget);
    document.querySelectorAll('.it').forEach(e=>{const on=S.checked.has(e.dataset.k);e.classList.toggle('on',on);e.classList.toggle('off',!on)})};
  document.querySelectorAll('.it input').forEach(c=>{c.checked=S.checked.has(c.dataset.k);c.onchange=()=>{c.checked?S.checked.add(c.dataset.k):S.checked.delete(c.dataset.k);upd()}});
  $('#all').onclick=()=>{const all=S.checked.size==g.lines.length;S.checked=new Set(all?[]:g.lines.map(l=>l.k));document.querySelectorAll('.it input').forEach(c=>c.checked=!all);$('#all').textContent=all?'Check all items':'Clear all';upd()};
  if(S.api)document.querySelectorAll('[data-o],.stores,.p0').forEach(e=>e.remove());
  document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{const k=b.dataset.o;S.open.has(k)?S.open.delete(k):S.open.add(k);page4()});
  document.querySelectorAll('.opts input').forEach(r=>r.onchange=()=>{S.pick[r.dataset.k]=+r.dataset.i;page4()});
  document.querySelectorAll('[data-dex]').forEach(card=>card.onclick=()=>showRecipeDex(+card.dataset.dex));
  document.querySelectorAll('[data-cook]').forEach(button=>button.onclick=()=>startHandsFreeCook(+button.dataset.cook));
  $('#bk').onclick=page3;$('#again').onclick=()=>{S.sel=new Set();S.checked=new Set();page1()};upd();
}
page1();
