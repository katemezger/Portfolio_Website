import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home             from './pages/Home.jsx'
import About            from './pages/About.jsx'
import DesignDev        from './pages/DesignDev.jsx'
import ResearchUX       from './pages/ResearchUX.jsx'
import AnalyticsScience from './pages/AnalyticsScience.jsx'
import Other            from './pages/Other.jsx'
import ProjectPage      from './pages/ProjectPage.jsx'
import StarCursor       from './components/StarCursor.jsx'
import LoadingScreen    from './components/LoadingScreen.jsx'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"                  element={<Home />} />
        <Route path="/about"             element={<About />} />
        <Route path="/design-dev"        element={<DesignDev />} />
        <Route path="/research-ux"       element={<ResearchUX />} />
        <Route path="/analytics-science" element={<AnalyticsScience />} />
        <Route path="/other"             element={<Other />} />
        {/* Project case-study pages — see src/pages/ProjectPage.jsx to add projects */}
        <Route path="/project/:slug"     element={<ProjectPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LoadingScreen />
      <StarCursor />
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
