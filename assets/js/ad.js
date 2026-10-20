(function(){
var a=byId(+QS.get('id')),box=$('#adBox');
if(!a){box.innerHTML='<div class="empty"><h3>الإعلان غير موجود</h3><p>ربما حُذف أو انتهى. تصفّح بقية الإعلانات.</p><a class="btn" href="listings.html">تصفّح الإعلانات</a></div>';return}
document.title=a.t+' | سوق الغنم';$('#adCrumb').textContent=a.t;
var b=BREEDERS[a.b],same=AD.filter(function(x){return x.type===a.type}),avg=Math.round(same.reduce(function(s,x){return s+x.price},0)/same.length),
 diff=Math.round((a.price-avg)/avg*100),perKg=Math.round(a.price/a.kg),on=favs.indexOf(a.id)>-1,cm=cmp.indexOf(a.id)>-1;
var verdict=Math.abs(diff)<5?'قريب من متوسط السلالة':diff<0?'أقل من متوسط السلالة بنحو '+Math.abs(diff)+'%':'أعلى من متوسط السلالة بنحو '+diff+'%';
var sims=AD.filter(function(x){return x.id!==a.id&&x.cat===a.cat}).sort(function(x,y){return Math.abs(x.price-a.price)-Math.abs(y.price-a.price)}).slice(0,3);
box.innerHTML='<div class="ad-grid"><div>'
 +'<div class="ad-art" style="'+skyOf(a)+'">'+art(a,1)+(a.v?'<span class="badge">'+ICON('shield')+'موثّق</span>':'<span class="badge gold">جديد</span>')+'</div>'
 +'<div class="panel" style="margin-top:24px"><h3>الوصف</h3><p style="margin-top:10px;line-height:1.95;color:var(--ink-2)">'+esc(a.d||'لا يوجد وصف إضافي.')+'</p></div>'
 +'<div class="panel" style="margin-top:24px"><h3>السعر مقارنةً بالسوق</h3><div class="ad-cmp"><div><small>سعر هذا الإعلان</small><b>'+fmt(a.price)+' ر.س</b></div><div><small>متوسط '+a.type+'</small><b>'+fmt(avg)+' ر.س</b></div><div><small>سعر الكيلو الحي</small><b>'+fmt(perKg)+' ر.س</b></div></div><p class="ad-verdict">'+verdict+'</p><small style="color:var(--ink-3)">المتوسط محسوب من إعلانات الموقع التوضيحية.</small></div></div>'
 +'<aside class="ad-side"><div class="panel"><div class="row1" style="display:flex;justify-content:space-between;align-items:center;gap:10px"><div class="price" style="font-size:34px">'+fmt(a.price)+'<small>ر.س</small></div><span class="type">'+a.type+'</span></div>'
 +'<h1 class="ad-title">'+esc(a.t)+'</h1><small style="color:var(--ink-3)">رقم الإعلان: '+a.id+'</small>'
 +'<div class="spec-table" style="margin-top:18px"><div><small>الجنس</small><b>'+sexLabel(a)+'</b></div><div><small>العمر</small><b>'+ageText(a)+'</b></div><div><small>الوزن التقريبي</small><b>'+a.kg+' كجم</b></div><div><small>المنطقة</small><b>'+a.reg+'</b></div><div><small>النوع</small><b>'+(a.cat==='goat'?'ماعز':'ضأن')+'</b></div><div><small>القرون</small><b>'+(a.horns?'مقرّن':'—')+'</b></div></div>'
 +'<div class="ad-acts"><button class="btn lg" type="button" id="showPhone">'+ICON('phone')+'إظهار رقم التواصل</button><div id="phoneOut" hidden></div>'
 +'<div class="ad-row"><button class="btn ghost'+(on?' on':'')+'" type="button" data-fav="'+a.id+'" aria-pressed="'+on+'">'+ICON('heart')+'<span class="fav-label">'+(on?'في المفضلة':'أضف للمفضلة')+'</span></button><button class="btn ghost" type="button" data-cmp="'+a.id+'" aria-pressed="'+cm+'">'+ICON('layers')+'قارن</button></div>'
 +'<div class="ad-row"><button class="btn ghost sm" type="button" id="shareBtn">'+ICON('share')+'نسخ الرابط</button><button class="btn ghost sm" type="button" onclick="print()">'+ICON('print')+'طباعة</button><a class="btn ghost sm" href="contact.html?sub=report&amp;ad='+a.id+'">'+ICON('warn')+'إبلاغ</a></div>'
 +(a.user?'<button class="btn ghost sm" type="button" id="delAd" style="color:var(--danger)">حذف إعلاني</button>':'')+'</div></div>'
 +'<div class="panel"><div class="breeder" style="border:0;padding:0;box-shadow:none"><div class="top"><span class="avatar" style="background:'+b.c+'">'+b.n.charAt(0)+'</span><div><h3>'+b.n+(a.v?ICON('shield'):'')+'</h3><div class="loc">'+ICON('pin')+b.r+' <span class="rate">'+ICON('star')+b.rt.toFixed(1)+'</span></div></div></div>'
 +(b.d?'<p>'+b.d+'</p>':'')+(b.ads>1?'<a class="btn ghost" href="listings.html?breeder='+encodeURIComponent(b.n)+'">كل إعلانات البائع ('+b.ads+')</a>':'')+'</div></div>'
 +'<div class="panel"><h3>أرسل رسالة للبائع</h3><form id="msgForm" style="display:grid;gap:12px;margin-top:12px"><label class="sr" for="msgT">الرسالة</label><textarea id="msgT" class="num" rows="3" style="resize:vertical" required>السلام عليكم، هل ما زال الإعلان رقم '+a.id+' متاحاً؟</textarea><button class="btn" type="submit">'+ICON('send')+'إرسال</button></form></div></aside></div>'
 +'<section style="margin-top:56px"><div class="sec-head"><div><span class="kicker">قد يعجبك</span><h2>إعلانات مشابهة</h2></div><a class="link-more" href="listings.html?cat='+a.cat+'">المزيد '+ICON('left')+'</a></div><div class="grid">'+cardsHtml(sims)+'</div></section>';
$('#showPhone').addEventListener('click',function(){
  var o=$('#phoneOut');o.hidden=false;
  o.innerHTML=a.phone?'<a class="btn light lg" style="width:100%;border:1.5px solid var(--line)" href="tel:'+esc(a.phone)+'" dir="ltr">'+esc(a.phone)+'</a>':'<div class="note">'+ICON('info')+'<div>هذا إعلان توضيحي، ولا يوجد رقم حقيقي. في الإعلان الفعلي يظهر رقم البائع هنا.</div></div>';
  this.hidden=true;
});
$('#shareBtn').addEventListener('click',function(){copyText(location.href,'تم نسخ الرابط')});
$('#msgForm').addEventListener('submit',function(e){e.preventDefault();toast('تم إرسال رسالتك (توضيحي)')});
var d=$('#delAd');if(d)d.addEventListener('click',function(){if(!confirm('حذف هذا الإعلان؟'))return;var l=store.get('souq-user-ads',[]).filter(function(x){return x.id!==a.id});store.set('souq-user-ads',l);location.href='listings.html'});
if(window.revealAll)revealAll();
})();
