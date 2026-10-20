(function(){
var hr=$('#hsRegion');if(hr)hr.insertAdjacentHTML('beforeend',REGIONS.map(function(r){return '<option>'+r+'</option>'}).join(''));
$('#catAll').textContent=fmt(AD.length)+' إعلاناً';
$('#catSheep').textContent=fmt(AD.filter(function(a){return a.cat==='sheep'}).length)+' إعلاناً';
$('#catGoat').textContent=fmt(AD.filter(function(a){return a.cat==='goat'}).length)+' إعلانات';
$('#featured').innerHTML=cardsHtml(AD.filter(function(a){return a.v}).slice(0,6));
var f=$('#flock'),pos=[[90,462,.55,0],[190,478,.62,1],[300,472,.5,0],[420,486,.66,1],[540,480,.52,0],[650,492,.6,1],[760,470,.5,0],[860,486,.58,1],[980,468,.44,0],[300,512,.7,1]],cols=[PAL.cream,PAL.white,PAL.blackface,PAL.tan],s='';
pos.forEach(function(p,i){var w=170*p[2],h=w*.682;s+='<use href="#sheep" x="'+p[0]+'" y="'+(p[1]-h)+'" width="'+w+'" height="'+h+'" style="'+pv(cols[i%4])+'" '+(p[3]?'transform="translate('+(2*p[0]+w)+' 0) scale(-1 1)"':'')+'/>'});
f.innerHTML=s;
$('#occGrid').innerHTML=OCC.map(function(o){
  var list=AD.filter(function(a){return matchO(a,o.f)}),min=Math.min.apply(null,list.map(function(a){return a.price})),q=[];
  for(var k in o.f)q.push(k+'='+o.f[k]);
  return '<a class="occ-card" href="listings.html?'+q.join('&')+'"><div class="pic" style="background:linear-gradient('+o.bg[0]+','+o.bg[1]+')"><svg viewBox="0 18 220 130" style="'+pv(PAL[o.pal])+'" aria-hidden="true"><use href="#sheep"/></svg></div><div class="txt"><h3>'+o.t+'</h3><p>'+o.d+'</p><div class="from"><span>'+list.length+' إعلاناً · ابتداءً من</span><b>'+fmt(min)+' ر.س</b></div></div></a>'}).join('');
$('#breedersGrid').innerHTML=BREEDERS.slice(0,3).map(function(b){return '<article class="breeder"><div class="top"><span class="avatar" style="background:'+b.c+'">'+b.n.charAt(0)+'</span><div><h3>'+b.n+ICON('shield')+'</h3><div class="loc">'+ICON('pin')+b.r+' <span class="rate">'+ICON('star')+b.rt.toFixed(1)+'</span></div></div></div><p>'+b.d+'</p><a class="btn ghost" href="listings.html?breeder='+encodeURIComponent(b.n)+'">عرض إعلانات المربي</a></article>'}).join('');
$('#artsGrid').innerHTML=ARTS.slice(0,3).map(function(a,i){return '<a class="art-card" href="articles.html?id='+i+'"><div class="cover" style="background:'+a.bg+'">'+ICON(a.icon)+'</div><div class="meta"><span class="tagl">'+a.tag+'</span><h3>'+a.t+'</h3><p>'+a.lead+'</p><span class="rd">'+ICON('clock')+'قراءة '+a.min+' دقائق</span></div></a>'}).join('');
if(window.revealAll)revealAll();
})();
