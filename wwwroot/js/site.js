/* ── NAV ── */
const snav=document.getElementById('snav');
addEventListener('scroll',()=>snav.classList.toggle('scrolled',scrollY>40),{passive:true});
const burger=document.getElementById('burger'),mmenu=document.getElementById('mmenu');
burger.addEventListener('click',()=>{
  const open=mmenu.classList.toggle('open');
  burger.classList.toggle('open',open);
  burger.setAttribute('aria-expanded',open);
  document.body.style.overflow=open?'hidden':'';
});
mmenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mmenu.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded','false');
  document.body.style.overflow='';
}));

/* ── INTERSECTION OBSERVER: reveal ── */
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target);}
  });
},{threshold:.07,rootMargin:'0px 0px -24px 0px'});
document.querySelectorAll('[data-r],.feat-card,.trust-hero,.how-col,.role-col').forEach(el=>io.observe(el));

/* ── PROGRESS BARS ── */
const progObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    e.target.querySelectorAll('.how-bar-fill,.mockup-progress-fill').forEach(f=>{
      const w=f.style.width;
      f.style.width='0';
      requestAnimationFrame(()=>{
        f.style.transition='width 1.4s cubic-bezier(.22,1,.36,1)';
        f.style.width=w;
      });
    });
    progObs.unobserve(e.target);
  });
},{threshold:.2});
document.querySelectorAll('.how-dashboard,.role-mockup,.app-mockup-hero').forEach(c=>progObs.observe(c));

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const t=document.querySelector(a.getAttribute('href'));
    if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});

/* ── OBUMU STRIP auto-slider ── */
(()=>{
  const strip=document.getElementById('showcase');
  const img=document.getElementById('obumuStripImage');
  const copy=document.querySelector('.obumu-strip-copy');
  const title=document.getElementById('obumuStripTitle');
  const desc=document.getElementById('obumuStripDesc');
  const prevImg=document.getElementById('obumuStripPrevImage');
  const prevTitle=document.getElementById('obumuStripPrevTitle');
  const prevDesc=document.getElementById('obumuStripPrevDesc');
  const nextImg=document.getElementById('obumuStripNextImage');
  const nextTitle=document.getElementById('obumuStripNextTitle');
  const nextDesc=document.getElementById('obumuStripNextDesc');
  const slides=Array.from(document.querySelectorAll('#obumuStripSlides > div'));
  if(!strip||!img||!title||!desc||slides.length<2)return;

  slides.forEach(s=>{ const pre=new Image(); pre.src=s.dataset.image; });

  const AUTOPLAY_MS=5800;
  let index=0;
  let timer=null;
  let swapTimer=null;

  function fillPreview(slide, imageEl, titleEl, descEl){
    if(!slide||!imageEl||!titleEl||!descEl)return;
    imageEl.src=slide.dataset.image||'';
    imageEl.alt=slide.dataset.alt||'';
    titleEl.textContent=slide.dataset.title||'';
    descEl.textContent=slide.dataset.desc||'';
  }

  function applySlide(i){
    const slide=slides[(i+slides.length)%slides.length];
    const prevSlide=slides[(i-1+slides.length)%slides.length];
    const nextSlide=slides[(i+1)%slides.length];
    img.src=slide.dataset.image||'';
    img.alt=slide.dataset.alt||'';
    title.textContent=slide.dataset.title||'';
    desc.textContent=slide.dataset.desc||'';
    fillPreview(prevSlide, prevImg, prevTitle, prevDesc);
    fillPreview(nextSlide, nextImg, nextTitle, nextDesc);
    img.classList.remove('is-transitioning');
    if(copy)copy.classList.remove('is-transitioning');
  }

  function goTo(i){
    index=(i+slides.length)%slides.length;
    img.classList.add('is-transitioning');
    if(copy)copy.classList.add('is-transitioning');
    window.clearTimeout(swapTimer);
    swapTimer=window.setTimeout(()=>applySlide(index),600);
  }

  function next(){
    goTo(index+1);
  }

  function stop(){
    if(timer){
      window.clearInterval(timer);
      timer=null;
    }
  }

  function start(){
    stop();
    timer=window.setInterval(next,AUTOPLAY_MS);
  }

  strip.addEventListener('mouseenter',stop);
  strip.addEventListener('mouseleave',start);
  strip.addEventListener('focusin',stop);
  strip.addEventListener('focusout',start);

  goTo(0);
  start();
})();

/* ── NAV ACTIVE LINK on scroll ── */
const sections=document.querySelectorAll('section[id],div[id]');
const navLinks=document.querySelectorAll('.nav-link');
const activeObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const match=document.querySelector(`.nav-link[href="#${e.target.id}"]`);
      if(match){
        navLinks.forEach(l=>l.classList.remove('on'));
        match.classList.add('on');
      }
    }
  });
},{threshold:.35});
sections.forEach(s=>activeObs.observe(s));

/* ── EVENTS SLIDER (hero) ── */
(()=>{
  const slider=document.getElementById('eventSlider');
  if(!slider)return;
  const track=document.getElementById('eventSliderTrack');
  const slides=Array.from(track.children);
  const total=slides.length;
  const prevBtn=document.getElementById('eventPrev');
  const nextBtn=document.getElementById('eventNext');
  const dots=Array.from(document.querySelectorAll('#eventDots .event-dot'));
  const AUTOPLAY_MS=4500;
  let index=0,timer=null;

  function goTo(i){
    index=(i+total)%total;
    track.style.transform=`translateX(-${index*100}%)`;
    slides.forEach((s,si)=>s.classList.toggle('is-active',si===index));
    dots.forEach((d,di)=>d.classList.toggle('is-active',di===index));
  }
  const next=()=>goTo(index+1);
  const prev=()=>goTo(index-1);
  const stop=()=>{if(timer){clearInterval(timer);timer=null;}};
  const start=()=>{stop();timer=setInterval(next,AUTOPLAY_MS);};

  nextBtn.addEventListener('click',()=>{next();start();});
  prevBtn.addEventListener('click',()=>{prev();start();});
  dots.forEach((d,i)=>d.addEventListener('click',()=>{goTo(i);start();}));

  slider.addEventListener('mouseenter',stop);
  slider.addEventListener('mouseleave',start);
  slider.addEventListener('focusin',stop);
  slider.addEventListener('focusout',start);

  let touchStartX=0;
  slider.addEventListener('touchstart',e=>{touchStartX=e.touches[0].clientX;stop();},{passive:true});
  slider.addEventListener('touchend',e=>{
    const dx=e.changedTouches[0].clientX-touchStartX;
    if(Math.abs(dx)>40){dx<0?next():prev();}
    start();
  },{passive:true});

  goTo(0);
  start();
})();
