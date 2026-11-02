// A minimal slug+title index of every project, shared by LeftNav (so it can
// list every project page) without importing the full project data from
// Home.jsx or ProjectPage.jsx — Home.jsx already imports LeftNav, so LeftNav
// importing back from Home.jsx would be a circular import. Keep this in sync
// with the slugs in both of those files when adding/removing a project.
export const PROJECT_NAV = [
  { slug: 'tracksense-ai', title: 'TrackSense AI' },
  { slug: 'ais-portal', title: 'AIS Membership Portal' },
  { slug: 'cloverleaf-intake-redesign', title: 'Cloverleaf CMS' },
  { slug: 'cgs-usability-study', title: 'MonkeyType vs KeyHero' },
  { slug: 'steam-customer-segmentation', title: 'Customer Segmentation for Steam' },
  { slug: 'time2invest', title: 'Time2Invest' },
  { slug: 'eden-portfolio', title: 'Eden Portfolio' },
  { slug: 'netflix-prediction', title: 'Predicting Netflix Success' },
  { slug: 'divinity-sales-prediction', title: 'Divinity: First-Year Sales Prediction' },
  { slug: 'halo-ideathon', title: 'Halo' },
]
