import { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import StarCursor       from './components/StarCursor.jsx'
import LoadingScreen    from './components/LoadingScreen.jsx'
// Home is imported eagerly (not lazy) since it's the page most visitors land
// on first — lazy-loading it would add a network round-trip before the
// above-the-fold content can render, which measurably hurt LCP.
import Home             from './pages/Home.jsx'

// The rest stay lazy so a visit to one of them doesn't pay the JS parse cost
// of every other page up front — each route's chunk downloads only when
// it's actually visited.
const DesignDev        = lazy(() => import('./pages/DesignDev.jsx'))
const ResearchUX       = lazy(() => import('./pages/ResearchUX.jsx'))
const AnalyticsScience = lazy(() => import('./pages/AnalyticsScience.jsx'))
const Other            = lazy(() => import('./pages/Other.jsx'))
const ProjectPage      = lazy(() => import('./pages/ProjectPage.jsx'))
const NotFound         = lazy(() => import('./pages/NotFound.jsx'))

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={null}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"                  element={<Home />} />
          <Route path="/design-dev"        element={<DesignDev />} />
          <Route path="/research-ux"       element={<ResearchUX />} />
          <Route path="/analytics-science" element={<AnalyticsScience />} />
          <Route path="/other"             element={<Other />} />
          {/* Project case-study pages — see src/pages/ProjectPage.jsx to add projects */}
          <Route path="/project/:slug"     element={<ProjectPage />} />
          <Route path="*"                  element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  )
}

// Only plays on a hard load of the homepage itself — not on a direct/refreshed
// load of a project or discipline page, and not on later in-app navigation
// back to "/" (the lazy initializer only reads the URL once, on first mount).
function HomeOnlyLoadingScreen() {
  const [isHomeLoad] = useState(() => window.location.pathname === '/')
  return isHomeLoad ? <LoadingScreen /> : null
}

export default function App() {
  return (
    <BrowserRouter>
      <HomeOnlyLoadingScreen />
      <StarCursor />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
