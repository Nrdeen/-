(function(){
var f=$('#adForm'),TY={sheep:['نعيمي','حري','نجدي','سواكني'],goat:['ماعز']},SX={sheep:[['m','كبش'],['f','نعجة'],['y','خروف']],goat:[['m','تيس'],['f','عنزة'],['y','جدي']]};
$('#aReg').innerHTML=REGIONS.map(function(r){return '<option>'+r+'</option>'}).join('');
function cats(){
  var c=$('#aCat').value;
  $('#aType').innerHTML=TY[c].map(function(t){return '<option>'+t+'</option>'}).join('');
  $('#aSex').innerHTML=SX[c].map(function(s){return '<option value="'+s[0]+'">'+s[1]+'</option>'}).join('');
}
function build(id){
  var c=f.cat.value;
  return {id:id,t:f.t.value.trim()||'عنوان إعلانك هنا',cat:c,type:f.type.value,sex:f.sex.value,age:+f.age.value||12,kg:+f.kg.value||45,price:+f.price.value||0,reg:f.reg.value,b:BREEDERS.length-1,
   pal:PALMAP[f.type.value]||'cream',sk:id%5,v:0,fl:0,d:f.d.value.trim(),goat:c==='goat'?1:0,horns:f.horns.checked?1:0,phone:f.phone.value.replace(/[\s-]/g,''),user:1};
}
function prev(){
  var a=build(0);
  $('#aPrev').innerHTML=a.price?card(a).replace(/href="ad\.html\?id=0"/,'href="#"'):'<p style="color:var(--ink-3)">أدخل السعر لتظهر بطاقة المعاينة.</p>';
}
cats();$('#aCat').addEventListener('change',function(){cats();prev()});
f.addEventListener('input',prev);f.addEventListener('change',prev);prev();
f.addEventListener('submit',function(e){
  e.preventDefault();var ok=true;
  ['t','age','kg','price'].forEach(function(n){ok=chkReq(f[n])&&ok});
  var chk=function(i,min,max,msg){if(!i.value.trim())return;var v=+i.value;if(!(v>=min&&v<=max)){fieldErr(i,msg);ok=false}};
  chk(f.age,1,120,'العمر بين 1 و120 شهراً');chk(f.kg,5,150,'الوزن بين 5 و150 كجم');chk(f.price,100,100000,'السعر بين 100 و100000 ر.س');
  ok=chkPhone(f.phone)&&ok;
  if(!ok){var bad=$('[aria-invalid="true"]',f);if(bad)bad.focus();return}
  var id=Date.now()%100000000+1000000,a=build(id),l=store.get('souq-user-ads',[]);l.unshift(a);store.set('souq-user-ads',l);
  toast('تم نشر إعلانك');setTimeout(function(){location.href='ad.html?id='+id},700);
});
})();
