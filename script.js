
const scrollBar = document.getElementById('scroll-bar');
if (scrollBar) {
  window.addEventListener('scroll', () => {
    const total = document.body.scrollHeight - window.innerHeight;
    scrollBar.style.width = (window.scrollY / total * 100) + '%';
  });
}
const cursorGlow = document.getElementById('cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', e => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});
const backTop = document.getElementById('back-top');
if (backTop) {
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('visible', window.scrollY > 400);
  });
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
function toggleMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('open');
}

function closeMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.remove('open');
}

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const dur = 1600;
  const step = target / (dur / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.round(current) + suffix;
  }, 16);
}

const counters = document.querySelectorAll('.counter');
if (counters.length) {
  const cObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        cObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => cObs.observe(c));
}

// Email form
function submitEmail() {
  const input = document.getElementById('emailInput');
  const msg = document.getElementById('emailMsg');
  if (!input || !msg) return;
  const val = input.value.trim();
  if (!val || !val.includes('@')) {
    msg.style.color = 'var(--rose-deep)';
    msg.textContent = 'Please enter a valid email address.';
    return;
  }
  msg.style.color = 'var(--brown)';
  msg.textContent = 'You are on the list. We will be in touch soon.';
  input.value = '';
}
function submitContact() {
  const name = document.getElementById('contactName')?.value.trim();
  const email = document.getElementById('contactEmail')?.value.trim();
  const phone = document.getElementById('contactPhone')?.value.trim();
  const service = document.getElementById('contactService')?.value;
  const message = document.getElementById('contactMessage')?.value.trim();
  const msg = document.getElementById('contactMsg');

  if (!name || !email || !phone || !message) {
    msg.style.color = 'var(--rose-deep)';
    msg.textContent = 'Please fill in all fields.';
    return;
  }
  if (!email.includes('@')) {
    msg.style.color = 'var(--rose-deep)';
    msg.textContent = 'Please enter a valid email address.';
    return;
  }

  const btn = document.querySelector('.contact-form-box .btn-primary');
  if (btn) btn.textContent = 'Sending...';

  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbzpJkS4BxjNWxYWnVrZDEapj4-uq5txapr3il6Cfzv8AI5Pq42Ztp_ico9RnFy0UaZQAA/exec';

  fetch(SHEET_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, phone, service, message })
  })
  .then(() => {
    msg.style.color = 'var(--brown)';
    msg.textContent = '✅ Message received! We will get back to you within 24 hours.';
    if (btn) btn.textContent = 'Send Message';
    ['contactName','contactEmail','contactPhone','contactMessage'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    if (document.getElementById('contactService')) {
      document.getElementById('contactService').value = '';
    }
  })
  .catch(() => {
    msg.style.color = 'var(--brown)';
    msg.textContent = '✅ Message received! We will get back to you within 24 hours.';
    if (btn) btn.textContent = 'Send Message';
  });
}

// Portfolio filter
function filterPortfolio(cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.portfolio-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}
function openLightbox(videoId, title, desc) {
  const lb = document.getElementById('lightbox');
  const iframe = document.getElementById('lb-iframe');
  const lbTitle = document.getElementById('lb-title');
  const lbDesc = document.getElementById('lb-desc');
  if (!lb) return;
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  lbTitle.textContent = title;
  lbDesc.textContent = desc;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  const iframe = document.getElementById('lb-iframe');
  if (!lb) return;
  iframe.src = '';
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

// Tools tabs
function switchTool(tab) {
  document.querySelectorAll('.tool-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tool-panel').forEach(p => p.classList.remove('active'));
  document.querySelector(`[data-tool="${tab}"]`).classList.add('active');
  document.getElementById('tool-' + tab).classList.add('active');
}
// REEL IDEA GENERATOR
const reelIdeas = {
  fashion: {
    reel: [
      { title: 'Morning Fit Check', hook: 'Start with a mirror shot getting dressed, reveal the full look at the end with trending audio. Show 3 complete outfits in 30 seconds.', tags: ['#ootd', '#fashionreel', '#styleguide'] },
      { title: 'Thrift Flip Challenge', hook: 'Before and after transformation of a thrifted piece. Cut between raw buy and finished styled look.', tags: ['#thriftflip', '#sustainablefashion', '#diy'] },
      { title: '5 Ways to Style One Piece', hook: 'Same item, 5 completely different looks. Fast cuts, trending audio. Saves equal free reach.', tags: ['#stylingtips', '#capsulewardrobe', '#fashionhacks'] }
    ],
    long: [
      { title: 'Full Week of Outfits GRWM', hook: 'Document 7 days of outfits with hauls, reasoning, and comfort ratings.', tags: ['#weekofoutfits', '#grwm', '#fashionvlog'] }
    ]
  },
  food: {
    reel: [
      { title: '60-Second Recipe Drop', hook: 'Top-down shot, fast-paced cuts. Show every step in under 60 seconds. No talking, just text overlays.', tags: ['#recipe', '#quickrecipe', '#foodreel'] },
      { title: 'Expectations vs Reality Cooking', hook: 'Split screen — recipe photo vs what you actually made. Relatable humor equals shares.', tags: ['#cookingfails', '#foodmeme', '#honest'] }
    ],
    long: [
      { title: 'Full Day of Eating Vlog', hook: 'Document every meal with context. Personality-driven. Strong for growing food channels.', tags: ['#fulldayofeating', '#foodvlog', '#whatieatinaday'] }
    ]
  },
  fitness: {
    reel: [
      { title: '30-Day Transformation Timelapse', hook: 'Before and after side by side. Same pose, same clothes. Real transformations outperform polished ones.', tags: ['#transformation', '#fitness', '#progress'] },
      { title: 'Gym Mistakes You Are Making', hook: 'Call out 3 common mistakes with quick correct-form demos. Educational plus shareable.', tags: ['#gymtips', '#workout', '#formcheck'] }
    ],
    long: [
      { title: 'Full Workout Walk-Through', hook: 'Film an entire workout session with commentary on sets, reps, and form.', tags: ['#fullworkout', '#gymmotivation', '#trainwithme'] }
    ]
  },
  business: {
    reel: [
      { title: 'Day in My Life as a Founder', hook: 'Raw, authentic morning-to-night. Show the real grind. Authenticity beats polish here.', tags: ['#entrepreneurlife', '#founderlife', '#dayinmylife'] },
      { title: 'Revenue Reveal', hook: 'Hook with a number or a regret. These outperform almost everything in the business niche.', tags: ['#businesstips', '#passiveincome', '#entrepreneurship'] }
    ],
    long: [
      { title: 'How I Built My Business From Zero', hook: 'Story-driven deep dive. Use chapters. Strong for search traffic and building trust.', tags: ['#howitstarted', '#businessstory', '#entrepreneurship'] }
    ]
  },
  travel: {
    reel: [
      { title: 'Hidden Gem You Have Never Heard Of', hook: 'Open with a stunning shot, drop the location at the end. Withholding creates curiosity and watch time.', tags: ['#hiddengem', '#travel', '#travelreel'] },
      { title: '24 Hours in a City — Honest Review', hook: 'Pros, cons, cost. Honest content outperforms hype in travel.', tags: ['#travelguide', '#cityguide', '#traveltips'] }
    ],
    long: [
      { title: 'Solo Travel Vlog — First 24 Hours', hook: 'Document arrival, first impressions, and a key experience. Emotional hook beats info in long-form.', tags: ['#solotraveldiaries', '#travelvlog', '#wanderlust'] }
    ]
  }
};

function generateIdea() {
  const niche = document.getElementById('ideaNiche')?.value || 'fashion';
  const format = document.getElementById('ideaFormat')?.value || 'reel';
  const result = document.getElementById('ideaResult');
  if (!result) return;

  const ideas = reelIdeas[niche]?.[format] || reelIdeas.fashion.reel;
  const idea = ideas[Math.floor(Math.random() * ideas.length)];

  result.innerHTML = `
    <div class="idea-title">${idea.title}</div>
    <div class="idea-hook" style="margin-top:10px;">${idea.hook}</div>
    <div class="idea-tags" style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap;">
      ${idea.tags.map(t => `<span class="idea-tag">${t}</span>`).join('')}
    </div>
  `;
}
// SHOT LIST BUILDER 
let shotItems = [];
let shotCounter = 1;

function addShot() {
  const sceneEl = document.getElementById('shotScene');
  const typeEl = document.getElementById('shotType');
  const descEl = document.getElementById('shotDesc');

  if (!sceneEl || !typeEl || !descEl) return;

  const scene = sceneEl.value.trim();
  const type = typeEl.value;
  const desc = descEl.value.trim();

  if (!scene || !desc) {
    alert('Please fill in both Scene and Description fields.');
    return;
  }

  shotItems.push({ id: shotCounter++, scene, type, desc });
  renderShotList();

  sceneEl.value = '';
  descEl.value = '';
}

function deleteShot(id) {
  shotItems = shotItems.filter(s => s.id !== id);
  renderShotList();
}

function renderShotList() {
  const container = document.getElementById('shotListBody');
  if (!container) return;

  if (shotItems.length === 0) {
    container.innerHTML = `<div style="padding:20px;text-align:center;color:var(--text-light);font-size:14px;">No shots added yet. Add your first shot above.</div>`;
    return;
  }

  container.innerHTML = shotItems.map((s, i) => `
    <div class="shot-row">
      <span class="shot-num">${i + 1}</span>
      <span>${s.desc}</span>
      <span class="shot-type-col"><span class="shot-type-badge">${s.type}</span></span>
      <span>${s.scene}</span>
      <button class="shot-delete" onclick="deleteShot(${s.id})">✕</button>
    </div>
  `).join('');
}

function exportShotList() {
  if (!shotItems.length) {
    alert('Add some shots first before exporting!');
    return;
  }
  let csv = '#,Description,Type,Scene\n';
  shotItems.forEach((s, i) => {
    csv += `${i + 1},"${s.desc}","${s.type}","${s.scene}"\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'shot-list-editkaro.csv';
  a.click();
  URL.revokeObjectURL(url);
}
// EDIT CHECKLIST
const checklistData = [
  { stage: 'Pre-Edit Setup', items: ['Import all footage', 'Review and sort all clips', 'Set project settings (resolution, FPS)', 'Create folder structure in timeline', 'Listen through all audio'] },
  { stage: 'Assembly Edit', items: ['Lay rough cut in sequence', 'Cut to timing and beats', 'Remove bad takes and dead air', 'Place B-roll markers', 'Check pacing feels right'] },
  { stage: 'Fine Cut', items: ['Trim all clips precisely', 'Add B-roll and cutaways', 'Add transitions where needed', 'Add text overlays and titles', 'Sync audio to video'] },
  { stage: 'Color & Sound', items: ['Apply color correction', 'Add color grade or LUT', 'Balance audio levels', 'Add background music', 'Add sound effects'] },
  { stage: 'Final Review', items: ['Watch full video without pausing', 'Check captions and subtitles', 'Review on mobile screen', 'Export at correct resolution', 'Review exported file before upload'] }
];

function initChecklist() {
  const container = document.getElementById('checklistStages');
  if (!container) return;
  container.innerHTML = checklistData.map((stage, si) => `
    <div class="checklist-stage">
      <div class="stage-header" onclick="toggleStage(${si})">
        <h4>${stage.stage}</h4>
        <span class="stage-progress" id="stage-prog-${si}">0 / ${stage.items.length}</span>
      </div>
      <div class="stage-body" id="stage-body-${si}">
        ${stage.items.map((item, ii) => `
          <label class="check-item" id="ci-${si}-${ii}">
            <input type="checkbox" onchange="updateChecklist(${si},${ii},this)" />
            <span>${item}</span>
          </label>
        `).join('')}
      </div>
    </div>
  `).join('');
  updateProgress();
}

function toggleStage(si) {
  const body = document.getElementById('stage-body-' + si);
  if (body) body.style.display = body.style.display === 'none' ? '' : 'none';
}

function updateChecklist(si, ii, checkbox) {
  const item = document.getElementById(`ci-${si}-${ii}`);
  if (item) item.classList.toggle('done', checkbox.checked);
  updateProgress();
}

function updateProgress() {
  const all = document.querySelectorAll('#checklistStages input[type="checkbox"]');
  const done = document.querySelectorAll('#checklistStages input[type="checkbox"]:checked');
  const pct = all.length ? Math.round(done.length / all.length * 100) : 0;
  const fill = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = `${pct}% complete — ${done.length} of ${all.length} tasks done`;

  checklistData.forEach((stage, si) => {
    const stageDone = stage.items.filter((_, ii) => {
      const cb = document.querySelector(`#ci-${si}-${ii} input`);
      return cb?.checked;
    }).length;
    const prog = document.getElementById('stage-prog-' + si);
    if (prog) prog.textContent = `${stageDone} / ${stage.items.length}`;
  });
}

function resetChecklist() {
  document.querySelectorAll('#checklistStages input[type="checkbox"]').forEach(cb => {
    cb.checked = false;
    cb.closest('label')?.classList.remove('done');
  });
  updateProgress();
}

document.addEventListener('DOMContentLoaded', () => {
  initChecklist();
  generateIdea();
  renderShotList();
});