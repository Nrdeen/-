/* listing cards, favourites and compare (shared) */
var favs=store.get('souq-favs',[]), cmp=store.get('souq-cmp',[]);
function ageText(a){return a.age<12?a.age+' أشهر':Math.floor(a.age/12)+(Math.floor(a.age/12)===1?' سنة':' سنوات')}
function sexLabel(a){return a.goat?(a.sex==='f'?'عنزة':a.sex==='m'?'تيس':'جدي'):(a.sex==='f'?'نعجة':a.sex==='m'?'كبش':'خروف')}
function card(a){
  var b=BREEDERS[a.b],on=favs.indexOf(a.id)>-1,cm=cmp.indexOf(a.id)>-1;
  return '<article class="card" data-id="'+a.id+'">'
   +'<div class="art" style="'+skyOf(a)+'">'+art(a)
   +(a.v?'<span class="badge">'+ICON('shield')+'موثّق</span>':'<span class="badge gold">جديد</span>')
   +'<button class="fav'+(on?' on':'')+'" type="button" data-fav="'+a.id+'" aria-label="المفضلة" aria-pressed="'+on+'">'+ICON('heart')+'</button>'
   +'<button class="cmp'+(cm?' on':'')+'" type="button" data-cmp="'+a.id+'" aria-pressed="'+cm+'">'+ICON('layers')+'قارن</button></div>'
   +'<div class="body"><div class="row1"><div class="price">'+fmt(a.price)+'<small>ر.س</small></div><span class="type">'+a.type+'</span></div>'
   +'<h3><a href="ad.html?id='+a.id+'">'+esc(a.t)+'</a></h3>'
   +'<div class="specs"><span>'+ICON('pin')+a.reg+'</span><span>'+ICON('cal')+ageText(a)+'</span><span>'+ICON('weight')+'~'+a.kg+' كجم</span><span>'+ICON('eye')+sexLabel(a)+'</span></div>'
   +'<footer><div class="by"><span class="avatar" style="background:'+b.c+'">'+b.n.charAt(0)+'</span><div style="min-width:0"><b>'+b.n+'</b><span class="rate">'+ICON('star')+b.rt.toFixed(1)+'</span></div></div><span class="more">التفاصيل '+ICON('left')+'</span></footer></div></article>';
}
function cardsHtml(list){return list.map(card).join('')}
function saveFavs(){store.set('souq-favs',favs)}
function saveCmp(){store.set('souq-cmp',cmp)}
function updFavCount(){var n=favs.length,f=$('#favCount');if(f){f.hidden=!n;f.textContent=n}}
function toggleFav(id){
  var i=favs.indexOf(id);
  if(i>-1){favs.splice(i,1);toast('أُزيل من المفضلة')}else{favs.push(id);toast('أُضيف إلى المفضلة')}
  saveFavs();updFavCount();
  $$('[data-fav="'+id+'"]').forEach(function(b){var on=favs.indexOf(id)>-1;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);var l=b.querySelector('.fav-label');if(l)l.textContent=on?'في المفضلة':'أضف للمفضلة'});
  document.dispatchEvent(new CustomEvent('sq:fav',{detail:id}));
}
function toggleCmp(id){
  var i=cmp.indexOf(id);
  if(i>-1)cmp.splice(i,1);else{if(cmp.length>=3){toast('يمكن مقارنة 3 إعلانات كحد أقصى');return}cmp.push(id)}
  saveCmp();renderTray();
  $$('[data-cmp="'+id+'"]').forEach(function(b){var on=cmp.indexOf(id)>-1;b.classList.toggle('on',on);b.setAttribute('aria-pressed',on)});
  document.dispatchEvent(new CustomEvent('sq:cmp',{detail:id}));
}
function renderTray(){
  var t=$('#tray');if(!t)return;
  if(!cmp.length||/compare\.html/.test(location.pathname)){t.hidden=true;t.innerHTML='';return}
  t.hidden=false;
  t.innerHTML='<div class="tray-in"><span class="tl">'+ICON('layers')+'مقارنة</span>'+cmp.map(function(id){var a=byId(id);return a?'<span class="tchip">'+a.type+' · '+fmt(a.price)+'<button type="button" data-cmp-rm="'+id+'" aria-label="إزالة">'+ICON('x')+'</button></span>':''}).join('')
   +(cmp.length>1?'<a class="btn sm gold" href="compare.html">قارن الآن</a>':'<span style="font-size:13px;opacity:.8">اختر إعلاناً آخر</span>')+'<button class="btn sm ghost" type="button" data-cmp-clear>مسح</button></div>';
}
document.addEventListener('click',function(e){
  var t=e.target,f=t.closest&&t.closest('[data-fav]');
  if(f){e.preventDefault();toggleFav(+f.dataset.fav);return}
  var c=t.closest&&t.closest('[data-cmp]');
  if(c){e.preventDefault();toggleCmp(+c.dataset.cmp);return}
  var r=t.closest&&t.closest('[data-cmp-rm]');
  if(r){cmp=cmp.filter(function(x){return x!==+r.dataset.cmpRm});saveCmp();renderTray();$$('[data-cmp="'+r.dataset.cmpRm+'"]').forEach(function(b){b.classList.remove('on')});document.dispatchEvent(new CustomEvent('sq:cmp'));return}
  if(t.closest&&t.closest('[data-cmp-clear]')){cmp=[];saveCmp();renderTray();$$('[data-cmp].on').forEach(function(b){b.classList.remove('on')});document.dispatchEvent(new CustomEvent('sq:cmp'))}
});
