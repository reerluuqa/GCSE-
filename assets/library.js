(() => {
  'use strict';
  const catalogue = window.REVISION_CATALOGUE;
  const script = document.querySelector('script[src$="assets/library.js"]');
  const base = new URL('../', script.src);
  const href = route => new URL(route, base).href;
  const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const route = document.body.dataset.page;
  const nodes = new Map();
  const resources = catalogue.resources;
  const paths = {
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    chevron: '<path d="m9 5 7 7-7 7"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/>',
    bookmark: '<path d="M6 4h12v17l-6-4-6 4z"/>',
    maths: '<path d="M5 6h14M9 6v13m7-13v10q0 3 3 3"/>',
    literature: '<path d="M12 6c-3-2-6-2-10-1v14c4-1 7-1 10 1 3-2 6-2 10-1V5c-4-1-7-1-10 1zm0 0v14"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2"/>',
    number: '<path d="m9 3-2 18m10-18-2 18M3 8h18M2 16h18"/>',
    algebra: '<path d="m6 5 12 14M18 5 6 19"/>',
    'ratio-proportion': '<circle cx="6" cy="6" r="3"/><circle cx="18" cy="18" r="3"/><path d="M19 3 5 21"/>',
    geometry: '<path d="M12 3 2 21h20zM9 21v-4h4v4"/>',
    statistics: '<path d="M4 20V10h4v10m4 0V4h4v16m4 0v-7h3v7M2 20h21"/>',
    probability: '<rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8" cy="8" r=".8"/><circle cx="16" cy="16" r=".8"/><circle cx="12" cy="12" r=".8"/>',
    spark: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    folder: '<path d="M3 7V5h7l3 3h8v12H3z"/>'
  };
  const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.folder}</svg>`;
  function addNodes(items, parent = '', subject = null) {
    items.forEach(item => {
      const id = parent ? `${parent}/${item.id}` : item.id;
      const node = { ...item, route: id, parent, subject: subject || item.id };
      nodes.set(id, node);
      addNodes(item.children || item.topics || [], id, node.subject);
    });
  }
  addNodes(catalogue.subjects);
  const matches = (resource, path) => resource.topics.some(t => t === path || t.startsWith(`${path}/`));
  const forNode = path => resources.filter(r => matches(r, path));
  const countLabel = count => `${count} ${count === 1 ? 'resource' : 'resources'}`;
  const subjectOf = resource => nodes.get(resource.topics[0].split('/')[0]);
  function read(key) { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } }
  function write(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Navigation works without storage. */ } }
  let saved = read('pennine-saved');
  let recent = read('pennine-recent');
  if (!Array.isArray(saved)) saved = [];
  if (!Array.isArray(recent)) recent = [];
  function searchForm(value = '', large = false) {
    return `<form class="search-form ${large ? 'search-large' : ''}" action="${href('search/')}" role="search" aria-label="${large ? 'Search revision library' : 'Quick search'}"><label class="sr-only" for="${large ? 'hero-search' : 'header-search'}">Search revision resources</label>${icon('search')}<input id="${large ? 'hero-search' : 'header-search'}" type="search" name="q" value="${escape(value)}" placeholder="${large ? 'What would you like to revise?' : 'Search topics or resources'}"><button type="submit">${large ? 'Find resources' : icon('arrow')}<span class="sr-only">${large ? '' : 'Search'}</span></button></form>`;
  }
  function header() {
    return `<header class="site-header"><div class="header-inner container"><a class="brand" href="${href('')}" aria-label="Pennine Revision home"><span class="brand-mark"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M4 23 12 9l6 10 4-6 6 10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span>Pennine<span class="brand-light">Revision</span></span></a><nav class="primary-nav" aria-label="Main navigation"><details class="explore"><summary class="nav-link ${nodes.has(route) ? 'active' : ''}">Subjects <span class="down-arrow">⌄</span></summary><div class="explore-menu"><p class="eyebrow">Choose a subject</p>${catalogue.subjects.map(s => `<a href="${href(s.id + '/')}"><span class="small-icon ${s.colour}">${icon(s.icon)}</span><span><strong>${escape(s.title)}</strong><small>${s.board} · ${countLabel(forNode(s.id).length)}</small></span>${icon('chevron')}</a>`).join('')}<a class="explore-all" href="${href('')}#subjects">View all subjects ${icon('arrow')}</a></div></details><a class="nav-link ${route === 'planner' ? 'active' : ''}" href="${href('planner/')}">Planner</a><a class="nav-link ${route === 'saved' ? 'active' : ''}" href="${href('saved/')}">${icon('bookmark')}<span>Saved</span></a></nav>${searchForm()}</div></header>`;
  }
  function footer() {
    return `<footer class="site-footer container"><div><a class="footer-brand" href="${href('')}">Pennine Revision</a><p>A little progress, one topic at a time.</p></div><div class="footer-links"><a href="${href('maths/')}">Maths</a><a href="${href('english-literature/')}">English Literature</a><a href="${href('planner/')}">Planner</a></div><p class="footer-note">An independent revision library. New material is being added.</p></footer>`;
  }
  function breadcrumb(path) {
    const parts = path.split('/').filter(Boolean);
    return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="${href('')}">Home</a></li>${parts.map((part, i) => {
      const node = nodes.get(parts.slice(0, i + 1).join('/'));
      const label = node?.title || ({ planner: 'Planner', search: 'Search', saved: 'Saved resources' }[part] || part);
      return `<li>${icon('chevron')}${i === parts.length - 1 ? `<span aria-current="page">${escape(label)}</span>` : `<a href="${href(node.route + '/')}">${escape(label)}</a>`}</li>`;
    }).join('')}</ol></nav>`;
  }
  function resourceCard(resource, compact = false) {
    const subject = subjectOf(resource);
    const isSaved = saved.includes(resource.id);
    return `<article class="resource-card ${compact ? 'compact' : ''}"><div class="resource-top"><span class="resource-type">${escape(resource.type)}</span><button class="save-button ${isSaved ? 'is-saved' : ''}" data-save="${resource.id}" aria-label="Save ${escape(resource.title)}" aria-pressed="${isSaved}">${icon('bookmark')}</button></div><h3><a data-resource="${resource.id}" href="${href(resource.file)}">${escape(resource.title)}</a></h3><p>${escape(resource.description)}</p><div class="resource-bottom"><div class="resource-tags"><span class="tag ${subject.colour}">${escape(subject.title)}</span>${resource.tier ? `<span class="tag">${escape(resource.tier)}</span>` : ''}</div><a class="open-resource" data-resource="${resource.id}" href="${href(resource.file)}" aria-label="Open ${escape(resource.title)}">Open ${icon('arrow')}</a></div></article>`;
  }
  function subjectCard(subject) {
    const count = forNode(subject.id).length;
    return `<a class="subject-card ${subject.colour}" href="${href(subject.id + '/')}"><div class="subject-top"><span class="subject-icon">${icon(subject.icon)}</span><span class="subject-board">${subject.board}</span></div><h3>${escape(subject.title)}</h3><p>${escape(subject.description)}</p><div class="subject-preview">${subject.topics.slice(0, 3).map(t => `<span>${escape(t.title)}</span>`).join('')}${subject.topics.length > 3 ? `<span>+${subject.topics.length - 3} more</span>` : ''}</div><div class="subject-bottom"><span>${countLabel(count)} available</span><strong>Explore subject ${icon('arrow')}</strong></div></a>`;
  }
  function home() {
    const recentResources = recent.map(id => resources.find(r => r.id === id)).filter(Boolean).slice(0, 3);
    return `<main id="main"><section class="home-hero container"><div class="hero-copy"><span class="eyebrow"><span class="status-dot"></span> Your GCSE revision library</span><h1>A clearer path<br>to <span>“I get it.”</span></h1><p>Find your topic. Work through the practice.<br>Build your confidence, one step at a time.</p>${searchForm('', true)}<div class="hero-meta"><span>${icon('check')} Organised by topic</span><span>${icon('check')} Free to explore</span></div></div><div class="hero-art" aria-hidden="true"><div class="art-dots"></div><span class="art-orbit orbit-one"></span><span class="art-orbit orbit-two"></span><div class="learning-note"><span class="note-kicker">ONE TOPIC AT A TIME</span><span class="note-title">Small steps.<br>Big breakthroughs.</span><div class="note-line"><span class="note-tick">✓</span><span>Choose your subject</span></div><div class="note-line"><span class="note-tick">✓</span><span>Find your topic</span></div><div class="note-line"><span class="note-circle"></span><span>Give it a go</span></div></div><span class="art-tile tile-maths">x² + y²</span><span class="art-tile tile-book">${icon('literature')}</span><span class="art-star">✦</span></div></section><section id="subjects" class="subjects-section container"><div class="section-heading"><div><span class="eyebrow">START HERE</span><h2>What are we revising today?</h2></div><p>Choose a subject to explore its topics.</p></div><div class="subject-grid">${catalogue.subjects.map(subjectCard).join('')}</div></section><section class="container planner-strip"><span class="planner-icon">${icon('calendar')}</span><div><h2>A little planning goes a long way.</h2><p>Keep your Year 11 dates and revision in view.</p></div><a class="button secondary" href="${href('planner/')}">Open planner ${icon('arrow')}</a></section><section class="container home-resources"><div class="section-heading"><div><span class="eyebrow">${recentResources.length ? 'PICK UP WHERE YOU LEFT OFF' : 'TAKE THE FIRST STEP'}</span><h2>${recentResources.length ? 'Recently opened' : 'Try something today'}</h2></div><a class="text-link" href="${href('search/')}">Browse all resources ${icon('arrow')}</a></div><div class="resource-grid">${(recentResources.length ? recentResources : [resources[0], resources[7], resources[11]]).map(r => resourceCard(r)).join('')}</div></section><section class="container growing-note">${icon('spark')}<p><strong>A library that’s growing with you.</strong> Available resources are ready to open. Topics marked “Coming soon” will fill out as new material is added.</p></section></main>`;
  }
  function topicCard(node) {
    const count = forNode(node.route).length;
    const children = node.children || [];
    return `<a class="topic-card ${!count ? 'coming-soon' : ''}" href="${href(node.route + '/')}"><span class="topic-icon">${icon(node.id)}</span><div><div class="topic-card-heading"><h3>${escape(node.title)}</h3>${icon('arrow')}</div>${node.description ? `<p>${escape(node.description)}</p>` : children.length ? `<p>${children.slice(0, 3).map(c => escape(c.title)).join(' · ')}</p>` : ''}<span class="availability ${count ? '' : 'muted'}">${count ? countLabel(count) + ' available' : 'Coming soon'}</span></div></a>`;
  }
  function sidebar(node) {
    const subject = nodes.get(node.subject);
    return `<aside class="topic-sidebar"><nav aria-label="${escape(subject.title)} topics"><a class="sidebar-subject" href="${href(subject.route + '/')}">${icon(subject.icon)} ${escape(subject.title)}</a><a class="sidebar-overview ${route === subject.route ? 'selected' : ''}" href="${href(subject.route + '/')}">Subject overview</a>${subject.topics.map(topic => {
      const topicRoute = `${subject.id}/${topic.id}`;
      const active = route === topicRoute || route.startsWith(topicRoute + '/');
      return `<div class="sidebar-group"><a class="sidebar-topic ${route === topicRoute ? 'selected' : ''}" ${route === topicRoute ? 'aria-current="page"' : ''} href="${href(topicRoute + '/')}">${escape(topic.title)}${icon('chevron')}</a>${active ? `<div class="sidebar-children">${topic.children.map(child => {
        const childRoute = `${topicRoute}/${child.id}`;
        return `<a class="${route === childRoute || route.startsWith(childRoute + '/') ? 'selected' : ''}" ${route === childRoute ? 'aria-current="page"' : ''} href="${href(childRoute + '/')}">${escape(child.title)}</a>`;
      }).join('')}</div>` : ''}</div>`;
    }).join('')}</nav><div class="sidebar-note">${icon('spark')}<p>Small steps count.<br>Start with one topic.</p></div></aside>`;
  }
  function topicPage() {
    const node = nodes.get(route);
    const subject = nodes.get(node.subject);
    const children = (node.topics || node.children || []).map(c => nodes.get(`${route}/${c.id}`));
    const available = forNode(route);
    const isSubject = !node.parent;
    const isLeaf = !children.length;
    const direct = available.filter(r => r.topics.includes(route));
    return `<main id="main" class="container">${breadcrumb(route)}<div class="library-layout">${sidebar(node)}<div class="library-content"><div class="page-heading"><span class="eyebrow">${subject.board}${!isSubject ? ' · ' + escape(subject.title) : ''}</span><h1>${escape(node.title)}</h1><p>${escape(node.description || `Explore ${node.title.toLowerCase()} and find your next revision activity.`)}</p><span class="page-count">${available.length ? `${countLabel(available.length)} available` : 'New resources are on the way'}</span></div>${children.length ? `<section><div class="section-heading small"><h2>${isSubject ? 'Explore your topics' : 'Choose a subtopic'}</h2><span>${children.length} ${isSubject ? 'topics' : 'subtopics'}</span></div><div class="topic-grid">${children.map(topicCard).join('')}</div></section>` : ''}${available.length ? `<section class="topic-resources"><div class="section-heading small"><h2>${isLeaf ? 'Revision resources' : isSubject ? 'Available in this subject' : 'Resources in this topic'}</h2><span>${countLabel(available.length)}</span></div>${!isLeaf && direct.length ? '<p class="section-description">Some resources cover several subtopics. You can open the full activity here.</p>' : ''}<div class="resource-grid topic-resource-grid">${available.map(r => resourceCard(r)).join('')}</div></section>` : `<section class="empty-state">${icon('folder')}<h2>This topic is taking shape.</h2><p>We’re adding to the library over time. There aren’t any activities here yet.</p><a class="button secondary" href="${href(subject.route + '/')}">Explore ${escape(subject.title)} ${icon('arrow')}</a></section>`}</div></div></main>`;
  }
  function plannerPage() {
    const current = catalogue.planners.find(p => p.current);
    return `<main id="main" class="container standalone">${breadcrumb(route)}<div class="page-heading"><span class="eyebrow">MAKE ROOM FOR REVISION</span><h1>Your revision planner</h1><p>A clear view of Year 11, with your existing calendars together in one place.</p></div><article class="planner-feature"><span class="planner-icon">${icon('calendar')}</span><span class="tag violet">Current dashboard</span><h2>${escape(current.title)}</h2><p>${escape(current.description)}</p><a class="button primary" href="${href(current.file)}">Open Year 11 dashboard ${icon('arrow')}</a></article><details class="previous-planners"><summary>Earlier planner versions</summary><div class="planner-versions">${catalogue.planners.filter(p => !p.current).map(p => `<a href="${href(p.file)}"><div><strong>${escape(p.title)}</strong><p>${escape(p.description)}</p></div>${icon('arrow')}</a>`).join('')}</div></details><p class="storage-note">Dates are provided by the existing dashboards. Check school communications for any updates.</p></main>`;
  }
  function searchPage() {
    const query = (new URLSearchParams(location.search).get('q') || '').trim();
    const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const results = resources.filter(r => {
      const haystack = [r.title, r.description, r.type, r.tier || '', ...r.topics.map(t => t.split('/').map((_, i) => nodes.get(t.split('/').slice(0, i + 1).join('/'))?.title || '').join(' '))].join(' ').toLocaleLowerCase();
      return terms.every(term => haystack.includes(term));
    });
    const topics = query ? [...nodes.values()].filter(n => terms.every(term => n.title.toLocaleLowerCase().includes(term))).slice(0, 8) : [];
    return `<main id="main" class="container standalone">${breadcrumb(route)}<div class="page-heading"><span class="eyebrow">FIND YOUR NEXT STEP</span><h1>${query ? 'Search results' : 'Browse the library'}</h1><p>${query ? `Results for “${escape(query)}”` : 'All available revision resources, in one place.'}</p>${searchForm(query, true)}</div>${topics.length ? `<section class="search-topics"><h2>Matching topics</h2><div class="topic-chips">${topics.map(t => `<a href="${href(t.route + '/')}">${escape(t.title)} <span>${countLabel(forNode(t.route).length)}</span>${icon('arrow')}</a>`).join('')}</div></section>` : ''}<section><div class="section-heading small"><h2>${query ? 'Matching resources' : 'All resources'}</h2><span>${countLabel(results.length)}</span></div>${results.length ? `<div class="resource-grid">${results.map(r => resourceCard(r)).join('')}</div>` : `<div class="empty-state">${icon('search')}<h2>No resources found yet.</h2><p>Try a broader term such as “circles”, “quadratics” or “Inspector”.</p><a class="button secondary" href="${href('search/')}">Browse all resources ${icon('arrow')}</a></div>`}</section></main>`;
  }
  function savedPage() {
    const list = resources.filter(r => saved.includes(r.id));
    return `<main id="main" class="container standalone">${breadcrumb(route)}<div class="page-heading"><span class="eyebrow">YOUR NEXT REVISION SESSION</span><h1>Saved resources</h1><p>Keep the activities you want to come back to in one place.</p></div>${list.length ? `<div class="resource-grid">${list.map(r => resourceCard(r)).join('')}</div>` : `<div class="empty-state">${icon('bookmark')}<h2>A place for your next steps.</h2><p>Use the bookmark button on any resource to save it here.</p><a class="button secondary" href="${href('search/')}">Find a resource ${icon('arrow')}</a></div>`}<p class="storage-note">Saved resources stay in this browser on this device.</p></main>`;
  }
  function render() {
    const content = route === '' ? home() : nodes.has(route) ? topicPage() : route === 'planner' ? plannerPage() : route === 'saved' ? savedPage() : searchPage();
    document.getElementById('app').innerHTML = header() + content + footer() + '<div class="sr-only" id="save-status" role="status" aria-live="polite"></div>';
  }
  render();
  document.addEventListener('click', event => {
    const save = event.target.closest('[data-save]');
    if (save) {
      const id = save.dataset.save;
      const isSaved = !saved.includes(id);
      saved = isSaved ? [...saved, id] : saved.filter(item => item !== id);
      write('pennine-saved', saved);
      document.querySelectorAll(`[data-save="${id}"]`).forEach(button => { button.classList.toggle('is-saved', isSaved); button.setAttribute('aria-pressed', String(isSaved)); });
      document.getElementById('save-status').textContent = isSaved ? 'Resource saved in this browser.' : 'Resource removed from saved resources.';
      if (route === 'saved') {
        const next = save.closest('article')?.nextElementSibling?.querySelector('button');
        render();
        (next && document.querySelector(`[data-save="${next.dataset.save}"]`) || document.querySelector('.page-heading h1')).focus?.();
      }
    }
    const resource = event.target.closest('[data-resource]');
    if (resource) {
      recent = [resource.dataset.resource, ...recent.filter(id => id !== resource.dataset.resource)].slice(0, 6);
      write('pennine-recent', recent);
    }
    if (!event.target.closest('.explore')) document.querySelector('.explore')?.removeAttribute('open');
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      const explore = document.querySelector('.explore[open]');
      if (explore) { explore.removeAttribute('open'); explore.querySelector('summary').focus(); }
    }
  });
})();
