(function(){
var INFO=[
 {tips:['اختر خروفاً سليماً خالياً من العيوب الظاهرة وبعمر مناسب.','اسأل جهة الفتوى عن العدد المناسب للمولود، فالأمر يختلف باجتهاد أهل العلم.','رتّب الذبح والتغليف والتوزيع مسبقاً.'],heads:'رأس أو رأسان غالباً'},
 {tips:['احسب العدد من حاسبة الولائم بحسب عدد الضيوف.','الكباش الكبيرة أوفر للولائم الضخمة من تعدد الرؤوس الصغيرة.','احجز مبكراً لأن الطلب يرتفع قرب المواسم.'],heads:'من رأس إلى عدة رؤوس'},
 {tips:['الخراف المتوسطة تكفي لتجمع عائلي بسعر معتدل.','اطلب الذبح قبل المناسبة بيوم لضمان الطراوة.','قارن بين الإعلانات القريبة منك لتخفيف تكلفة النقل.'],heads:'رأس واحد غالباً'},
 {tips:['اختر نعاجاً بعمر سنة إلى سنتين وبحالة جسم جيدة.','تقدير شائع: كبش لكل 25 إلى 30 نعجة تقريباً.','اسأل عن سجل التلقيح والتطعيمات وسجل الولادات.'],heads:'حسب حجم القطيع'}
];
var tabs=$('#occTabs'),idx=0;
tabs.innerHTML=OCC.map(function(o,i){return '<button class="tab" type="button" role="tab" aria-selected="'+(i===0)+'" data-i="'+i+'">'+o.t+'</button>'}).join('');
function show(){
  var o=OCC[idx],inf=INFO[idx],list=AD.filter(function(a){return matchO(a,o.f)}),q=[];for(var k in o.f)q.push(k+'='+o.f[k]);
  var min=list.length?Math.min.apply(null,list.map(function(a){return a.price})):0;
  $('#occBody').innerHTML='<div class="panel"><header><div><h3>'+o.t+'</h3><small>'+o.d+'</small></div><a class="btn" href="listings.html?'+q.join('&')+'">عرض الكل ('+list.length+')</a></header>'
   +'<div class="facts"><div><small>عدد الرؤوس المعتاد</small><b>'+inf.heads+'</b></div><div><small>تبدأ الأسعار من</small><b>'+(list.length?fmt(min)+' ر.س':'—')+'</b></div></div>'
   +'<ul class="pts" style="display:grid;gap:10px;margin:20px 0 0;padding:0;list-style:none">'+inf.tips.map(function(t){return '<li style="display:flex;gap:12px">'+ICON('check')+'<span>'+t+'</span></li>'}).join('')+'</ul></div>'
   +'<div class="grid" style="margin-top:28px">'+(list.length?cardsHtml(list.slice(0,6)):'<div class="empty"><h3>لا توجد إعلانات مطابقة</h3></div>')+'</div>';
  $$('.tab',tabs).forEach(function(b,i){b.setAttribute('aria-selected',i===idx)});
  if(window.revealAll)revealAll();
}
tabs.addEventListener('click',function(e){var b=e.target.closest('.tab');if(!b)return;idx=+b.dataset.i;history.replaceState(null,'','#o'+idx);show()});
var m=/^#o(\d)$/.exec(location.hash);if(m&&OCC[+m[1]])idx=+m[1];
show();
})();
