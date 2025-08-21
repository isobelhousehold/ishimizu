// Simple carousel and data rendering
const heroImages = [
  '/assets/images/hero/hero-1.jpg',
  '/assets/images/hero/hero-2.jpg',
  '/assets/images/hero/hero-3.jpg'
];

function initCarousel(){
  const el = document.querySelector('.carousel');
  if(!el) return;
  const img = el.querySelector('img');
  const dots = el.querySelector('.dots');
  heroImages.forEach((_,i)=>{
    const d = document.createElement('div');
    d.className = 'dot' + (i===0?' active':'');
    d.dataset.idx = i;
    d.addEventListener('click',()=>show(i));
    dots.appendChild(d);
  });
  let idx = 0, timer=null;
  function show(i){
    idx = i;
    img.src = heroImages[idx % heroImages.length];
    [...dots.children].forEach((c,j)=>c.classList.toggle('active', j===idx));
  }
  function next(){ show((idx+1)%heroImages.length); }
  show(0);
  timer = setInterval(next, 5000);
}

async function renderProducts(){
  const grid = document.querySelector('#products-grid');
  if(!grid) return;
  const res = await fetch('/assets/data/products.json');
  const products = await res.json();
  const byModel = (m)=>products.filter(p=>p.Model.toLowerCase()===m);
  const models = ['heiwa','kanjo','hogo'];
  const fragment = document.createDocumentFragment();
  models.forEach(m=>{
    const h2 = document.createElement('h2');
    h2.textContent = m.charAt(0).toUpperCase()+m.slice(1);
    fragment.appendChild(h2);
    const wrap = document.createElement('div');
    wrap.className='cards';
    byModel(m).forEach(p=>{
      const card = document.createElement('article');
      card.className='card';
      const img = document.createElement('img');
      img.alt = p.Description;
      img.loading='lazy';
      // Image convention: assets/images/products/SLUG.jpg
      img.src = `/assets/images/products/${p.slug}.jpg`;
      const pad = document.createElement('div');
      pad.className='pad';
      const h3 = document.createElement('h3');
      h3.textContent = p.Description;
      const p1 = document.createElement('p');
      p1.innerHTML = `<span class="badge">${p.Capacity}</span> · ${p.Stones_Name} · ${p.Stones_Type}`;
      pad.append(h3,p1);
      card.append(img,pad);
      wrap.appendChild(card);
    });
    fragment.appendChild(wrap);
  });
  grid.appendChild(fragment);
}

async function renderStones(){
  const grid = document.querySelector('#stones-grid');
  if(!grid) return;
  const res = await fetch('/assets/data/stones.json');
  const stones = await res.json();
  const wrap = document.createElement('div');
  wrap.className = 'cards';
  stones.forEach(s=>{
    const card = document.createElement('article');
    card.className='card';
    const img = document.createElement('img');
    img.alt = s.name;
    img.loading='lazy';
    img.src = `/assets/images/stones/${s.name.toLowerCase().replace(/\s+/g,'-')}.jpg`;
    const pad = document.createElement('div');
    pad.className='pad';
    const h3 = document.createElement('h3');
    h3.textContent = s.name;
    const p1 = document.createElement('p');
    p1.textContent = `Colors: ${s.colors.join(', ')} | Forms: ${s.types.join(', ')}`;
    const p2 = document.createElement('p');
    p2.className='hero-note';
    p2.textContent = s.note || 'People choose this stone for its look and symbolism.';
    pad.append(h3,p1,p2);
    card.append(img,pad);
    wrap.appendChild(card);
  });
  grid.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded',()=>{
  initCarousel();
  renderProducts();
  renderStones();
});
