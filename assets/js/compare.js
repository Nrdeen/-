(function(){
function r(){
  var l=cmp.map(byId).filter(Boolean),box=$('#cmpBox');
  if(l.length<2){box.innerHTML='<div class="empty"><h3>اختر إعلانين على الأقل</h3><p>اضغط على زر «قارن» في بطاقات الإعلانات (حتى 3 إعلانات).</p>'+(l.length?'<p><b>المحدد الآن:</b> '+esc(l[0].t)+'</p>':'')+'<a class="btn" href="listings.html">تصفّح الإعلانات</a></div>';return}
  function best(f,min){var v=l.map(f),t=min?Math.min.apply(null,v):Math.max.apply(null,v);return v.map(function(x){return x===t&&v.filter(function(y){return y===t}).length<v.length})}
  var rows=[
   ['السعر',function(a){return fmt(a.price)+' ر.س'},best(function(a){return a.price},1)],
   ['سعر الكيلو الحي',function(a){return fmt(Math.round(a.price/a.kg))+' ر.س'},best(function(a){return Math.round(a.price/a.kg)},1)],
   ['السلالة',function(a){return a.type}],['الجنس',function(a){return sexLabel(a)}],
   ['العمر',function(a){return ageText(a)}],
   ['الوزن',function(a){return a.kg+' كجم'},best(function(a){return a.kg},0)],
   ['المنطقة',function(a){return a.reg}],['البائع',function(a){return BREEDERS[a.b].n}],
   ['تقييم البائع',function(a){return BREEDERS[a.b].rt.toFixed(1)},best(function(a){return BREEDERS[a.b].rt},0)],
   ['موثّق',function(a){return a.v?'نعم':'لا'}]
  ];
  var h='<div class="tblw"><table class="tbl2 cmp-t"><thead><tr><th></th>'+l.map(function(a){return '<th><div class="cmp-h"><div class="cmp-art" style="'+skyOf(a)+'">'+art(a)+'</div><a href="ad.html?id='+a.id+'">'+esc(a.t)+'</a><button class="btn ghost sm" type="button" data-cmp-rm="'+a.id+'">إزالة</button></div></th>'}).join('')+'</tr></thead><tbody>';
  rows.forEach(function(rw){h+='<tr><th scope="row">'+rw[0]+'</th>'+l.map(function(a,i){return '<td'+(rw[2]&&rw[2][i]?' class="best"':'')+'>'+rw[1](a)+(rw[2]&&rw[2][i]?' ✓':'')+'</td>'}).join('')+'</tr>'});
  h+='</tbody></table></div><p style="color:var(--ink-3);margin-top:14px;font-size:14px">✓ يشير إلى الأفضل في هذا البند (الأقل سعراً، الأعلى تقييماً، الأثقل وزناً).</p>';
  box.innerHTML=h;
}
document.addEventListener('sq:cmp',r);r();
})();
