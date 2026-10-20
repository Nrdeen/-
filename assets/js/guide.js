(function(){
var tabs=$('#gTabs'),body=$('#gBody'),idx=0;
tabs.innerHTML=GD.map(function(g,i){return '<button class="g-tab" type="button" role="tab" aria-selected="'+(i===0)+'" data-i="'+i+'">'+g.k+'</button>'}).join('');
function show(){
  var g=GD[idx],list=AD.filter(function(a){return a.type===g.k}),avg=list.length?Math.round(list.reduce(function(s,a){return s+a.price},0)/list.length):0;
  var sample={pal:g.pal,sk:g.sk,horns:g.horns,id:0};
  body.innerHTML='<div class="g-panel"><div class="g-art" style="'+skyOf(sample)+'"><span class="ghost">'+g.k.charAt(0)+'</span>'+art(sample)+'</div><div class="g-info"><h3>'+g.k+'</h3><p>'+g.lead+'</p>'
   +'<div class="meters">'+g.m.map(function(m){return '<div class="meter"><span>'+m[0]+'</span><div class="bar"><i style="--w:'+(m[1]/5*100)+'%"></i></div></div>'}).join('')+'</div>'
   +'<div class="facts">'+g.f.map(function(f){return '<div><small>'+f[0]+'</small><b>'+f[1]+'</b></div>'}).join('')+'</div>'
   +'<div class="note">'+ICON('info')+'<div>'+g.tip+'</div></div>'
   +'<a class="btn" href="listings.html?type='+encodeURIComponent(g.k)+'">'+list.length+' إعلان'+(avg?' · متوسط '+fmt(avg)+' ر.س':'')+'</a></div></div>';
  $$('.g-tab',tabs).forEach(function(b,i){b.setAttribute('aria-selected',i===idx)});
}
tabs.addEventListener('click',function(e){var b=e.target.closest('.g-tab');if(!b)return;idx=+b.dataset.i;history.replaceState(null,'','#'+encodeURIComponent(GD[idx].k));show()});
var h=decodeURIComponent(location.hash.slice(1));GD.forEach(function(g,i){if(g.k===h)idx=i});
show();
var dots=function(n){var s='';for(var i=0;i<5;i++)s+=i<n?'●':'○';return '<span dir="ltr" style="letter-spacing:2px;color:var(--gold)">'+s+'</span>'};
$('#gTbl').innerHTML=GD.map(function(g){return '<tr><th scope="row">'+g.k+'</th><td>'+dots(g.m[0][1])+'</td><td>'+dots(g.m[1][1])+'</td><td>'+dots(g.m[2][1])+'</td><td>'+dots(g.m[3][1])+'</td><td>'+g.f[3][1]+'</td></tr>'}).join('');
})();
