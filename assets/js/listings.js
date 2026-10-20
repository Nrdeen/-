(function(){
var PER=9,pg=1;
var S={cat:QS.get('cat')||'',types:QS.get('type')?[QS.get('type')]:[],sex:QS.get('sex')||'',region:QS.get('region')||'',min:QS.get('min')||'',max:QS.get('max')||'',amin:'',amax:'',q:QS.get('q')||'',breeder:QS.get('breeder')||'',ver:0,horn:0,sort:'new'};
var CATL={sheep:'ضأن',goat:'ماعز'};
var rg=$('#fRegion');rg.insertAdjacentHTML('beforeend',REGIONS.map(function(r){return '<option>'+r+'</option>'}).join(''));
var types={};AD.forEach(function(a){types[a.type]=(types[a.type]||0)+1});
$('#fTypes').innerHTML=Object.keys(types).map(function(t){return '<label class="check"><input type="checkbox" name="type" value="'+t+'">'+t+'<em>'+types[t]+'</em></label>'}).join('');
$('#cAll').textContent=AD.length;$('#cSheep').textContent=AD.filter(function(a){return a.cat==='sheep'}).length;$('#cGoat').textContent=AD.filter(function(a){return a.cat==='goat'}).length;
function toUI(){
  $$('input[name=cat]').forEach(function(r){r.checked=r.value===S.cat});
  $$('input[name=sex]').forEach(function(r){r.checked=r.value===S.sex});
  $$('input[name=type]').forEach(function(c){c.checked=S.types.indexOf(c.value)>-1});
  rg.value=S.region;$('#fMin').value=S.min;$('#fMax').value=S.max;$('#fAgeMin').value=S.amin;$('#fAgeMax').value=S.amax;
  $('#fVer').checked=!!S.ver;$('#fHorn').checked=!!S.horn;$('#fSort').value=S.sort;
}
function fromUI(){
  var c=$('input[name=cat]:checked'),x=$('input[name=sex]:checked');
  S.cat=c?c.value:'';S.sex=x?x.value:'';
  S.types=$$('input[name=type]:checked').map(function(i){return i.value});
  S.region=rg.value;S.min=$('#fMin').value;S.max=$('#fMax').value;S.amin=$('#fAgeMin').value;S.amax=$('#fAgeMax').value;
  S.ver=$('#fVer').checked?1:0;S.horn=$('#fHorn').checked?1:0;S.sort=$('#fSort').value;
}
function match(a){
  if(S.cat&&a.cat!==S.cat)return false;
  if(S.types.length&&S.types.indexOf(a.type)<0)return false;
  if(S.sex&&a.sex!==S.sex)return false;
  if(S.region&&a.reg!==S.region)return false;
  if(S.min!==''&&a.price<+S.min)return false;
  if(S.max!==''&&a.price>+S.max)return false;
  if(S.amin!==''&&a.age<+S.amin)return false;
  if(S.amax!==''&&a.age>+S.amax)return false;
  if(S.ver&&!a.v)return false;
  if(S.horn&&!a.horns)return false;
  if(S.breeder&&BREEDERS[a.b].n!==S.breeder)return false;
  if(S.q){var q=S.q.trim(),hay=[a.t,a.type,a.reg,a.d,String(a.id),BREEDERS[a.b].n].join(' ');if(hay.indexOf(q)<0)return false}
  return true;
}
function sorted(l){
  var f={pa:function(a,b){return a.price-b.price},pd:function(a,b){return b.price-a.price},kg:function(a,b){return b.kg-a.kg},rate:function(a,b){return BREEDERS[b.b].rt-BREEDERS[a.b].rt}}[S.sort];
  return f?l.slice().sort(f):l;
}
function chips(){
  var c=[];
  function add(k,t){c.push('<span class="chip">'+esc(t)+'<button type="button" data-rm="'+k+'" aria-label="إزالة">'+ICON('x')+'</button></span>')}
  if(S.cat)add('cat',CATL[S.cat]);
  S.types.forEach(function(t){add('type:'+t,t)});
  if(S.sex)add('sex',SEXL[S.sex]);
  if(S.region)add('region',S.region);
  if(S.min!==''||S.max!=='')add('price','السعر '+(S.min||0)+' – '+(S.max||'∞'));
  if(S.amin!==''||S.amax!=='')add('age','العمر '+(S.amin||0)+' – '+(S.amax||'∞')+' شهراً');
  if(S.ver)add('ver','موثّق');if(S.horn)add('horn','مقرّن');
  if(S.q)add('q','بحث: '+S.q);if(S.breeder)add('breeder',S.breeder);
  $('#chips').innerHTML=c.join('');
}
function pager(n){
  var pages=Math.max(1,Math.ceil(n/PER)),h='';
  if(pages<2){$('#pager').innerHTML='';return}
  h+='<button type="button" data-p="'+(pg-1)+'"'+(pg<2?' disabled':'')+' aria-label="السابق">'+ICON('right')+'</button>';
  for(var i=1;i<=pages;i++)h+='<button type="button" data-p="'+i+'" class="'+(i===pg?'on':'')+'"'+(i===pg?' aria-current="page"':'')+'>'+i+'</button>';
  h+='<button type="button" data-p="'+(pg+1)+'"'+(pg>=pages?' disabled':'')+' aria-label="التالي">'+ICON('left')+'</button>';
  $('#pager').innerHTML=h;
}
function url(){
  var p=new URLSearchParams();
  if(S.cat)p.set('cat',S.cat);if(S.types.length===1)p.set('type',S.types[0]);if(S.sex)p.set('sex',S.sex);
  if(S.region)p.set('region',S.region);if(S.min!=='')p.set('min',S.min);if(S.max!=='')p.set('max',S.max);
  if(S.q)p.set('q',S.q);if(S.breeder)p.set('breeder',S.breeder);
  var s=p.toString();try{history.replaceState(null,'',location.pathname+(s?'?'+s:''))}catch(e){}
}
function render(){
  var l=sorted(AD.filter(match)),n=l.length,pages=Math.max(1,Math.ceil(n/PER));
  if(pg>pages)pg=pages;
  $('#resCount').textContent=fmt(n);
  $('#lGrid').innerHTML=n?cardsHtml(l.slice((pg-1)*PER,pg*PER)):'<div class="empty"><h3>لا توجد إعلانات مطابقة</h3><p>جرّب توسيع السعر أو إزالة بعض الفلاتر.</p><button class="btn" type="button" id="emptyReset">إعادة ضبط الفلاتر</button></div>';
  chips();pager(n);url();if(window.revealAll)revealAll();
}
function reset(){S.cat='';S.types=[];S.sex='';S.region='';S.min='';S.max='';S.amin='';S.amax='';S.q='';S.breeder='';S.ver=0;S.horn=0;pg=1;toUI();render()}
$('#filters').addEventListener('change',function(){fromUI();pg=1;render()});
$('#filters').addEventListener('input',function(e){if(e.target.type==='number'){fromUI();pg=1;render()}});
$('#fSort').addEventListener('change',function(){fromUI();pg=1;render()});
$('#fReset').addEventListener('click',reset);
$('#fToggle').addEventListener('click',function(){$('#filters').classList.toggle('open')});
document.addEventListener('click',function(e){
  var r=e.target.closest('[data-rm]');
  if(r){var k=r.dataset.rm;
    if(k.indexOf('type:')===0)S.types=S.types.filter(function(t){return t!==k.slice(5)});
    else if(k==='price'){S.min='';S.max=''}else if(k==='age'){S.amin='';S.amax=''}
    else if(k==='ver')S.ver=0;else if(k==='horn')S.horn=0;else S[k]=(k==='cat'||k==='sex'||k==='region'||k==='q'||k==='breeder')?'':S[k];
    pg=1;toUI();render();return}
  var p=e.target.closest('[data-p]');
  if(p&&!p.disabled){pg=+p.dataset.p;render();var t=$('.toolbar');if(t)t.scrollIntoView({behavior:'smooth',block:'start'});return}
  if(e.target.id==='emptyReset')reset();
});
toUI();render();
})();
