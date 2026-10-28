(function(){
'use strict';
const CATS = window.HELP_CATEGORIES, ARTS = window.ARTICLES, ACATS = window.AGENT_CATEGORIES, ITEMS = window.AGENT_ITEMS;
const $ = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const main = $('#main');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const strip = s => String(s).replace(/<[^>]+>/g,'');
const slugify = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

const ICONS = {
  spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
  coin:'<circle cx="12" cy="12" r="8.5"/><path d="M14.8 9.2c-.5-.8-1.5-1.2-2.8-1.2-1.7 0-2.8.8-2.8 2s1.1 1.7 2.8 2 2.8.8 2.8 2-1.1 2-2.8 2c-1.3 0-2.4-.5-2.9-1.3M12 6.5V8M12 16v1.5"/>',
  board:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/>',
  agents:'<path d="M12 3l2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5L4.8 8.3l5-.7z"/>',
  wrench:'<path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 8-8zM9.3 17.7 4 20l2.3-5.3"/><path d="M14.7 6.3 13 4.6a4 4 0 0 0-5.7 5.6l1.7 1.6"/>',
  doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
  check:'<path d="m5 12 5 5 9-10"/>',
  up:'<path d="M7 11v9H4v-9zM7 11l4-8c1.7 0 2.7 1 2.5 2.7L13 9h5.5a2 2 0 0 1 2 2.3l-1.2 7A2 2 0 0 1 17.3 20H7"/>',
  down:'<path d="M17 13V4h3v9zM17 13l-4 8c-1.7 0-2.7-1-2.5-2.7L11 15H5.5a2 2 0 0 1-2-2.3l1.2-7A2 2 0 0 1 6.7 4H17"/>',
  info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z"/>',
  warn:'<path d="M12 4 2.5 20h19z"/><path d="M12 10v4M12 17h.01"/>',
  alert:'<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
  upload:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
  ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  chat:'<path d="M4 5h16v11H8l-4 4z"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
};
const ic = (n, cls='i') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]||''}</svg>`;

const catOf = slug => CATS.find(c => c.slug === slug);
const acatOf = slug => ACATS.find(c => c.slug === slug);
const artsIn = slug => ARTS.filter(a => a.cat === slug);
const shortAgent = n => n.replace(' Agent','');

/* ---------- search ---------- */
const INDEX = [
  ...ARTS.map(a => ({kind:'Article', title:a.title, sub:a.summary, href:`#/article/${a.id}`, icon:catOf(a.cat).icon, label:catOf(a.cat).name,
    text:(a.title+' '+a.summary+' '+a.body.map(b => Array.isArray(b.v)?b.v.join(' '):(b.v||'')+' '+(b.cap||'')).join(' ')).toLowerCase(), t:a.title.toLowerCase(), s:a.summary.toLowerCase()})),
  ...ACATS.map(c => ({kind:'Agent', title:c.name, sub:c.desc, href:`#/agents/${c.slug}`, img:c.hero,
    text:(c.name+' '+c.desc).toLowerCase(), t:c.name.toLowerCase(), s:c.desc.toLowerCase()})),
  ...ITEMS.map(i => ({kind:shortAgent(acatOf(i.cat).name)+' example', title:i.name, sub:i.desc, href:`#/agents/${i.cat}?item=${i.id}`, img:i.img,
    text:(i.name+' '+i.desc+' '+i.prompt+' '+(i.tag||'')+' '+(i.badge||'')).toLowerCase(), t:i.name.toLowerCase(), s:i.desc.toLowerCase()}))
];
function search(q){
  const terms = q.toLowerCase().trim().split(/\s+/).filter(w => w.length > 1 || /\d/.test(w));
  if(!terms.length) return [];
  return INDEX.map(r => {
    let score = 0;
    for(const w of terms){
      if(!r.text.includes(w)) return null;
      if(r.t.includes(w)) score += 10; if(r.t.startsWith(w)) score += 4;
      if(r.s.includes(w)) score += 3; score += 1;
    }
    if(r.kind==='Article') score += 2;
    return {...r, score};
  }).filter(Boolean).sort((a,b) => b.score - a.score);
}
const hl = (s, q) => {
  let out = esc(s);
  q.toLowerCase().split(/\s+/).filter(w => w.length>1).forEach(w => {
    out = out.replace(new RegExp('('+w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','ig'), '<mark>$1</mark>');
  });
  return out;
};
function bindSearch(wrap){
  const input = $('input', wrap), box = $('.suggest', wrap);
  let sel = -1, res = [];
  const render = () => {
    const q = input.value.trim();
    if(!q){ box.classList.remove('open'); return; }
    res = search(q).slice(0,7); sel = -1;
    box.innerHTML = res.length ? res.map((r,i) => `<a class="sg-item" href="${r.href}" data-i="${i}" role="option">
        ${r.img ? `<img class="sg-thumb" src="${r.img}" alt="">` : `<span class="sg-thumb">${ic(r.icon||'doc')}</span>`}
        <span style="min-width:0"><div class="sg-t">${hl(r.title,q)}</div><div class="sg-s">${esc(r.sub)}</div></span>
        <span class="sg-kind">${esc(r.kind)}</span></a>`).join('') + `<div class="sg-foot"><a href="#/search?q=${encodeURIComponent(q)}">See all results for “${esc(q)}” →</a></div>`
      : `<div class="sg-empty">No results for “${esc(q)}”. Try “credits”, “boards” or “video”.</div><div class="sg-foot"><a href="#" data-contact>Contact support</a></div>`;
    box.classList.add('open');
  };
  input.addEventListener('input', render);
  input.addEventListener('focus', render);
  input.addEventListener('keydown', e => {
    const items = $$('.sg-item', box);
    if(e.key==='ArrowDown'||e.key==='ArrowUp'){ e.preventDefault(); if(!items.length) return;
      sel = (sel + (e.key==='ArrowDown'?1:-1) + items.length) % items.length;
      items.forEach((el,i) => el.classList.toggle('sel', i===sel)); items[sel].scrollIntoView({block:'nearest'}); }
    else if(e.key==='Enter'){ e.preventDefault(); const q=input.value.trim(); if(!q) return;
      location.hash = sel>=0 ? items[sel].getAttribute('href') : `#/search?q=${encodeURIComponent(q)}`;
      box.classList.remove('open'); input.blur(); }
    else if(e.key==='Escape'){ box.classList.remove('open'); input.blur(); }
  });
  document.addEventListener('click', e => { if(!wrap.contains(e.target)) box.classList.remove('open'); });
  box.addEventListener('click', () => { box.classList.remove('open'); input.value=''; });
}

/* ---------- shared pieces ---------- */
const crumbs = list => `<nav class="crumbs" aria-label="Breadcrumb">${list.map((c,i) => (i?'<span class="sep">/</span>':'') + (c[1]?`<a href="${c[1]}">${esc(c[0])}</a>`:`<span>${esc(c[0])}</span>`)).join('')}</nav>`;
const artRow = (a, showCat) => `<a class="art-row" href="#/article/${a.id}">
  <span class="ar-ic">${ic(catOf(a.cat).icon)}</span>
  <span><div class="art-t">${esc(a.title)}</div><div class="art-s">${esc(a.summary)}</div>
  ${(showCat||a.known||a.draft)?`<div class="badges">${showCat?`<span class="badge">${esc(catOf(a.cat).name)}</span>`:''}${a.known?'<span class="badge badge-known">Known issue</span>':''}${a.draft?'<span class="badge badge-draft">Draft copy</span>':''}</div>`:''}</span></a>`;
const ctaBlock = () => `<div class="cta"><div><h2>Still need help?</h2><p>Our support team can look into your account, boards and credits.</p></div>
  <div class="btns"><button class="btn btn-brand" data-contact>${ic('chat')} Contact support</button><a class="btn btn-ghost" href="#/category/troubleshooting">Troubleshooting</a></div></div>`;

/* ---------- pages ---------- */
function home(){
  const popular = ARTS.filter(a => a.popular);
  const cards = CATS.map(c => {
    if(c.isAgents) return `<a class="cat-card agents" href="#/agents">
      <div class="agents-txt"><span class="cat-ic">${ic(c.icon)}</span><h3>${c.name} guide</h3><p>${c.desc} ${ITEMS.length} example prompts you can copy, with the inputs each one needs.</p>
      <div class="cat-meta"><span>6 agents · ${ITEMS.length} examples</span><span class="arr">${ic('arrow')}</span></div></div>
      <div class="agents-strip">${ACATS.map(a => `<figure><img src="${a.hero}" alt="" loading="lazy"><figcaption>${shortAgent(a.name)}</figcaption></figure>`).join('')}</div></a>`;
    const n = artsIn(c.slug).length;
    return `<a class="cat-card" href="#/category/${c.slug}"><span class="cat-ic">${ic(c.icon)}</span><h3>${c.name}</h3><p>${c.desc}</p>
      <div class="cat-meta"><span>${n} articles</span><span class="arr">${ic('arrow')}</span></div></a>`;
  });
  // put the agents banner after the first 3 cards
  const agentsCard = cards.splice(CATS.findIndex(c=>c.isAgents),1)[0];
  cards.splice(3,0,agentsCard);
  cards[4] = cards[4].replace('class="cat-card"','class="cat-card half"'); cards[5] = cards[5].replace('class="cat-card"','class="cat-card half"');
  return `<div class="page">
  <section class="hero"><div class="hero-in">
    <span class="eyebrow"><span class="dot"></span>Designs.ai Help Center</span>
    <h1>How can we help?</h1>
    <p class="lead">Guides for AI Agents, Studio and your account, plus every example prompt in one place.</p>
    <div class="search" data-search>
      ${ic('search')}
      <input type="search" placeholder="Search articles, agents and example prompts" aria-label="Search help" autocomplete="off" id="heroSearch">
      <span class="kbd">/</span>
      <div class="suggest" role="listbox"></div>
    </div>
    <div class="quick"><span>Popular:</span>
      ${[['Credits','credits'],['Boards','boards'],['Agent vs Ask','agent ask'],['Needs photo','needs photo'],['Team accounts','team account']].map(([l,q]) => `<a class="chip" href="#/search?q=${encodeURIComponent(q)}">${l}</a>`).join('')}
    </div>
  </div></section>
  <section class="section"><div class="wrap">
    <div class="sec-head"><div><h2>Browse by topic</h2><p>Start with the basics or go straight to an agent.</p></div></div>
    <div class="cat-grid">${cards.join('')}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <div class="sec-head"><div><h2>Popular articles</h2></div><a class="link-arrow" href="#/search?q=">All articles →</a></div>
    <div class="pop-grid">${popular.map(a => artRow(a,true)).join('')}</div>
  </div></section>
  <section class="section"><div class="wrap">${ctaBlock()}</div></section>
  </div>`;
}

function sideNav(active){
  return `<aside class="side-nav"><h4>Topics</h4>${CATS.map(c => c.isAgents
    ? `<a href="#/agents" class="${active==='agents'?'on':''}">${c.name}<span class="n">${ACATS.length}</span></a>`
    : `<a href="#/category/${c.slug}" class="${active===c.slug?'on':''}">${c.name}<span class="n">${artsIn(c.slug).length}</span></a>`).join('')}</aside>`;
}

function category(slug){
  const c = catOf(slug); if(!c) return notFound();
  if(c.isAgents){ location.replace('#/agents'); return ''; }
  const list = artsIn(slug);
  return `<div class="page">
  <div class="page-head"><div class="wrap">${crumbs([['Help Center','#/'],[c.name]])}
    <h1>${c.name}</h1><p>${c.desc}</p></div></div>
  <div class="wrap cat-layout">${sideNav(slug)}
    <div><div class="muted tiny" style="margin-bottom:4px">${list.length} articles</div>${list.map(a => artRow(a)).join('')}
      <div style="margin-top:40px">${ctaBlock()}</div></div>
  </div></div>`;
}

const MOCKS = {
  'toast-error': () => `<div class="mock"><span class="mock-label">What you'll see</span><div class="m-toast">${ic('alert')} Something went wrong. Try again.</div></div>`,
  'toast-team': () => `<div class="mock"><span class="mock-label">What you'll see</span><div class="m-toast team">${ic('warn')} Studio doesn't support shared team accounts yet.</div></div>`,
  'node-cost': () => `<div class="mock"><span class="mock-label">Studio node</span><div class="m-node"><div class="m-node-h"><span class="chipdot"></span>Generate image</div>
     <div class="m-node-b"><div class="m-prompt">Describe the image you want…</div><div class="m-run"><span>Run</span><span class="cr">◆ 25 credits</span></div></div></div></div>`,
  'modes': () => `<div class="mock"><span class="mock-label">AI Agents prompt box</span><div class="m-modes"><div class="m-seg"><span class="on">Agent</span><span>Ask</span></div>
     <div class="m-box">Design a brand identity for a specialty coffee brand called Brewhaus…</div>
     <div class="m-cats">${ACATS.map((a,i)=>`<span class="${i===0?'on':''}">${shortAgent(a.name)}</span>`).join('')}</div></div></div>`,
  'board': () => `<div class="mock" style="padding:36px 20px 20px"><span class="mock-label">Board</span><div class="m-board">
     <svg viewBox="0 0 600 200" preserveAspectRatio="none"><path d="M175 60 C 250 60, 250 100, 320 100 M175 140 C 250 140, 250 100, 320 100" stroke="#1AC9DC" stroke-width="2" fill="none" vector-effect="non-scaling-stroke"/></svg>
     <div class="n" style="left:4%;top:18%"><i></i>Generate image</div><div class="n" style="left:4%;top:58%"><i></i>Generate audio</div>
     <div class="n" style="left:54%;top:39%"><i style="background:#7B979A"></i>Resources</div></div></div>`,
  'credits-low': () => `<div class="mock"><span class="mock-label">Example</span><div class="m-credits"><div class="m-node"><div class="m-node-h"><span class="chipdot"></span>Generate image</div>
     <div class="m-node-b"><div class="m-prompt" style="color:var(--ink)">Cinematic portrait, golden hour…</div><div class="m-run" style="opacity:.45"><span>Run</span><span class="cr">◆ 25 credits</span></div></div></div>
     <span class="m-bal">Balance: 10 credits (illustrative)</span></div></div>`
};

function renderBlocks(body){
  let hn = 0;
  return body.map(b => {
    switch(b.t){
      case 'p': return `<p>${b.v}</p>`;
      case 'h': return `<h2 id="s-${slugify(b.v)}">${esc(b.v)}</h2>`;
      case 'list': return `<ul>${b.v.map(x=>`<li>${x}</li>`).join('')}</ul>`;
      case 'steps': return `<ol class="steps">${b.v.map(x=>`<li>${x}</li>`).join('')}</ol>`;
      case 'img': return `<figure class="fig"><img src="${b.src}" alt="${esc(b.cap)}" loading="lazy"><figcaption>${esc(b.cap)}</figcaption></figure>`;
      case 'callout': return `<div class="callout ${b.k}">${ic(b.k==='warn'?'warn':b.k==='tip'?'bulb':'info')}<div>${b.v}</div></div>`;
      case 'code': return `<div class="codeblock">${esc(b.v)}<div style="margin-top:10px"><button class="copy" data-copy="${esc(b.v)}">${ic('copy')}Copy</button></div></div>`;
      case 'ui': return MOCKS[b.v] ? MOCKS[b.v]() : '';
    }
    return '';
  }).join('');
}

function article(id){
  const a = ARTS.find(x => x.id === id); if(!a) return notFound();
  const c = catOf(a.cat);
  const heads = a.body.filter(b => b.t==='h');
  const related = [...artsIn(a.cat).filter(x => x.id!==a.id), ...ARTS.filter(x => x.cat!==a.cat && x.popular && x.id!==a.id)].slice(0,4);
  const mins = Math.max(1, Math.round(a.body.map(b=>strip(Array.isArray(b.v)?b.v.join(' '):b.v||'')).join(' ').split(/\s+/).length/200));
  const toc = heads.length ? heads.map(h => `<a href="#/article/${a.id}" data-scroll="s-${slugify(h.v)}">${esc(h.v)}</a>`).join('') : '';
  return `<div class="page">
  <div class="page-head"><div class="wrap">${crumbs([['Help Center','#/'],[c.name,`#/category/${c.slug}`],[a.title]])}
    <h1>${esc(a.title)}</h1><p>${esc(a.summary)}</p>
    <div class="meta">${ic('clock')}<span>${mins} min read</span><span>·</span><span>Updated ${new Date(a.updated).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'})}</span>
      ${a.known?'<span class="badge badge-known">Known issue</span>':''}${a.draft?'<span class="badge badge-draft">Draft copy</span>':''}</div>
  </div></div>
  <div class="wrap art-layout">
    <article class="article">
      ${a.draft?`<div class="draft-note">${ic('info')}Contains placeholder copy. Check with the product, billing or legal owner before publishing.</div>`:''}
      ${toc?`<details class="toc-mobile callout info"><summary style="cursor:pointer;font-weight:500">On this page</summary><div style="margin-top:8px">${heads.map(h=>`<a style="display:block;padding:3px 0" href="#/article/${a.id}" data-scroll="s-${slugify(h.v)}">${esc(h.v)}</a>`).join('')}</div></details>`:''}
      <div class="article-body">${renderBlocks(a.body)}</div>
      <div class="feedback" id="feedback"><b>Was this article helpful?</b>
        <div class="fb-btns"><button class="fb-btn" data-fb="yes">${ic('up')}Yes</button><button class="fb-btn" data-fb="no">${ic('down')}No</button></div></div>
      <div class="related"><h3>Related articles</h3>${related.map(r => artRow(r, r.cat!==a.cat)).join('')}</div>
    </article>
    <aside class="toc">${toc?`<h4>On this page</h4>${toc}`:''}
      <div class="toc-cta"><p>Can't find what you need?</p><button class="btn btn-ghost" data-contact style="width:100%;justify-content:center">Contact support</button></div></aside>
  </div></div>`;
}

function itemCard(i){
  return `<article class="item" id="item-${i.id}" data-tag="${esc(i.tag||'')}" data-media="${i.badge?1:0}">
    <div class="item-img"><img src="${i.img}" alt="${esc(i.name)} example" loading="lazy">
      <div class="badges">${i.tag?`<span class="badge">${esc(i.tag.charAt(0)+i.tag.slice(1).toLowerCase())}</span>`:''}${i.badge?`<span class="badge badge-media">${ic('upload')}${esc(i.badge)}</span>`:''}</div></div>
    <div class="item-b"><h3>${esc(i.name)}</h3>${i.desc?`<p class="desc">${esc(i.desc)}</p>`:''}
      ${i.prompt ? `<div class="prompt"><div class="prompt-l"><span>Example prompt</span><button class="copy" data-copy="${esc(i.prompt)}">${ic('copy')}Copy</button></div>
        <div class="prompt-txt">${esc(i.prompt)}</div>${i.prompt.length>190?'<button class="prompt-more">Show more</button>':''}</div>`
      : `<div class="style-only"><b>Style preset.</b> Picking this card selects the style; describe your deck in the prompt box.</div>`}
      <div class="req">${ic(i.input?'upload':'check')}<span>${i.input?esc(i.input):'No upload needed. Just the prompt.'}</span></div>
    </div></article>`;
}

function agentsIndex(){
  const media = ITEMS.filter(i => i.badge);
  return `<div class="page">
  <div class="page-head"><div class="wrap">${crumbs([['Help Center','#/'],['AI Agents guide']])}
    <h1>AI Agents guide</h1><p>Six specialist agents, ${ITEMS.length} ready-made examples. Pick an agent in <b>Agent</b> mode, click an example to fill the prompt box, and edit it to fit your brief.</p></div></div>
  <section class="section"><div class="wrap">
    <div class="agent-cards">${ACATS.map(a => `<a class="agent-card" href="#/agents/${a.slug}"><img src="${a.hero}" alt="" loading="lazy"><span class="cnt">${a.count} examples</span>
      <div class="t"><h3>${a.name}</h3><p>${a.desc}</p></div></a>`).join('')}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <div class="sec-head"><div><h2>Examples that need your media</h2><p>These ${media.length} examples edit or animate a file you attach. Have it ready before you send.</p></div><a class="link-arrow" href="#/article/ts-needs-media">How uploads work →</a></div>
    <div class="table-wrap"><table class="media-table"><thead><tr><th>Example</th><th>Agent</th><th>You'll need</th></tr></thead><tbody>
    ${media.map(i => `<tr><td><a class="nm" href="#/agents/${i.cat}?item=${i.id}"><img src="${i.img}" alt="">${esc(i.name)}</a></td><td>${shortAgent(acatOf(i.cat).name)}</td><td><span class="badge badge-media">${esc(i.badge)}</span></td></tr>`).join('')}
    </tbody></table></div>
  </div></section>
  <section class="section"><div class="wrap">${ctaBlock()}</div></section></div>`;
}

function agentPage(slug, params){
  const a = acatOf(slug); if(!a) return notFound();
  const items = ITEMS.filter(i => i.cat===slug);
  const tags = [...new Set(items.map(i => i.tag).filter(Boolean))];
  const nMedia = items.filter(i=>i.badge).length;
  const isSlides = slug==='slides-agent';
  const tips = {
    'branding-agent':['Name the brand in the prompt. The examples use names like Brewhaus and Pulsefit.','List every deliverable you want: logo direction, palette, type, packaging, social assets.'],
    'image-agent':['Generate examples need only a prompt. Edit and Stylize examples usually need a photo.','Describe the light, lens and mood for photographic results.'],
    'storyboard-agent':['Give characters, setting and an ending. The agent breaks it into shots.','Product showcases work best with a clear product photo attached.'],
    'video-agent':['Generate = text to video. Motion control = animate a still. Edit = change an existing clip.','Attach the photo or clip before sending for Motion control and Edit examples.'],
    'slides-agent':['Slides cards are style presets. They don’t write a prompt for you.','Describe your audience, the number of slides and the story in the prompt box.'],
    'audio-agent':['Say the genre, mood, length and instruments for music.','The voice-over and transcript examples need your video or audio file.']
  }[slug] || [];
  const related = slug==='slides-agent' ? ['ts-slides-prompt','example-prompts','how-credits-work'] : nMedia ? ['ts-needs-media','first-brief','how-credits-work'] : ['first-brief','agent-vs-ask','how-credits-work'];
  const html = `<div class="page">
  <section class="agent-hero"><img src="${a.hero}" alt=""><div class="wrap">
    ${crumbs([['Help Center','#/'],['AI Agents guide','#/agents'],[a.name]])}
    <h1>${a.name}</h1><p>${a.desc}</p>
    <div class="agent-stats"><span>${items.length} examples</span>${nMedia?`<span>${nMedia} need your media</span>`:''}${isSlides?'<span>Style presets</span>':''}<span>Works in Agent mode</span></div>
  </div></section>
  <nav class="agent-tabs"><div class="wrap">${ACATS.map(x => `<a href="#/agents/${x.slug}" class="${x.slug===slug?'on':''}">${shortAgent(x.name)}</a>`).join('')}</div></nav>
  <section class="section" style="padding-top:28px"><div class="wrap">
    <div class="callout info" style="margin-top:0">${ic('bulb')}<div><b>How to use these:</b> ${tips.map(esc).join(' ')}</div></div>
    ${(tags.length>1||nMedia)?`<div class="filters" id="filters"><button class="chip on" data-f="all">All <span class="n">${items.length}</span></button>
      ${tags.length>1?tags.map(t => `<button class="chip" data-f="tag:${esc(t)}">${esc(t.charAt(0)+t.slice(1).toLowerCase())} <span class="n">${items.filter(i=>i.tag===t).length}</span></button>`).join(''):''}
      ${nMedia&&nMedia<items.length?`<button class="chip" data-f="media">${ic('upload')}Needs media <span class="n">${nMedia}</span></button>`:''}</div>`:''}
    <div class="item-grid">${items.map(itemCard).join('')}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <div class="sec-head"><div><h2>Related articles</h2></div></div>
    <div class="pop-grid">${related.map(id => artRow(ARTS.find(x=>x.id===id), true)).join('')}</div>
  </div></section></div>`;
  if(params.get('item')) setTimeout(() => { const el = $('#item-'+params.get('item')); if(el){ el.scrollIntoView({behavior:'smooth',block:'center'}); el.style.boxShadow='0 0 0 3px var(--brand)'; setTimeout(()=>el.style.boxShadow='',2200);} }, 350);
  return html;
}

function searchPage(q){
  const res = q ? search(q) : INDEX.filter(r => r.kind==='Article');
  const groups = {Articles: res.filter(r=>r.kind==='Article'), Agents: res.filter(r=>r.kind==='Agent'), 'Example prompts': res.filter(r=>r.kind.endsWith('example'))};
  return `<div class="page">
  <div class="page-head"><div class="wrap">${crumbs([['Help Center','#/'],['Search']])}
    <h1>${q?`Results for “${esc(q)}”`:'All articles'}</h1>
    <div class="search search-sm" data-search style="max-width:560px;margin-top:18px">${ic('search')}<input type="search" value="${esc(q)}" placeholder="Search help" aria-label="Search help" autocomplete="off"><div class="suggest"></div></div>
  </div></div>
  <div class="wrap" style="padding-bottom:64px"><div class="results">
    ${q?`<p class="muted" style="margin-top:20px">${res.length} result${res.length===1?'':'s'}</p>`:''}
    ${res.length ? Object.entries(groups).filter(([,v])=>v.length).map(([k,v]) => `<div class="result-group"><h3>${k} · ${v.length}</h3>
      ${v.map(r => `<a class="art-row" href="${r.href}">${r.img?`<img class="sg-thumb" src="${r.img}" alt="" loading="lazy">`:`<span class="ar-ic">${ic(r.icon||'doc')}</span>`}
        <span><div class="art-t">${hl(r.title,q)}</div><div class="art-s">${hl(r.sub,q)}</div><div class="badges"><span class="badge">${esc(r.label||r.kind)}</span></div></span></a>`).join('')}</div>`).join('')
    : `<div class="empty"><h2 style="margin-bottom:8px">No results</h2><p>Try different words, or browse by topic.</p><button class="btn btn-primary" data-contact>Contact support</button></div>`}
  </div></div></div>`;
}

const notFound = () => `<div class="page"><div class="wrap empty"><h1>Page not found</h1><p>That article may have moved.</p><a class="btn btn-primary" href="#/">Back to Help Center</a></div></div>`;

/* ---------- router ---------- */
function route(){
  const h = location.hash.replace(/^#/,'') || '/';
  const [path, qs] = h.split('?');
  const params = new URLSearchParams(qs||'');
  const parts = path.split('/').filter(Boolean);
  let html, nav = '';
  if(!parts.length) html = home();
  else if(parts[0]==='category'){ html = category(parts[1]); nav = parts[1]; }
  else if(parts[0]==='article'){ html = article(parts[1]); nav = (ARTS.find(a=>a.id===parts[1])||{}).cat; }
  else if(parts[0]==='agents'){ html = parts[1] ? agentPage(parts[1], params) : agentsIndex(); nav = 'agents'; }
  else if(parts[0]==='search') html = searchPage(params.get('q')||'');
  else html = notFound();
  if(html==='') return;
  main.innerHTML = html;
  $('#topSearchWrap').hidden = !parts.length || parts[0]==='search';
  $$('.topnav a[data-nav]').forEach(a => a.classList.toggle('active', a.dataset.nav===nav));
  $('#topnav').classList.remove('open');
  $$('[data-search]', main).forEach(bindSearch);
  const t = document.title = (() => {
    if(parts[0]==='article'){ const a = ARTS.find(x=>x.id===parts[1]); return a ? a.title+' | Designs.ai Help' : 'Help Center | Designs.ai'; }
    if(parts[0]==='agents' && parts[1]){ const a = acatOf(parts[1]); return a ? a.name+' guide | Designs.ai Help' : 'Help Center | Designs.ai'; }
    return 'Help Center | Designs.ai';
  })();
  if(!params.get('item')) window.scrollTo({top:0, behavior:'instant' in window ? 'instant' : 'auto'});
  setupToc();
}

function setupToc(){
  const links = $$('.toc a[data-scroll]'); if(!links.length) return;
  const heads = links.map(l => document.getElementById(l.dataset.scroll)).filter(Boolean);
  const obs = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ links.forEach(l => l.classList.toggle('on', l.dataset.scroll===e.target.id)); } }), {rootMargin:'-80px 0px -70% 0px'});
  heads.forEach(h => obs.observe(h));
  links[0].classList.add('on');
}

/* ---------- global interactions ---------- */
let toastT;
function toast(msg){ const t = $('#toast'); t.innerHTML = ic('check')+esc(msg); t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(()=>t.classList.remove('show'), 2000); }
async function copyText(s){
  try{ await navigator.clipboard.writeText(s); }
  catch{ const ta = document.createElement('textarea'); ta.value = s; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');}catch{} ta.remove(); }
}
const modal = $('#contactModal');
function openContact(){
  $('#contactForm').hidden = false; $('#contactSent').hidden = true; $('#contactForm').reset();
  $$('.field', modal).forEach(f => { f.classList.remove('err'); const m=$('.msg',f); if(m) m.remove(); });
  modal.hidden = false; document.body.style.overflow='hidden';
  setTimeout(() => $('input[name=name]', modal).focus(), 50);
}
function closeContact(){ modal.hidden = true; document.body.style.overflow=''; }

document.addEventListener('click', e => {
  const t = e.target;
  if(t.closest('[data-contact]')){ e.preventDefault(); openContact(); return; }
  if(t.closest('[data-close]')){ closeContact(); return; }
  const cp = t.closest('[data-copy]');
  if(cp){ copyText(cp.dataset.copy); cp.classList.add('ok'); cp.innerHTML = ic('check')+'Copied'; toast('Prompt copied'); setTimeout(()=>{cp.classList.remove('ok'); cp.innerHTML = ic('copy')+'Copy';},1800); return; }
  const more = t.closest('.prompt-more');
  if(more){ const p = more.closest('.prompt'); p.classList.toggle('open'); more.textContent = p.classList.contains('open')?'Show less':'Show more'; return; }
  const sc = t.closest('[data-scroll]');
  if(sc){ e.preventDefault(); const el = document.getElementById(sc.dataset.scroll); if(el) el.scrollIntoView({behavior:'smooth'}); return; }
  const fb = t.closest('[data-fb]');
  if(fb){ const box = $('#feedback');
    if(fb.dataset.fb==='yes') box.innerHTML = `<span class="fb-done">${ic('check')}Thanks for letting us know.</span>`;
    else box.innerHTML = `<b>Sorry about that. What was missing?</b><div class="fb-more"><textarea placeholder="Optional: tell us what you were looking for"></textarea><button class="btn btn-primary" data-fbsend>Send</button></div>`;
    return; }
  if(t.closest('[data-fbsend]')){ $('#feedback').innerHTML = `<span class="fb-done">${ic('check')}Thanks, your feedback helps us improve this article.</span> <a href="#" data-contact>Contact support</a>`; return; }
  const f = t.closest('[data-f]');
  if(f){ $$('#filters .chip').forEach(c => c.classList.toggle('on', c===f)); const v = f.dataset.f;
    $$('.item').forEach(it => { const show = v==='all' || (v==='media' ? it.dataset.media==='1' : it.dataset.tag===v.slice(4)); it.style.display = show?'':'none'; });
    return; }
});
$('#menuBtn').addEventListener('click', () => { const n = $('#topnav'); n.classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded', n.classList.contains('open')); });
document.addEventListener('keydown', e => {
  if(e.key==='Escape' && !modal.hidden) closeContact();
  if(e.key==='/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){ const s = $('#heroSearch') || $('#topSearchWrap:not([hidden]) input'); if(s){ e.preventDefault(); s.focus(); } }
});
$('#contactForm').addEventListener('submit', e => {
  e.preventDefault(); let ok = true;
  $$('[required]', e.target).forEach(inp => {
    const f = inp.closest('.field'); f.classList.remove('err'); const old = $('.msg', f); if(old) old.remove();
    const bad = !inp.value.trim() || (inp.type==='email' && !/^\S+@\S+\.\S+$/.test(inp.value));
    if(bad){ ok = false; f.classList.add('err'); f.insertAdjacentHTML('beforeend', `<span class="msg">${inp.type==='email'&&inp.value?'Enter a valid email address':'This field is required'}</span>`); }
  });
  if(!ok){ $('.field.err input, .field.err select, .field.err textarea', e.target).focus(); return; }
  $('#sentEmail').textContent = e.target.email.value; e.target.hidden = true; $('#contactSent').hidden = false;
});
bindSearch($('#topSearchWrap [data-search]'));
window.addEventListener('hashchange', route);
route();
})();
