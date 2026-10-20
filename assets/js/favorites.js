(function(){
function r(){
  var l=favs.map(byId).filter(Boolean);
  $('#favN').textContent=l.length;
  $('#favGrid').innerHTML=l.length?cardsHtml(l):'<div class="empty"><h3>لا توجد مفضلة بعد</h3><p>اضغط على القلب في أي إعلان ليظهر هنا.</p><a class="btn" href="listings.html">تصفّح الإعلانات</a></div>';
  if(window.revealAll)revealAll();
}
document.addEventListener('sq:fav',r);
$('#favClear').addEventListener('click',function(){if(!favs.length)return;favs.length=0;saveFavs();updFavCount();r();toast('تم مسح المفضلة')});
r();
})();
