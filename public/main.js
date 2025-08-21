document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());
// Carousel
document.querySelectorAll('.carousel').forEach(carousel=>{
  const track=carousel.querySelector('.carousel-track');
  const slides=Array.from(track.querySelectorAll('img'));
  const prev=carousel.querySelector('.prev');
  const next=carousel.querySelector('.next');
  const dotsWrap=carousel.querySelector('.carousel-dots');
  slides.forEach((_,i)=>{const b=document.createElement('button');if(i===0)b.classList.add('active');b.addEventListener('click',()=>goTo(i));dotsWrap.appendChild(b);});
  let index=0; const interval=parseInt(carousel.dataset.interval||'4500',10); const autoplay=carousel.dataset.autoplay==='true'; let timer=null;
  function update(){ track.style.transform=`translateX(-${index*100}%)`; Array.from(dotsWrap.children).forEach((d,i)=>d.classList.toggle('active',i===index)); }
  function goTo(i){ index=(i+slides.length)%slides.length; update(); restart(); }
  function nextSlide(){ goTo(index+1); }
  function prevSlide(){ goTo(index-1); }
  next&&next.addEventListener('click',nextSlide); prev&&prev.addEventListener('click',prevSlide);
  let startX=0; track.addEventListener('touchstart',e=>startX=e.touches[0].clientX); track.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX; if(Math.abs(dx)>40){ dx<0?nextSlide():prevSlide(); }});
  function restart(){ if(timer) clearInterval(timer); if(autoplay) timer=setInterval(nextSlide,interval); }
  restart();
});
// Product filters
(function(){
  const grid=document.getElementById('product-grid'); if(!grid) return;
  const cards=Array.from(grid.querySelectorAll('.product-card'));
  const fLine=document.getElementById('filter-line');
  const fStone=document.getElementById('filter-stone');
  const fCap=document.getElementById('filter-capacity');
  const fSearch=document.getElementById('filter-search');
  function apply(){
    const line=fLine?.value.trim(); const stone=fStone?.value.trim(); const cap=fCap?.value.trim(); const q=(fSearch?.value||'').trim().toLowerCase();
    cards.forEach(card=>{
      const okLine=!line||card.dataset.line===line;
      const okStone=!stone||card.dataset.stone===stone;
      const okCap=!cap||card.dataset.capacity===cap;
      const okQ=!q||card.textContent.toLowerCase().includes(q);
      card.style.display=(okLine&&okStone&&okCap&&okQ)?'':'none';
    });
  }
  [fLine,fStone,fCap,fSearch].forEach(el=>el&&el.addEventListener('input',apply));
  if(location.hash){ const model=location.hash.replace('#',''); if(['Heiwa','Kanjo','Hogo'].includes(model) && fLine){ fLine.value=model; const e=new Event('input'); fLine.dispatchEvent(e);} }
})();
