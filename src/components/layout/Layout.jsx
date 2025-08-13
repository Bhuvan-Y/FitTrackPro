import TopNav from './TopNav.jsx'
import SideNav from './SideNav.jsx'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <TopNav />
      
      {/* Main Content Area */}
      <div className="flex">
        {/* Side Navigation */}
        <div className="hidden md:block">
          <SideNav />
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
