(function(){
  // reveal
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.rv').forEach(function(el,i){ el.style.transitionDelay=(i%4)*70+'ms'; io.observe(el); });

  // cursor
  if (window.matchMedia('(hover:hover)').matches) {
    var c = document.createElement('div'); c.className='cur'; document.body.appendChild(c);
    var x=0,y=0,cx=0,cy=0;
    addEventListener('mousemove',function(e){ x=e.clientX; y=e.clientY; });
    (function loop(){ cx+=(x-cx)*.18; cy+=(y-cy)*.18; c.style.transform='translate('+(cx-8)+'px,'+(cy-8)+'px)'; requestAnimationFrame(loop); })();
    document.querySelectorAll('a,button,.row').forEach(function(el){
      el.addEventListener('mouseenter',function(){ c.classList.add('big'); });
      el.addEventListener('mouseleave',function(){ c.classList.remove('big'); });
    });
  }

  // rotating word
  var rot = document.getElementById('rot');
  if (rot) {
    var w = (rot.getAttribute('data-w')||'').split('|'), i=0;
    if (w.length>1) setInterval(function(){
      i=(i+1)%w.length;
      rot.style.opacity=0; rot.style.transform='translateY(-12px)';
      setTimeout(function(){ rot.textContent=w[i]; rot.style.opacity=1; rot.style.transform='none'; },220);
    },2300);
  }

  // form
  var f = document.getElementById('brief');
  if (f) f.addEventListener('submit',function(e){
    e.preventDefault();
    var o = document.getElementById('sent');
    f.style.display='none'; if(o) o.style.display='block';
  });
})();
