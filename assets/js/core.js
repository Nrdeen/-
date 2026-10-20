/* core helpers shared by every page */
var $=function(s,r){return (r||document).querySelector(s)};
var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var ICON=function(n,c){return '<svg class="i'+(c?' '+c:'')+'"><use href="#i-'+n+'"/></svg>'};
var fmt=function(n){return Number(n).toLocaleString('en-US')};
var pad2=function(n){return (n<10?'0':'')+n};
var esc=function(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
var store={
  get:function(k,d){try{var v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},
  set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
var QS=new URLSearchParams(location.search);
var _tt;
function toast(m){
  var h=$('#toastHost');if(!h)return;clearTimeout(_tt);
  h.innerHTML='<div class="toast" role="status">'+ICON('check')+esc(m)+'</div>';
  _tt=setTimeout(function(){h.innerHTML=''},2800);
}
function copyText(t,msg){
  function ok(){toast(msg||'تم النسخ')}
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(ok,function(){toast('تعذّر النسخ')})}
  else{var x=document.createElement('textarea');x.value=t;document.body.appendChild(x);x.select();try{document.execCommand('copy');ok()}catch(e){toast('تعذّر النسخ')}x.remove()}
}
