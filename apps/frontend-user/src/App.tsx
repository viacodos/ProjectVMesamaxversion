import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@project-v-redone/ui';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Tours } from './pages/Tours';
import { BuildTour } from './pages/BuildTour';
import { Accommodation } from './pages/Accommodation';
import { GettingAround } from './pages/GettingAround';
import { AboutUs } from './pages/AboutUs';
import { Contact } from './pages/Contact';

function App() {
  return (
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="min-h-screen flex flex-col font-body transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/tours" element={<Tours />} />
              <Route path="/build-tour" element={<BuildTour />} />
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/getting-around" element={<GettingAround />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

