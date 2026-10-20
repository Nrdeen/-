/* site chrome: theme, drawer, dropdowns, ticker, progress, reveal, counters */
(function(){
  var root=document.documentElement;
  /* theme */
  var tb=$('#themeBtn');
  if(tb)tb.addEventListener('click',function(){
    var n=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme',n);try{localStorage.setItem('souq-theme',n)}catch(e){}
    tb.setAttribute('aria-label',n==='dark'?'الوضع الفاتح':'الوضع الداكن');
  });
  /* drawer */
  var dr=$('#drawer');
  function drawer(o){if(dr){dr.hidden=!o;document.body.style.overflow=o?'hidden':''}}
  var mb=$('#menuBtn');if(mb)mb.addEventListener('click',function(){drawer(true)});
  if(dr)dr.addEventListener('click',function(e){if(e.target===dr||e.target.closest('a'))drawer(false)});
  /* dropdowns: click for touch, Esc to close */
  $$('.nav .dd>button').forEach(function(b){
    b.addEventListener('click',function(e){e.stopPropagation();var p=b.parentNode,o=p.classList.contains('open');$$('.nav .dd.open').forEach(function(x){x.classList.remove('open');x.firstElementChild.setAttribute('aria-expanded','false')});if(!o){p.classList.add('open');b.setAttribute('aria-expanded','true')}});
  });
  document.addEventListener('click',function(){$$('.nav .dd.open').forEach(function(x){x.classList.remove('open');x.firstElementChild.setAttribute('aria-expanded','false')})});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'){drawer(false);$$('.nav .dd.open').forEach(function(x){x.classList.remove('open')})}});
  /* progress + header shadow + back to top */
  var prog=$('#prog'),up=$('#toTop'),hd=$('.site-header');
  function onScroll(){
    var h=root.scrollHeight-innerHeight;
    if(prog)prog.style.transform='scaleX('+(h>0?Math.min(1,scrollY/h):0)+')';
    if(up)up.classList.toggle('show',scrollY>700);
    if(hd)hd.classList.toggle('stuck',scrollY>8);
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  if(up)up.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});
  /* ticker */
  var tk=$('#tkTrack');
  if(tk&&window.IDX){
    var goats=AD.filter(function(a){return a.cat==='goat'}),avg=Math.round(goats.reduce(function(s,a){return s+a.price},0)/goats.length);
    var h=IDX.map(function(i){var n=i.v.length,d=(i.v[n-1]-i.v[n-2])/i.v[n-2]*100,up=d>=0;return '<span class="tk-item"><b>'+i.k+'</b>'+fmt(i.v[n-1])+' ر.س<em dir="ltr" class="'+(up?'tk-up':'tk-dn')+'">'+(up?'▲':'▼')+' '+Math.abs(d).toFixed(1)+'%</em></span>'}).join('');
    h+='<span class="tk-item"><b>ماعز (متوسط الإعلانات)</b>'+fmt(avg)+' ر.س</span>';
    tk.innerHTML=h+h;
  }
  /* newsletter */
  var nf=$('#newsForm');
  if(nf)nf.addEventListener('submit',function(e){e.preventDefault();$('#newsMail').value='';toast('تم الاشتراك، سنراسلك بأحدث الإعلانات')});
  /* reveal on scroll */
  if(window.IntersectionObserver){
    var o=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');o.unobserve(en.target)}})},{threshold:.08});
    window.revealAll=function(){$$('.sec-head,.feat,.breeder,.step,.service,.panel,.occ-card,.art-card,.chk-item,.g-panel,.stat,.tile,.card,.faq-item,.tl-item,.sv-block').forEach(function(el){if(!el.classList.contains('rv')){el.classList.add('rv');o.observe(el)}})};
    revealAll();
  } else window.revealAll=function(){};
  /* animated counters */
  var cs=$$('[data-count]');
  if(cs.length&&window.IntersectionObserver){
    var co=new IntersectionObserver(function(es){es.forEach(function(en){
      if(!en.isIntersecting)return;co.unobserve(en.target);
      var el=en.target,to=+el.dataset.count,pre=el.dataset.pre||'',suf=el.dataset.suf||'',t0=performance.now(),dur=1400;
      (function f(t){var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=pre+fmt(Math.round(to*e))+suf;if(p<1)requestAnimationFrame(f)})(t0);
    })},{threshold:.4});
    cs.forEach(function(el){co.observe(el)});
  }
  /* spotlight on tiles */
  document.addEventListener('pointermove',function(e){
    var t=e.target.closest&&e.target.closest('.tile');if(!t)return;
    var r=t.getBoundingClientRect();t.style.setProperty('--mx',(e.clientX-r.left)+'px');t.style.setProperty('--my',(e.clientY-r.top)+'px');
  });
  /* WhatsApp widget */
  var waBtn=$('#waBtn'),waWidget=$('#waWidget'),waClose=$('#waClose');
  if(waBtn)waBtn.addEventListener('click',function(){waWidget.hidden=false});
  if(waClose)waClose.addEventListener('click',function(){waWidget.hidden=true});
  updFavCount();renderTray();
})();
