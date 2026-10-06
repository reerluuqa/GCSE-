# Pennine Revision

A static GCSE revision library for the existing GitHub Pages site. No framework, package installation or server-side service is required.

## Organisation

- `maths/`: Number, Algebra, Ratio and Proportion, Geometry and Measures, Statistics, Probability; each contains subtopic folders.
- `english-literature/`: texts and their subtopics.
- `planner/`: the current Year 11 dashboard and earlier versions.
- `assets/catalogue.js`: subject tree, resource descriptions and resource-to-topic links.
- `assets/library.js` and `assets/library.css`: shared navigation and interface.
- `semester 1/` and `English/`: compatibility redirects for existing bookmarks. Keep these files in place.

Resources covering several topics are listed in each relevant topic but stored only once. Empty topics are labelled Coming soon. Saved resources and recently opened activities are stored only in the current browser; activity progress continues to use each activity's existing storage.

## Add a resource

1. Save the HTML file in the appropriate folder, using a descriptive lowercase filename, for example `maths/algebra/quadratics/completing-the-square.html`.
2. Add an entry to `resources` in `assets/catalogue.js`:

```js
{
  id: 'completing-the-square',
  title: 'Completing the square',
  description: 'Practise rewriting quadratics and interpreting the result.',
  file: 'maths/algebra/quadratics/completing-the-square.html',
  topics: ['maths/algebra/quadratics'],
  type: 'Interactive practice',
  tier: 'Higher' // Optional; only label a tier when appropriate.
}
```

3. Run `node scripts/build-library.mjs`. This checks resource paths and topic links, and generates the navigation pages. Existing activity files are never overwritten by the builder.
4. Preview and commit/push the changes to GitHub as usual. GitHub Pages can serve this repository directly. Retain your existing Pages and custom-domain settings.

For a new topic, add an object with `id`, `title` and optional `description`/`children` in the subject tree, then run the same command. Topic IDs form folder paths. Do not change existing IDs without keeping redirects for their old URLs.

## Local preview

Run `python -m http.server 8765 --bind 127.0.0.1` from this folder, then open `http://127.0.0.1:8765/`. Press Ctrl+C to stop the preview. Individual resource HTML files still work independently.

## Checks

Run `node --check assets/library.js` and `node scripts/build-library.mjs` before publishing. The current library is an expanding collection, not a claim of complete syllabus coverage. The navigation shell does not change or verify the educational content inside individual resources.
