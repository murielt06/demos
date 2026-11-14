(function(){
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.1,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.rv').forEach(function(el,i){el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});

  var b=document.querySelector('.burger'), n=document.querySelector('header nav');
  if(b&&n){
    b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',o?'Close menu':'Open menu')});
    n.addEventListener('click',function(e){if(e.target.closest('a')){n.classList.remove('open');b.setAttribute('aria-expanded','false')}});
    addEventListener('resize',function(){if(innerWidth>820){n.classList.remove('open');b.setAttribute('aria-expanded','false')}});
  }

  document.querySelectorAll('.slot').forEach(function(s){
    s.addEventListener('click',function(){
      document.querySelectorAll('.slot').forEach(function(x){x.classList.remove('sel')});
      s.classList.add('sel');
      var out=document.getElementById('picked');
      if(out){out.textContent=s.textContent.trim();out.parentElement.style.display='block';}
    });
  });

  var f=document.getElementById('booking');
  if(f)f.addEventListener('submit',function(e){e.preventDefault();f.style.display='none';var s=document.getElementById('sent');if(s)s.style.display='block';});
})();
