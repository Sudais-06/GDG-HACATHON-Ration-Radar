const PRICES={
rice:['Rice','🍚','1 kg',[649,699,579],''],pasta:['Pasta','🍝','500 g',[369,389,299],'g'],egg:['Eggs','🥚','10 pcs',[1099,1149,999],'e'],
bread:['Bread','🍞','500 g loaf',[499,529,429],'g'],oats:['Rolled oats','🥣','500 g',[549,579,449],'g'],milk:['Milk','🥛','1 l',[429,449,389],'d'],
yog:['Yogurt','🍶','400 g',[459,479,399],'d'],cheese:['Cheese','🧀','200 g',[899,929,799],'d'],banana:['Bananas','🍌','1 kg',[599,629,549],''],
apple:['Apples','🍎','1 kg',[499,529,449],''],chick:['Chicken breast','🍗','1 kg',[2599,2699,2399],'m'],mince:['Minced pork','🥩','500 g',[1199,1249,1099],'mp'],
sausage:['Sausage','🌭','300 g',[1099,1149,999],'mp'],tuna:['Tuna','🐟','can 160 g',[749,779,649],'f'],beans:['Kidney beans','🫘','can 400 g',[449,469,379],''],
lent:['Red lentils','🫘','500 g',[799,829,699],''],chickpea:['Chickpeas','🟡','can 400 g',[549,569,479],''],tomato:['Chopped tomatoes','🍅','can 400 g',[349,369,299],''],
potato:['Potatoes','🥔','2 kg',[799,849,699],''],onion:['Onions','🧅','1 kg',[399,429,349],''],pepper:['Peppers','🫑','500 g',[899,949,799],''],
carrot:['Carrots','🥕','1 kg',[399,429,349],''],spinach:['Spinach','🥬','300 g',[699,729,599],''],tortilla:['Tortillas','🌯','8 pcs',[799,829,699],'g'],
oil:['Sunflower oil','🌻','1 l',[899,929,799],''],pbutter:['Peanut butter','🥜','350 g',[1099,1149,949],'n'],coconut:['Coconut milk','🥥','can 400 ml',[849,879,749],''],tofu:['Tofu','⬜','400 g',[899,929,799],''],
flour:['Flour','🌾','1 kg',[329,349,279],'g'],sugar:['Sugar','🧂','1 kg',[399,419,349],''],quark:['Quark (túró)','🥣','250 g',[499,529,429],'d'],zucchini:['Zucchini','🥒','1 kg',[699,729,599],''],cabbage:['Cabbage','🥬','1 kg',[349,369,299],''],popcorn:['Popcorn kernels','🍿','500 g',[599,629,499],''],cucumber:['Cucumbers','🥒','1 kg',[799,829,699],'']};
Object.assign(PRICES,{noodles:['Rice noodles','🍜','250 g',[599,629,519],''],soymilk:['Soy milk','🥛','1 l',[499,519,449],''],mushroom:['Mushrooms','🍄','250 g',[549,579,479],''],broccoli:['Broccoli','🥦','500 g',[749,779,649],''],cauli:['Cauliflower','🥦','1 pc',[599,629,529],''],sweetpot:['Sweet potatoes','🍠','1 kg',[699,729,599],''],eggplant:['Eggplant','🍆','500 g',[699,729,599],''],peas:['Frozen peas','🟢','450 g',[549,579,479],''],turkey:['Turkey mince','🦃','500 g',[1399,1449,1299],'m'],ricecake:['Rice cakes','🍘','100 g',[399,419,349],''],buckwheat:['Buckwheat','🌾','500 g',[599,629,499],''],sunseed:['Sunflower seeds','🌻','200 g',[499,519,429],''],raisin:['Raisins','🍇','200 g',[599,629,519],''],tomatof:['Tomatoes','🍅','500 g',[699,729,599],'']});
Object.assign(PRICES,{soy:['Soy sauce','🍶','250 ml',[699,729,599],'g'],curry:['Curry powder','🟡','50 g',[549,579,479],''],ginger:['Ginger','🫚','100 g',[399,419,349],''],garlic:['Garlic','🧄','3 heads',[299,319,259],''],tahini:['Tahini','🫙','180 g',[1299,1349,1149],''],pita:['Pita bread','🫓','6 pcs',[499,529,449],'g'],couscous:['Couscous','🍚','500 g',[599,629,499],'g'],avocado:['Avocados','🥑','2 pcs',[799,829,699],''],lime:['Limes','🍋','3 pcs',[499,529,449],''],beefmince:['Minced beef','🥩','500 g',[1599,1649,1499],'m'],udon:['Udon noodles','🍜','2 packs',[699,729,599],'g'],sesame:['Sesame seeds','⚪','100 g',[499,519,429],''],chili:['Chili sauce','🌶️','250 ml',[599,629,529],''],tpaste:['Tomato paste','🍅','140 g',[349,369,299],''],olive:['Olive oil','🫒','500 ml',[1999,2099,1799],''],whitefish:['White fish fillets','🐟','400 g, frozen',[1399,1449,1299],'f'],corn:['Sweetcorn','🌽','can 340 g',[379,399,329],'']});
const STORES=['Tesco','Spar','Aldi'];
const PriceAPI={async get(){return PRICES}};
// Live recipes come from the Node server (/api/recipes), which calls TheMealDB and Spoonacular. Without the server we fall back to the built-in list.
const loadApi=async()=>{try{const r=await fetch('/api/recipes?meals='+types().join('')+'&diets='+encodeURIComponent(S.diets.join(',')));if(!r.ok)return null;const j=await r.json();return types().every(t=>j[t]&&j[t].length)?j:null}catch(e){return null}};
const L=l=>l.api?{n:l.name,e:l.img?`<img class="th2" src="${l.img}" alt="" onerror="this.replaceWith('🛒')">`:'🛒',s:(l.m.slice(0,2).join(' + ')||'as needed')+' · '+l.sv+' servings',p:''}:{n:PRICES[l.k][0],e:PRICES[l.k][1],s:l.packs+' × '+PRICES[l.k][2]+' · '+l.store,p:fmt(l.price)};
// recipes: meal, name, emoji, {ingredient: fraction of a pack per serving}
const R=[
['b','Scrambled eggs on toast','🍳',{egg:.2,bread:.1,oil:.01}],['b','Oatmeal with banana','🥣',{oats:.1,milk:.25,banana:.15}],
['b','Yogurt, apple & oats','🍏',{yog:.3,apple:.15,oats:.06}],['b','Cheese & pepper toast','🧀',{bread:.1,cheese:.15,pepper:.1}],
['b','Peanut butter banana toast','🍌',{bread:.1,pbutter:.06,banana:.15}],['b','Spinach omelette','🥬',{egg:.3,spinach:.2,cheese:.1}],
['b','Rice pudding with apple','🍚',{rice:.08,milk:.3,apple:.15}],
['l','Chicken & rice','🍗',{chick:.15,rice:.1,pepper:.1,onion:.05,oil:.01}],['l','Red lentil soup','🍲',{lent:.12,carrot:.1,onion:.05,potato:.1}],
['l','Tuna pasta','🍝',{pasta:.2,tuna:.5,tomato:.5,onion:.05}],['l','Chickpea wrap','🌯',{tortilla:.25,chickpea:.5,spinach:.15,tomato:.25}],
['l','Bean & rice bowl','🫘',{beans:.5,rice:.1,pepper:.1,onion:.05}],['l','Sausage & potatoes','🌭',{sausage:.5,potato:.15,onion:.05}],
['l','Cheese quesadilla','🧀',{tortilla:.25,cheese:.2,pepper:.1}],
['d','Pasta bolognese','🍝',{pasta:.2,mince:.25,tomato:.5,onion:.05}],['d','Chicken paprikás with rice','🍛',{chick:.15,pepper:.15,onion:.1,rice:.1,yog:.1}],
['d','Chickpea & spinach curry','🥘',{chickpea:.5,coconut:.4,rice:.1,spinach:.15,onion:.05}],['d','Potato & egg bake','🥧',{potato:.2,egg:.2,yog:.15,onion:.05}],
['d','Tofu veggie stir-fry','🥢',{tofu:.25,rice:.1,carrot:.15,pepper:.1,oil:.02}],['d','Tomato lentil pasta','🍅',{pasta:.2,lent:.1,tomato:.5,onion:.05}],
['d','Tuna potato patties','🐟',{potato:.2,tuna:.5,egg:.1,oil:.02}],
['b','Hungarian pancakes (palacsinta)','🥞',{flour:.1,egg:.15,milk:.2,sugar:.03}],['b','Quark & banana bowl','🥣',{quark:.5,banana:.15,oats:.04}],
['l','Lecsó with egg & rice','🍲',{pepper:.3,tomato:.4,onion:.1,egg:.15,rice:.1}],['l','Cabbage pasta (káposztás tészta)','🥬',{cabbage:.15,pasta:.2,onion:.05,oil:.02,sugar:.01}],
['l','Zucchini főzelék with egg','🥒',{zucchini:.3,flour:.03,milk:.1,egg:.15,onion:.05}],['l','Paprikás krumpli with sausage','🥔',{potato:.2,sausage:.3,onion:.1,pepper:.1,oil:.01}],
['d','Quark noodles (túrós tészta)','🍝',{pasta:.2,quark:.4,sugar:.02}],['d','Cabbage & sausage skillet','🌭',{cabbage:.15,sausage:.4,potato:.1,onion:.05}],['d','Zucchini fritters','🥒',{zucchini:.3,egg:.15,flour:.06,oil:.02}],
['s','Popcorn','🍿',{popcorn:.06,oil:.01}],['s','Apple with peanut butter','🍎',{apple:.2,pbutter:.05}],['s','Carrot sticks with yogurt dip','🥕',{carrot:.15,yog:.15}],['s','Banana oat cookies','🍪',{banana:.2,oats:.08}],
['s','Chickpea dip with carrots','🫘',{chickpea:.5,carrot:.1,oil:.01}],['s','Boiled egg & cucumber','🥚',{egg:.2,cucumber:.15}],['s','Cheese & apple slices','🧀',{cheese:.1,apple:.15}]
].map((r,i)=>({id:i,meal:r[0],name:r[1],em:r[2],ing:r[3]}));
const BASE=R.slice();
// ---- Recipe database: 37 hand-written classics above + 163 generated variants = 200 recipes ----
(()=>{const seen=new Set(R.map(r=>r.name));
const fill=(m,n,it)=>{let c=0;for(const[x,e,ing]of it){if(c>=n)break;if(seen.has(x))continue;seen.add(x);R.push({id:R.length,meal:m,name:x,em:e,ing});c++}};
const cap=s=>s[0].toUpperCase()+s.slice(1);
const P={chicken:['chicken','🍗',{chick:.15}],turkey:['turkey','🦃',{turkey:.25}],pork:['pork','🥩',{mince:.25}],tuna:['tuna','🐟',{tuna:.5}],tofu:['tofu','🥢',{tofu:.25}],lentil:['lentil','🫘',{lent:.12}],chickpea:['chickpea','🟡',{chickpea:.5}],bean:['bean','🫘',{beans:.5}],egg:['egg','🥚',{egg:.3}],sausage:['sausage','🌭',{sausage:.4}],cheese:['cheese','🧀',{cheese:.15}]};
const V={pepper:['pepper',.15],broccoli:['broccoli',.2],spinach:['spinach',.3],carrot:['carrot',.15],zucchini:['zucchini',.25],cabbage:['cabbage',.15],mushroom:['mushroom',.4],cauli:['cauliflower',.2],eggplant:['eggplant',.3],peas:['pea',.2],sweetpot:['sweet potato',.2],tomatof:['tomato',.3]};
const C={rice:['rice bowl','🍚',{rice:.1}],pasta:['pasta','🍝',{pasta:.2}],potato:['potato bake','🥔',{potato:.2}],noodle:['noodle stir-fry','🍜',{noodles:.3}],buck:['buckwheat skillet','🥘',{buckwheat:.1}],wrap:['wrap','🌯',{tortilla:.25}]};
const pk=Object.keys(P),vk=Object.keys(V),ck=Object.keys(C),N=[...Array(500).keys()];
const dn=N.map(i=>{const p=pk[i%11],v=vk[(i*5+(i/11|0))%12],c=ck[(i*7+(i/12|0))%6];
  if((p=='cheese'&&['rice','noodle','buck'].includes(c))||(p=='egg'&&c=='pasta'))return['','',{}];
  return[`${cap(P[p][0])} & ${V[v][0]} ${C[c][0]}`,C[c][1],Object.assign({onion:.05,oil:.01},P[p][2],{[v]:V[v][1]},C[c][2])]}).filter(x=>x[0]);
const lg=['lentil','chickpea','bean'];
const soup=N.slice(0,36).map(i=>{const p=lg[i%3],v=vk[(i/3|0)%12];return[`${cap(p)} & ${V[v][0]} soup`,'🍲',Object.assign({potato:.1,onion:.05},P[p][2],{[v]:V[v][1]})]});
const wr=N.slice(0,60).map(i=>{const p=pk[i%11],v=vk[(i*5+1)%12];return[`${cap(P[p][0])} & ${V[v][0]} lunch wrap`,'🌯',Object.assign({tortilla:.25},P[p][2],{[v]:V[v][1]})]});
const bw=N.slice(0,60).map(i=>{const p=pk[(i*3+1)%11],v=vk[(i*7+2)%12];return[`${cap(P[p][0])} & ${V[v][0]} lunch bowl`,'🥗',Object.assign({rice:.08},P[p][2],{[v]:V[v][1]})]}).filter(x=>!/Cheese/.test(x[0]));
const gr=[['Oat porridge','🥣',{oats:.1}],['Rice porridge','🍚',{rice:.08}],['Buckwheat porridge','🥣',{buckwheat:.08}]],ml=[['milk',{milk:.25}],['soy milk',{soymilk:.25}]],fr=[['banana',{banana:.15}],['apple',{apple:.15}],['raisins',{raisin:.05}]];
const por=gr.flatMap(g=>ml.flatMap(m=>fr.map(f=>[`${g[0]} with ${m[0]} & ${f[0]}`,g[1],Object.assign({},g[2],m[1],f[1])])));
const tp=(a,e,f)=>vk.map(v=>[a.replace('#',V[v][0]),e,Object.assign({[v]:V[v][1]},f)]);
const sk=[['carrot',{carrot:.15}],['pepper',{pepper:.15}],['cucumber',{cucumber:.15}],['zucchini',{zucchini:.2}]],dp=[['chickpea dip',{chickpea:.5,oil:.01}],['yogurt dip',{yog:.15}],['cheese cubes',{cheese:.1}]];
const vsd=sk.flatMap(s=>dp.map(d=>[`${cap(s[0])} sticks with ${d[0]}`,'🥕',Object.assign({},s[1],d[1])]));
const rc=[['banana',{banana:.15}],['peanut butter',{pbutter:.05}],['cheese',{cheese:.1}],['tomato',{tomatof:.15}],['cucumber',{cucumber:.15}],['tuna',{tuna:.3}]].map(t=>[`Rice cakes with ${t[0]}`,'🍘',Object.assign({ricecake:.3},t[1])]);
const ms=[['Roasted chickpeas','🫘',{chickpea:.5,oil:.01}],['Popcorn with sunflower seeds','🍿',{popcorn:.06,sunseed:.05}],['Sweet potato chips','🍠',{sweetpot:.2,oil:.02}],['Baked carrot fries','🥕',{carrot:.2,oil:.01}],['Yogurt with raisins','🍶',{yog:.3,raisin:.05}],['Yogurt with banana','🍌',{yog:.3,banana:.15}],['Yogurt with sunflower seeds','🌻',{yog:.3,sunseed:.05}],['Boiled egg & tomato','🥚',{egg:.2,tomatof:.15}],['Boiled egg & carrot','🥚',{egg:.2,carrot:.1}],['Boiled egg & pepper','🥚',{egg:.2,pepper:.1}],['Apple with sunflower seeds','🍎',{apple:.2,sunseed:.05}],['Cheese & tomato bites','🧀',{cheese:.1,tomatof:.15}],['Tuna-stuffed pepper','🐟',{tuna:.3,pepper:.2}],['Banana slices with raisins','🍌',{banana:.2,raisin:.05}],['Cucumber & tomato salad','🥗',{cucumber:.15,tomatof:.15,oil:.01}],['Spiced potato wedges','🥔',{potato:.15,oil:.02}],['Peanut butter oat balls','🥜',{oats:.08,pbutter:.06}]];
fill('d',53,dn);fill('l',18,soup);fill('l',16,wr);fill('l',15,bw);
fill('b',12,por);fill('b',8,tp('Egg & # toast','🍳',{egg:.2,bread:.1,oil:.01}));fill('b',6,tp('Tofu scramble with #','🥢',{tofu:.25,oil:.01}));fill('b',5,tp('Cheese & # toast','🧀',{bread:.1,cheese:.12}));
fill('s',10,vsd);fill('s',6,rc);fill('s',14,ms);
})();
// ---- International dishes: each recipe gets a cuisine tag ----
(()=>{
const tag=n=>/palacsinta|lecsó|főzelék|paprikás|túrós|káposztás|Sausage & potatoes|Potato & egg bake|Cabbage & sausage/i.test(n)?'Hungarian':/curry/i.test(n)?'Indian':/stir-fry/i.test(n)?'Chinese':/wrap|quesadilla/i.test(n)?'Mexican':/pasta|soup|bolognese/i.test(n)?'European':'Everyday';
R.forEach(r=>r.cu=tag(r.name));
const seen=new Set(R.map(r=>r.name));
const I=[
['Hungarian','b','Egg & pepper-tomato scramble (tojásos lecsó)','🍳',{egg:.3,pepper:.15,tomatof:.2,onion:.05,oil:.01}],
['Hungarian','b','Quark spread on bread (körözött)','🥖',{quark:.3,bread:.15,pepper:.05,onion:.03}],
['Hungarian','l','Pea főzelék (borsófőzelék)','🟢',{peas:.3,flour:.03,onion:.05,egg:.15}],
['Hungarian','l','Lentil főzelék','🫘',{lent:.12,flour:.03,onion:.05,oil:.01}],
['Hungarian','l','Goulash (gulyás)','🍲',{beefmince:.2,potato:.2,carrot:.1,onion:.1,pepper:.1,tpaste:.1}],
['Hungarian','d','Stuffed cabbage (töltött káposzta)','🥬',{cabbage:.2,beefmince:.25,rice:.05,onion:.05,tpaste:.1}],
['Hungarian','d','Breaded cauliflower with potatoes (rántott karfiol)','🥦',{cauli:.3,flour:.05,egg:.15,oil:.05,potato:.2}],
['Hungarian','s','Cheese biscuits (pogácsa-style)','🧀',{flour:.08,cheese:.1,yog:.05,oil:.02}],
['European','b','Spanish potato omelette (tortilla española)','🥔',{egg:.3,potato:.2,onion:.05,oil:.03}],
['European','b','French toast','🍞',{bread:.15,egg:.15,milk:.1,sugar:.02}],
['European','b','Swiss-style muesli with yogurt','🥣',{oats:.08,yog:.3,apple:.1,raisin:.03}],
['European','l','Minestrone','🍲',{beans:.3,pasta:.1,carrot:.1,potato:.1,tomato:.3,onion:.05}],
['European','l','Greek salad with pita','🥗',{cucumber:.2,tomatof:.3,cheese:.15,onion:.05,pita:.2,olive:.02}],
['European','l','Spaghetti aglio e olio','🍝',{pasta:.2,garlic:.2,olive:.03,chili:.02}],
['European','l','Spanish chickpea & spinach stew','🥘',{chickpea:.5,spinach:.2,tpaste:.1,onion:.05,garlic:.05}],
['European','d','Spaghetti pomodoro','🍝',{pasta:.2,tomato:.5,garlic:.1,olive:.02}],
['European','d','Moussaka-style eggplant bake','🍆',{eggplant:.4,potato:.1,beefmince:.15,tomato:.4,onion:.05,cheese:.1}],
['European','d','Mushroom risotto-style rice','🍄',{rice:.1,mushroom:.4,onion:.05,cheese:.1,olive:.02}],
['European','d','German potato pancakes (Kartoffelpuffer)','🥔',{potato:.25,egg:.1,flour:.03,onion:.05,oil:.04}],
['European','d','Fish & potato wedges','🐟',{whitefish:.25,potato:.2,flour:.03,oil:.04}],
['European','d','Lentil bolognese with spaghetti','🍝',{pasta:.2,lent:.1,tomato:.5,carrot:.1,onion:.05}],
['European','d','Greek lemon chicken & potatoes','🍗',{chick:.2,potato:.25,lime:.1,garlic:.05,olive:.02}],
['European','s','Tomato bruschetta','🍅',{bread:.15,tomatof:.25,garlic:.05,olive:.01}],
['European','s','Tzatziki with pita','🥒',{yog:.2,cucumber:.1,pita:.15,garlic:.02}],
['American','b','Banana pancakes','🥞',{flour:.1,egg:.15,milk:.2,banana:.15}],
['American','b','Breakfast burrito','🌯',{tortilla:.25,egg:.3,beans:.3,cheese:.1,pepper:.1}],
['American','b','Avocado toast','🥑',{bread:.1,avocado:.5,lime:.1}],
['American','l','Grilled cheese sandwich','🧀',{bread:.15,cheese:.2}],
['American','l','Chicken salad sandwich','🥪',{bread:.15,chick:.1,yog:.1,carrot:.05}],
['American','l','Black bean burger','🍔',{beans:.5,oats:.05,bread:.15,onion:.05,egg:.1}],
['American','l','Mac & cheese','🧀',{pasta:.2,cheese:.25,milk:.15}],
['American','l','Sweetcorn chowder','🌽',{corn:.5,potato:.15,milk:.2,onion:.05}],
['American','d','Chili con carne','🌶️',{beefmince:.2,beans:.5,tomato:.5,onion:.1,chili:.02}],
['American','d','Sloppy joes','🍔',{beefmince:.2,bread:.2,tomato:.3,onion:.05}],
['American','d','Baked chicken & potatoes','🍗',{chick:.2,potato:.25,carrot:.1,oil:.02}],
['American','d','Vegan black bean & corn chili','🥘',{beans:.5,corn:.3,tomato:.5,onion:.1,pepper:.1}],
['American','s','Apple oat crumble cup','🍎',{apple:.2,oats:.06,sugar:.02}],
['American','s','Peanut butter banana bites','🍌',{pbutter:.05,banana:.15,oats:.03}],
['Mexican','b','Huevos rancheros','🍳',{egg:.3,tortilla:.25,beans:.3,tomato:.3}],
['Mexican','b','Chilaquiles','🌮',{tortilla:.4,tomato:.4,egg:.2,cheese:.1}],
['Mexican','l','Chicken tacos','🌮',{tortilla:.25,chick:.12,tomatof:.15,avocado:.2,lime:.05}],
['Mexican','l','Mexican rice & beans','🍚',{rice:.1,beans:.4,tomato:.3,onion:.05}],
['Mexican','l','Veggie burrito','🌯',{tortilla:.25,rice:.08,beans:.3,corn:.2,pepper:.1,avocado:.2}],
['Mexican','d','Beef tacos','🌮',{tortilla:.3,beefmince:.2,tomatof:.15,cheese:.1}],
['Mexican','d','Bean enchiladas','🌯',{tortilla:.3,beans:.4,tomato:.4,cheese:.15}],
['Mexican','d','Arroz con pollo','🍗',{rice:.1,chick:.12,peas:.1,tomato:.3,onion:.05}],
['Mexican','d','Sweet potato & black bean tacos','🍠',{tortilla:.25,sweetpot:.2,beans:.3,lime:.05}],
['Mexican','s','Guacamole with carrot sticks','🥑',{avocado:.5,lime:.1,carrot:.15}],
['Mexican','s','Corn & tomato salsa','🌽',{corn:.3,tomatof:.15,onion:.03,lime:.05}],
['Indian','b','Masala omelette','🍳',{egg:.3,onion:.05,tomatof:.1,curry:.01,oil:.01}],
['Indian','b','Savoury veggie pancakes (cheela-style)','🥞',{flour:.1,carrot:.1,onion:.05,curry:.01,oil:.02}],
['Indian','l','Red lentil dal with rice','🍛',{lent:.15,rice:.1,onion:.05,garlic:.05,curry:.02,tomato:.2}],
['Indian','l','Chana masala','🟡',{chickpea:.5,tomato:.4,onion:.1,curry:.02,ginger:.05}],
['Indian','l','Aloo gobi','🥔',{potato:.2,cauli:.2,onion:.05,curry:.02}],
['Indian','l','Egg curry with rice','🥚',{egg:.3,tomato:.3,onion:.1,curry:.02,rice:.1}],
['Indian','d','Chicken curry with rice','🍛',{chick:.15,rice:.1,tomato:.3,onion:.1,curry:.02,yog:.1}],
['Indian','d','Spinach & tofu curry (palak-style)','🥬',{spinach:.4,tofu:.25,onion:.1,curry:.02,rice:.1}],
['Indian','d','Vegetable korma','🥘',{coconut:.4,potato:.1,carrot:.1,peas:.15,curry:.02,rice:.1}],
['Indian','d','Lentil & sweet potato curry','🍠',{lent:.12,sweetpot:.2,coconut:.3,curry:.02,rice:.1}],
['Indian','s','Spiced roasted chickpeas','🟡',{chickpea:.5,oil:.01,curry:.01}],
['Indian','s','Masala potato wedges','🥔',{potato:.15,oil:.02,curry:.01}],
['Middle Eastern','b','Shakshuka','🍳',{egg:.3,tomato:.5,pepper:.15,onion:.1,pita:.2}],
['Middle Eastern','b','Yogurt & cucumber with pita','🥒',{yog:.3,pita:.2,cucumber:.1,olive:.01}],
['Middle Eastern','l','Falafel-style chickpea patties in pita','🧆',{chickpea:.5,pita:.25,flour:.03,onion:.05,tomatof:.15,oil:.03}],
['Middle Eastern','l','Hummus plate with pita','🫓',{chickpea:.5,tahini:.05,lime:.1,pita:.25,cucumber:.15}],
['Middle Eastern','l','Mujaddara (lentils, rice & onions)','🍚',{lent:.12,rice:.1,onion:.15,oil:.02}],
['Middle Eastern','l','Couscous salad with chickpeas','🥗',{couscous:.15,chickpea:.5,cucumber:.15,tomatof:.2,lime:.05}],
['Middle Eastern','d','Chicken shawarma-style pita','🌯',{chick:.15,pita:.25,yog:.1,tomatof:.15,onion:.05}],
['Middle Eastern','d','Kofta with couscous','🍢',{beefmince:.2,couscous:.15,onion:.05,yog:.1}],
['Middle Eastern','d','Eggplant & chickpea stew','🍆',{eggplant:.3,chickpea:.5,tomato:.4,onion:.1}],
['Middle Eastern','d','Turkish-style red lentil soup','🍲',{lent:.15,carrot:.1,onion:.05,potato:.1,lime:.05}],
['Middle Eastern','s','Hummus with carrot sticks','🥕',{chickpea:.5,tahini:.05,carrot:.15}],
['Middle Eastern','s','Eggplant dip with pita','🍆',{eggplant:.3,tahini:.03,pita:.15,lime:.05}],
['Chinese','b','Congee with egg','🍚',{rice:.1,egg:.2,ginger:.03,soy:.02}],
['Chinese','b','Egg & scallion pancake','🥞',{flour:.08,egg:.2,onion:.05,oil:.02}],
['Chinese','l','Egg fried rice','🍳',{rice:.1,egg:.2,peas:.1,carrot:.1,soy:.03,oil:.02}],
['Chinese','l','Tomato & egg with rice','🍅',{egg:.3,tomatof:.4,rice:.1,sugar:.01,oil:.02}],
['Chinese','l','Chicken chow mein','🍜',{noodles:.3,chick:.12,cabbage:.1,carrot:.1,soy:.03}],
['Chinese','l','Hot & sour style tofu soup','🍲',{tofu:.2,mushroom:.2,egg:.1,soy:.02,carrot:.05}],
['Chinese','d','Kung pao-style chicken','🥜',{chick:.15,pepper:.1,pbutter:.03,rice:.1,soy:.03,chili:.02}],
['Chinese','d','Mapo-style tofu with rice','🌶️',{tofu:.3,mince:.1,rice:.1,chili:.03,soy:.03,ginger:.03}],
['Chinese','d','Sweet & sour chicken','🍗',{chick:.15,pepper:.1,carrot:.05,sugar:.03,tpaste:.1,rice:.1}],
['Chinese','d','Broccoli & beef with rice','🥦',{beefmince:.15,broccoli:.3,rice:.1,soy:.03,ginger:.03,garlic:.05}],
['Chinese','d','Garlic eggplant with rice','🍆',{eggplant:.35,rice:.1,soy:.03,garlic:.05,oil:.03}],
['Chinese','s','Cucumber salad with soy & sesame','🥒',{cucumber:.2,soy:.01,sesame:.01}],
['Japanese','b','Tamagoyaki (rolled omelette) with rice','🍳',{egg:.3,rice:.1,soy:.01,sugar:.01}],
['Japanese','b','Tuna onigiri','🍙',{rice:.12,tuna:.3,soy:.01}],
['Japanese','l','Oyakodon (chicken & egg rice bowl)','🍚',{chick:.12,egg:.2,rice:.1,onion:.1,soy:.03,sugar:.01}],
['Japanese','l','Yakisoba','🍜',{udon:.3,cabbage:.15,carrot:.1,mince:.08,soy:.03}],
['Japanese','l','Tofu & mushroom soup','🍲',{tofu:.2,mushroom:.2,carrot:.05,soy:.02}],
['Japanese','l','Japanese curry rice','🍛',{rice:.1,potato:.15,carrot:.1,onion:.1,curry:.03,flour:.02}],
['Japanese','d','Teriyaki chicken with broccoli & rice','🍗',{chick:.15,rice:.1,soy:.04,sugar:.02,ginger:.03,broccoli:.2}],
['Japanese','d','Chicken katsu with cabbage','🍤',{chick:.15,flour:.03,egg:.1,bread:.05,oil:.04,rice:.1,cabbage:.1}],
['Japanese','d','Udon with mushrooms & egg','🍜',{udon:.3,mushroom:.2,carrot:.1,soy:.03,egg:.1}],
['Japanese','d','Tofu donburi','🍚',{tofu:.25,rice:.1,onion:.05,soy:.03,egg:.1}],
['Japanese','s','Sesame rice balls','🍙',{rice:.1,sesame:.02,soy:.005}],
['Japanese','s','Edamame-style salted peas','🟢',{peas:.3}],
['Korean','b','Korean egg toast','🍞',{bread:.15,egg:.2,cabbage:.05,sugar:.01}],
['Korean','l','Bibimbap','🍚',{rice:.1,egg:.2,spinach:.15,carrot:.1,zucchini:.1,soy:.02,chili:.02,sesame:.01}],
['Korean','l','Spicy cabbage fried rice (kimchi-style)','🥬',{rice:.1,cabbage:.15,egg:.2,chili:.03,soy:.02}],
['Korean','l','Japchae-style glass noodles','🍜',{noodles:.3,carrot:.1,spinach:.15,mushroom:.15,soy:.03,sesame:.01}],
['Korean','d','Bulgogi-style beef bowl','🥩',{beefmince:.2,rice:.1,onion:.1,soy:.04,sugar:.02,garlic:.05}],
['Korean','d','Dakgalbi-style spicy chicken','🌶️',{chick:.15,cabbage:.15,sweetpot:.15,chili:.04,soy:.03}],
['Korean','d','Soft tofu stew (sundubu-style)','🍲',{tofu:.3,mushroom:.2,zucchini:.15,chili:.03,egg:.1}],
['Korean','s','Seasoned cucumber (Korean-style)','🥒',{cucumber:.2,chili:.01,sesame:.01,soy:.005}],
['Southeast Asian','b','Thai-style omelette over rice','🍳',{egg:.3,rice:.1,soy:.01,oil:.03}],
['Southeast Asian','b','Street-style banana pancakes','🍌',{flour:.1,egg:.1,banana:.2,milk:.1}],
['Southeast Asian','l','Pad thai-style noodles','🍜',{noodles:.3,egg:.15,tofu:.15,pbutter:.03,lime:.1,soy:.02,carrot:.05}],
['Southeast Asian','l','Vietnamese noodle salad (bún-style)','🥗',{noodles:.3,carrot:.15,cucumber:.2,lime:.1,tofu:.15,soy:.02}],
['Southeast Asian','l','Nasi goreng (Indonesian fried rice)','🍚',{rice:.1,egg:.2,chili:.03,soy:.03,onion:.05,peas:.1}],
['Southeast Asian','l','Gado-gado (vegetables with peanut sauce)','🥜',{potato:.15,cabbage:.15,egg:.2,pbutter:.06,tofu:.15,lime:.05}],
['Southeast Asian','d','Thai coconut curry with tofu','🍛',{coconut:.4,tofu:.25,pepper:.15,zucchini:.2,curry:.02,rice:.1}],
['Southeast Asian','d','Thai basil-style chicken with egg & rice','🍗',{chick:.15,pepper:.15,garlic:.05,soy:.03,rice:.1,egg:.2}],
['Southeast Asian','d','Filipino chicken adobo','🍗',{chick:.2,soy:.05,garlic:.1,rice:.1}],
['Southeast Asian','d','Coconut noodle soup (laksa-style)','🍜',{noodles:.3,coconut:.4,tofu:.2,curry:.02,spinach:.15}],
['Southeast Asian','d','Chicken satay with rice','🍢',{chick:.15,pbutter:.06,coconut:.1,rice:.1,cucumber:.15,soy:.02}],
['Southeast Asian','s','Fried bananas (pisang goreng)','🍌',{banana:.3,flour:.05,oil:.04,sugar:.01}],
['Southeast Asian','s','Cucumber salad with lime & chili','🥒',{cucumber:.2,lime:.1,chili:.01}],
['African','b','Banana & egg skillet','🍌',{banana:.3,egg:.2,oil:.03}],
['African','l','Ethiopian-style lentil stew','🥘',{lent:.15,onion:.15,tpaste:.1,garlic:.05,ginger:.03}],
['African','d','Jollof rice with chicken','🍛',{rice:.12,chick:.12,tomato:.4,onion:.1,pepper:.1,tpaste:.1}],
['African','d','West African peanut stew with sweet potato','🥜',{chick:.12,pbutter:.08,sweetpot:.2,tomato:.3,rice:.1}]
];
I.forEach(([cu,m,name,em,ing])=>{if(seen.has(name))return;seen.add(name);R.push({id:R.length,meal:m,name,em,ing,cu})});
})();



// Additional balanced, budget-oriented recipes to broaden the collection.
(()=>{
  const additions=[
    ['l','Shakshuka with peppers','🍳',{egg:.25,tomatof:.25,pepper:.2,onion:.05,garlic:.01,oil:.01},'Middle Eastern'],
    ['l','Greek chickpea cucumber salad','🥗',{chickpea:.5,cucumber:.2,tomatof:.15,olive:.01,lime:.03},'European'],
    ['d','Spinach & lentil dal with rice','🥘',{lent:.15,spinach:.2,onion:.05,ginger:.02,garlic:.01,curry:.02,rice:.1},'Indian'],
    ['d','Tofu peanut noodle bowl','🍜',{tofu:.2,noodles:.25,pbutter:.04,carrot:.1,soy:.02,lime:.03},'Southeast Asian'],
    ['d','Chicken fajita rice bowl','🌯',{chick:.15,pepper:.2,onion:.08,rice:.1,lime:.03,olive:.01},'Mexican'],
    ['b','Apple cinnamon overnight oats','🍎',{oats:.12,milk:.2,apple:.15,raisin:.02},'European'],
    ['b','Tomato avocado toast','🥑',{bread:.12,tomatof:.15,avocado:.5,lime:.02},'American'],
    ['d','Roasted cauliflower & chickpea traybake','🥦',{cauli:.5,chickpea:.5,curry:.02,olive:.02,yog:.08},'Middle Eastern'],
    ['l','Egg fried rice with peas','🍚',{rice:.12,egg:.2,peas:.12,carrot:.08,soy:.01},'Chinese'],
    ['s','Cucumber hummus-style chickpea bowl','🫘',{chickpea:.25,cucumber:.15,tahini:.02,lime:.02,olive:.01},'Middle Eastern'],
    ['d','Turkey & zucchini skillet','🍲',{turkey:.2,zucchini:.2,tomatof:.15,garlic:.01,olive:.01},'European'],
    ['l','Warm buckwheat mushroom bowl','🥣',{buckwheat:.12,mushroom:.2,spinach:.1,onion:.03,olive:.01},'European']
  ];
  const existing=new Set(R.map(recipe=>recipe.name));
  additions.forEach(([meal,name,em,ing,cu])=>{if(existing.has(name))return;R.push({id:R.length,meal,name,em,ing,cu});});
})();

// Recipe-card reference data. Ingredient quantities are estimates derived from
// the planner's pack-fraction recipe data; adjust to taste and appetite.
const INGREDIENT_UNITS = {
  rice:1000,pasta:500,egg:10,bread:500,oats:500,milk:1000,yog:400,cheese:200,
  banana:1000,apple:1000,chick:1000,mince:500,sausage:300,tuna:160,beans:400,
  lent:500,chickpea:400,tomato:400,potato:2000,onion:1000,pepper:500,carrot:1000,
  spinach:300,tortilla:8,oil:1000,pbutter:350,coconut:400,tofu:400,flour:1000,
  sugar:1000,quark:250,zucchini:1000,cabbage:1000,popcorn:500,cucumber:1000,
  noodles:250,soymilk:1000,mushroom:250,broccoli:500,cauli:1,sweetpot:1000,
  eggplant:500,peas:450,turkey:500,ricecake:100,buckwheat:500,sunseed:200,
  raisin:200,tomatof:500,soy:250,curry:50,ginger:100,garlic:3,tahini:180,
  pita:6,couscous:500,avocado:2,lime:3,beefmince:500,udon:2,sesame:100,
  chili:250,tpaste:140,olive:500,whitefish:400,corn:340
};
const INGREDIENT_MEASURES = {
  rice:'g',pasta:'g',egg:'pcs',bread:'g',oats:'g',milk:'ml',yog:'g',cheese:'g',
  banana:'g',apple:'g',chick:'g',mince:'g',sausage:'g',tuna:'g',beans:'g',
  lent:'g',chickpea:'g',tomato:'g',potato:'g',onion:'g',pepper:'g',carrot:'g',
  spinach:'g',tortilla:'pcs',oil:'ml',pbutter:'g',coconut:'ml',tofu:'g',flour:'g',
  sugar:'g',quark:'g',zucchini:'g',cabbage:'g',popcorn:'g',cucumber:'g',
  noodles:'g',soymilk:'ml',mushroom:'g',broccoli:'g',cauli:'pcs',sweetpot:'g',
  eggplant:'g',peas:'g',turkey:'g',ricecake:'g',buckwheat:'g',sunseed:'g',
  raisin:'g',tomatof:'g',soy:'ml',curry:'g',ginger:'g',garlic:'pcs',tahini:'g',
  pita:'pcs',couscous:'g',avocado:'pcs',lime:'pcs',beefmince:'g',udon:'packs',
  sesame:'g',chili:'ml',tpaste:'g',olive:'ml',whitefish:'g',corn:'g'
};
function recipeMethod(recipe) {
  const n = recipe.name.toLowerCase();
  const specific={
    'Shakshuka with peppers':{tools:['Wide lidded frying pan','Chopping board','Chef’s knife','Wooden spoon','Lid'],time:'20–25 min',steps:['Dice the onion and pepper; mince the garlic. Open the tomatoes and crack the eggs into separate cups.','Warm a little oil in a wide pan over medium heat. Cook the onion and pepper for 6–8 minutes until softened.','Stir in the garlic and paprika or cumin if available; cook for 30 seconds, then add tomatoes and simmer for 8–10 minutes until thickened.','Make small wells in the sauce and slide an egg into each. Cover and cook gently for 5–8 minutes, until the whites are set.','Serve directly from the pan with bread if desired. Keep the yolks softer or cook them through to your preference.']},
    'Greek chickpea cucumber salad':{tools:['Colander','Chopping board','Chef’s knife','Mixing bowl','Small jar or cup'],time:'10–15 min',steps:['Drain and rinse the chickpeas well, then leave them to drain while you prepare the vegetables.','Dice the cucumber and tomatoes into similar-sized pieces. Finely slice a little onion if you enjoy it.','Whisk olive oil with lime or lemon juice, black pepper and dried herbs in a small cup.','Toss chickpeas and vegetables with the dressing. Taste and adjust with citrus and herbs.','Serve immediately, or chill in a covered container. Keep refrigerated and use within 2 days.']},
    'Spinach & lentil dal with rice':{tools:['Two saucepans with lids','Fine sieve','Chopping board','Chef’s knife','Wooden spoon'],time:'30–40 min',steps:['Rinse the lentils until the water runs mostly clear. Rinse the rice separately. Dice the onion and finely chop ginger and garlic.','Put rice in one saucepan with the packet-recommended water ratio. Bring to a boil, cover and simmer until tender.','In the second pan, soften the onion in a little oil for 4–5 minutes. Add ginger, garlic and curry spices and stir for 30 seconds.','Add lentils and water according to the lentil packet. Simmer, stirring occasionally, until soft; add water if it becomes too thick.','Fold in spinach and cook until wilted. Serve over rice. Check the lentils are fully tender before serving.']},
    'Tofu peanut noodle bowl':{tools:['Saucepan','Colander','Non-stick frying pan','Small mixing bowl','Whisk or fork','Chef’s knife'],time:'20–25 min',steps:['Pat the tofu dry and cut it into cubes. Slice the carrot thinly so it cooks quickly.','Cook noodles according to the packet, then drain and rinse briefly if the packet recommends it.','Mix peanut butter with lime juice and a little warm water until pourable. Add a small amount of soy sauce, checking its sodium label.','Pan-fry tofu in a little oil until golden on several sides. Add carrot and cook until just tender.','Toss noodles with tofu, carrot and peanut sauce. Add warm water to loosen the sauce if needed.']},
    'Chicken fajita rice bowl':{tools:['Saucepan with lid','Frying pan','Chopping board','Chef’s knife','Food thermometer (recommended)'],time:'25–35 min',steps:['Rinse the rice and cook it using the packet instructions. Slice the chicken, pepper and onion; keep raw chicken separate from vegetables.','Heat a little oil in a frying pan. Cook the pepper and onion for 5–7 minutes until softened, then transfer to a plate.','Cook chicken strips in the same pan with paprika, cumin and black pepper. Turn regularly until fully cooked; the centre should reach 74°C.','Return the vegetables to the pan and squeeze over lime juice. Stir until everything is piping hot.','Serve the chicken and vegetables over rice. Wash hands, knife and board after handling raw chicken.']},
    'Apple cinnamon overnight oats':{tools:['Lidded jar or bowl','Grater or knife','Spoon','Refrigerator'],time:'5 min prep + overnight chilling',steps:['Add oats to a jar or bowl. Pour in milk and stir until all the oats are moistened.','Grate or finely dice the apple. Stir most of it through the oats with cinnamon.','Cover and refrigerate for at least 4 hours, preferably overnight. Do not leave the mixture at room temperature overnight.','In the morning, stir and loosen with a splash of milk if needed.','Top with the remaining apple and raisins if using. Keep refrigerated and eat within 2 days.']},
    'Tomato avocado toast':{tools:['Toaster or frying pan','Chopping board','Chef’s knife','Fork','Small bowl'],time:'10 min',steps:['Toast the bread until crisp using a toaster or dry frying pan.','Halve the avocado, remove the stone safely and scoop the flesh into a bowl. Mash with lime juice and black pepper.','Dice the tomato and let excess juice drain so the toast stays crisp.','Spread avocado over the toast and top with tomato.','Serve straight away. Add herbs or chilli only if they suit your preferences.']},
    'Roasted cauliflower & chickpea traybake':{tools:['Oven','Large baking tray','Colander','Chopping board','Chef’s knife','Mixing bowl'],time:'30–40 min',steps:['Heat the oven to 200°C. Drain and rinse the chickpeas, then pat them dry. Cut cauliflower into similar-sized florets.','Toss cauliflower and chickpeas with a little oil, curry powder, paprika and black pepper.','Spread in a single layer on a baking tray, leaving space so the vegetables roast rather than steam.','Roast for 25–30 minutes, turning once halfway, until cauliflower is browned and tender and chickpeas are hot.','Serve with yogurt and herbs if desired. Allow leftovers to cool promptly and refrigerate.']},
    'Egg fried rice with peas':{tools:['Wok or large frying pan','Saucepan (if rice is not already cooked)','Spatula','Small bowl','Chopping board'],time:'15–20 min',steps:['Use cooked, chilled rice if possible. If cooking rice now, spread it out to cool quickly and do not leave it at room temperature for long.','Beat the eggs in a small bowl. Dice the carrot and thaw peas if frozen.','Heat a little oil in a wok or large pan. Scramble the eggs until just set, then transfer to a plate.','Stir-fry carrot and peas until hot and tender. Add rice and break up any clumps, tossing until steaming hot throughout.','Return the egg to the pan. Add a small splash of soy sauce if wanted, checking the sodium label, and serve immediately.']},
    'Turkey & zucchini skillet':{tools:['Large frying pan','Chopping board','Chef’s knife','Wooden spoon','Food thermometer (recommended)'],time:'20–25 min',steps:['Dice the zucchini and tomatoes. Keep raw turkey separate from ready-to-eat ingredients.','Warm a little oil in a large pan. Add turkey mince and break it into small pieces with a wooden spoon.','Cook until no pink remains and the centre reaches 74°C on a food thermometer.','Add zucchini, tomato and garlic. Simmer for 6–8 minutes until the zucchini is tender and the sauce thickens.','Taste, finish with herbs and black pepper, and serve with rice or buckwheat if desired.']}
  };
  if(specific[recipe.name])return specific[recipe.name];
  if (/soup|stew|dal|chili|curry|goulash|főzelék/.test(n))
    return {tools:['Large pot','Chopping board','Chef’s knife','Wooden spoon','Measuring jug'],steps:['Wash and prepare the vegetables. Dice the onion and cut the remaining vegetables into bite-sized pieces.','Warm a little oil in a large pot. Add the onion and cook until softened, then stir in the spices or aromatics.','Add the main ingredients and enough water or stock to cover as appropriate. Bring to a gentle simmer.','Cook until the vegetables and pulses are tender, stirring occasionally. Add extra liquid if needed.','Taste and adjust with herbs, spices, lemon or vinegar; add salt only if it suits your needs. If using meat, make sure it is cooked all the way through.'],time:'25–40 min'};
  if (/pasta|noodle|spaghetti|mac & cheese|udon|yakisoba/.test(n))
    return {tools:['Large saucepan','Colander','Frying pan','Chopping board','Chef’s knife'],steps:['Bring a saucepan of water to a boil (skip added salt for a salt-conscious version). Prepare and chop the vegetables or other ingredients.','Cook the pasta or noodles according to the packet instructions, then drain and reserve a little cooking water.','Meanwhile, heat a little oil in a frying pan. Cook the protein and vegetables until tender and safely cooked through.','Add the sauce ingredients and a splash of pasta water. Toss together until coated and hot.','Combine with the drained pasta and a splash of cooking water. Taste and finish with herbs, pepper or lemon; add salt only if desired.'],time:'15–30 min'};
  if (/bake|omelette|omelet|frittata|pancake|toast|french toast|fritter|quesadilla|tortilla española/.test(n))
    return {tools:['Non-stick frying pan or baking dish','Mixing bowl','Whisk or fork','Spatula','Chopping board','Chef’s knife'],steps:['Prepare the ingredients: wash and chop vegetables, and grate or crumble any cheese.','Whisk the eggs or mix the batter in a bowl where the recipe requires it. Season lightly.','Heat a non-stick pan with a little oil, or preheat the oven if baking.','Add the mixture and cook over medium-low heat until set and cooked through. For an oven-baked version, bake at the temperature shown below.','Rest briefly, portion, and serve.'],time:'15–30 min'};
  if (/rice|risotto|congee|bibimbap|onigiri|porridge|oatmeal|muesli|bowl/.test(n))
    return {tools:['Medium saucepan with lid','Frying pan (if needed)','Measuring cup','Fork or wooden spoon','Chopping board','Chef’s knife'],steps:['Rinse the rice if using rice, then add it to a saucepan with the amount of water recommended on its packet.','Bring to a boil, cover, and simmer gently until tender. Prepare the other ingredients while it cooks.','Cook any meat, tofu, eggs, or vegetables separately in a pan until fully cooked and piping hot.','Assemble the bowl. Add sauce or toppings sparingly, checking the label for salt and added sugar where relevant.','Fluff the rice with a fork and serve warm.'],time:'20–35 min'};
  if (/salad|dip|hummus|guacamole|sticks|slices|bruschetta|tzatziki/.test(n))
    return {tools:['Chopping board','Chef’s knife','Mixing bowl','Spoon','Grater or masher (if needed)'],steps:['Wash and dry all fresh produce. Drain and rinse canned beans or chickpeas where needed.','Chop the vegetables and other ingredients into bite-sized pieces.','Mix the dressing or dip ingredients in a bowl; mash ingredients if making a spread.','Combine and toss. Add a little water or oil to adjust the texture, then finish with lemon, herbs or pepper rather than relying on salt.','Serve straight away, or refrigerate promptly until ready to eat.'],time:'10–20 min'};
  return {tools:['Chopping board','Chef’s knife','Frying pan or saucepan','Wooden spoon or spatula','Measuring cup'],steps:['Wash and prepare the ingredients. Chop vegetables into evenly sized pieces so they cook at a similar rate.','Heat a little oil in a pan over medium heat. Add onion or other aromatics first, if included.','Add the remaining ingredients in order of cooking time. Stir regularly and add a splash of water if the pan becomes dry.','Cook until vegetables are tender and any meat is thoroughly cooked. Season to taste.','Plate up and serve while hot.'],time:'15–30 min'};
}
R.forEach(recipe => {
  const method = recipeMethod(recipe);
  recipe.detail = {
    time:method.time,
    tools:method.tools,
    steps:method.steps,
    ovenC:/bake|oven|roast|crumble|pancake|fritter/i.test(recipe.name) ? 180 : null
  };
});
