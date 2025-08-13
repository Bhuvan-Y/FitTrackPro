import { useState } from 'preact/hooks'

function SideNav({ isMobile = false, onClose = () => {}, currentSection = 'dashboard', onNavigate = () => {}, onLogout = () => {} }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const navigationItems = [
    { 
      id: 'dashboard', 
      name: 'Dashboard', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-gauge-icon lucide-gauge"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>
      ),
      href: '#' 
    },
    { 
      id: 'clients', 
      name: 'Clients', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-star-icon lucide-user-star"><path d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"/><path d="M8 15H7a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/></svg>
      ),
      href: '#' 
    },
    { 
      id: 'workout-plans', 
      name: 'Workout Plans', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dumbbell lucide-dumbbell"><path d="M6 4v16"/><path d="M6 4h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6"/><path d="M6 12h10"/><path d="M6 8h10"/><path d="M6 16h10"/></svg>
      ),
      href: '#' 
    },
    { 
      id: 'progress-tracker', 
      name: 'Progress Tracker', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up lucide-trending-up"><polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/><polyline points="16,7 22,7 22,13"/></svg>
      ),
      href: '#' 
    },
    { 
      id: 'nutrition', 
      name: 'Nutrition', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-apple lucide-apple"><path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z"/><path d="M10 2c1 .5 2 2 2 5"/></svg>
      ),
      href: '#' 
    },
    { 
      id: 'schedule', 
      name: 'Schedule', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar lucide-calendar"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
      ),
      href: '#' 
    },
    { 
      id: 'notes', 
      name: 'Notes', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sticky-note lucide-sticky-note"><path d="M16 2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-6"/><path d="M14 2v6h6"/><path d="M8 13h3"/><path d="M8 17h3"/><path d="M8 9h3"/></svg>
      ),
      href: '#' 
    },
    { 
      id: 'api-tools', 
      name: 'API Tools', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-code lucide-code"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>
      ),
      href: '#' 
    },
    { 
      id: 'reports', 
      name: 'Reports', 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
      ),
      href: '#' 
    },
  ]

  const settingsOptions = [
    { id: 'profile', name: 'Profile', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user lucide-user"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    )},
    { id: 'data', name: 'Data & Backup', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-database lucide-database"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/></svg>
    )},
    { id: 'help', name: 'Help & Support', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-help-circle lucide-help-circle"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
    )},
    { id: 'logout', name: 'Logout', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
    )},
  ]

  const rootClass = isMobile
    ? 'fixed left-0 top-0 h-full w-64 bg-black border-r border-gray-800 z-50 block'
    : 'fixed left-0 top-0 h-full w-64 bg-black z-40 hidden lg:block'

  return (
    <div className={rootClass}>
      {/* Header Section with Logo */}
      <div className="flex items-center justify-between p-4 bg-black">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          {/* Logo Icon */}
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-lg border border-yellow-300/30 flex-shrink-0">
            <span className="text-black font-bold text-lg font-kodchasan">💪</span>
          </div>
          
          {/* Logo Text */}
          <div className="flex flex-col min-w-0">
            <h1 className="text-lg font-bold text-white font-kodchasan tracking-wide leading-tight">FitTrackPro</h1>
            <p className="text-xs text-gray-400 font-nunito font-medium">Gym Management</p>
          </div>
        </div>

        {/* Close (mobile only) */}
        {isMobile && (
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300"
            aria-label="Close menu"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 space-y-4">
        {/* Main Navigation */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xs font-semibold text-gray-500/60 tracking-wider font-kodchasan">
              FitTrackPro UI
            </h3>
            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
          </div>
          <div className="space-y-1">
            {navigationItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all duration-200 font-nunito text-sm relative ${
                  currentSection === item.id
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
                {/* Badge for active item */}
                {currentSection === item.id && (
                  <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-1">
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xs font-semibold text-gray-500/60 tracking-wider font-kodchasan">
              Tools
            </h3>
            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
            </svg>
          </div>
          <div className="space-y-1">
            {navigationItems.slice(5).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`group w-full flex items-center justify-between px-2 py-2 rounded-lg transition-all duration-200 font-nunito text-sm relative ${
                  currentSection === item.id
                    ? 'bg-yellow-400 text-black'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </div>
                {/* Badge for active item */}
                {currentSection === item.id && (
                  <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Storage Information Box */}
      <div className="absolute bottom-20 left-0 right-0 mx-4">
        <div className="bg-yellow-400 border border-yellow-500/30 rounded-lg p-3 shadow-md">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-black font-kodchasan">Storage</span>
            </div>
            <span className="text-xs font-bold text-black font-nunito">75%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-yellow-500/50 rounded-full h-1.5 mb-2">
            <div className="bg-black h-1.5 rounded-full transition-all duration-300" style={{ width: '75%' }}></div>
          </div>
          
          {/* Storage Details */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-black font-nunito">7.5 GB / 10 GB</span>
            <span className="text-xs text-black/70 font-nunito">Firestore</span>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 px-3 py-2">
        <div className="flex items-center space-x-3 px-3 py-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-300/50 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
              <span className="text-black font-bold text-sm font-nunito">ST</span>
            </div>
            
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white font-nunito truncate group-hover:text-yellow-400 transition-colors duration-300">Sarah Trainer</p>
            <p className="text-xs text-gray-400 font-nunito font-medium">Personal Trainer</p>
          </div>
          <div className="flex-shrink-0 relative">
            <button 
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="w-8 h-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 transition-all duration-300 shadow-sm group-hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            {/* Settings Dropdown */}
            {isSettingsOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-52 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl z-50 overflow-hidden">
                {/* Dropdown Header */}
                <div className="px-4 py-3 border-b border-gray-700/50 bg-gray-800/50">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-kodchasan">
                    Settings
                  </h3>
                </div>
                
                {/* Dropdown Options */}
                <div className="py-2">
                  {settingsOptions.map((option, index) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        if (option.id === 'logout') {
                          onLogout()
                          setIsSettingsOpen(false)
                        }
                        // Handle other settings options here
                      }}
                      className={`w-full flex items-center space-x-3 px-4 py-2.5 text-sm transition-all duration-200 font-nunito group ${
                        option.id === 'logout' 
                          ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10 border-t border-gray-700/50 mt-1' 
                          : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                      }`}
                    >
                      <div className={`flex-shrink-0 ${option.id === 'logout' ? 'text-red-400' : 'text-gray-400 group-hover:text-gray-300'}`}>
                        {option.icon}
                      </div>
                      <span className="font-medium">{option.name}</span>
                      
                      {/* Hover indicator */}
                      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Dropdown Footer */}
                <div className="px-4 py-2 border-t border-gray-700/50 bg-gray-800/30">
                  <p className="text-xs text-gray-500 font-nunito">FitTrackPro v1.0.0</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SideNav
