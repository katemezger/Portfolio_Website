import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScatteredSymbolsFixed } from '../components/ScatteredSymbols.jsx'

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A PROJECT
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. Add a new entry to the PROJECTS object below (copy an existing one).
//
// 2. Give it a unique `slug` — this must match the slug in Home.jsx's PROJECTS
//    array (the `slug` field you add there).
//
// 3. Fill in all the fields:
//    - title, subtitle, year, category, tags[]
//    - role, team, duration, tools[]
//    - overview     → 1–2 paragraph project summary
//    - problem      → what challenge you were solving
//    - process[]    → array of { heading, body, image? } steps
//    - outcomes[]   → array of { stat, label } result metrics
//    - reflection   → what you learned / what you'd do differently
//    - heroImage    → path to a wide banner image  e.g. '/images/projects/myproject-hero.jpg'
//    - images[]     → Gallery section at the bottom of the page. Each entry is
//                     either a path string, or { src, caption } for a captioned
//                     image. Screenshots, code snippets, graphs, whatever fits.
//
// 4. Drop your images into:  frontend/public/images/projects/
//
// 5. That's it — the route /project/<slug> will render automatically.
//
// ─────────────────────────────────────────────────────────────────────────────

const PROJECTS = {

  // ── EDEN PORTFOLIO ────────────────────────────────────────────────────────
  'eden-portfolio': {
    title:    'Eden Portfolio',
    subtitle: 'Designing a portfolio that actually feels like me.',
    year:     '2026',
    category: 'Design & Development',
    accent:   '#186878',
    motif:    'leaf',
    tags:     ['React', 'Framer Motion', 'SVG', 'CSS', 'Design Systems', 'Vite'],
    role:     'Designer & Developer',
    team:     'Solo',
    duration: 'Ongoing',
    lastUpdated: 'July 2026',
    tools:    ['React', 'Vite', 'Framer Motion', 'Figma', 'Claude Code'],
    heroImage: '/images/projects/eden-portfolio-hero.png',
    images:    [],
    overview: `Eden is my personal portfolio, the site you're looking at right now. Rather than reaching for a template, I designed and built the whole thing from scratch, treating it as a live design challenge: how do you communicate personality, craft, and range all in one scrolling page?

The aesthetic direction is "whimsical botanical garden": cream backgrounds, forest greens, teal accents, scattered doodle symbols in the margins, and an organic blob-shaped portal cycling through my work. The name Eden reflects both the garden theme and a sense of a curated, personal creative space.`,

    problem: `Most portfolio templates feel interchangeable: the same dark-background grid with hover effects and a hero title. I wanted something that felt unmistakably mine, warm, a little handmade, with personality baked into every interaction. The challenge was doing this without sacrificing legibility, hierarchy, or load speed, and without it feeling "themed" in a heavy-handed way.`,

    process: [
      {
        heading: 'Direction & Aesthetic',
        body: `I started with a mood board combining three references: Alex Rivera's scrolling single-page format with numbered discipline sections, mimzywhimsy.com's casual personal warmth, and my own Figma colour palette of forest greens, teal, and cream. From that collision came the Eden direction, structured enough to read as professional, loose enough to feel like a person made it.`,
      },
      {
        heading: 'Design System',
        body: `I settled on five font families with strict rules: Berkshire Swash for decorative display headings, Stoke for named content titles, Cormorant Garamond for all body text, La Belle Aurore for the Eden brand mark, and Caveat for handwriting touches. The colour palette has nine named tokens. Having these constraints up-front meant every component decision was fast.`,
      },
      {
        heading: 'Building the Whimsy Layer',
        body: `The hardest design problem was the decorative layer: scattered unicode symbols (✦ ◇ ☆ ✿) floating in the margins, an animated morphing blob for the portal, and a loading screen where a botanical vine draws itself around a circle. Each element went through multiple iterations to feel light rather than noisy. The final symbols use only the outer 12% of the page width so they never compete with content.`,
      },
      {
        heading: 'Component Architecture',
        body: `The site is a React + Vite SPA with React Router and Framer Motion for page transitions. The homepage manages its own scroll context (height: 100vh, overflow-y: auto) to allow sticky nav, scroll-triggered reveal animations, and the symbol layer all at once. Each discipline page uses a shared DisciplineLayout component and a fixed-position symbol overlay that doesn't affect scroll height.`,
      },
      {
        heading: 'Project Case Studies',
        body: `Each project card on the homepage and discipline pages links to a case study route (/project/:slug). The ProjectPage component reads from a PROJECTS object in the same file: adding a new project means copying one data block and dropping images into /public/images/projects/. No database, no CMS, no fuss.`,
      },
    ],

    outcomes: [
      { stat: '5', label: 'Custom font families with strict usage rules' },
      { stat: '9', label: 'Named colour tokens from the Figma palette' },
      { stat: '100%', label: 'Custom-built, no templates or UI libraries' },
    ],

    reflection: `The project that taught me the most was the decorative system. I went through a lot of iterations, stipple-filled ellipses, winding vines, botanical SVGs, before landing on the right level of whimsy. "Enough to feel alive, not so much it distracts" is harder to calibrate than it sounds. I also learned that a strong design token system (fonts, colours, spacing) pays for itself immediately: every new component I added slotted in cleanly because the rules were already decided.`,
  },

  // ── CGS 4321 — USABILITY TESTING ─────────────────────────────────────────
  'cgs-usability-study': {
    title:    'MonkeyType vs KeyHero',
    subtitle: 'Which typing platform actually wins on usability?',
    year:     '2025',
    category: 'UX Quantitative Research',
    accent:   '#8DC4C0',
    motif:    'keyboard',
    tags:     ['Usability Testing', 'Comparative Study', 'Think-Aloud', 'Data Analysis', 'HCI'],
    role:     'UX Researcher',
    team:     'Course project',
    duration: '4 weeks',
    tools:    ['Usability testing protocol', 'Screen recording', 'Statistical analysis'],
    heroImage: '/images/projects/cgs-usability-study-hero.png',
    images: [
      { src: '/images/projects-gallery/MonkeyType-goals.jpg', caption: 'Study framework: goals, signals, and metrics for the comparison' },
      { src: '/images/projects-gallery/MonkeyType-code.jpg', caption: 'Regression analysis comparing WPM against ease-of-use ratings' },
      { src: '/images/projects-gallery/MonkeyType-slides.jpg', caption: 'Statistical results: accuracy and duration differed significantly, WPM did not' },
    ],
    overview: `A comparative usability study between MonkeyType and KeyHero, two of the most popular online typing test platforms. The study evaluated which platform delivers a better user experience across three core performance dimensions: words per minute (WPM), accuracy, and test duration.`,
    problem:  `Typing platforms are used by millions of people for skill-building and benchmarking, yet little formal usability research exists comparing them. Both platforms measure the same metrics but differ significantly in interface design, feedback systems, and interaction patterns. The question: do those design differences meaningfully affect performance and user experience?`,
    process: [
      {
        heading: 'Study Design',
        body: `Defined three primary metrics: WPM, accuracy, and test duration, and designed a within-subjects protocol where participants completed equivalent tasks on both platforms. Controlled for task order using counterbalancing to eliminate learning effects.`,
      },
      {
        heading: 'Testing Sessions',
        body: `Conducted moderated usability sessions using a think-aloud protocol. Participants verbalized their thoughts while completing typing tests on each platform. Sessions were recorded for later analysis. Qualitative data captured frustration points, moments of confusion, and preference signals.`,
      },
      {
        heading: 'Quantitative Analysis',
        body: `Compared WPM scores, accuracy percentages, and time-on-task across both platforms for each participant. Applied descriptive statistics to surface performance differences and identify which platform's interface design supported better typing outcomes.`,
      },
      {
        heading: 'Findings & Recommendations',
        body: `Analysis revealed measurable differences in performance outcomes between the two platforms, tied to specific interface design decisions, including feedback timing, visual noise, and error indication. Delivered a written report with evidence-based recommendations for improvement.`,
      },
    ],
    outcomes: [
      { stat: 'WPM', label: 'Primary performance metric compared' },
      { stat: '2', label: 'Platforms evaluated head-to-head' },
      { stat: 'Quant UX', label: 'CGS 4321: Quantitative UX Research' },
    ],
    reflection: `This was my first formal usability study and it taught me how much interface design influences measured performance, not just perceived ease of use. The think-aloud protocol is deceptively hard to facilitate well; keeping participants talking without leading them takes practice. I'd add a larger participant pool and a quantitative satisfaction survey (SUS) if doing it again.`,
  },

  // ── TRACKSENSE AI — F1 ANALYTICS ─────────────────────────────────────────
  'tracksense-ai': {
    title:    'TrackSense AI',
    subtitle: 'Frontend design for an F1 race analytics platform.',
    year:     '2026',
    category: 'Design & Development',
    accent:   '#6B8040',
    motif:    'flag',
    tags:     ['React', 'Frontend Development', 'UI Design', 'Formula 1', 'Data Visualisation', 'AI'],
    role:     'Frontend Designer & Developer',
    team:     'AIS AI Mentorship team',
    duration: 'AIM S26 cohort',
    tools:    ['React', 'Figma', 'CSS', 'Data visualisation libraries'],
    heroImage: '/images/projects/tracksense-ai-hero.png',
    images: [
      { src: '/images/projects-gallery/tracksense-teamend.jpg', caption: 'The team before presenting at AIM Night' },
      { src: '/images/projects-gallery/tracksense-solospeak.jpg', caption: 'Presenting TrackSense to the AIM S26 cohort' },
      { src: '/images/projects-gallery/tracksense-track.jpg', caption: 'The live race simulation and leaderboard interface' },
      { src: '/images/projects-gallery/tracksense-team.jpg', caption: 'The team celebrating after the showcase' },
    ],
    overview: `TrackSense is an AI-powered Formula 1 analytics model built as part of the AI Mentorship program at AIS (Artificial Intelligence Society). The model analyses race data to surface performance patterns and predictions. My contribution was the frontend: designing and building the interface that makes the underlying AI outputs readable, interactive, and presentable.`,
    problem:  `F1 generates vast amounts of telemetry and race data, but raw numbers don't tell a story. The team needed a frontend that could translate complex model outputs into clear, engaging visualisations, one that was polished enough to present at AIM S26, the semester's capstone event.`,
    process: [
      {
        heading: 'Understanding the Model Outputs',
        body: `Started by working closely with the data science team to understand what the AI model produced: predictions, confidence intervals, driver comparisons, lap-time trends. The design challenge was figuring out which data was most meaningful to surface and how.`,
      },
      {
        heading: 'UI Design',
        body: `Designed the interface in Figma, referencing real-world motorsport dashboards and sports analytics tools. Chose a dark, high-contrast visual language appropriate for the domain, readable at a glance, with teal and white accents for data highlights.`,
      },
      {
        heading: 'Frontend Development',
        body: `Built the interface in React, connecting to the team's data pipeline. Implemented data visualisation components to display model predictions and race analysis. Ensured the UI was presentation-ready for AIM S26.`,
      },
      {
        heading: 'AIM S26 Presentation',
        body: `The project was presented at AIM Night, the capstone showcase for the S26 AI Mentorship cohort. The interface served as the live demonstration layer for the model, showing predictions and analytics in real time.`,
      },
      {
        heading: 'Winning First Place',
        body: `TrackSense won first place at AIM Night. Several judges came up afterward with questions specifically about the design choices, from the dark high-contrast palette to how the interface decided which data was worth surfacing. Later on, one of those judges asked me to present the project again, this time to ITS Exploration, a summer camp introducing high school students to AI/ML, as an example of what AI/ML design work looks like in practice.`,
      },
    ],
    outcomes: [
      { stat: '1st Place', label: 'Winner at the AIM S26 showcase' },
      { stat: 'Encore', label: 'Invited to present at ITS Exploration, a HS AI/ML camp' },
      { stat: 'F1', label: 'Domain: Formula 1 race analytics' },
    ],
    reflection: `Building for a data-heavy AI project taught me how much the frontend layer matters for communicating model value. A good model with a confusing interface fails just as hard as a bad model. I also got much more comfortable designing for dense data: balancing information density with visual clarity is its own design challenge. Winning first place and then being asked to present the work again to high schoolers was the best confirmation I've gotten that the design decisions actually landed.`,
  },

  // ── TIME2INVEST — WEHACK HACKATHON ────────────────────────────────────────
  'time2invest': {
    title:    'Time2Invest',
    subtitle: 'A hackathon tool that teaches investing through history.',
    year:     '2026',
    category: 'Design & Development',
    accent:   '#D4B880',
    motif:    'chart',
    tags:     ['Hackathon', 'WEHack', 'React', 'FinTech', 'UI Design', 'Financial Literacy'],
    role:     'Designer & Developer',
    team:     'WEHack team',
    duration: '24 hours',
    tools:    ['React', 'Figma', 'Financial APIs', 'Historical data'],
    heroImage: '/images/projects/time2invest-hero.png',
    images:    [],
    overview: `Time2Invest is a financial literacy tool built in 24 hours at WEHack. The concept: instead of teaching investing through abstract theory, show users what would have happened to their money during real historical events: market crashes, bull runs, geopolitical shocks, using actual headlines and returns data. Learn by simulating, not by reading.`,
    problem:  `Financial literacy is one of the most talked-about gaps in education, but most tools that try to fill it are either too dry (textbooks) or too abstract (portfolio simulators disconnected from reality). We wanted something that created an emotional connection between historical events people already know about, COVID, the 2008 crash, the dot-com boom, and what that meant for their money.`,
    process: [
      {
        heading: 'Concept & Scoping (Hours 0–3)',
        body: `Defined the core loop in the first few hours: the user picks a time period and an investment amount, and the tool shows them what would have happened, anchored by real headlines from that period. Kept the scope tight enough to ship in 24 hours.`,
      },
      {
        heading: 'Design',
        body: `Sketched the user flow: landing, period selection, simulation view, outcome summary, and built a rapid Figma prototype. Prioritised a clean, approachable aesthetic (no Wall Street intimidation) with clear data visualisation for returns over time.`,
      },
      {
        heading: 'Development',
        body: `Built the frontend in React. Integrated historical market data and surfaced real news headlines alongside the performance chart, so users could connect events to outcomes. The goal was "oh, THAT'S what the 2008 crash looked like for $1,000."`,
      },
      {
        heading: 'WEHack Submission',
        body: `Submitted at the 24-hour mark with a working prototype. The tool successfully demonstrated the core concept: historical events as context for understanding investment outcomes.`,
      },
    ],
    outcomes: [
      { stat: '24h', label: 'Built end-to-end at WEHack' },
      { stat: 'WEHack', label: 'Hackathon: financial literacy track' },
      { stat: 'FinTech', label: 'Domain: personal finance & investing' },
    ],
    reflection: `Hackathons are a masterclass in prioritisation. You can't build everything, so every 30 minutes you're making a call about what matters most. We cut a lot of features but shipped something that actually demonstrated the concept clearly, which is the only thing that matters at a hackathon demo. I'd love to build this out properly with a real historical data API and a more sophisticated simulation layer.`,
  },

  // ── NETFLIX SUCCESS PREDICTION ────────────────────────────────────────────
  'netflix-prediction': {
    title:    'Predicting Netflix Success',
    subtitle: 'Can genre, country, and metadata predict what hits?',
    year:     '2026',
    category: 'AI/ML & Data Science',
    accent:   '#0A3020',
    motif:    'film',
    tags:     ['R', 'Machine Learning', 'Data Analysis', 'tidyverse', 'Data Visualisation', 'Netflix'],
    role:     'Data Analyst & Researcher',
    team:     'Group 17',
    duration: 'STAT 3355 semester project',
    tools:    ['R', 'dplyr', 'caret', 'ggplot2'],
    heroImage: '/images/projects/netflix-prediction-hero.png',
    images: [
      { src: '/images/projects-gallery/Netflix-primary.jpg', caption: 'The research question driving the analysis' },
      { src: '/images/projects-gallery/Netflix-data.jpg', caption: 'Cleaning the dataset in R: catching malformed dates and missing values' },
      { src: '/images/projects-gallery/Netflix-summary.jpg', caption: 'Final findings: what predicts Netflix success, and what does not' },
    ],
    overview: `A data science study examining whether Netflix content success can be predicted from observable metadata: factors like genre, country of origin, release timing, and content type. The goal was to determine how much of a title's performance is legible from publicly available attributes before it ever launches.`,
    problem:  `Netflix releases hundreds of titles each year with vastly different outcomes. Is success random, or are there patterns in the data? If genre, country, and other metadata are predictive, that has implications for content strategy, commissioning decisions, and resource allocation. We set out to test whether a model trained on historical Netflix data could surface those patterns.`,
    process: [
      {
        heading: 'Data Collection & Cleaning',
        body: `Sourced and cleaned a Netflix titles dataset including metadata such as genre, country of origin, release year, content type (film vs series), rating, and duration. Handled missing values, normalised categorical variables, and engineered features for modelling.`,
      },
      {
        heading: 'Exploratory Data Analysis',
        body: `Ran exploratory analysis to understand the distribution of titles across genres, countries, and time periods. Identified trends in content type and regional production, and surfaced initial correlations worth investigating further.`,
      },
      {
        heading: 'Modelling',
        body: `Trained classification and regression models to predict success proxies (ratings, viewer engagement signals) from metadata features. Evaluated model performance and feature importance to identify which factors were most predictive.`,
      },
      {
        heading: 'Findings',
        body: `Results revealed that genre and country of origin are moderately predictive, while release timing showed weaker signal than expected. The study highlighted both the potential and the limits of metadata-only prediction: content quality variables not captured in metadata remain the dominant driver of success.`,
      },
    ],
    outcomes: [
      { stat: 'Genre', label: 'Strongest predictive metadata feature' },
      { stat: 'R', label: 'Primary analysis language' },
      { stat: 'STAT 3355', label: 'First course in the UTD data science certification' },
    ],
    reflection: `The most interesting finding was what the model couldn't predict, which pointed to the limits of metadata as a signal. Success in content is partly legible from surface attributes, but the intangible quality variables (writing, performance, cultural timing) don't show up in a CSV. That gap between "what we can measure" and "what actually drives outcomes" is a recurring theme in data science that this project made very concrete.`,
  },

  // ── DIVINITY — FIRST-YEAR SALES PREDICTION ────────────────────────────────
  'divinity-sales-prediction': {
    title:    'Divinity: First-Year Sales Prediction',
    subtitle: 'Forecasting a Larian Studios launch before it ships.',
    year:     'Dec 2025',
    category: 'AI/ML & Data Science',
    accent:   '#B89898',
    motif:    'dice',
    tags:     ['Python', 'Machine Learning', 'Jupyter', 'Data Cleaning', 'Feature Engineering'],
    role:     'Data Analyst & ML Developer',
    team:     'Solo',
    duration: 'Independent project',
    tools:    ['Python', 'Jupyter', 'Google Colab', 'Pandas'],
    githubUrl: 'https://github.com/katemezger/Divinity_FirstYearSales_Prediction',
    heroImage: '/images/projects/divinity-sales-prediction-hero.svg',
    images:    [],
    overview: `A machine learning model that forecasts first-year sales for an upcoming Divinity game from Larian Studios, using historical RPG sales data and comparable-title performance as a proxy for a game that hasn't launched yet.`,
    problem:  `Predicting a game's commercial performance before release is genuinely hard: there's no direct sales history to train on. The available Kaggle RPG sales dataset also stopped updating in 2020, missing recent comparable titles like Baldur's Gate 3, which is one of the closest analogues to a new Divinity release.`,
    process: [
      {
        heading: 'Data Cleaning & Consolidation',
        body: `Built a dedicated data-cleaning notebook to merge the Kaggle RPG sales dataset with manually sourced Baldur's Gate 3 performance data, since the original dataset predated BG3's release. Validated and cleaned the combined dataset, and produced a "high-performer" subset to help the model learn what separates hits from average releases.`,
      },
      {
        heading: 'Feature Analysis',
        body: `Explored which features actually correlate with first-year sales: genre, publisher pedigree, platform reach, and comparable-title performance. Larian's track record with Baldur's Gate 3 became a key anchor point for estimating Divinity's ceiling.`,
      },
      {
        heading: 'Model Training',
        body: `Trained a prediction model on the cleaned dataset in a dedicated modelling notebook, with an emphasis on interpretability: surfacing not just a number, but which features were driving the model's estimate, so the prediction could be sanity-checked against domain knowledge.`,
      },
    ],
    outcomes: [
      { stat: '2', label: 'Notebooks: cleaning + modelling pipeline' },
      { stat: 'BG3', label: 'Key comparable title added manually' },
      { stat: 'Python', label: 'Primary analysis language' },
    ],
    reflection: `The real lesson here was that data cleaning is the project; the modelling step was almost easy by comparison once the dataset actually reflected reality. Manually reconciling a stale Kaggle dataset with a title as significant as Baldur's Gate 3 taught me to be skeptical of "complete" datasets and to always check what year they stop at before trusting them.`,
  },

  // ── STEAM CUSTOMER SEGMENTATION ────────────────────────────────────────────
  'steam-customer-segmentation': {
    title:    'Customer Segmentation for Steam',
    subtitle: 'Finding four player personas hiding in 200K play sessions.',
    year:     'Jun 2026',
    category: 'AI/ML & Data Science',
    accent:   '#CCCAE8',
    motif:    'controller',
    tags:     ['Python', 'Scikit-learn', 'K-Means', 'PCA', 'FastAPI', 'Unsupervised Learning'],
    role:     'Data Scientist',
    team:     'Solo',
    duration: 'Independent project',
    tools:    ['Python', 'Scikit-learn', 'FastAPI', 'Pydantic'],
    githubUrl: 'https://github.com/katemezger/Customer-Segmentation-for-Steam',
    heroImage: '/images/projects/steam-customer-segmentation-hero.svg',
    images:    [],
    overview: `An unsupervised learning project that segments Steam's player base into behavioural personas using purchase and playtime data: no manual labels, just clustering on how people actually play. The end result is deployed as a FastAPI microservice with sub-15ms inference.`,
    problem:  `Steam has millions of users with wildly different behaviour: some buy dozens of games and barely touch them, others put thousands of hours into one title. A one-size-fits-all marketing or recommendation strategy ignores that variance entirely. The goal was to let the data reveal natural groupings rather than assuming categories in advance.`,
    process: [
      {
        heading: 'Preprocessing',
        body: `Worked with Kaggle's "Steam Video Games" dataset: roughly 200,000 interaction logs across 11,350 unique users. Gaming-hour distributions were heavily right-skewed (a few users log thousands of hours), so applied a Yeo-Johnson power transformation to normalise the data before clustering.`,
      },
      {
        heading: 'Dimensionality Reduction',
        body: `Reduced 26 engineered behavioural features down to 17 principal components using PCA, preserving the variance that actually separates player types while cutting noise and redundant features.`,
      },
      {
        heading: 'Clustering',
        body: `Ran K-Means with k=4, landing on four distinct personas: "The Whale" (top 8%, ~998 median hours, 44 games purchased), "The Digital Hoarder" (high purchases, low play-to-purchase ratio), "The Hyper-Focused Specialist" (~1,203 median hours concentrated in a handful of titles; 76% of one cluster's hours came from the Football Manager franchise alone), and "The Casual Explorer" (51% of users, ~2.4 median hours; prime candidates for free-to-play conversion).`,
      },
      {
        heading: 'Deployment',
        body: `Wrapped the full preprocessing + clustering pipeline in a reusable object-oriented class, serialised the trained artifacts, and exposed the model as a FastAPI microservice with Pydantic request/response validation, achieving sub-15ms inference per prediction.`,
      },
    ],
    outcomes: [
      { stat: '4', label: 'Player personas discovered via clustering' },
      { stat: '200K', label: 'Interaction logs across 11,350 users' },
      { stat: '<15ms', label: 'FastAPI inference latency' },
    ],
    reflection: `This project pushed me past "run K-Means and call it done" into thinking about clustering as a product decision: each persona needs a different business strategy, so the segmentation only matters if it's actionable. Shipping it as an actual FastAPI service (not just a notebook) also forced me to think about reproducibility: serialising the pipeline so the same transformations apply at inference time as during training.`,
  },

  // ── AIS MEMBERSHIP PORTAL ──────────────────────────────────────────────────
  'ais-portal': {
    title:    'AIS Membership Portal',
    subtitle: 'Designing the mobile experience for a student org\'s membership platform.',
    year:     'Jun 2026',
    category: 'Design & Development',
    accent:   '#A8AEA8',
    motif:    'chip',
    tags:     ['Figma', 'Next.js', 'TypeScript', 'Mobile Design', 'Brand Guidelines'],
    role:     'UI Designer',
    team:     'AIS design team (2 designers)',
    duration: '~1 month',
    tools:    ['Figma', 'Next.js', 'TypeScript'],
    githubUrl: 'https://github.com/katemezger/portal',
    heroImage: '/images/ais_logo_black.png',
    images:    [],
    overview: `The AIS Membership Portal is the platform AI Society at UT Dallas uses to run its membership: applications for programs like AI Academy, AIM, and Innovation Labs, event RSVPs, and QR-code check-ins. I joined as one of two design specialists on the project, individually designing a set of the site's pages before integrating the mobile-responsive views directly into the live Next.js codebase.`,
    problem:  `AIS needed a portal that could hold up to real membership traffic while staying visually consistent with the organization's current brand guidelines, and it needed to work well on mobile since that's how most students would RSVP to events and check in. All of this had to come together on a tight, roughly one-month timeline.`,
    process: [
      {
        heading: 'Design Direction & Guidelines',
        body: `Worked from AIS's current brand guidelines and standards so every page felt consistent with the organization's existing identity rather than introducing a one-off visual language. As one of two design specialists, I designed my share of the site's pages individually in Figma, then synced with the other designer to keep the overall system coherent.`,
      },
      {
        heading: 'Mobile Page Integration',
        body: `Once designs were approved, I integrated the mobile-responsive pages directly into the portal's Next.js and TypeScript codebase, making sure layouts, navigation, and interactive elements like the QR check-in flow held up cleanly on smaller screens.`,
      },
      {
        heading: 'Tight Turnaround',
        body: `The full design-to-integration cycle ran on roughly a one-month deadline. Figuring out which pages needed original design thinking versus which could lean on already-established patterns is what made the timeline workable.`,
      },
    ],
    outcomes: [
      { stat: '2', label: 'Design specialists on the project' },
      { stat: 'Mobile', label: 'Pages designed and integrated' },
      { stat: '~1 mo', label: 'Design-to-integration turnaround' },
    ],
    reflection: `This was my first time taking a design all the way through to integrating it into a real, already-established codebase instead of handing off a Figma file and being done. Working within AIS's existing guidelines instead of a blank canvas was its own kind of design challenge, and doing it on a one-month timeline taught me a lot about triaging which pages actually needed original design work versus which could reuse existing patterns.`,
  },

  // ── EXAMPLE — copy this block and change every value ──────────────────────
  'my-first-project': {
    title:     'My First Project',
    subtitle:  'A one-line hook that makes someone want to read on.',
    year:      '2025',
    category:  'UX/UI',
    tags:      ['Figma', 'User Research', 'Prototyping'],
    role:      'Lead Designer',
    team:      'Solo',
    duration:  '8 weeks',
    tools:     ['Figma', 'Maze', 'Notion'],
    overview:  `Write 1–2 sentences here. What is this project and why does it matter? Keep it tight — this is the first thing people read.`,
    problem:   `What was broken, unclear, or painful? Who was affected and how did you discover the problem? Frame it as a story, not a list.`,
    process: [
      {
        heading: 'Discovery & Research',
        body: `Describe what you did here — user interviews, competitive analysis, desk research, etc. What did you find out?`,
        image: '/images/projects/my-first-project-research.jpg', // optional — delete line if no image
      },
      {
        heading: 'Ideation & Wireframes',
        body: `How did you move from insight to ideas? Sketches, affinity mapping, crazy-8s? What directions did you explore?`,
        image: '/images/projects/my-first-project-wireframes.jpg',
      },
      {
        heading: 'Prototyping & Testing',
        body: `What did you build and test? Who did you test with, how many sessions, what did you learn?`,
      },
      {
        heading: 'Final Design',
        body: `What did the solution look like? Highlight your key design decisions and the reasoning behind them.`,
        image: '/images/projects/my-first-project-final.jpg',
      },
    ],
    outcomes: [
      { stat: '↑ 38%', label: 'Task completion rate' },
      { stat: '↓ 4 min', label: 'Average time on task' },
      { stat: '92%', label: 'Usability test satisfaction' },
    ],
    reflection: `What would you do differently? What were the constraints? What surprised you? This section shows self-awareness and growth.`,
    heroImage: '/images/projects/my-first-project-hero.jpg',
    images: [],
  },
  // ─────────────────────────────────────────────────────────────────────────

}

// Matches the homepage's display order, so "Next Project" cycles the same
// way a visitor would naturally browse from the project grid.
const PROJECT_ORDER = [
  'tracksense-ai', 'eden-portfolio', 'cgs-usability-study', 'time2invest',
  'netflix-prediction', 'divinity-sales-prediction', 'steam-customer-segmentation', 'ais-portal',
]

// Small per-project motif icon, shown next to the category/year eyebrow so
// each case study reads as its own thing rather than a copy-pasted template.
function MotifIcon({ name, color, size = 20 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'leaf':
      return <svg {...p}><path d="M4 20C4 10 10 4 20 4C20 14 14 20 4 20Z" /><path d="M4 20C8 14 12 10 18 6" /></svg>
    case 'keyboard':
      return <svg {...p}><rect x="2.5" y="6" width="19" height="12" rx="2" /><line x1="6" y1="10" x2="6" y2="10" /><line x1="9" y1="10" x2="9" y2="10" /><line x1="12" y1="10" x2="12" y2="10" /><line x1="15" y1="10" x2="15" y2="10" /><line x1="18" y1="10" x2="18" y2="10" /><line x1="6" y1="14.5" x2="15" y2="14.5" /></svg>
    case 'flag':
      return <svg {...p}><line x1="5" y1="3" x2="5" y2="21" /><path d="M5 4H18L14 8L18 12H5" fill={color} fillOpacity="0.22" /></svg>
    case 'chart':
      return <svg {...p}><path d="M3 20H21" /><rect x="5" y="14" width="3" height="6" /><rect x="10.5" y="10" width="3" height="10" /><rect x="16" y="5" width="3" height="15" /><path d="M5 9L10 5L15 8L20 3" /></svg>
    case 'film':
      return <svg {...p}><rect x="3" y="4" width="18" height="16" rx="1.5" /><line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" /><line x1="7" y1="4" x2="7" y2="8" /><line x1="7" y1="16" x2="7" y2="20" /><line x1="17" y1="4" x2="17" y2="8" /><line x1="17" y1="16" x2="17" y2="20" /></svg>
    case 'dice':
      return <svg {...p}><rect x="4" y="4" width="16" height="16" rx="3" /><circle cx="8" cy="8" r="1.1" fill={color} stroke="none" /><circle cx="16" cy="8" r="1.1" fill={color} stroke="none" /><circle cx="12" cy="12" r="1.1" fill={color} stroke="none" /><circle cx="8" cy="16" r="1.1" fill={color} stroke="none" /><circle cx="16" cy="16" r="1.1" fill={color} stroke="none" /></svg>
    case 'controller':
      return <svg {...p}><path d="M6 8.5H10M8 6.5V10.5" /><circle cx="16.5" cy="8" r="0.9" fill={color} stroke="none" /><circle cx="18.5" cy="10" r="0.9" fill={color} stroke="none" /><path d="M5 8C3 8 2 10 2 13C2 16 3.5 18 5.5 17C7 16.3 7.5 15 9 15H15C16.5 15 17 16.3 18.5 17C20.5 18 22 16 22 13C22 10 21 8 19 8C17 8 16.5 9 12 9C7.5 9 7 8 5 8Z" /></svg>
    case 'chip':
      return <svg {...p}><rect x="7" y="7" width="10" height="10" rx="1" /><line x1="9" y1="2" x2="9" y2="7" /><line x1="12" y1="2" x2="12" y2="7" /><line x1="15" y1="2" x2="15" y2="7" /><line x1="9" y1="17" x2="9" y2="22" /><line x1="12" y1="17" x2="12" y2="22" /><line x1="15" y1="17" x2="15" y2="22" /><line x1="2" y1="9" x2="7" y2="9" /><line x1="2" y1="12" x2="7" y2="12" /><line x1="2" y1="15" x2="7" y2="15" /><line x1="17" y1="9" x2="22" y2="9" /><line x1="17" y1="12" x2="22" y2="12" /><line x1="17" y1="15" x2="22" y2="15" /></svg>
    default:
      return null
  }
}

// Cycled per gallery image so the collage has real variety in shape, size,
// and placement rather than a uniform grid of same-size photos.
const GALLERY_VARIANTS = [
  { width: '94%',  rotate: -4,  aspect: '4 / 3',   justify: 'start',  tape: 'rgba(24,104,120,0.55)',  tapeRotate: -9, tapeLeft: '22%' },
  { width: '64%',  rotate: 5,   aspect: '1 / 1',   justify: 'end',    tape: 'rgba(212,184,128,0.6)',  tapeRotate: 7,  tapeLeft: '68%' },
  { width: '100%', rotate: -2,  aspect: '16 / 10', justify: 'center', tape: 'rgba(107,128,64,0.55)',  tapeRotate: -6, tapeLeft: '50%' },
  { width: '74%',  rotate: 4.5, aspect: '3 / 4',   justify: 'start',  tape: 'rgba(204,202,232,0.65)', tapeRotate: 8,  tapeLeft: '32%' },
  { width: '86%',  rotate: -3,  aspect: '5 / 4',   justify: 'end',    tape: 'rgba(184,152,152,0.6)',  tapeRotate: -7, tapeLeft: '62%' },
  { width: '58%',  rotate: 3.5, aspect: '1 / 1',   justify: 'center', tape: 'rgba(24,104,120,0.5)',   tapeRotate: 5,  tapeLeft: '45%' },
]

/* ─── colour tokens ──────────────────────────────────────────────────────── */
const C = {
  bg:      '#E5EAD8',
  dark:    '#0A3020',
  teal:    '#186878',
  text:    '#071A12',
  muted:   'rgba(7,26,18,0.52)',
  subtle:  'rgba(7,26,18,0.12)',
}

export default function ProjectPage() {
  const { slug }  = useParams()
  const navigate  = useNavigate()
  const project   = PROJECTS[slug]

  if (!project) {
    return (
      <div style={{ background: C.bg, minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: C.muted, letterSpacing: 2 }}>
          Project not found.
        </p>
        <button onClick={() => navigate('/')}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: 2,
            textTransform: 'uppercase', color: C.teal, background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Back home
        </button>
      </div>
    )
  }

  const accent = project.accent || C.teal
  const nextIdx = PROJECT_ORDER.indexOf(slug)
  const nextSlug = nextIdx === -1 ? null : PROJECT_ORDER[(nextIdx + 1) % PROJECT_ORDER.length]
  const nextProject = nextSlug ? PROJECTS[nextSlug] : null

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ background: C.bg, height: '100vh', overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}
    >
      <style>{`
        .pp-body  { max-width: 1160px; margin: 0 auto; padding: 0 6vw 100px; }
        .pp-hero  { width: 100%; aspect-ratio: 16/7; object-fit: cover; display: block; }
        .pp-layout { display: grid; grid-template-columns: 1fr 2fr; gap: 56px; align-items: start; }
        @media (max-width: 860px) {
          .pp-layout { grid-template-columns: 1fr; }
          .pp-sidebar { position: static !important; order: 2; }
          .pp-main { order: 1; }
        }
        .pp-sidebar { position: static; }
        .pp-centered { max-width: 780px; margin: 0 auto; }
        .pp-meta  { display: flex; flex-wrap: wrap; gap: 32px; margin: 44px 0 52px; }
        .pp-meta-item label { display: block; font-family: 'Cormorant Garamond', serif; font-size: 10px;
          letter-spacing: 3px; text-transform: uppercase; color: ${C.muted}; margin-bottom: 5px; }
        .pp-meta-item span  { font-family: 'Cormorant Garamond', serif; font-size: 16px; color: ${C.text}; }
        .pp-h2  { font-family: 'Berkshire Swash', serif; font-size: clamp(22px,3vw,32px);
          color: ${C.dark}; margin: 52px 0 14px; }
        .pp-body-text { font-family: 'Cormorant Garamond', serif; font-size: 18px; line-height: 1.8;
          color: ${C.text}; }
        .pp-step  { margin: 40px 0; }
        .pp-step h3 { font-family: 'Stoke', serif; font-size: clamp(18px,2vw,24px);
          color: ${C.teal}; margin-bottom: 12px; }
        .pp-step img { width: 100%; border-radius: 4px; margin-top: 18px; }
        .pp-outcomes { display: flex; flex-wrap: wrap; gap: 20px; margin: 28px 0; }
        .pp-outcome { flex: 1; min-width: 140px; border: 1px solid ${C.subtle};
          padding: 22px 18px; text-align: center; }
        .pp-outcome .stat  { font-family: 'Stoke', serif; font-size: 28px; color: ${C.teal}; }
        .pp-outcome .label { font-family: 'Cormorant Garamond', serif; font-size: 13px;
          color: ${C.muted}; letter-spacing: 1px; margin-top: 4px; }
        .pp-gallery { display: grid; grid-template-columns: 1fr; gap: 32px; padding: 8px 10px; }
        .pp-gallery-item { margin: 0; }
        .pp-gallery-photo {
          position: relative; background: #fff; padding: 10px 10px 14px;
          box-shadow: 0 10px 22px rgba(7,26,18,0.22), 0 2px 6px rgba(7,26,18,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pp-gallery-item:hover .pp-gallery-photo { transform: rotate(0deg) scale(1.08) !important; box-shadow: 0 16px 32px rgba(7,26,18,0.3); z-index: 5; }
        .pp-gallery-photo img { width: 100%; height: 100%; border-radius: 1px; display: block; object-fit: cover; }
        .pp-gallery-tape {
          position: absolute; top: -11px; width: 54px; height: 20px;
          box-shadow: 0 2px 5px rgba(7,26,18,0.18);
        }
        .pp-gallery-item figcaption { font-family: 'Caveat', cursive; font-weight: 700; font-size: 17px;
          color: rgba(7,26,18,0.65); margin-top: 10px; text-align: center; line-height: 1.25; }
        .pp-gallery-empty { font-family: 'Cormorant Garamond', serif; font-size: 16px;
          color: rgba(7,26,18,0.3); letter-spacing: 0.5px; margin: 8px 0 28px; }
        .pp-tags  { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
        .pp-tag   { font-family: 'Cormorant Garamond', serif; font-size: 12px; font-weight: 600;
          padding: 4px 12px; border: 1px solid ${C.subtle}; color: ${C.muted}; letter-spacing: 0.5px; }
        .pp-github { font-family: 'Cormorant Garamond', serif; font-size: 13px; font-weight: 600;
          letter-spacing: 1px; color: ${C.teal}; text-decoration: none; display: inline-block;
          margin-top: 18px; border-bottom: 1px solid rgba(24,104,120,0.35); }
        .pp-github:hover { color: ${C.dark}; border-color: ${C.dark}; }
        .pp-hero-placeholder { width: 100%; aspect-ratio: 16/7; display: flex; align-items: center;
          justify-content: center; background: rgba(7,26,18,0.055); font-family: 'Cormorant Garamond', serif;
          font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(7,26,18,0.18); }
        .pp-divider { height: 1px; background: ${C.subtle}; margin: 48px 0; }
        .pp-back  { font-family: 'Cormorant Garamond', serif; font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase; color: ${C.muted}; background: none;
          border: none; cursor: pointer; padding: 20px 6vw; display: block;
          transition: color 0.2s; }
        .pp-back:hover { color: ${C.teal}; }
      `}</style>

      {/* Back button */}
      <ScatteredSymbolsFixed />
      <button className="pp-back" onClick={() => navigate('/')}>← Back to work</button>

      {/* Hero image */}
      {project.heroImage
        ? <img className="pp-hero" src={project.heroImage} alt={project.title} />
        : <div className="pp-hero-placeholder">Add Image</div>
      }

      <div className="pp-body">
      <div className="pp-layout">
        {/* Gallery sidebar — screenshots, code, graphs, whatever's worth showing */}
        <aside className="pp-sidebar">
          <h2 className="pp-h2" style={{ marginTop: 0 }}>Gallery</h2>
          {project.images?.length > 0
            ? (
              <div className="pp-gallery">
                {project.images.map((img, i) => {
                  const src = typeof img === 'string' ? img : img.src
                  const caption = typeof img === 'string' ? null : img.caption
                  const v = GALLERY_VARIANTS[i % GALLERY_VARIANTS.length]
                  return (
                    <figure key={i} className="pp-gallery-item" style={{ width: v.width, justifySelf: v.justify }}>
                      <div className="pp-gallery-photo" style={{ transform: `rotate(${v.rotate}deg)` }}>
                        <span className="pp-gallery-tape" style={{ background: v.tape, left: v.tapeLeft, transform: `translateX(-50%) rotate(${v.tapeRotate}deg)` }} />
                        <img src={src} alt={caption || `${project.title} gallery image ${i + 1}`}
                          style={{ aspectRatio: v.aspect }} />
                      </div>
                      {caption && <figcaption>{caption}</figcaption>}
                    </figure>
                  )
                })}
              </div>
            )
            : <p className="pp-gallery-empty">Gallery coming soon: screenshots, code, and graphs will go here.</p>
          }
        </aside>

        <div className="pp-main">
        {/* Title block */}
        <div style={{ paddingTop: project.heroImage ? 44 : 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Cormorant Garamond', serif", fontSize: 11, letterSpacing: 3,
            textTransform: 'uppercase', color: accent, marginBottom: 10 }}>
            {project.motif && <MotifIcon name={project.motif} color={accent} size={17} />}
            {project.category} · {project.year}
          </div>
          <h1 style={{ fontFamily: "'Berkshire Swash', serif", fontSize: 'clamp(36px,6vw,68px)',
            color: C.dark, lineHeight: 1, margin: 0 }}>
            {project.title}
          </h1>
          <p style={{ fontFamily: "'Stoke', serif", fontSize: 'clamp(16px,2vw,22px)',
            color: C.teal, marginTop: 12, marginBottom: 0 }}>
            {project.subtitle}
          </p>
          <div className="pp-tags">
            {project.tags.map(t => <span key={t} className="pp-tag">{t}</span>)}
          </div>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="pp-github"
              style={{ color: accent }}>
              View on GitHub &nbsp;↗
            </a>
          )}
        </div>

        {/* Meta row */}
        <div className="pp-meta">
          {[
            { label: 'Role',     value: project.role     },
            { label: 'Team',     value: project.team     },
            { label: 'Duration', value: project.duration  },
            { label: 'Tools',    value: project.tools.join(', ') },
            ...(project.lastUpdated ? [{ label: 'Last Updated', value: project.lastUpdated }] : []),
          ].map(m => (
            <div key={m.label} className="pp-meta-item">
              <label>{m.label}</label>
              <span>{m.value}</span>
            </div>
          ))}
        </div>

        <div className="pp-divider" />

        {/* Overview */}
        <h2 className="pp-h2">Overview</h2>
        <p className="pp-body-text">{project.overview}</p>

        {/* Problem */}
        <h2 className="pp-h2">The Problem</h2>
        <p className="pp-body-text">{project.problem}</p>

        <div className="pp-divider" />

        {/* Process */}
        <h2 className="pp-h2">Process</h2>
        {project.process.map((step, i) => (
          <div key={i} className="pp-step">
            <h3 style={{ color: accent }}>{step.heading}</h3>
            <p className="pp-body-text">{step.body}</p>
            {step.image && <img src={step.image} alt={step.heading} />}
          </div>
        ))}

        </div>
      </div>

        {/* From here on, the gallery sidebar has ended — full-width, centered */}
        <div className="pp-centered">
          <div className="pp-divider" />

          {/* Outcomes */}
          {project.outcomes?.length > 0 && (
            <>
              <h2 className="pp-h2">Outcomes</h2>
              <div className="pp-outcomes">
                {project.outcomes.map((o, i) => (
                  <div key={i} className="pp-outcome">
                    <div className="stat" style={{ color: accent }}>{o.stat}</div>
                    <div className="label">{o.label}</div>
                  </div>
                ))}
              </div>
              <div className="pp-divider" />
            </>
          )}

          {/* Reflection */}
          <h2 className="pp-h2">Reflection</h2>
          <p className="pp-body-text">{project.reflection}</p>

          {/* Next project nav */}
          <div style={{ marginTop: 72, textAlign: 'center', display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/')}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, fontWeight: 600,
                letterSpacing: 3, textTransform: 'uppercase', color: C.teal, background: 'none',
                border: '1px solid rgba(24,104,120,0.25)', padding: '12px 28px', cursor: 'pointer',
                transition: 'all 0.2s' }}
              onMouseEnter={e => { e.target.style.background = C.teal; e.target.style.color = '#F0EDE6' }}
              onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = C.teal }}>
              ← All Projects
            </button>
            {nextProject && (
              <button onClick={() => navigate(`/project/${nextSlug}`)}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, fontWeight: 600,
                  letterSpacing: 3, textTransform: 'uppercase', color: accent, background: 'none',
                  border: `1px solid ${accent}`, padding: '12px 28px', cursor: 'pointer',
                  transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.background = accent; e.target.style.color = '#F0EDE6' }}
                onMouseLeave={e => { e.target.style.background = 'none'; e.target.style.color = accent }}>
                Next: {nextProject.title} →
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
