import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/catalogue.js'), 'utf8'), context);
const catalogue = context.window.REVISION_CATALOGUE;
const pages = [{ route: '', title: 'GCSE revision, one topic at a time' }, { route: 'planner', title: 'Revision planner' }, { route: 'search', title: 'Search resources' }, { route: 'saved', title: 'Saved resources' }];
const routes = new Set();
function collect(items, prefix) {
  for (const item of items) {
    const route = prefix ? `${prefix}/${item.id}` : item.id;
    if (routes.has(route)) throw new Error(`Duplicate topic: ${route}`);
    routes.add(route);
    pages.push({ route, title: item.title });
    collect(item.children || item.topics || [], route);
  }
}
collect(catalogue.subjects, '');
for (const resource of catalogue.resources) {
  for (const route of resource.topics) if (!routes.has(route)) throw new Error(`Unknown topic ${route}`);
}
for (const resource of [...catalogue.resources, ...catalogue.planners]) {
  if (!fs.existsSync(path.join(root, resource.file))) throw new Error(`Missing resource ${resource.file}`);
}
const escape = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
for (const page of pages) {
  const directory = path.join(root, page.route);
  fs.mkdirSync(directory, { recursive: true });
  const base = page.route ? '../'.repeat(page.route.split('/').length) : './';
  const fallback = catalogue.subjects.map(subject => `<li><a href="${base}${subject.id}/">${escape(subject.title)}</a></li>`).join('');
  fs.writeFileSync(path.join(directory, 'index.html'), `<!doctype html>
<html lang="en-GB">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Explore GCSE Maths and English Literature revision by topic. Find interactive practice, worked solutions and revision studios.">
  <meta name="theme-color" content="#5141a5">
  <title>${escape(page.title)} · Pennine Revision</title>
  <link rel="icon" href="${base}assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${base}assets/library.css">
  <script src="${base}assets/catalogue.js" defer></script>
  <script src="${base}assets/library.js" defer></script>
</head>
<body data-page="${page.route}">
  <a class="skip-link" href="#main">Skip to content</a>
  <div id="app"><main id="main" class="container"><h1>${escape(page.title)}</h1><p>Find your next revision activity.</p><ul>${fallback}</ul><noscript><p>Enable JavaScript to browse the topic library. You can open the activities directly:</p><ul>${catalogue.resources.map(r => `<li><a href="${base}${r.file}">${escape(r.title)}</a></li>`).join('')}</ul></noscript></main></div>
</body>
</html>
`, 'utf8');
}
console.log(`Built ${pages.length} library pages. Verified ${catalogue.resources.length} resources and ${catalogue.planners.length} planners.`);
