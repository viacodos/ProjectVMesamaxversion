import { Header, Button } from '@project-v-redone/ui'

function App() {
  return (
    <div className="min-h-screen">
      <Header 
        logo={<h1 className="text-2xl font-bold text-primary-lighter">Lanka Vacations Admin</h1>}
      >
        <a href="#" className="text-primary-lighter hover:text-white transition-colors">Dashboard</a>
        <a href="#" className="text-primary-lighter hover:text-white transition-colors">Bookings</a>
        <a href="#" className="text-primary-lighter hover:text-white transition-colors">Packages</a>
        <Button variant="secondary">Logout</Button>
      </Header>

      <main className="pt-24 px-4 sm:px-6 container mx-auto">
        <div className="text-center py-20">
          <h1 className="text-5xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-xl text-primary-lighter mb-8">Manage your travel business</p>
        </div>
      </main>
    </div>
  )
}

export default App
