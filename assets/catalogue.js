/* Add resources here, then run: node scripts/build-library.mjs */
window.REVISION_CATALOGUE = {
  subjects: [
    { id: 'maths', title: 'Maths', icon: 'maths', colour: 'violet', board: 'AQA GCSE', description: 'Build confidence with numbers, algebra, geometry and data.', topics: [
      { id: 'number', title: 'Number', description: 'The building blocks, from fractions to units.', children: [
        { id: 'fractions-decimals', title: 'Fractions and decimals' },
        { id: 'powers-roots', title: 'Powers and roots' },
        { id: 'units', title: 'Units and conversions' }
      ] },
      { id: 'algebra', title: 'Algebra', description: 'Expressions, equations and the patterns behind them.', children: [
        { id: 'expressions', title: 'Algebraic expressions' },
        { id: 'equations', title: 'Equations and simultaneous equations' },
        { id: 'quadratics', title: 'Quadratics' },
        { id: 'formulae', title: 'Using and rearranging formulae' }
      ] },
      { id: 'ratio-proportion', title: 'Ratio and proportion', description: 'Compare quantities and explore how they change.', children: [
        { id: 'ratios', title: 'Ratios and sharing' },
        { id: 'proportion', title: 'Direct and inverse proportion' },
        { id: 'percentages', title: 'Percentages and growth' }
      ] },
      { id: 'geometry', title: 'Geometry and measures', description: 'Make sense of angles, shapes and space.', children: [
        { id: 'angles', title: 'Angles' },
        { id: 'circles', title: 'Circles', children: [
          { id: 'area-circumference', title: 'Circumference and area' },
          { id: 'arcs-sectors', title: 'Arcs and sectors' },
          { id: 'circle-theorems', title: 'Circle theorems' }
        ] },
        { id: 'area-volume', title: 'Area and volume' },
        { id: 'properties-shapes', title: 'Properties of shapes' },
        { id: 'transformations', title: 'Transformations' },
        { id: 'pythagoras-trigonometry', title: 'Pythagoras and trigonometry' }
      ] },
      { id: 'statistics', title: 'Statistics', description: 'Explore distributions, spot outliers and interpret charts.', children: [
        { id: 'averages', title: 'Averages and spread' },
        { id: 'quartiles', title: 'Quartiles and interquartile range' },
        { id: 'outliers', title: 'Outliers and data reasoning' },
        { id: 'pie-charts', title: 'Pie charts' }
      ] },
      { id: 'probability', title: 'Probability', description: 'Reason about chance and combined events.', children: [
        { id: 'basics', title: 'Probability basics' },
        { id: 'combined-events', title: 'Combined events' },
        { id: 'tree-diagrams', title: 'Tree diagrams' }
      ] }
    ] },
    { id: 'english-literature', title: 'English Literature', icon: 'literature', colour: 'teal', board: 'AQA GCSE', description: 'Explore your texts, connect ideas and practise your response.', topics: [
      { id: 'an-inspector-calls', title: 'An Inspector Calls', description: 'Characters, responsibility and Priestley’s dramatic choices.', children: [
        { id: 'characters', title: 'Characters' }, { id: 'themes', title: 'Themes' },
        { id: 'quotations', title: 'Quotations and analysis' }, { id: 'context', title: 'Context and writer’s purpose' },
        { id: 'exam-practice', title: 'Exam practice' }
      ] },
      { id: 'power-and-conflict', title: 'Power and Conflict poetry', description: 'Understand the poems and build thoughtful comparisons.', children: [
        { id: 'poems', title: 'Poems and analysis' }, { id: 'themes', title: 'Themes and connections' },
        { id: 'comparison', title: 'Comparing poems' }
      ] }
    ] }
  ],
  resources: [
    { id: 'angle-lab', title: 'Angle Lab', description: 'Interactive angle practice with feedback and a personalised session.', file: 'maths/geometry/angles/angle-lab.html', topics: ['maths/geometry/angles'], type: 'Interactive practice', tier: 'Higher' },
    { id: 'anglewise', title: 'Anglewise', description: 'Mixed practice in circles, area, right triangles, formulae and pie charts, with worked solutions.', file: 'maths/geometry/properties-shapes/anglewise.html', topics: ['maths/geometry/properties-shapes', 'maths/geometry/area-volume', 'maths/geometry/circles/area-circumference', 'maths/geometry/circles/arcs-sectors', 'maths/geometry/pythagoras-trigonometry', 'maths/algebra/formulae', 'maths/statistics/pie-charts'], type: 'Practice booklet', tier: 'Higher' },
    { id: 'circle-lab', title: 'Circle Lab', description: 'Practise circle calculations and theorems, and check the method behind your answer.', file: 'maths/geometry/circles/circle-lab.html', topics: ['maths/geometry/circles/area-circumference', 'maths/geometry/circles/arcs-sectors', 'maths/geometry/circles/circle-theorems'], type: 'Interactive practice', tier: 'Higher' },
    { id: 'circle-geometry', title: 'Circle Geometry Practice', description: 'Circle calculations, arcs, sectors and circle theorems, with a formula reference.', file: 'maths/geometry/circles/circle-geometry.html', topics: ['maths/geometry/circles/area-circumference', 'maths/geometry/circles/arcs-sectors', 'maths/geometry/circles/circle-theorems'], type: 'Mixed practice', tier: 'Higher' },
    { id: 'conversion-line', title: 'The Conversion Line', description: 'Develop a reliable method for converting between units.', file: 'maths/number/units/conversion-line.html', topics: ['maths/number/units'], type: 'Interactive practice' },
    { id: 'shape-lab', title: 'Shape Lab', description: 'Use algebra and geometry together to solve shape problems.', file: 'maths/geometry/area-volume/shape-lab.html', topics: ['maths/geometry/area-volume', 'maths/algebra/equations'], type: 'Mixed practice' },
    { id: 'higher-ground', title: 'Higher Ground', description: 'Explore direct and inverse proportion, then apply and rearrange formulae.', file: 'maths/ratio-proportion/proportion/higher-ground.html', topics: ['maths/ratio-proportion/proportion', 'maths/algebra/formulae'], type: 'Learn and practise', tier: 'Higher' },
    { id: 'quadratic-lab', title: 'Quadratic Lab', description: 'Build your method for quadratic equations, graphs and simultaneous equations.', file: 'maths/algebra/quadratics/quadratic-lab.html', topics: ['maths/algebra/quadratics', 'maths/algebra/equations'], type: 'Learn and practise', tier: 'Higher' },
    { id: 'outliers', title: 'Outliers Mastery', description: 'Practise spotting unusual values and reasoning about data.', file: 'maths/statistics/outliers/outliers-mastery.html', topics: ['maths/statistics/outliers'], type: 'Mastery trainer', tier: 'Higher' },
    { id: 'quartiles', title: 'The Banana Competition Lab', description: 'Explore quartiles and interquartile range through a practical scenario.', file: 'maths/statistics/quartiles/banana-lab.html', topics: ['maths/statistics/quartiles'], type: 'Interactive lab' },
    { id: 'pie-charts', title: 'PIE / 360°', description: 'Interpret pie charts and work backwards from angles and proportions.', file: 'maths/statistics/pie-charts/pie-360.html', topics: ['maths/statistics/pie-charts'], type: 'Practice booklet', tier: 'Higher' },
    { id: 'inspector-studio', title: 'An Inspector Calls · Revision Studio', description: 'Characters, themes, quotation recall and exam planning in one studio.', file: 'english-literature/an-inspector-calls/revision-studio.html', topics: ['english-literature/an-inspector-calls/characters', 'english-literature/an-inspector-calls/themes', 'english-literature/an-inspector-calls/quotations', 'english-literature/an-inspector-calls/context', 'english-literature/an-inspector-calls/exam-practice'], type: 'Revision studio' },
    { id: 'inspector-alternative', title: 'An Inspector Calls · Alternative Studio', description: 'An alternative revision resource for exploring the play.', file: 'english-literature/an-inspector-calls/alternative-studio.html', topics: ['english-literature/an-inspector-calls'], type: 'Alternative resource' },
    { id: 'power-conflict', title: 'Power and Conflict · Fieldnotes', description: 'Explore the poetry collection and connections between its poems.', file: 'english-literature/power-and-conflict/fieldnotes.html', topics: ['english-literature/power-and-conflict/poems', 'english-literature/power-and-conflict/themes', 'english-literature/power-and-conflict/comparison'], type: 'Revision studio' }
  ],
  planners: [
    { title: 'Year 11 · 2026/27', description: 'See upcoming dates and switch between month and week views.', file: 'planner/year-11-2026-27.html', current: true },
    { title: 'Year 11 tracker', description: 'An earlier version of the Year 11 planning dashboard.', file: 'planner/year-11-tracker.html' },
    { title: 'Year 11 tracker · alternative', description: 'An alternative version of the earlier dashboard.', file: 'planner/year-11-tracker-alternative.html' }
  ]
};
