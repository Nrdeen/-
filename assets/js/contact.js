(function(){
var f=$('#ctForm'),sub=$('#ctSub'),w=$('#ctAdWrap');
function sync(){w.hidden=sub.value!=='الإبلاغ عن إعلان'}
sub.addEventListener('change',sync);
if(QS.get('sub')==='report'){sub.value='الإبلاغ عن إعلان';if(QS.get('ad'))f.ad.value=QS.get('ad')}
sync();
f.addEventListener('submit',function(e){
  e.preventDefault();var ok=chkReq(f.name);
  var m=f.mail;ok=fieldErr(m,!m.value.trim()?'هذا الحقل مطلوب':/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m.value)?'':'أدخل بريداً إلكترونياً صحيحاً')&&ok;
  ok=chkReq(f.msg)&&ok;if(!ok)return;
  f.reset();sync();toast('تم إرسال رسالتك (توضيحي)، شكراً لتواصلك');
});
})();
