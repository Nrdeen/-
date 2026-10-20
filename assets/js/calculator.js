(function(){
var T=$('#iT');T.innerHTML=IDX.map(function(s,i){return '<option value="'+i+'">'+s.k+' (~'+s.kg+' كجم)</option>'}).join('');
function calc(){
  var g=+$('#iG').value,p=+$('#iS').value,w=+$('#iW').value,s=IDX[+T.value],price=s.v[s.v.length-1];
  $('#oG').textContent=g;$('#oW').textContent=w+'%';
  var need=g*p*(1+w/100),dressed=s.kg*0.5,heads=Math.max(1,Math.ceil(need/dressed-0.0001));
  $('#rH').textContent=heads;$('#rC').textContent=fmt(heads*price)+' ر.س';$('#rM').textContent=need.toFixed(1)+' كجم';
  $('#rK').textContent=s.kg+' كجم';$('#rP').textContent=fmt(price)+' ر.س';
  $('#rLink').href='listings.html?type='+encodeURIComponent(s.k);
}
['iG','iT','iS','iW'].forEach(function(i){$('#'+i).addEventListener('input',calc)});calc();
})();
