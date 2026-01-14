import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, ThemeToggle } from '@project-v-redone/ui';
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
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 font-body">
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

          {/* Theme Toggle */}
          <div className="fixed bottom-4 right-4 z-50">
            <div className="bg-white/80 backdrop-blur-lg p-2 rounded-full shadow-lg border border-gray-200">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App

