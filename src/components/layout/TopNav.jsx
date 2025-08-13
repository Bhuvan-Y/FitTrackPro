import { useEffect, useRef, useState } from 'preact/hooks'

function TopNav({ onOpenMenu = () => {} }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const notificationsRef = useRef(null)
  const [notifications] = useState([
    { type: 'new-client', message: 'Emma Davis joined the gym', time: '4 hours ago', priority: 'high' },
    { type: 'workout-due', message: '3 workout plans due for review', time: '6 hours ago', priority: 'medium' },
    { type: 'measurement', message: '5 clients need weight entries', time: '1 day ago', priority: 'medium' },
    { type: 'session', message: 'Tomorrow: 8 sessions scheduled', time: '1 day ago', priority: 'low' }
  ])

  useEffect(() => {
    function onClickOutside(e) {
      if (notificationsRef.current && !notificationsRef.current.contains(e.target)) {
        setIsNotificationsOpen(false)
      }
    }
    if (isNotificationsOpen) document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [isNotificationsOpen])

  return (
    <nav className="fixed top-0 left-0 lg:left-64 right-0 bg-black border-b md:border-b-0 border-gray-800 shadow-lg z-30">
      <div className="max-w-8xl mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Mobile Logo & Desktop Active Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center space-x-2">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shadow-sm border border-yellow-300/30">
                <span className="text-black font-bold text-2xl font-kodchasan">💪</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-white font-kodchasan tracking-wide leading-tight">FitTrackPro</h1>
                <p className="text-xs text-gray-400 font-nunito font-medium">Gym Management</p>
              </div>
            </div>

            {/* Desktop Active Section */}
            <div className="hidden lg:flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <h2 className="text-lg font-bold text-white font-kodchasan">{activeSection}</h2>
              </div>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-gray-400 font-nunito">Fitness Management Dashboard</span>
              </div>
            </div>
          </div>

          {/* Right Section - Desktop Search & Notifications */}
          <div className="flex items-center space-x-2">
            {/* Desktop Search Bar */}
            <div className="hidden lg:flex items-center">
              <div className="relative w-96">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search clients, workouts, nutrition plans..."
                  className="w-full pl-10 pr-16 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/30 focus:border-yellow-400/20 transition-all duration-300 font-nunito text-sm shadow-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500 font-medium px-1.5 py-0.5 bg-white/5 rounded-md border border-white/5">⌘K</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block w-px h-6 bg-white/10"></div>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setIsNotificationsOpen(v => !v)}
                className="relative w-11 h-11 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-sm"
                aria-haspopup="true"
                aria-expanded={isNotificationsOpen}
                aria-label="Notifications"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width='19' height='19' viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bell-icon lucide-bell"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg>
                {notifications.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-yellow-400 ring-2 ring-black"></span>
                )}
              </button>
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                  {/* Header */}
                  <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-gray-900/60">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                      <span className="text-sm font-semibold text-white font-nunito">Notifications</span>
                    </div>
                    <button
                      onClick={() => setIsNotificationsOpen(false)}
                      className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded-md hover:bg-white/5"
                    >
                      Close
                    </button>
                  </div>
                  {/* List */}
                  <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                    {notifications.map((n, idx) => (
                      <div key={idx} className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.03] transition">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          n.priority === 'high' ? 'bg-red-500' : n.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-nunito truncate">{n.message}</p>
                          <p className="text-xs text-gray-400 font-nunito">{n.time}</p>
                        </div>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <div className="px-4 py-10 text-center text-sm text-gray-400">No notifications</div>
                    )}
                  </div>
                  {/* Footer */}
                  <div className="px-4 py-3 border-t border-white/10 bg-gray-900/60 flex items-center justify-between">
                    <button className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded-md hover:bg-white/5">Mark all as read</button>
                    <button className="text-xs text-yellow-400 hover:text-yellow-300 px-2 py-1 rounded-md hover:bg-yellow-500/10">View all</button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Search Button */}
            <button className="lg:hidden w-11 h-11 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300 shadow-sm">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>



            {/* Mobile menu button */}
            <button
              onClick={() => onOpenMenu()}
              className="lg:hidden w-11 h-11 bg-yellow-400 rounded-full flex items-center justify-center text-black hover:bg-yellow-300 transition-all duration-300 shadow-sm border border-yellow-300/30"
              aria-label="Open menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile SideNav Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40">
          <div className="fixed left-0 top-0 h-full w-64 bg-black border-r border-gray-800 z-50 transform transition-transform duration-300 ease-in-out">
            {/* Mobile SideNav Header */}
            <div className="flex items-center justify-between p-4 bg-black">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg border border-yellow-300/30">
                  <span className="text-black font-bold text-lg font-kodchasan">💪</span>
                </div>
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-white font-kodchasan tracking-wide leading-tight">FitTrackPro</h1>
                  <p className="text-xs text-gray-400 font-nunito font-medium">Gym Management</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <nav className="flex-1 p-3 space-y-4">
              {/* Main Navigation */}
              <div className="space-y-1">
                <div className="flex items-center justify-between px-2 mb-2">
                  <h3 className="text-xs font-semibold text-gray-500 tracking-wider font-kodchasan">
                    FitTrackPro UI
                  </h3>
                </div>
                <div className="space-y-1">
                  {['Dashboard', 'Clients', 'Workout Plans', 'Progress Tracker', 'Nutrition'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveSection(item)
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all duration-200 font-nunito text-sm text-gray-400 hover:text-white hover:bg-gray-800/50"
                    >
                      <span className="font-medium">{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Separator */}
              <div className="border-t border-gray-800"></div>

              {/* Secondary Navigation */}
              <div className="space-y-1">
                <div className="flex items-center justify-between px-2 mb-2">
                  <h3 className="text-xs font-semibold text-gray-500 tracking-wider font-kodchasan">
                    Tools
                  </h3>
                </div>
                <div className="space-y-1">
                  {['Schedule', 'Notes', 'API Tools', 'Reports'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveSection(item)
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all duration-200 font-nunito text-sm text-gray-400 hover:text-white hover:bg-gray-800/50"
                    >
                      <span className="font-medium">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            </nav>

            {/* Mobile Bottom Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-sm border border-yellow-300/30">
                  <span className="text-black font-bold text-xs font-nunito">
                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white font-nunito">{user?.username || 'User'}</p>
                  <p className="text-xs text-gray-400 font-nunito">Personal Trainer</p>
                </div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <button
                  onClick={onLogout}
                  className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
                  title="Logout"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default TopNav
