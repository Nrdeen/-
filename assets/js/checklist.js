(function(){
var st=store.get('souq-chk',[]),C=414.69;
$('#chkList').innerHTML=CK.map(function(c,i){return '<button class="chk-item" type="button" data-i="'+i+'" aria-pressed="false"><span class="box">'+ICON('check')+'</span><span><b>'+c[0]+'</b><span class="h">'+c[1]+'</span></span></button>'}).join('');
function sync(){
  var n=0;$$('.chk-item').forEach(function(b,i){var on=!!st[i];if(on)n++;b.setAttribute('aria-pressed',on)});
  $('#ringN').textContent=n+'/'+CK.length;$('#ringPg').style.strokeDashoffset=C*(1-n/CK.length);
  $('#verdict').textContent=n===0?'ابدأ بالفحص بند بند':n<4?'ما زال أمامك بنود كثيرة قبل الدفع':n<CK.length?'قريب، أكمل البنود المتبقية قبل الدفع':'ممتاز، أتممت كل البنود ويمكنك المضي بثقة';
}
$('#chkList').addEventListener('click',function(e){var b=e.target.closest('.chk-item');if(!b)return;var i=+b.dataset.i;st[i]=!st[i];store.set('souq-chk',st);sync()});
$('#chkReset').addEventListener('click',function(){st=[];store.set('souq-chk',st);sync()});
$('#chkPrint').addEventListener('click',function(){print()});
sync();
})();
