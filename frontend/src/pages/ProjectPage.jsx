import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import MotifIcon from '../components/MotifIcon.jsx'
import RevealText from '../components/RevealText.jsx'
import Drift, { ScrollContainerContext } from '../components/Drift.jsx'
import LeftNav, { LEFTNAV_WIDTH, LEFTNAV_MOBILE_BP } from '../components/LeftNav.jsx'
import useDocumentTitle from '../components/useDocumentTitle.js'

// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD A PROJECT
// ─────────────────────────────────────────────────────────────────────────────
//
// 1. Add a new entry to the PROJECTS object below (copy an existing
//    project, e.g. TrackSense, which uses every field).
//
// 2. Give it a unique `slug` — this must match the slug in Home.jsx's PROJECTS
//    array (the `slug` field you add there).
//
// 3. Fill in all the fields:
//    - title, subtitle, year, category, tags[]
//    - role, team, duration, tools[]
//    - overview     → 1–2 paragraph project summary
//    - problem      → what challenge you were solving
//    - glance       → optional { problem, did, result }: one line each, shown
//                     as an "at a glance" card under the title for skimmers
//    - process[]    → array of { heading, body, image?, callout? } steps.
//                     callout is optional { label, text }, e.g. { label: 'Cut',
//                     text: '...' }, rendered as a highlighted decision box
//    - outcomes[]   → array of { stat, label } result metrics
//    - reflection   → what you learned / what you'd do differently
//    - heroImage    → path to a wide banner image, e.g. /images/projects/<slug>-hero.webp
//    - heroFit      → optional 'contain' for logos, so the hero shows the whole
//                     image on white instead of cropping it to fill
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
    accent:   'var(--terra)',
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

The aesthetic direction is "whimsical botanical garden": warm parchment backgrounds, olive and moss greens, terracotta accents, scattered doodle symbols in the margins, and an organic blob-shaped portal cycling through my work. The name Eden reflects both the garden theme and a sense of a curated, personal creative space.`,

    problem: `Most portfolio templates feel interchangeable: the same dark-background grid with hover effects and a hero title. I wanted something that felt unmistakably mine, warm, a little handmade, with personality baked into every interaction. The challenge was doing this without sacrificing legibility, hierarchy, or load speed, and without it feeling "themed" in a heavy-handed way.`,

    process: [
      {
        heading: 'Direction & Aesthetic',
        phase: 'Research & Discovery',
        body: `I started with a mood board combining three references: Alex Rivera's scrolling single-page format with numbered discipline sections, mimzywhimsy.com's casual personal warmth, and my own Figma colour palette of forest greens, teal, and cream. From that collision came the Eden direction, structured enough to read as professional, loose enough to feel like a person made it.`,
      },
      {
        heading: 'Design System',
        phase: 'UI & Design System',
        body: `I settled on five font families with strict rules: Fraunces for confident display headings, Stoke for named content titles, Quicksand for all body text, La Belle Aurore for the Eden brand mark, and Caveat reserved for one handwritten touch in the hero. The colour palette has five named tokens: a warm parchment background, deep moss, olive, terracotta, and a warm taupe accent. Having these constraints up-front meant every component decision was fast.`,
      },
      {
        heading: 'Building the Whimsy Layer',
        phase: 'Ideation & Iteration',
        body: `The hardest design problem was the decorative layer: scattered unicode symbols (✦ ◇ ☆ ✿) floating in the margins, and a loading screen where a botanical vine draws itself around a circle. Each element went through multiple iterations to feel light rather than noisy.`,
      },
      {
        heading: 'Component Architecture',
        phase: 'Build & Development',
        body: `The site is a React + Vite SPA with React Router and Framer Motion for page transitions. A shared LeftNav component renders a fixed left rail (collapsible into a compact icon-only strip) on every page, and each page reserves matching padding so nothing sits underneath it. The homepage manages its own scroll context (height: 100vh, overflow-y: auto) to allow scroll-triggered reveal animations and the symbol layer to run at once.`,
      },
      {
        heading: 'Project Case Studies',
        phase: 'Build & Development',
        body: `Each project card on the homepage links to a case study route (/project/:slug). The ProjectPage component reads from a PROJECTS object in the same file: adding a new project means copying one data block and dropping images into /public/images/projects/. No database, no CMS, no fuss.`,
      },
    ],

    outcomes: [
      { stat: '5', label: 'Custom font families with strict usage rules' },
      { stat: '5', label: 'Named colour tokens from the Figma palette' },
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
    accent:   'var(--stone)',
    motif:    'keyboard',
    tags:     ['Usability Testing', 'Comparative Study', 'Think-Aloud', 'Data Analysis', 'HCI'],
    role:     'UX Researcher',
    team:     'Course project',
    duration: '4 weeks',
    tools:    ['Usability testing protocol', 'Screen recording', 'Statistical analysis'],
    heroImage: '/images/projects/cgs-usability-study-hero.webp',
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
        phase: 'Research & Discovery',
        body: `Defined three primary metrics: WPM, accuracy, and test duration, and designed a within-subjects protocol where participants completed equivalent tasks on both platforms. Controlled for task order using counterbalancing to eliminate learning effects.`,
        image: '/images/projects-gallery/MonkeyType-goals.jpg',
      },
      {
        heading: 'Testing Sessions',
        phase: 'Testing & Results',
        body: `Conducted moderated usability sessions using a think-aloud protocol. Participants verbalized their thoughts while completing typing tests on each platform. Sessions were recorded for later analysis. Qualitative data captured frustration points, moments of confusion, and preference signals.`,
      },
      {
        heading: 'Quantitative Analysis',
        phase: 'Testing & Results',
        body: `Compared WPM scores, accuracy percentages, and time-on-task across both platforms for each participant. Applied descriptive statistics to surface performance differences and identify which platform's interface design supported better typing outcomes.`,
        image: '/images/projects-gallery/MonkeyType-code.jpg',
      },
      {
        heading: 'Findings & Recommendations',
        phase: 'Testing & Results',
        body: `Analysis revealed measurable differences in performance outcomes between the two platforms, tied to specific interface design decisions, including feedback timing, visual noise, and error indication. Delivered a written report with evidence-based recommendations for improvement.`,
        image: '/images/projects-gallery/MonkeyType-slides.jpg',
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
    category: 'Design & Development · AI/ML & Data Science',
    accent:   'var(--forest)',
    motif:    'flag',
    tags:     ['React', 'TypeScript', 'Frontend Development', 'UI Design', 'Formula 1', 'Data Visualisation', 'AI'],
    role:     'UI/UX Designer & Frontend Lead',
    team:     '6-person AIM team, AI Society at UT Dallas',
    duration: 'Jan – May 2026',
    tools:    ['Figma', 'React', 'TypeScript', 'TailwindCSS', 'GSAP', 'FastAPI'],
    heroImage: '/images/projects/tracksense-ai-hero.webp',
    images: [
      { src: '/images/projects-gallery/Tracksense-homescreen.webp', caption: 'The landing page, built around a live F1 broadcast feel' },
      { src: '/images/projects-gallery/tracksense-driverspage.webp', caption: 'Driver ELO rankings, with a full breakdown of how each rating is calculated' },
      { src: '/images/projects-gallery/tracksense-navbar-circuitspage.webp', caption: 'The circuit explorer, with track maps and per-corner detail' },
      { src: '/images/projects-gallery/tracksense-performance.webp', caption: 'Lap time comparison between two drivers, with a synced hover tooltip' },
      { src: '/images/projects-gallery/Tracksense-livetelemetry.webp', caption: 'The live race simulation, with real-time telemetry and a synced leaderboard' },
      { src: '/images/projects-gallery/Tracksense-navbar-aboutpage.webp', caption: 'The About page, crediting the team behind the platform' },
      { src: '/images/projects-gallery/tracksense-teamend.webp', caption: 'The team before presenting at AIM Night' },
      { src: '/images/projects-gallery/tracksense-solospeak.webp', caption: 'Presenting TrackSense to the AIM S26 cohort' },
      { src: '/images/projects-gallery/tracksense-team.webp', caption: 'The team celebrating after the showcase' },
    ],
    overview: `TrackSense is a Formula 1 prediction and analytics platform built by a six-person team in the AI Mentorship program (AIM) at the Artificial Intelligence Society. The team built three AI features: a race simulator with live telemetry, a custom Elo rating system for drivers, and XGBoost models that predict lap-by-lap outcomes. I owned the UI and frontend. I designed every page in Figma, then built the app in React, TypeScript and TailwindCSS and wired it to the team's backend.`,
    glance: {
      problem: 'Make F1 model output readable for a casual fan, and polished enough to demo live at AIM Night.',
      did:     'Led UI/UX and frontend: designed every page in Figma, then built 20+ React components wired to real race data.',
      result:  '1st of 14 teams, plus a judge’s invite to give an hour-long talk to ~40 high school students.',
    },
    problem:  `F1 produces huge amounts of timing and telemetry data, but most fans only ever see a leaderboard. I designed for a casual fan, particularly an American one, who knows a bit about the sport but not a lot, the kind of person who might use a tool like this before placing a bet. The interface had to turn model output into something that person could read at a glance, and it had to be polished enough to demo live at AIM Night.`,
    process: [
      {
        heading: 'Designing for a Casual Fan',
        phase: 'Research & Discovery',
        body: `The model could produce far more than a casual fan needs: telemetry frames, Elo ratings, lap predictions and scenario results. Before designing, I worked with the team to understand each output and asked one question of all of it: would someone who watches a few races a season understand this, and would they care? That decided what went up front, what waited behind a click, and what stayed out.`,
      },
      {
        heading: 'First Pass in Figma',
        phase: 'Wireframes & Prototypes',
        body: `I designed every page as a high-fidelity frame at 1440 × 1024, with placeholders marking where live data would go. This first pass got the content and structure onto the page: a nine-item sidebar, a stats-heavy home page, an Elo rankings table, a simulation form with a placeholder track, and single-page layouts for drivers and circuits.`,
        images: [
          '/images/projects-gallery/tracksense-figma-home.webp',
          '/images/projects-gallery/tracksense-figma-elo.webp',
          '/images/projects-gallery/tracksense-figma-simulation.webp',
        ],
      },
      {
        heading: 'Mapping the Data Before the UI',
        phase: 'Information Architecture',
        body: `The frontend had to ship before the ML models existed. Before writing any UI, I mapped every Figma placeholder to the API endpoint that would eventually fill it (rankings, rating history, head-to-head, simulation stream, telemetry, drivers, performance). I then built every page on mock data shaped exactly like the future API, with a comment marking each swap point. That let the frontend and the ML team work in parallel, and each real-data swap became roughly a one-line change.`,
        callout: { label: 'Decision', text: 'Shape the mock data exactly like the future API, so the frontend never had to wait on the models.' },
      },
      {
        heading: 'From Wireframe to Race Weekend',
        phase: 'Iteration',
        body: `Most of the design work happened in rounds of feedback from me, my team and my mentor. Navigation went from nine flat icons to three groups (Weekend, Telemetry, Explore) that match how a fan thinks about a race. Drivers, constructors and circuits became card grids, so learning one page teaches the others. The placeholder oval became the real circuit drawn from FastF1 coordinates, and What If moved from its own page into Simulation so you can run a race and test a scenario in one place. Cutting things mattered too: I built an animated electric border and removed it because it competed with the data, and I tried three cursors before landing on a steering wheel, because it read best at cursor size.`,
        images: ['/images/projects-gallery/tracksense-before-after.webp'],
        callout: { label: 'Cut', text: 'An animated electric border. It looked great on its own, but it competed with the data, so it came out.' },
      },
      {
        heading: 'A Visual Language Borrowed from F1',
        phase: 'UI & Design System',
        body: `The brief I set myself was to make a dense data tool feel like watching an F1 broadcast. Every choice points back to race weekend. The textures come from the car: carbon-fibre weave, tyre tread and diagonal livery stripes, all built in CSS so they cost no image downloads. Page changes cut like a broadcast, with a red DRS-style sweep on every load and entrances that finish in under half a second. Big numbers get their own typeface, the way timing boards treat them. Colours, fonts, textures and motion all live in one Tailwind config, so a single change updates every page.`,
        images: ['/images/projects-gallery/tracksense-style-board.webp'],
      },
      {
        heading: 'Building and Connecting Real Data',
        phase: 'Build & Development',
        body: `I built 20+ reusable React components so every page shares the same parts and motion. Partway through, I migrated the whole codebase from inline styles to TailwindCSS to keep it maintainable. The race replay we adapted was a desktop Python app, so I wrapped its data pipeline in FastAPI and streamed frames to a React canvas over a WebSocket. Merging into the team repo broke everything at first. I traced it to four version conflicts and aligned the team on one stack.`,
        image: '/images/projects-gallery/Tracksense-livetelemetry.webp',
      },
      {
        heading: 'AIM Night',
        phase: 'Testing & Results',
        body: `We presented TrackSense at AIM Night, the capstone showcase for the cohort. The interface was the live demo layer for the model, with races replaying in real time while we presented.`,
        image: '/images/projects-gallery/tracksense-solospeak.webp',
      },
      {
        heading: 'Winning First Place',
        phase: 'Testing & Results',
        body: `TrackSense won first place out of 14 teams. Several judges came up afterward with questions specifically about the design choices, from the palette to how the interface decided which data was worth surfacing. One of them later invited me to give an hour-long talk on the project to about 40 high school students at the ITS Exploration Camp for AI/ML.`,
        image: '/images/projects-gallery/tracksense-team.webp',
      },
    ],
    outcomes: [
      { stat: '1st of 14', label: 'Winning team at AIM Night' },
      { stat: 'Encore', label: 'Invited to give an hour-long talk to ~40 students at ITS Exploration' },
      { stat: '20+', label: 'Reusable React components built from my Figma designs' },
    ],
    reflection: `Designing the data contract before the UI was the decision that made everything else possible, because six people could build at once. I also learned that motion only feels premium when it is fast and consistent, and that cutting features I liked mattered as much as adding them. What I'd do differently: I iterated by overwriting the same Figma file, so most of my in-between versions are gone. Next time I'll keep each draft so I can compare directions and roll back when an older idea turns out to be the better one.`,
  },

  // ── TIME2INVEST — WEHACK HACKATHON ────────────────────────────────────────
  'time2invest': {
    title:    'Time2Invest',
    subtitle: 'A hackathon tool that teaches investing through history.',
    year:     '2026',
    category: 'Design & Development',
    accent:   'var(--ink)',
    motif:    'chart',
    tags:     ['Hackathon', 'WEHack', 'React', 'FinTech', 'UI Design', 'Financial Literacy'],
    role:     'Designer & Developer',
    team:     'WEHack team',
    duration: '24 hours',
    tools:    ['React', 'Figma', 'Financial APIs', 'Historical data'],
    heroImage: '/images/projects/time2invest-hero.webp',
    images:    [],
    overview: `Time2Invest is a financial literacy tool built in 24 hours at WEHack. The concept: instead of teaching investing through abstract theory, show users what would have happened to their money during real historical events: market crashes, bull runs, geopolitical shocks, using actual headlines and returns data. Learn by simulating, not by reading.`,
    problem:  `Financial literacy is one of the most talked-about gaps in education, but most tools that try to fill it are either too dry (textbooks) or too abstract (portfolio simulators disconnected from reality). We wanted something that created an emotional connection between historical events people already know about, COVID, the 2008 crash, the dot-com boom, and what that meant for their money.`,
    process: [
      {
        heading: 'Concept & Scoping (Hours 0–3)',
        phase: 'Ideation & Iteration',
        body: `Defined the core loop in the first few hours: the user picks a time period and an investment amount, and the tool shows them what would have happened, anchored by real headlines from that period. Kept the scope tight enough to ship in 24 hours.`,
      },
      {
        heading: 'Design',
        phase: 'UI & Design System',
        body: `Sketched the user flow: landing, period selection, simulation view, outcome summary, and built a rapid Figma prototype. Prioritised a clean, approachable aesthetic (no Wall Street intimidation) with clear data visualisation for returns over time.`,
      },
      {
        heading: 'Development',
        phase: 'Build & Development',
        body: `Built the frontend in React. Integrated historical market data and surfaced real news headlines alongside the performance chart, so users could connect events to outcomes. The goal was "oh, THAT'S what the 2008 crash looked like for $1,000."`,
      },
      {
        heading: 'WEHack Submission',
        phase: 'Testing & Results',
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
    accent:   'var(--forest)',
    motif:    'film',
    tags:     ['R', 'Machine Learning', 'Data Analysis', 'tidyverse', 'Data Visualisation', 'Netflix'],
    role:     'Data Analyst & Researcher',
    team:     'Group 17',
    duration: 'STAT 3355 semester project',
    tools:    ['R', 'dplyr', 'caret', 'ggplot2'],
    heroImage: '/images/projects/netflix-prediction-hero.webp',
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
        phase: 'Research & Discovery',
        body: `Sourced and cleaned a Netflix titles dataset including metadata such as genre, country of origin, release year, content type (film vs series), rating, and duration. Handled missing values, normalised categorical variables, and engineered features for modelling.`,
        image: '/images/projects-gallery/Netflix-data.jpg',
      },
      {
        heading: 'Exploratory Data Analysis',
        phase: 'Research & Discovery',
        body: `Ran exploratory analysis to understand the distribution of titles across genres, countries, and time periods. Identified trends in content type and regional production, and surfaced initial correlations worth investigating further.`,
        image: '/images/projects-gallery/Netflix-primary.jpg',
      },
      {
        heading: 'Modelling',
        phase: 'Modeling & Pipeline',
        body: `Trained classification and regression models to predict success proxies (ratings, viewer engagement signals) from metadata features. Evaluated model performance and feature importance to identify which factors were most predictive.`,
      },
      {
        heading: 'Findings',
        phase: 'Testing & Results',
        body: `Results revealed that genre and country of origin are moderately predictive, while release timing showed weaker signal than expected. The study highlighted both the potential and the limits of metadata-only prediction: content quality variables not captured in metadata remain the dominant driver of success.`,
        image: '/images/projects-gallery/Netflix-summary.jpg',
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
    accent:   'var(--terra)',
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
        phase: 'Research & Discovery',
        body: `Built a dedicated data-cleaning notebook to merge the Kaggle RPG sales dataset with manually sourced Baldur's Gate 3 performance data, since the original dataset predated BG3's release. Validated and cleaned the combined dataset, and produced a "high-performer" subset to help the model learn what separates hits from average releases.`,
      },
      {
        heading: 'Feature Analysis',
        phase: 'Ideation & Iteration',
        body: `Explored which features actually correlate with first-year sales: genre, publisher pedigree, platform reach, and comparable-title performance. Larian's track record with Baldur's Gate 3 became a key anchor point for estimating Divinity's ceiling.`,
      },
      {
        heading: 'Model Training',
        phase: 'Modeling & Pipeline',
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
    category: 'AI/ML & Data Science · Design & Development',
    accent:   'var(--stone)',
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
        phase: 'Research & Discovery',
        body: `Worked with Kaggle's "Steam Video Games" dataset: roughly 200,000 interaction logs across 11,350 unique users. Gaming-hour distributions were heavily right-skewed (a few users log thousands of hours), so applied a Yeo-Johnson power transformation to normalise the data before clustering.`,
      },
      {
        heading: 'Dimensionality Reduction',
        phase: 'Modeling & Pipeline',
        body: `Reduced 26 engineered behavioural features down to 17 principal components using PCA, preserving the variance that actually separates player types while cutting noise and redundant features.`,
      },
      {
        heading: 'Clustering',
        phase: 'Modeling & Pipeline',
        body: `Ran K-Means with k=4, landing on four distinct personas: "The Whale" (top 8%, ~998 median hours, 44 games purchased), "The Digital Hoarder" (high purchases, low play-to-purchase ratio), "The Hyper-Focused Specialist" (~1,203 median hours concentrated in a handful of titles; 76% of one cluster's hours came from the Football Manager franchise alone), and "The Casual Explorer" (51% of users, ~2.4 median hours; prime candidates for free-to-play conversion).`,
      },
      {
        heading: 'Deployment',
        phase: 'Build & Development',
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
    subtitle: 'Designing and building the platform 800+ AI Society members use to apply, RSVP and check in.',
    year:     '2026',
    category: 'Design & Development',
    accent:   'var(--ink)',
    motif:    'chip',
    tags:     ['Figma', 'Design Systems', 'Mobile Design', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    role:     'Lead Designer & Mobile Frontend Developer',
    team:     'AIS tech team: 2 designers (I designed ~90% of the screens) and the engineering team',
    duration: 'Jun 20 – Aug 28, 2026 to launch; ongoing since',
    tools:    ['Figma', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    githubUrl: 'https://github.com/katemezger/portal',
    heroImage: '/images/ais_logo_black.png',
    heroFit:   'contain',   // a logo, not a photo: show it whole on white instead of cropping
    images: [
      { src: '/images/projects-gallery/AISPortal-dashboard.webp', caption: 'The member dashboard: announcements, RSVPs, and personalized event recommendations' },
      { src: '/images/projects-gallery/AISPortal-apply.webp', caption: 'The program selection flow: AI Academy, AI Mentorship, and Officer applications' },
      { src: '/images/projects-gallery/AISPortal-events.webp', caption: 'Browsing events with tag-based filtering and RSVP status' },
      { src: '/images/projects-gallery/AISPortal-onboarding.png', caption: 'New member onboarding: the profile completion flow' },
    ],
    glance: {
      problem: 'AI Society needed one place for 800+ members to apply to programs, RSVP and check in, on desktop and on their phones, plus tools for officers to run it all.',
      did:     'Designed ~90% of the desktop and mobile screens in Figma, then built the mobile frontend (22 of its 28 components) in the team\u2019s Next.js codebase.',
      result:  'Launched 28 August, ten weeks after the first frame. Now 807 members, 218 of them active this semester.',
    },
    overview: `The AIS Membership Portal is where the Artificial Intelligence Society at UT Dallas runs its membership: students apply to programs like AI Academy, AI Mentorship and AI Innovation Labs, RSVP to events and check in with a QR code, while officers review applications, run events and manage members. I was the tech team's lead designer. I designed about 90% of the portal's desktop and mobile screens in Figma, built its component library, and then built the mobile frontend myself in the team's Next.js and TypeScript codebase. The engineering team built the backend and the desktop app.`,
    problem:  `The portal had to serve two very different people. Members needed to apply, find events and check in quickly, often from a phone at the event itself. Officers needed to review applications, run check-ins and manage hundreds of members. All of it had to match AI Society's brand, and the whole thing, from first Figma frame to a working backend, had to launch before the fall semester.`,
    process: [
      {
        heading: 'Two Audiences, One Portal',
        phase: 'Research & Discovery',
        body: `Before designing anything, I mapped every screen each audience needed. Members: onboarding, a dashboard, events and event details, applying to a program through a three-step form, and their profile. Officers: an overview, applicant review with a scoring rubric, event management with QR check-in, and a members list. Designing both sides in one system meant a member's RSVP and an officer's check-in count were two views of the same data, so they had to look and behave consistently.`,
      },
      {
        heading: 'Wireframes, Desktop and Mobile Together',
        phase: 'Wireframes & Prototypes',
        body: `I started in Figma on 20 June and designed every screen in both sizes side by side, instead of finishing desktop and squeezing it down later. The application form became a three-step wizard: personal details, long answers, then a review screen before submitting.`,
        images: [
          '/images/projects-gallery/aisportal-figma-onboarding-dashboard.webp',
          '/images/projects-gallery/aisportal-figma-apply-wizard.webp',
        ],
      },
      {
        heading: 'A Component Library First',
        phase: 'UI & Design System',
        body: `To keep two designers and dozens of screens consistent, I built a component library: the AIS colours (cream, brand blue, peach, lavender), two type families (Placard Next for titles, Garet for body and UI), buttons, a pastel set of event tags, inputs, stat cards, the member nav and the admin sidebar. I also designed the empty and error states up front: no RSVPs yet, no applications, no search results, form errors and a failed load.`,
        images: [
          '/images/projects-gallery/aisportal-figma-components.webp',
          '/images/projects-gallery/aisportal-figma-events-admin-errors.webp',
        ],
        callout: { label: 'Decision', text: 'Design the empty and error states with everything else, not after launch. A brand-new member sees "No RSVPs yet" before anything else.' },
      },
      {
        heading: 'Review, Then Revise',
        phase: 'Iteration',
        body: `Every screen went through three passes: a wireframe, a high-fidelity pass in the AIS brand, then the build. After a tech team review, I turned the meeting notes into specific changes. On Apply, the "How to Begin" steps came out, program cards got "Learn more" buttons and the slogan banner started moving. On Profile, the photo placeholder went and the name and major moved into a top bar. The onboarding setup page got a gradient background.`,
        images: ['/images/projects-gallery/aisportal-evolution.webp'],
        callout: { label: 'Cut', text: 'The three-step "How to Begin" block on Apply. It made it through the wireframe and hi-fi passes, then came out in review.' },
      },
      {
        heading: 'Building the Mobile Frontend',
        phase: 'Build & Development',
        body: `The engineering team built the backend and desktop app, and I built the mobile side in the same codebase: 22 of the 28 mobile components, covering every member and admin screen. Admin screens went from desktop's sidebar and wide tables to stacked cards under a shared top nav. Then I audited every mobile page against its desktop version and closed each gap, from applications that only showed open listings to an admin view that dropped applicants' emails. Along the way I found that the site's main font, Inter, was referenced everywhere but never actually loaded, and fixed it for every page.`,
        images: ['/images/projects-gallery/aisportal-parity-audit.webp'],
        callout: { label: 'Decision', text: 'Mobile gets every feature desktop has, and nothing desktop doesn\u2019t. No second-class phone version.' },
      },
      {
        heading: 'Motion and Colour Pass',
        phase: 'UI Polish',
        body: `Just before launch I added motion and a targeted colour pass. The active nav item became a gradient pill that slides between links instead of snapping, every page change got a soft fade and slide, dashboard cards got a colour strip per category, and event cards lift on hover instead of just changing text colour. I also removed an Email Notifications toggle that didn't do anything.`,
        image: '/images/projects-gallery/aisportal-live-events.webp',
      },
      {
        heading: 'Growing the Platform',
        phase: 'Expansion',
        body: `After launch, the portal kept growing. In September and October I designed and built the AI Academy learning pages, with featured workshops, a course sequence and resources, and the AI Mentorship hub, with a weekly check-in QR and a timeline of where each team is.`,
        images: [
          '/images/projects-gallery/aisportal-figma-academy-aim.webp',
          '/images/projects-gallery/aisportal-live-academy.webp',
        ],
      },
      {
        heading: 'In Use',
        phase: 'Testing & Results',
        body: `The portal launched on 28 August, ten weeks after the first Figma frame. As of October it holds 807 members, 218 of them active this semester and 31 new this month, with 54 officers.`,
        image: '/images/projects-gallery/aisportal-live-member-stats.webp',
      },
    ],
    outcomes: [
      { stat: '807', label: 'Members on the portal' },
      { stat: '218', label: 'Active this semester' },
      { stat: '10 wks', label: 'From first Figma frame to launch' },
    ],
    reflection: `This was my first product with two audiences in one system, and designing the member and officer sides together is what kept them consistent. The parity audit taught me that a responsive page isn't the same as a complete one: several gaps came from mobile screens I built before the backend was merged, which still pointed at placeholder data. What I'd do differently: check each mobile screen against desktop as soon as it's built, instead of in one audit at the end.`,
  },

  // ── CLOVERLEAF CMS — CLIENT INTAKE REDESIGN ─────────────────────────────────
  // NOTE: Cloverleaf is a live, compliance-sensitive product for counseling
  // agencies and credit unions — no real product screenshots or client data
  // can be shown here, so the hero is the company's own logo rather than a
  // UI screenshot. `tools` is left conservative since the exact frontend
  // stack isn't confirmed — fill in if you want it named specifically.
  'cloverleaf-intake-redesign': {
    title:    'Cloverleaf CMS: Client Intake Redesign',
    subtitle: 'Redesigning the intake experience inside a live compliance-sensitive platform.',
    year:     'Aug 2026 – Present',
    category: 'Design & Development',
    accent:   'var(--terra)',
    motif:    'form',
    tags:     ['Design Systems', 'Typography', 'UI Standards', 'Frontend Development'],
    role:     'Application Developer Intern (Frontend)',
    team:     'Cooperative Processing Resources — Cloverleaf CMS team',
    duration: 'Ongoing',
    tools:    ['Design Systems / UI Standards'],
    heroImage: '/images/projects/cloverleaf-logo.png',
    images:    [],
    overview: `Cloverleaf CMS is Cooperative Processing Resources' production case management platform, used by counseling agencies and credit unions to run real client workflows. As a frontend intern on the team, I redesigned the client intake process: the color scheme, typography, and overall UI standards clients and staff see when a new case is opened.`,
    problem:  `The intake flow is a client's and a case worker's first real interaction with the product, but it hadn't been designed as a cohesive system: color usage, type scale, and component styling had grown inconsistently over time. In a platform handling compliance-sensitive data for counseling agencies and credit unions, visual inconsistency isn't just cosmetic — it makes the interface harder to trust and scan quickly under real caseload pressure.`,
    process: [
      {
        heading: 'Auditing the Existing Intake Flow',
        phase: 'Research & Discovery',
        body: `Went through the live intake flow screen by screen to catalogue where color, type, and component styling were inconsistent or didn't hold up against the rest of the product, working within an existing production codebase rather than a blank canvas.`,
      },
      {
        heading: 'Establishing Color & Typography Standards',
        phase: 'UI & Design System',
        body: `Defined a clearer color scheme and type scale for the intake experience and the UI standards to keep it consistent going forward, balancing legibility and a calmer visual hierarchy against the constraints of an already-shipped product used daily by real agencies.`,
      },
      {
        heading: 'Shipping Into Production',
        phase: 'Build & Development',
        body: `Implemented the redesign directly in Cloverleaf's live frontend codebase, the same one handling real client workflows and compliance-sensitive data, rather than staging it in a separate design file disconnected from what actually ships.`,
      },
    ],
    outcomes: [
      { stat: 'Live', label: 'Shipped to production in Cloverleaf CMS' },
      { stat: 'New Standard', label: 'Color, typography & UI rules set for the intake flow going forward' },
    ],
    reflection: `Designing inside a live, compliance-sensitive product is a different discipline than a personal project: every change has to respect existing patterns and real users mid-caseload, not just look better in isolation. It's also the first time I've had to think about design decisions through a compliance lens rather than a purely visual one.`,
  },

  // ── HALO — COGNIZANT × ASTON MARTIN IDEATHON ────────────────────────────────
  // Overview/Problem/Process below are built from Kate's own walkthrough of
  // the concept and the pitch deck slides; Outcomes reflects the confirmed
  // 3rd-place placement. `tools` is left empty since the specific tooling
  // used for the pitch (Figma, slides, etc.) hasn't been confirmed.
  'halo-ideathon': {
    title:    'Halo',
    subtitle: 'An AI companion concept that follows a fan through a full Aston Martin F1 race weekend.',
    year:     'Sep 2026 – Oct 2026',
    category: 'Design & Development',
    accent:   'var(--sage)',
    tags:     ['Ideathon', 'Product Concept', 'AI UX', 'Fan Engagement', 'Cognizant', 'Aston Martin'],
    role:     'Product & UX Concept Designer',
    team:     'UTD Team 2 — Cognizant × Aston Martin Ideathon',
    duration: '6-week ideathon',
    tools:    [],
    heroImage: '/images/projects-gallery/Cognizant-1.webp',
    images:    [],
    overview: `Halo is an AI companion product concept built for Aston Martin's I/AM fan community, developed and pitched over a 6-week ideathon hosted by Cognizant in partnership with Aston Martin. Walking through a full race weekend from one fan's perspective, Halo connects social discovery, watch parties, live race commentary, and post-race recaps into a single experience, built around one rule: every fact Halo surfaces has to trace back to a real source.`,
    problem:  `Fan engagement for a Formula 1 team is easy to win on race day and easy to lose everywhere else: in the gaps between races, during lulls like a safety car period, and anywhere an AI assistant's answer could be wrong and quietly erode trust instead of building it. Halo was pitched as an answer to both problems at once: a companion that meets fans where they already are on social media, keeps them engaged through every phase of a race weekend, and is built around a simple honesty rule, if Halo isn't sure, it says so instead of guessing.`,
    process: [
      {
        heading: 'Getting Into I/AM',
        phase: 'Ideation & Iteration',
        body: `The entry point is social: during and after a race, Aston Martin's TikTok and Instagram highlights carry captions Halo writes from team-approved facts, each one linking to free sign-up for I/AM, the fan community. From there, sharing is opt-in. A fan can share their location to get matched with nearby watch parties, or skip it and still be part of the community; privacy is the fan's call, not a requirement to participate.`,
      },
      {
        heading: 'Before the Race',
        phase: 'Ideation & Iteration',
        body: `As race weekend approaches, watch parties and race chat unlock. A fan finds a nearby watch party, signs up, and gets a QR code to check in. Make A Mark surfaces what the team is doing in the host city that weekend, and race chat lets fans connect with others watching from anywhere in the world.`,
      },
      {
        heading: 'During the Race',
        phase: 'Ideation & Iteration',
        body: `This is where the concept's core trust mechanic lives. A live feed mixes highlight moments with plain-English storytelling, including team stories during lulls like safety cars, so there's always something to follow. Tap a fact, like a new front wing, and Halo shows exactly which report it came from: the old wing's carbon fibre gets recycled, 1.3 tonnes of it last year, sourced and checkable. In race chat, fans can ask Halo anything; if the answer isn't in Halo's sources, it says "I don't know" instead of making something up.`,
        image: '/images/projects-gallery/Cognizant-3.webp',
      },
      {
        heading: 'The AI Behind the Score',
        phase: 'Modeling & Pipeline',
        body: `The Aramco Sustainability Score is built on a retrieval-augmented generation pipeline: before the AI writes anything, it looks up real published reports and only uses what it finds there, no source, no answer. Three checkpoints get a number from report to fan: RAG extraction pulls key figures straight from published reports, regression fills gaps the reports don't cover (with the LLM explaining its reasoning in plain English), and a validation step checks those estimates against real data via simulation. Every figure keeps a "Reported" or "Modeled" label the whole way through, so a fan can always tell which numbers are sourced and which are estimated.`,
        image: '/images/projects-gallery/Cognizant-2.webp',
      },
      {
        heading: 'After the Race',
        phase: 'Ideation & Iteration',
        body: `Halo closes the loop with a race summary and how the team performed, including the Impact Telemetry and Aramco Sustainability Score referenced earlier in the experience, now explained in full: a score of 72, up 3 points, with the factors behind it. A what-if tool lets fans explore trade-offs, like how last year's fuel would have meant 185% higher emissions. At season's end, Season Wrapped turns a fan's races watched and questions asked into a shareable recap, designed to pull new fans into I/AM.`,
      },
      {
        heading: '90-Day Pilot Plan',
        phase: 'Testing & Results',
        body: `The pitch closed with a phased rollout rather than an all-at-once launch. Days 1–30: post-race recaps for I/AM members, built only from reported Make A Mark data, measuring recap opens and source taps. Days 31–60: the Aramco Sustainability Score and live "Ask Halo" dashboard go live, measuring score views and questions asked. Days 61–90: watch parties, race chat, and a first sponsored segment, measuring tickets and sponsor reach. The next lap beyond day 90: offer the score to every F1 team and the FIA.`,
        image: '/images/projects-gallery/Cognizant-4.webp',
      },
    ],
    outcomes: [
      { stat: '3rd Place', label: 'Overall at the Cognizant × Aston Martin Ideathon' },
      { stat: 'Austin, TX', label: 'Presented to Cognizant and Aston Martin judges' },
      { stat: '6 weeks', label: 'From concept to final pitch' },
    ],
    reflection: `Six weeks isn't a lot of time to design, validate, and pitch a product end to end, so the biggest skill this ideathon forced was ruthless prioritization: deciding which parts of Halo, the trust mechanic, the sustainability score, the social loop, needed to be fully thought through versus which could stay directional for the pitch. Designing the "I don't know" behavior taught me that trust in an AI product is a design problem as much as a technical one: it has to be visible in the interface, the source links, the Reported/Modeled labels, or a user has no reason to believe it's actually there. Placing 3rd against other teams' concepts was a good signal the idea landed, but if I did it again I'd push harder on validating the sustainability scoring against real data earlier in the six weeks rather than leaving more of it modeled.`,
  },

}

// Matches the homepage's display order, so "Next Project" cycles the same
// way a visitor would naturally browse from the project grid.
const PROJECT_ORDER = [
  'tracksense-ai', 'ais-portal', 'cloverleaf-intake-redesign', 'eden-portfolio', 'cgs-usability-study',
  'time2invest', 'netflix-prediction', 'divinity-sales-prediction', 'steam-customer-segmentation',
  'halo-ideathon',
]

/* ─── colour tokens ──────────────────────────────────────────────────────── */
// Case-study pages get their own "back color" — a slightly warmer/deeper
// sand than the site's main parchment bg (var(--bg)) — so a project page reads
// as its own space while staying in the same warm/kraft family.
const C = {
  bg:      'var(--bg-case)',
  dark:    'var(--forest)',
  teal:    'var(--terra)',
  text:    'var(--ink)',
  muted:   'rgba(var(--ink-rgb),0.6)',
  subtle:  'rgba(var(--ink-rgb),0.12)',
}

function useInView(threshold = 0.4) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

// Animates the numeric portion of a stat (e.g. "200K", "1st Place", "<15ms")
// from 0 up to its real value once scrolled into view. Stats with no digits
// at all (e.g. "WPM", "R", "Quant UX") just render statically.
function AnimatedStat({ stat, active, instant }) {
  const match = stat.match(/\d+/)
  const [display, setDisplay] = useState(match && !instant ? '0' : (match ? match[0] : stat))

  useEffect(() => {
    if (!active || !match || instant) return
    const target = parseInt(match[0], 10)
    const duration = 900
    const start = performance.now()
    let raf
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(String(Math.round(target * eased)))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  if (!match) return stat
  return `${stat.slice(0, match.index)}${display}${stat.slice(match.index + match[0].length)}`
}

// Section header for the page's main chapters (Overview, Process, ...):
// a numbered kicker plus a large serif title, so the big breaks between
// chapters carry a clear label instead of reading as empty space.
function Chapter({ n, title, accent, first }) {
  return (
    <div className="pp-chapter" style={first ? { marginTop: 80 } : undefined}>
      <div className="num" style={{ color: accent }}>{String(n).padStart(2, '0')}</div>
      <Drift from={60} to={-60}><h2><RevealText text={title} /></h2></Drift>
    </div>
  )
}

export default function ProjectPage() {
  const { slug }  = useParams()
  const navigate  = useNavigate()
  const project   = PROJECTS[slug]
  useDocumentTitle(project ? `${project.title}: Kate Mezger` : 'Project Not Found: Kate Mezger')

  if (!project) {
    return (
      <div style={{ background: C.bg, minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <LeftNav />
        <p style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 18, color: C.muted, letterSpacing: 2 }}>
          Project not found.
        </p>
        <button onClick={() => navigate('/')}
          style={{ fontFamily: "'Quicksand', sans-serif", fontSize: 13, letterSpacing: 2,
            textTransform: 'uppercase', color: C.teal, background: 'none', border: 'none', cursor: 'pointer' }}>
          ← Back home
        </button>
      </div>
    )
  }

  const accent = project.accent || C.teal
  const [outcomesRef, outcomesInView] = useInView()
  const [scrollProgress, setScrollProgress] = useState(0)
  // Click-to-enlarge: the process boards (before/after, style board) carry
  // small annotation text that's unreadable at column width on a laptop.
  const [lightbox, setLightbox] = useState(null)
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])
  // Scroll reveals: each process step rises in once as it enters view, its
  // media a beat behind the text. Skipped entirely for reduced-motion users.
  const reduceMotion = useReducedMotion()
  const reveal = (delay = 0, x = 0) => reduceMotion ? {} : {
    initial: { opacity: 0, x, y: x ? 0 : 24 },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] },
  }
  const zoomImg = (src, alt, motionProps = {}) => (
    <motion.img src={src} alt={alt} className="pp-zoomable" onClick={() => setLightbox({ src, alt })}
      tabIndex={0} role="button" aria-label={`Enlarge image: ${alt}`}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightbox({ src, alt }) } }}
      {...motionProps} />
  )
  const scrollRef = useRef(null)
  const nextIdx = PROJECT_ORDER.indexOf(slug)
  const nextSlug = nextIdx === -1 ? null : PROJECT_ORDER[(nextIdx + 1) % PROJECT_ORDER.length]
  const nextProject = nextSlug ? PROJECTS[nextSlug] : null

  const onScroll = (e) => {
    const el = e.currentTarget
    const max = el.scrollHeight - el.clientHeight
    setScrollProgress(max > 0 ? (el.scrollTop / max) * 100 : 0)
  }

  return (
    <ScrollContainerContext.Provider value={scrollRef}>
    <motion.main
      ref={scrollRef}
      className="page-shell"
      initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ background: C.bg, height: '100vh', overflowY: 'auto', overflowX: 'hidden', position: 'relative', '--pp-accent': accent }}
      onScroll={onScroll}
    >
      <style>{`
        .page-shell { padding-left: ${LEFTNAV_WIDTH}px; }
        @media (max-width: ${LEFTNAV_MOBILE_BP}px) { .page-shell { padding-left: 0; padding-top: 56px; } }
        /* Text stays in a readable column (860px); the hero image and
           gallery use the wider .pp-wide container instead, so images
           visibly exceed the text width. Both containers share the same
           6vw side padding so nothing sits flush against the nav rail.
           Vertical rhythm is intentionally tight — not the padded-out
           "generous whitespace" version from earlier this session, which
           read as boring/empty rather than calm. */
        .pp-wide  { max-width: 1680px; margin: 0 auto; padding: 0 4vw; }
        .pp-body  { max-width: 1240px; margin: 0 auto; padding: 0 4vw 72px; }
        .pp-hero  { width: 100%; aspect-ratio: 16/7; object-fit: cover; display: block; border-radius: 6px; margin-top: 24px; background: #fff; }
        .pp-hero-frame { overflow: hidden; border-radius: 6px; margin-top: 24px; }
        .pp-hero-frame .pp-hero { margin-top: 0; border-radius: 0; }
        .pp-meta  { display: grid; grid-template-columns: repeat(4, auto); gap: 18px 40px; margin: 24px 0 0; }
        @media (max-width: 760px) { .pp-meta { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px) { .pp-meta { grid-template-columns: 1fr; } }
        .pp-meta-item label { display: block; font-family: 'Quicksand', sans-serif; font-size: 10px;
          letter-spacing: 3px; text-transform: uppercase; color: ${C.muted}; margin-bottom: 5px; }
        .pp-meta-item span  { font-family: 'Quicksand', sans-serif; font-size: 16px; color: ${C.text}; }
        .pp-h2  { font-family: 'Fraunces', serif; font-size: clamp(22px,3vw,32px);
          color: ${C.dark}; margin: 36px 0 14px; }
        .pp-body-text { font-family: 'Quicksand', sans-serif; font-size: 17px; line-height: 1.7;
          color: ${C.text}; }
        .pp-step  { margin: 26px 0; }
        .pp-step h3 { font-family: 'Stoke', serif; font-size: clamp(18px,2vw,24px);
          color: ${C.teal}; margin-bottom: 12px; }
        /* The page's two-column rhythm: Overview pairs with The Problem as
           the first row, then every process step with an image (single or
           several — several just stack in the media column) pairs with it
           as its own row. The column ratio is fixed (3fr/2fr); what swaps
           row by row (tracked by a running counter at render time) is
           which block — text or image — renders in which column, so the
           image actually moves from the small right side to the big left
           side and back, rather than just resizing in place. */
        .pp-row { display: grid; grid-template-columns: 3fr 2fr; gap: 5vw; align-items: start; margin: 40px 0; }
        .pp-row h3 { font-family: 'Stoke', serif; font-size: clamp(18px,2vw,24px);
          color: ${C.teal}; margin-bottom: 12px; }
        .pp-phase { display: block; font-family: 'Quicksand', sans-serif; font-size: 10px;
          font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase; color: ${C.muted};
          margin-bottom: 7px; }
        .pp-row-media { display: flex; flex-direction: column; gap: 14px; justify-content: center; }
        .pp-row-media img { width: 90%; border-radius: 4px; display: block; }
        @media (max-width: 760px) { .pp-row { grid-template-columns: 1fr; gap: 18px; }
          .pp-row-media img { width: 100%; } }
        .pp-center-media { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; margin-top: 18px; }
        .pp-center-media img { width: 100%; max-width: 640px; border-radius: 4px; display: block; }
        .pp-center-media.pp-gallery { align-items: flex-start; }
        .pp-center-media.pp-gallery img { flex: 1 1 0; min-width: 200px; width: auto; max-width: none; }
        .pp-outcomes { display: flex; flex-wrap: wrap; gap: 20px; margin: 28px 0; }
        .pp-outcome { flex: 1; min-width: 140px; border: 1px solid ${C.subtle};
          padding: 22px 18px; text-align: center; }
        .pp-outcome .stat  { font-family: 'Stoke', serif; font-size: 28px; color: ${C.teal}; }
        .pp-outcome .label { font-family: 'Quicksand', sans-serif; font-size: 13px;
          color: ${C.muted}; letter-spacing: 1px; margin-top: 4px; }
        .pp-tags  { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
        .pp-tag   { font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 600;
          padding: 4px 12px; border: 1px solid ${C.subtle}; color: ${C.muted}; letter-spacing: 0.5px; }
        .pp-github { font-family: 'Quicksand', sans-serif; font-size: 13px; font-weight: 600;
          letter-spacing: 1px; color: ${C.teal}; text-decoration: none; display: inline-block;
          margin-top: 18px; border-bottom: 1px solid rgba(var(--terra-rgb),0.35); }
        .pp-github:hover { color: ${C.dark}; border-color: ${C.dark}; }
        .pp-hero-placeholder { width: 100%; aspect-ratio: 16/7; display: flex; align-items: center;
          justify-content: center; background: rgba(var(--ink-rgb),0.055); font-family: 'Quicksand', sans-serif;
          font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(var(--ink-rgb),0.56); }
        .pp-divider { height: 1px; background: ${C.subtle}; margin: 32px 0; }
        .pp-back  { font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 600;
          letter-spacing: 2px; text-transform: uppercase; color: ${C.muted}; background: none;
          border: none; cursor: pointer; padding: 20px 6vw; display: block;
          transition: color 0.2s; }
        .pp-back:hover { color: ${C.teal}; }
        .pp-progress-track {
          position: fixed; top: 0; left: ${LEFTNAV_WIDTH}px; right: 0; height: 3px; z-index: 200;
        }
        @media (max-width: ${LEFTNAV_MOBILE_BP}px) { .pp-progress-track { left: 0; top: 56px; } }

        /* Chapters: big breaks *between* the page's main sections, tight
           spacing inside them. Rhythm instead of uniform padding (the
           evenly padded version read as empty). */
        .pp-chapter { margin: 112px 0 34px; }
        .pp-chapter .num { display: flex; align-items: center; gap: 12px; font-family: 'Quicksand', sans-serif;
          font-size: 11px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 10px; }
        .pp-chapter .num::after { content: ''; width: 48px; height: 2px; background: currentColor; opacity: 0.6; }
        .pp-chapter h2 { font-family: 'Fraunces', serif; font-weight: 600; font-size: clamp(34px,4.6vw,56px);
          line-height: 1; color: ${C.dark}; margin: 0; }
        @media (max-width: 760px) { .pp-chapter { margin: 76px 0 24px; } }

        /* At a glance */
        .pp-glance { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 34px;
          background: rgba(var(--ink-rgb),0.05); border-radius: 6px; overflow: hidden; }
        .pp-glance > div { padding: 22px 24px; }
        .pp-glance > div + div { border-left: 1px solid ${C.subtle}; }
        .pp-glance label { display: block; font-family: 'Quicksand', sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; }
        .pp-glance p { font-family: 'Quicksand', sans-serif; font-size: 15px; line-height: 1.55; color: ${C.text}; margin: 0; }
        @media (max-width: 760px) { .pp-glance { grid-template-columns: 1fr; }
          .pp-glance > div + div { border-left: none; border-top: 1px solid ${C.subtle}; } }

        /* Process timeline: numbered steps joined by a line on the left. */
        .pp-timeline { position: relative; padding-left: 72px; }
        .pp-timeline::before { content: ''; position: absolute; left: 19px; top: 8px; bottom: 8px; width: 2px;
          background: var(--pp-accent); opacity: 0.22; }
        .pp-tl-item { position: relative; margin-bottom: 64px; }
        .pp-tl-item:last-child { margin-bottom: 0; }
        .pp-tl-item > .pp-step, .pp-tl-item > .pp-row { margin: 0; }
        .pp-tl-num { position: absolute; left: -72px; top: 0; width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; background: ${C.bg};
          border: 2px solid var(--pp-accent); color: var(--pp-accent);
          font-family: 'Quicksand', sans-serif; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; }
        @media (max-width: 760px) {
          .pp-timeline { padding-left: 46px; }
          .pp-timeline::before { left: 13px; }
          .pp-tl-num { left: -46px; width: 28px; height: 28px; font-size: 11px; }
        }
        .pp-timeline .pp-phase { display: inline-block; padding: 4px 11px; border-radius: 999px;
          border: 1px solid var(--pp-accent); color: var(--pp-accent); margin-bottom: 10px; }

        /* Decision callout */
        .pp-callout { margin-top: 18px; padding: 14px 18px; border-left: 3px solid var(--pp-accent);
          background: rgba(var(--ink-rgb),0.05); border-radius: 0 6px 6px 0; }
        .pp-callout label { display: block; font-family: 'Quicksand', sans-serif; font-size: 10px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase; color: var(--pp-accent); margin-bottom: 4px; }
        .pp-callout p { font-family: 'Stoke', serif; font-size: 17px; line-height: 1.45; color: ${C.text}; margin: 0; }

        /* Click to enlarge */
        .pp-zoomable { cursor: zoom-in; transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s; }
        .pp-zoomable:hover { transform: translateY(-3px); box-shadow: 0 14px 30px rgba(0,0,0,0.43); }
        .pp-zoomable:focus-visible { outline: 2px solid var(--terra); outline-offset: 3px; }
        .pp-lightbox { position: fixed; inset: 0; z-index: 500; background: rgba(20,18,16,0.88);
          display: flex; align-items: center; justify-content: center; padding: 4vh 4vw; cursor: zoom-out; }
        .pp-lightbox img { max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 4px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.5); }
        .pp-lightbox .hint { position: absolute; top: 18px; right: 24px; font-family: 'Quicksand', sans-serif;
          font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase; color: rgba(232,225,214,0.7); }

        /* Next project card */
        .pp-next { display: grid; grid-template-columns: 1fr 42%; align-items: stretch; width: 100%;
          margin-top: 28px; border: 1px solid ${C.subtle}; border-radius: 8px; overflow: hidden;
          background: rgba(var(--ink-rgb),0.04); cursor: pointer; text-align: left; padding: 0;
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s, border-color 0.35s; }
        .pp-next:hover { transform: translateY(-4px); box-shadow: 0 18px 40px rgba(0,0,0,0.38); border-color: var(--pp-accent); }
        .pp-next .txt { padding: 34px 36px; display: flex; flex-direction: column; justify-content: center; }
        .pp-next .kick { font-family: 'Quicksand', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: ${C.muted}; }
        .pp-next .ttl { font-family: 'Fraunces', serif; font-weight: 600; font-size: clamp(26px,3vw,40px);
          color: ${C.dark}; margin-top: 10px; line-height: 1.05; }
        .pp-next .sub { font-family: 'Stoke', serif; font-size: 17px; color: ${C.teal}; margin-top: 10px; }
        .pp-next .go { font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 3px;
          text-transform: uppercase; color: var(--pp-accent); margin-top: 22px; transition: letter-spacing 0.35s; }
        .pp-next:hover .go { letter-spacing: 5px; }
        .pp-next .thumb { background-size: contain; background-repeat: no-repeat; background-position: center; min-height: 200px;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .pp-next:hover .thumb { transform: scale(1.04); }
        .pp-next .thumb-wrap { overflow: hidden; }
        @media (max-width: 760px) { .pp-next { grid-template-columns: 1fr; } .pp-next .thumb-wrap { order: -1; } }
        .pp-all { font-family: 'Quicksand', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: ${C.muted}; background: none; border: none; cursor: pointer;
          display: block; margin: 22px auto 0; transition: color 0.2s; }
        .pp-all:hover { color: ${C.teal}; }
      `}</style>

      <LeftNav />

      {/* Scroll progress bar */}
      <div className="pp-progress-track">
        <div style={{ height: '100%', width: `${scrollProgress}%`, background: accent, transition: 'width 0.1s linear' }} />
      </div>

      {/* Back button */}
      <button className="pp-back" onClick={() => navigate('/')}>← Back to work</button>

      {/* Hero image — sits in the wide container, visibly wider than the
          text column that follows. */}
      <div className="pp-wide">
        {project.heroImage
          ? <div className="pp-hero-frame"><Drift from={-28} to={28} style={{ scale: 1.08 }}><img className="pp-hero" src={project.heroImage} alt={project.title} style={project.heroFit ? { objectFit: project.heroFit, padding: '4% 8%' } : undefined} /></Drift></div>
          : <div className="pp-hero-placeholder">{project.heroNote || 'Add Image'}</div>
        }
      </div>

      <div className="pp-body">
        {/* Title block */}
        <div style={{ paddingTop: 44 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Quicksand', sans-serif", fontSize: 11, letterSpacing: 3,
            textTransform: 'uppercase', color: accent, marginBottom: 10 }}>
            {project.motif && <MotifIcon name={project.motif} color={accent} size={17} />}
            {project.category} · {project.year}
          </div>
          <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(36px,6vw,68px)',
            color: C.dark, lineHeight: 1, margin: 0 }}>
            <RevealText text={project.title} />
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

          {/* Meta row — right under the title, same as before. */}
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

          {/* At a glance: the whole case study in three lines, for
              recruiters who skim before deciding to read. */}
          {project.glance && (
            <div className="pp-glance">
              {[
                { label: 'Problem',    text: project.glance.problem },
                { label: 'What I did', text: project.glance.did },
                { label: 'Result',     text: project.glance.result },
              ].map((g, gi) => (
                <motion.div key={g.label} {...reveal(gi * 0.1, -40)}>
                  <label style={{ color: accent }}>{g.label}</label>
                  <p>{g.text}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Overview + The Problem are the page's first two-column row
            (2/3–1/3). */}
        <Chapter n={1} title="Overview" accent={accent} first />
        <div className="pp-row" style={{ marginTop: 0 }}>
          <motion.div {...reveal(0, -48)}>
            <p className="pp-body-text">{project.overview}</p>
          </motion.div>
          <motion.div {...reveal(0.1, 48)}>
            <h3 style={{ fontFamily: "'Stoke', serif", fontSize: 'clamp(18px,2vw,24px)', color: accent, margin: '0 0 12px' }}>The Problem</h3>
            <p className="pp-body-text">{project.problem}</p>
          </motion.div>
        </div>

        {/* Process: a numbered timeline. Each step's layout still cycles
            right / left / center (see below); the timeline just wraps it. */}
        <Chapter n={2} title="Process" accent={accent} />
        <div className="pp-timeline">
        {(() => { let row = 0; return project.process.map((step, i) => {
          const num = <span className="pp-tl-num">{String(i + 1).padStart(2, '0')}</span>
          const callout = step.callout && (
            <div className="pp-callout">
              <label>{step.callout.label}</label>
              <p>{step.callout.text}</p>
            </div>
          )
          // Any step with an image (one or several) gets one of three
          // treatments, cycling right / left / center each time one of
          // these rows appears: "right" and "left" are the same two-column
          // row (3fr/2fr) with the image on the small side or the big side;
          // "center" breaks out of the two-column grid entirely and runs
          // the image full width, centered, below the text — so the
          // rhythm varies between rows instead of only ever flipping
          // between two mirrored layouts. A step with several images
          // stacks them (vertically in the side column, or in a row when
          // centered). Only a step with no image at all stays plain.
          const hasImage = step.image || step.images?.length > 0
          if (hasImage) {
            // A step with several images is always "center": stacked (or
            // side-by-side, see pp-center-media) images read much taller
            // than one paragraph of text, so pairing them into the narrow
            // side column left a tall empty gap under the text. A single
            // image doesn't have that height mismatch, so it still cycles
            // through right/left/center normally.
            const multi = step.images?.length > 0
            const position = multi ? 'center' : ['right', 'left', 'center'][row % 3]
            if (!multi) row++

            if (position === 'center') {
              return (
                <div key={i} className="pp-tl-item">
                  {num}
                  <motion.div className="pp-step" {...reveal()}>
                    {step.phase && <span className="pp-phase">{step.phase}</span>}
                    <h3 style={{ color: accent }}>{step.heading}</h3>
                    <p className="pp-body-text">{step.body}</p>
                    {callout}
                  </motion.div>
                  <div className={multi ? 'pp-center-media pp-gallery' : 'pp-center-media'}>
                    {step.image && zoomImg(step.image, step.heading)}
                    {step.images?.map((src, j, arr) => {
                      const side = arr.length === 1 ? 60 : j === 0 ? -60 : j === arr.length - 1 ? 60 : 0
                      return <span key={j} style={{ display: 'contents' }}>{zoomImg(src, `${step.heading} ${j + 1}`, reveal(0.1 + j * 0.08, side))}</span>
                    })}
                  </div>
                </div>
              )
            }

            const textSide = position === 'left' ? 56 : -56
            const text = (
              <motion.div key="text" {...reveal(0, textSide)}>
                {step.phase && <span className="pp-phase">{step.phase}</span>}
                <h3 style={{ color: accent }}>{step.heading}</h3>
                <p className="pp-body-text">{step.body}</p>
                {callout}
              </motion.div>
            )
            const media = (
              <motion.div key="media" className="pp-row-media" {...reveal(0.12, -textSide)}>
                {step.image && zoomImg(step.image, step.heading)}
                {step.images?.map((src, j) => <span key={j} style={{ display: 'contents' }}>{zoomImg(src, `${step.heading} ${j + 1}`)}</span>)}
              </motion.div>
            )
            return (
              <div key={i} className="pp-tl-item">
                {num}
                <div className="pp-row">
                  {position === 'left' ? [media, text] : [text, media]}
                </div>
              </div>
            )
          }
          return (
            <div key={i} className="pp-tl-item">
              {num}
              <motion.div className="pp-step" {...reveal()}>
                {step.phase && <span className="pp-phase">{step.phase}</span>}
                <h3 style={{ color: accent }}>{step.heading}</h3>
                <p className="pp-body-text">{step.body}</p>
                {callout}
              </motion.div>
            </div>
          )
        }) })()}
        </div>

          {/* Outcomes */}
          {project.outcomes?.length > 0 && (
            <>
              <Chapter n={3} title="Outcomes" accent={accent} />
              <div className="pp-outcomes" ref={outcomesRef} style={{ marginTop: 0 }}>
                {project.outcomes.map((o, i) => (
                  <motion.div key={i} className="pp-outcome" {...reveal(i * 0.08, i % 2 ? 48 : -48)}>
                    <div className="stat" style={{ color: accent }}>
                      <AnimatedStat stat={o.stat} active={outcomesInView} instant={reduceMotion} />
                    </div>
                    <div className="label">{o.label}</div>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Reflection */}
          <Chapter n={project.outcomes?.length > 0 ? 4 : 3} title="Reflection" accent={accent} />
          <motion.p className="pp-body-text" {...reveal()}>{project.reflection}</motion.p>

          {/* Next project: a full card with the next hero, so the page ends
              by pulling the visitor onward instead of back to the grid. */}
          <div style={{ marginTop: 96 }}>
            {nextProject && (
              <button className="pp-next" onClick={() => navigate(`/project/${nextSlug}`)}>
                <motion.div className="txt" {...reveal(0, -48)}>
                  <span className="kick">Next project</span>
                  <span className="ttl">{nextProject.title}</span>
                  <span className="sub">{nextProject.subtitle}</span>
                  <span className="go">View case study →</span>
                </motion.div>
                <motion.div className="thumb-wrap" {...reveal(0.1, 60)}>
                  <div className="thumb" style={{
                    height: '100%',
                    backgroundImage: nextProject.heroImage ? `url(${nextProject.heroImage})` : 'none',
                    backgroundColor: nextProject.heroImage ? '#fff' : 'rgba(var(--ink-rgb),0.08)',
                  }} />
                </motion.div>
              </button>
            )}
            <button className="pp-all" onClick={() => navigate('/')}>← All projects</button>
          </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="pp-lightbox" onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25 }}>
            <span className="hint">Click or Esc to close</span>
            <motion.img src={lightbox.src} alt={lightbox.alt}
              initial={reduceMotion ? false : { scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
    </ScrollContainerContext.Provider>
  )
}
