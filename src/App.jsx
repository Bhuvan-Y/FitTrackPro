import TopNav from './components/layout/TopNav'
import SideNav from './components/layout/SideNav'
import { useState } from 'preact/hooks'
import { Dashboard, Clients, WorkoutPlans, ProgressTracker, Nutrition, Schedule, Notes, ApiTools, Reports, Login } from './components/sections'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentSection, setCurrentSection] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogin = (credentials) => {
    // In a real app, you would validate credentials with your backend
    console.log('Login successful:', credentials)
    setUser({ username: credentials.username })
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUser(null)
    setCurrentSection('dashboard')
  }

  const handleNavigation = (sectionId) => {
    setCurrentSection(sectionId)
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />
      case 'clients':
        return <Clients />
      case 'workout-plans':
        return <WorkoutPlans />
      case 'progress-tracker':
        return <ProgressTracker />
      case 'nutrition':
        return <Nutrition />
      case 'schedule':
        return <Schedule />
      case 'notes':
        return <Notes />
      case 'api-tools':
        return <ApiTools />
      case 'reports':
        return <Reports />
      default:
        return <Dashboard />
    }
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  // Show main application if authenticated
  return (
    <div className="min-h-screen bg-gray-50">
      <SideNav currentSection={currentSection} onNavigate={handleNavigation} onLogout={handleLogout} />
      <TopNav onOpenMenu={() => setIsMobileMenuOpen(true)} />
      {/* Main content area */}
      <div className="lg:ml-64 bg-black pt-16">
        {renderSection()}
      </div>

      {/* Mobile SideNav Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <SideNav isMobile={true} currentSection={currentSection} onNavigate={handleNavigation} onClose={() => setIsMobileMenuOpen(false)} onLogout={handleLogout} />
        </div>
      )}
    </div>
  )
}

export default App
