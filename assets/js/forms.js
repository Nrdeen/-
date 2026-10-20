/* shared form helpers */
function fieldErr(inp,msg){
  var e=inp.parentNode.querySelector('.err');
  if(msg){inp.setAttribute('aria-invalid','true');if(e){e.hidden=false;e.textContent=msg}}
  else{inp.removeAttribute('aria-invalid');if(e){e.hidden=true;e.textContent=''}}
  return !msg;
}
var PHONE=/^(05\d{8}|\+9665\d{8})$/;
function chkPhone(i){var v=i.value.replace(/[\s-]/g,'');return fieldErr(i,!v?'هذا الحقل مطلوب':PHONE.test(v)?'':'أدخل رقماً سعودياً صحيحاً مثل 0512345678')}
function chkReq(i){return fieldErr(i,i.value.trim()?'':'هذا الحقل مطلوب')}
