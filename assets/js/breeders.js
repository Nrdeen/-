(function(){
var L=BREEDERS.slice(0,-1),rg=$('#brRegion');
var regs=[];L.forEach(function(b){if(regs.indexOf(b.r)<0)regs.push(b.r)});
rg.insertAdjacentHTML('beforeend',regs.map(function(r){return '<option>'+r+'</option>'}).join(''));
function r(){
  var s=$('#brSort').value,x=L.filter(function(b){return !rg.value||b.r===rg.value}).sort(function(a,b){return b[s]-a[s]});
  $('#brN').textContent=x.length;
  $('#brGrid').innerHTML=x.length?x.map(function(b){
    var n=AD.filter(function(a){return BREEDERS[a.b]===b}).length;
    return '<article class="breeder"><div class="top"><span class="avatar" style="background:'+b.c+'">'+b.n.charAt(0)+'</span><div><h3>'+b.n+ICON('shield')+'</h3><div class="loc">'+ICON('pin')+b.r+'</div></div></div>'
     +'<dl><div><dt>التقييم</dt><dd>'+b.rt.toFixed(1)+'</dd></div><div><dt>الإعلانات</dt><dd>'+b.ads+'</dd></div><div><dt>سنوات الخبرة</dt><dd>'+b.yrs+'</dd></div></dl><p>'+b.d+'</p>'
     +'<a class="btn ghost" href="listings.html?breeder='+encodeURIComponent(b.n)+'">عرض الإعلانات'+(n?' ('+n+' هنا)':'')+'</a></article>';}).join(''):'<div class="empty"><h3>لا يوجد مربون في هذه المنطقة</h3><p>جرّب منطقة أخرى.</p></div>';
  if(window.revealAll)revealAll();
}
rg.addEventListener('change',r);$('#brSort').addEventListener('change',r);r();
})();
