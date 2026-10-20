(function(){
var root=$('#artRoot'),id=QS.get('id'),tag=QS.get('tag')||'';
function list(){
  var tags=[];ARTS.forEach(function(a){if(tags.indexOf(a.tag)<0)tags.push(a.tag)});
  var l=ARTS.map(function(a,i){return {a:a,i:i}}).filter(function(x){return !tag||x.a.tag===tag});
  root.innerHTML='<div class="tabs"><button class="tab" type="button" data-tag="" aria-selected="'+(!tag)+'">الكل</button>'+tags.map(function(t){return '<button class="tab" type="button" data-tag="'+t+'" aria-selected="'+(tag===t)+'">'+t+'</button>'}).join('')+'</div>'
   +'<div class="arts">'+l.map(function(x){var a=x.a;return '<a class="art-card" href="articles.html?id='+x.i+'"><div class="cover" style="background:'+a.bg+'">'+ICON(a.icon)+'</div><div class="meta"><span class="tagl">'+a.tag+'</span><h3>'+a.t+'</h3><p>'+a.lead+'</p><span class="rd">'+ICON('clock')+'قراءة '+a.min+' دقائق</span></div></a>'}).join('')+'</div>';
  if(window.revealAll)revealAll();
}
function read(i){
  var a=ARTS[i];document.title=a.t+' | سوق الغنم';
  var nx=ARTS[(i+1)%ARTS.length],pv=ARTS[(i+ARTS.length-1)%ARTS.length];
  root.innerHTML='<article class="panel prose art-read"><div class="art-hero" style="background:'+a.bg+'">'+ICON(a.icon)+'</div><span class="tagl" style="color:var(--gold);font-weight:700">'+a.tag+'</span><h2 style="font-size:clamp(26px,3.4vw,38px);margin:6px 0 10px;line-height:1.5">'+a.t+'</h2><p class="lead" style="color:var(--ink-2);font-size:19px">'+a.lead+'</p><div class="rd" style="display:flex;gap:8px;align-items:center;color:var(--ink-3);margin:6px 0 20px">'+ICON('clock')+'قراءة '+a.min+' دقائق</div>'
   +a.body.map(function(s){return '<h3 style="margin:26px 0 8px">'+s[0]+'</h3><p>'+s[1]+'</p>'}).join('')
   +'<div class="note" style="margin-top:28px">'+ICON('info')+'<div>معلومات عامة للإرشاد، ولا تغني عن استشارة طبيب بيطري عند الحاجة.</div></div>'
   +'<div class="art-nav"><a href="articles.html?id='+((i+ARTS.length-1)%ARTS.length)+'" class="btn ghost">'+ICON('right')+'السابق: '+pv.t+'</a><a href="articles.html?id='+((i+1)%ARTS.length)+'" class="btn ghost">التالي: '+nx.t+ICON('left')+'</a></div></article>'
   +'<p style="text-align:center;margin-top:24px"><a class="link-more" href="articles.html">كل المقالات</a></p>';
}
if(id!==null&&ARTS[+id])read(+id);else list();
root.addEventListener('click',function(e){var b=e.target.closest('[data-tag]');if(!b)return;tag=b.dataset.tag;list()});
})();
