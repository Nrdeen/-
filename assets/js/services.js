(function(){
$('#svcReg').innerHTML=REGIONS.map(function(r){return '<option>'+r+'</option>'}).join('');
document.addEventListener('click',function(e){var a=e.target.closest('[data-svc]');if(a){$('#svcSel').value=a.dataset.svc}});
var f=$('#svcForm');
f.addEventListener('submit',function(e){
  e.preventDefault();var ok=chkReq(f.name);ok=chkPhone(f.tel)&&ok;if(!ok)return;
  var l=store.get('souq-requests',[]);l.push({svc:f.svc.value,reg:f.reg.value,name:f.name.value,t:Date.now()});store.set('souq-requests',l);
  f.reset();toast('تم استلام طلبك (توضيحي)، سيتواصل معك الشريك قريباً');
});
})();
