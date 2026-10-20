(function(){
var el=$('#chart'),tip=$('#tip'),n=MONTHS.length,hidden={};
$('#legend').innerHTML=IDX.map(function(s){return '<button class="lg" type="button" aria-pressed="true" data-k="'+s.k+'" style="--c:var('+s.c+')"><i></i>'+s.k+'</button>'}).join('');
function vis(){return IDX.filter(function(s){return !hidden[s.k]})}
function draw(){
  var W=el.clientWidth||600,H=el.clientHeight||330,m={l:58,r:14,t:14,b:34},V=vis(),all=[];
  V.forEach(function(s){all=all.concat(s.v)});
  if(!all.length){el.innerHTML='<div class="empty" style="border:0;padding:90px 0">اختر سلالة واحدة على الأقل</div>';return}
  var mn=Math.floor(Math.min.apply(null,all)*.96/250)*250,mx=Math.ceil(Math.max.apply(null,all)*1.03/250)*250;
  var X=function(i){return m.l+i*(W-m.l-m.r)/(n-1)},Y=function(v){return m.t+(1-(v-mn)/(mx-mn))*(H-m.t-m.b)};
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" direction="ltr" role="img" aria-label="رسم بياني لأسعار السلالات">';
  for(var k=0;k<=4;k++){var v=mn+(mx-mn)*k/4,y=Y(v);s+='<line x1="'+m.l+'" x2="'+(W-m.r)+'" y1="'+y+'" y2="'+y+'" stroke="var(--line)"/><text x="'+(m.l-8)+'" y="'+(y+4)+'" text-anchor="end">'+fmt(Math.round(v))+'</text>'}
  MONTHS.forEach(function(mo,i){s+='<text x="'+X(i)+'" y="'+(H-10)+'" text-anchor="middle">'+mo+'</text>'});
  V.forEach(function(sr){
    var d=sr.v.map(function(v,i){return (i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(1)}).join('');
    s+='<path d="'+d+'" fill="none" stroke="var('+sr.c+')" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>';
    sr.v.forEach(function(v,i){s+='<circle cx="'+X(i)+'" cy="'+Y(v)+'" r="3.5" fill="var(--surface)" stroke="var('+sr.c+')" stroke-width="2"/>'});
  });
  s+='<line id="cur" y1="'+m.t+'" y2="'+(H-m.b)+'" stroke="var(--ink-3)" stroke-dasharray="4 4" visibility="hidden"/></svg>';
  el.innerHTML=s;
  function move(e){
    var r=el.getBoundingClientRect(),x=e.clientX-r.left,i=Math.max(0,Math.min(n-1,Math.round((x-m.l)/((W-m.l-m.r)/(n-1)))));
    var c=$('#cur',el);c.setAttribute('x1',X(i));c.setAttribute('x2',X(i));c.setAttribute('visibility','visible');
    tip.hidden=false;tip.innerHTML='<span class="th">'+MONTHS[i]+'</span>'+V.map(function(sr){return '<span><span><i style="background:var('+sr.c+')"></i>'+sr.k+'</span><b>'+fmt(sr.v[i])+'</b></span>'}).join('');
    var tw=tip.offsetWidth,px=Math.max(tw/2,Math.min(r.width-tw/2,X(i)));tip.style.left=px+'px';
  }
  el.onpointermove=move;el.onpointerdown=move;el.onpointerleave=function(){tip.hidden=true;var c=$('#cur',el);if(c)c.setAttribute('visibility','hidden')};
}
$('#legend').addEventListener('click',function(e){var b=e.target.closest('[data-k]');if(!b)return;var k=b.dataset.k;hidden[k]=!hidden[k];b.setAttribute('aria-pressed',!hidden[k]);draw()});
var t;addEventListener('resize',function(){clearTimeout(t);t=setTimeout(draw,120)});
draw();
/* insights */
var avgM=MONTHS.map(function(m,i){return IDX.reduce(function(s,x){return s+x.v[i]},0)/IDX.length}),pk=avgM.indexOf(Math.max.apply(null,avgM)),lo=avgM.indexOf(Math.min.apply(null,avgM));
var cur=avgM[n-1],pct=Math.round((cur-avgM[pk])/avgM[pk]*100);
var rise=IDX.map(function(s){return {k:s.k,d:(s.v[n-1]-s.v[n-2])/s.v[n-2]*100}}).sort(function(a,b){return b.d-a.d})[0];
$('#insights').innerHTML='<li><small>ذروة الموسم</small><b>'+MONTHS[pk]+'</b></li><li><small>أرخص شهر</small><b>'+MONTHS[lo]+'</b></li><li><small>الحالي مقابل الذروة</small><b dir="ltr">'+pct+'%</b></li>';
$('#pTbl').innerHTML=IDX.map(function(s){var L=s.v[n-1],P=s.v[n-2],d=(L-P)/P*100;return '<tr><th scope="row">'+s.k+'</th><td>'+s.kg+' كجم</td><td>'+fmt(L)+' ر.س</td><td>'+fmt(Math.round(L/s.kg))+' ر.س</td><td class="'+(d>=0?'up':'dn')+'" dir="ltr" style="text-align:right">'+(d>=0?'▲ ':'▼ ')+Math.abs(d).toFixed(1)+'%</td><td>'+fmt(Math.max.apply(null,s.v))+' ر.س</td></tr>'}).join('');
var tps=[];AD.forEach(function(a){if(tps.indexOf(a.type)<0)tps.push(a.type)});
$('#aTbl').innerHTML=tps.map(function(t){var l=AD.filter(function(a){return a.type===t}).map(function(a){return a.price}),sum=l.reduce(function(a,b){return a+b},0);return '<tr><th scope="row">'+t+'</th><td>'+l.length+'</td><td>'+fmt(Math.min.apply(null,l))+' ر.س</td><td class="best">'+fmt(Math.round(sum/l.length))+' ر.س</td><td>'+fmt(Math.max.apply(null,l))+' ر.س</td></tr>'}).join('');
})();
