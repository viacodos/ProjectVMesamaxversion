import { Header, Button, ThemeProvider, ThemeToggle } from '@project-v-redone/ui'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Header 
          logo={<h1 className="text-2xl font-bold text-primary-lighter light:text-primary">Lanka Vacations</h1>}
        >
          <a href="#" className="text-primary-lighter hover:text-white transition-colors light:text-gray-600 light:hover:text-primary">Home</a>
          <a href="#" className="text-primary-lighter hover:text-white transition-colors light:text-gray-600 light:hover:text-primary">Packages</a>
          <a href="#" className="text-primary-lighter hover:text-white transition-colors light:text-gray-600 light:hover:text-primary">Destinations</a>
          <ThemeToggle />
          <Button variant="primary">Book Now</Button>
        </Header>

        <main className="pt-24 px-4 sm:px-6 container mx-auto">
          <div className="text-center py-20">
            <h1 className="text-5xl font-bold mb-4 light:text-gray-900">Welcome to Lanka Vacations</h1>
            <p className="text-xl text-primary-lighter mb-8 light:text-gray-600">Discover the beauty of Sri Lanka</p>
            <Button variant="primary">Explore Packages</Button>
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
