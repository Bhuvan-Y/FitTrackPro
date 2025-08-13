import { useState } from 'preact/hooks'
import { 
  Users, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Scale, 
  TrendingUp, 
  Flame, 
  Activity, 
  UserPlus, 
  Dumbbell, 
  MessageSquare, 
  Ruler 
} from 'lucide-preact'

function Dashboard() {
  const [stats] = useState([
    { title: 'Total Clients', value: '156', change: '+12%', icon: 'Users', color: 'blue' },
    { title: 'Active Today', value: '23', change: '+8%', icon: 'CheckCircle', color: 'green' },
    { title: 'Pending Logs', value: '7', change: '-3%', icon: 'Clock', color: 'yellow' },
    { title: 'Upcoming Sessions', value: '15', change: '+5%', icon: 'Calendar', color: 'purple' },
    { title: 'Recent Weight Logs', value: '34', change: '+18%', icon: 'Scale', color: 'indigo' },
    { title: 'Compliance Rate', value: '86%', change: '+2%', icon: 'TrendingUp', color: 'emerald' },
    { title: 'Calories Burnt', value: '12,450', change: '+15%', icon: 'Flame', color: 'red' },
    { title: 'Weekly Sessions', value: '342', change: '+5%', icon: 'Activity', color: 'orange' }
  ])

  const [clientSummary] = useState([
    { id: 1, name: 'John Doe', workout: 'Chest Day', attendance: 'Present', weight: '75.4kg', status: 'active', lastSession: '2 hours ago' },
    { id: 2, name: 'Jane Smith', workout: 'Back Day', attendance: 'Skipped', weight: '68.2kg', status: 'warning', lastSession: '1 day ago' },
    { id: 3, name: 'Mike Johnson', workout: 'Legs Day', attendance: 'Present', weight: '82.1kg', status: 'active', lastSession: '3 hours ago' },
    { id: 4, name: 'Sarah Wilson', workout: 'Arms Day', attendance: 'Present', weight: '59.8kg', status: 'active', lastSession: '4 hours ago' },
    { id: 5, name: 'David Brown', workout: 'Shoulders', attendance: 'Skipped', weight: '71.3kg', status: 'inactive', lastSession: '3 days ago' }
  ])

  const [recentActivity] = useState([
    { type: 'workout', client: 'John Doe', action: 'completed Chest Day workout', time: '2 hours ago', icon: 'Activity' },
    { type: 'registration', client: 'New Client', action: 'Emma Davis joined the gym', time: '4 hours ago', icon: 'UserPlus' },
    { type: 'progress', client: 'Jane Smith', action: 'updated weight to 68.2kg', time: '6 hours ago', icon: 'TrendingUp' },
    { type: 'booking', client: 'Mike Johnson', action: 'scheduled session for tomorrow', time: '8 hours ago', icon: 'Calendar' },
    { type: 'measurement', client: 'Sarah Wilson', action: 'recorded monthly measurements', time: '1 day ago', icon: 'Ruler' }
  ])

  const [progressAlerts] = useState([
    { type: 'warning', client: 'David Brown', message: 'Missed 3 consecutive sessions', action: 'Contact Client' },
    { type: 'success', client: 'Jane Smith', message: 'Achieved weight loss goal', action: 'Update Plan' },
    { type: 'info', client: 'Mike Johnson', message: 'Injury reported - modified workout needed', action: 'Review Plan' },
    { type: 'warning', client: 'Sarah Wilson', message: 'No progress for 2 weeks', action: 'Schedule Review' }
  ])

  const [todaySessions] = useState([
    { time: '07:30 AM', client: 'John Doe', type: 'Personal Training', status: 'Completed', duration: 1 },
    { time: '09:00 AM', client: 'Jane Smith', type: 'Group Class', status: 'Skipped', duration: 1 },
    { time: '11:00 AM', client: 'Mike Johnson', type: 'Personal Training', status: 'Completed', duration: 2 },
    { time: '11:00 AM', client: 'Mike Johnson', type: 'Personal Training', status: 'Completed', duration: 2 },
    { time: '11:00 AM', client: 'Mike Johnson', type: 'Personal Training', status: 'Completed', duration: 2 },
    { time: '02:00 PM', client: 'Sarah Wilson', type: 'Assessment', status: 'Upcoming', duration: 1 },
    { time: '04:00 PM', client: 'David Brown', type: 'Personal Training', status: 'Upcoming', duration: 1 }
  ])

  const [quickActions] = useState([
    { title: 'Add New Client', icon: 'UserPlus', action: 'add-client', color: 'blue' },
    { title: 'Assign Workout', icon: 'Dumbbell', action: 'assign-workout', color: 'green' },
    { title: 'Schedule Session', icon: 'Calendar', action: 'schedule-session', color: 'purple' },
    { title: 'Record Progress', icon: 'TrendingUp', action: 'record-progress', color: 'orange' },
    { title: 'Send Message', icon: 'MessageSquare', action: 'send-message', color: 'indigo' }
  ])

  const [notifications] = useState([
    { type: 'new-client', message: 'Emma Davis joined the gym', time: '4 hours ago', priority: 'high' },
    { type: 'workout-due', message: '3 workout plans due for review', time: '6 hours ago', priority: 'medium' },
    { type: 'measurement', message: '5 clients need weight entries', time: '1 day ago', priority: 'medium' },
    { type: 'session', message: 'Tomorrow: 8 sessions scheduled', time: '1 day ago', priority: 'low' }
  ])
  const [alertFilter, setAlertFilter] = useState('all')

  // Carousel state for per-client compliance slides
  const [clientSlide, setClientSlide] = useState(0)

  const [performanceInsights] = useState([
    { metric: 'Average Progress', value: '+2.3kg', trend: 'up', description: 'Weight gain across clients' },
    { metric: 'Most Skipped', value: 'Legs Day', trend: 'down', description: '15% skip rate' },
    { metric: 'Active Ratio', value: '78%', trend: 'up', description: 'Active vs Inactive clients' },
    { metric: 'Top Performer', value: 'John Doe', trend: 'up', description: '+8.5kg in 3 months' }
  ])

  // Calendar data
  const [currentMonth] = useState('December 2024')
  const [calendarEvents] = useState([
    { date: 15, type: 'session', client: 'John Doe', time: '09:00 AM', color: 'blue' },
    { date: 16, type: 'assessment', client: 'Jane Smith', time: '02:00 PM', color: 'green' },
    { date: 18, type: 'session', client: 'Mike Johnson', time: '11:00 AM', color: 'blue' },
    { date: 20, type: 'measurement', client: 'Sarah Wilson', time: '10:00 AM', color: 'purple' },
    { date: 22, type: 'session', client: 'David Brown', time: '04:00 PM', color: 'blue' },
    { date: 25, type: 'review', client: 'Emma Davis', time: '03:00 PM', color: 'orange' },
    { date: 28, type: 'session', client: 'John Doe', time: '09:00 AM', color: 'blue' },
    { date: 30, type: 'assessment', client: 'Mike Johnson', time: '01:00 PM', color: 'green' }
  ])

  // Generate calendar days (simplified for preview)
  const generateCalendarDays = () => {
    const days = []
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    // Add weekday headers
    weekdays.forEach(day => {
      days.push({ type: 'header', label: day })
    })

    // Add empty days for padding (assuming month starts on a Sunday)
    for (let i = 0; i < 1; i++) {
      days.push({ type: 'empty' })
    }

    // Add calendar days
    for (let day = 1; day <= 31; day++) {
      const event = calendarEvents.find(e => e.date === day)
      days.push({
        type: 'day',
        number: day,
        event: event,
        isToday: day === 15 // Current day
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Icon components
  const Icon = ({ name, className = "w-5 h-5" }) => {
    const icons = {
      Users: <Users className={className} />,
      CheckCircle: <CheckCircle className={className} />,
      Clock: <Clock className={className} />,
      Calendar: <Calendar className={className} />,
      Scale: <Scale className={className} />,
      TrendingUp: <TrendingUp className={className} />,
      Flame: <Flame className={className} />,
      Activity: <Activity className={className} />,
      UserPlus: <UserPlus className={className} />,
      Dumbbell: <Dumbbell className={className} />,
      MessageSquare: <MessageSquare className={className} />,
      Ruler: <Ruler className={className} />
    }
    return icons[name] || null
  }

  return (
    
    <div className="h-[calc(100vh-4rem)] rounded-t-3xl bg-yellow-400 overflow-hidden">
      {/* Scrollable Content Wrapper */}
      <div className="h-full overflow-y-auto px-4 md:px-6 no-scrollbar">
        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-3 auto-rows-min">

        {/* Header - Full Width */}
        <div className="col-span-12 mt-4 md:mt-6">
          <div className="bg-black rounded-2xl shadow-2xl border border-gray-800 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/10"></div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block relative z-10">
              <div className="px-10 py-5">
                <div className="flex items-center justify-between">
                  {/* Left Section - Brand & Content */}
                  <div className="flex items-center space-x-4">
                    {/* Logo Container */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl flex items-center justify-center shadow-2xl border border-yellow-300/40 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-yellow-400/20 rounded-3xl blur-xl -z-10"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <h1 className="text-5xl font-bold text-white font-kodchasan tracking-tight">Dashboard</h1>
                        <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs font-medium text-green-400 font-nunito">Live</span>
                        </div>
                      </div>
                      <p className="text-gray-300 font-nunito text-mt leading-relaxed max-w-lg">
                        Welcome back, Sarah! Here's your comprehensive fitness business overview for today.
                      </p>
                    </div>
                  </div>

                  {/* Right Section - Status */}
                  <div className="flex flex-col items-start space-y-4">
                    {/* Time Display */}
                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <p className="text-sm text-gray-400 font-nunito font-medium">Last updated</p>
                      </div>
                      <p className="text-2xl font-bold text-white font-kodchasan">Today, 8:47 PM</p>
                    </div>

                    {/* Quick Stats Badge */}
                    <div className="flex items-center space-x-3">
                      <button className="group relative bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/30 hover:to-yellow-600/30 rounded-xl p-3 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-yellow-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-3 h-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-yellow-400 font-nunito">New Client</span>
                        </div>
                        <div className="absolute inset-0 bg-yellow-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>

                      <button className="group relative bg-gradient-to-r from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 rounded-xl p-3 border border-gray-500/30 hover:border-gray-400/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <span className="text-xs font-semibold text-gray-400 font-nunito">Schedule</span>
                        </div>
                        <div className="absolute inset-0 bg-gray-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Header */}
            <div className="lg:hidden relative z-10">
              <div className="p-6">
                {/* Top Section - Logo & Status */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    {/* Mobile Logo */}
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-xl border border-yellow-300/40">
                        <svg className="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="absolute inset-0 bg-yellow-400/20 rounded-2xl blur-lg -z-10"></div>
                    </div>

                    <div className="space-y-1">
                      <h1 className="text-2xl font-bold text-white font-kodchasan">Dashboard</h1>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs text-green-400 font-nunito font-medium">Live</span>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Time */}
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white font-kodchasan">8:47 PM</p>
                    <p className="text-xs text-gray-500 font-nunito">Today</p>
                  </div>
                </div>

                {/* Middle Section - Welcome Message */}
                <div className="mb-5">
                  <p className="text-gray-300 font-nunito text-base leading-relaxed">
                    Welcome back, Sarah! Here's your comprehensive fitness business overview for today.
                  </p>
                </div>

                {/* Bottom Section - Quick Stats */}
                <div className="flex items-center space-x-1">
                  <button className="group relative flex-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/30 hover:to-yellow-600/30 rounded-xl p-3 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-yellow-400 font-kodchasan">New Client</p>
                        <p className="text-xs text-yellow-400/70 font-nunito">Add client</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-yellow-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>

                  <button className="group relative flex-1 bg-gradient-to-r from-gray-500/20 to-gray-600/20 hover:from-gray-500/30 hover:to-gray-600/30 rounded-xl p-3 border border-gray-500/30 hover:border-gray-400/50 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-semibold text-gray-400 font-kodchasan">Schedule</p>
                        <p className="text-xs text-gray-400/70 font-nunito">Book session</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gray-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Gradient Border */}
            <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Key Metrics - Row 1 */}
        <div className="col-span-12">
          {/* Desktop Key Metrics */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-8 gap-2 md:gap-3 relative bg-gradient-to-br from-white/5 via-white/3 to-transparent backdrop-blur-xl rounded-3xl p-3 border border-white/10 shadow-2xl">
              {stats.map((stat, index) => (
                <div key={index} className="group relative bg-black rounded-2xl p-5 shadow-2xl border border-gray-800 hover:shadow-3xl transition-all duration-500 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color === 'blue' ? 'from-blue-400/20 via-transparent to-blue-400/10' :
                      stat.color === 'green' ? 'from-green-400/20 via-transparent to-green-400/10' :
                        stat.color === 'yellow' ? 'from-yellow-400/20 via-transparent to-yellow-400/10' :
                          stat.color === 'purple' ? 'from-purple-400/20 via-transparent to-purple-400/10' :
                            stat.color === 'indigo' ? 'from-indigo-400/20 via-transparent to-indigo-400/10' :
                              stat.color === 'emerald' ? 'from-emerald-400/20 via-transparent to-emerald-400/10' :
                                stat.color === 'red' ? 'from-red-400/20 via-transparent to-red-400/10' :
                                  'from-orange-400/20 via-transparent to-orange-400/10'
                      }`}></div>
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-500/20 border border-blue-500/30' :
                        stat.color === 'green' ? 'bg-green-500/20 border border-green-500/30' :
                          stat.color === 'yellow' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                            stat.color === 'purple' ? 'bg-purple-500/20 border border-purple-500/30' :
                              stat.color === 'indigo' ? 'bg-indigo-500/20 border border-indigo-500/30' :
                                stat.color === 'emerald' ? 'bg-emerald-500/20 border border-emerald-500/30' :
                                  stat.color === 'red' ? 'bg-red-500/20 border border-red-500/30' :
                                    'bg-orange-500/20 border border-orange-500/30'
                        }`}>
                        <Icon name={stat.icon} className={`w-5 h-5 ${stat.color === 'blue' ? 'text-blue-400' :
                          stat.color === 'green' ? 'text-green-400' :
                            stat.color === 'yellow' ? 'text-yellow-400' :
                              stat.color === 'purple' ? 'text-purple-400' :
                                stat.color === 'indigo' ? 'text-indigo-400' :
                                  stat.color === 'emerald' ? 'text-emerald-400' :
                                    stat.color === 'red' ? 'text-red-400' :
                                      'text-orange-400'
                          }`} />
                      </div>
                      <div className={`w-2 h-2 rounded-full ${stat.color === 'blue' ? 'bg-blue-500' :
                        stat.color === 'green' ? 'bg-green-500' :
                          stat.color === 'yellow' ? 'bg-yellow-500' :
                            stat.color === 'purple' ? 'bg-purple-500' :
                              stat.color === 'indigo' ? 'bg-indigo-500' :
                                stat.color === 'emerald' ? 'bg-emerald-500' :
                                  stat.color === 'red' ? 'bg-red-500' :
                                    'bg-orange-500'
                        }`}></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-2">
                      <h3 className="text-xs font-medium text-gray-400 font-nunito tracking-wide uppercase">
                        {stat.title}
                      </h3>
                      <p className="text-2xl font-bold text-white font-kodchasan tracking-tight">
                        {stat.value}
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Key Metrics */}
          <div className="lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              {stats.slice(0, 4).map((stat, index) => (
                <div key={index} className="group relative bg-black rounded-xl p-4 shadow-xl border border-gray-800 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color === 'blue' ? 'from-blue-400/20 via-transparent to-blue-400/10' :
                      stat.color === 'green' ? 'from-green-400/20 via-transparent to-green-400/10' :
                        stat.color === 'yellow' ? 'from-yellow-400/20 via-transparent to-yellow-400/10' :
                          stat.color === 'purple' ? 'from-purple-400/20 via-transparent to-purple-400/10' :
                            stat.color === 'indigo' ? 'from-indigo-400/20 via-transparent to-indigo-400/10' :
                              stat.color === 'emerald' ? 'from-emerald-400/20 via-transparent to-emerald-400/10' :
                                stat.color === 'red' ? 'from-red-400/20 via-transparent to-red-400/10' :
                                  'from-orange-400/20 via-transparent to-orange-400/10'
                      }`}></div>
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-500/20 border border-blue-500/30' :
                        stat.color === 'green' ? 'bg-green-500/20 border border-green-500/30' :
                          stat.color === 'yellow' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                            stat.color === 'purple' ? 'bg-purple-500/20 border border-purple-500/30' :
                              stat.color === 'indigo' ? 'bg-indigo-500/20 border border-indigo-500/30' :
                                stat.color === 'emerald' ? 'bg-emerald-500/20 border border-emerald-500/30' :
                                  stat.color === 'red' ? 'bg-red-500/20 border border-red-500/30' :
                                    'bg-orange-500/20 border border-orange-500/30'
                        }`}>
                        <Icon name={stat.icon} className={`w-4 h-4 ${stat.color === 'blue' ? 'text-blue-400' :
                          stat.color === 'green' ? 'text-green-400' :
                            stat.color === 'yellow' ? 'text-yellow-400' :
                              stat.color === 'purple' ? 'text-purple-400' :
                                stat.color === 'indigo' ? 'text-indigo-400' :
                                  stat.color === 'emerald' ? 'text-emerald-400' :
                                    stat.color === 'red' ? 'text-red-400' :
                                      'text-orange-400'
                          }`} />
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${stat.color === 'blue' ? 'bg-blue-500' :
                        stat.color === 'green' ? 'bg-green-500' :
                          stat.color === 'yellow' ? 'bg-yellow-500' :
                            stat.color === 'purple' ? 'bg-purple-500' :
                              stat.color === 'indigo' ? 'bg-indigo-500' :
                                stat.color === 'emerald' ? 'bg-emerald-500' :
                                  stat.color === 'red' ? 'bg-red-500' :
                                    'bg-orange-500'
                        }`}></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <h3 className="text-xs font-medium text-gray-400 font-nunito tracking-wide uppercase">
                        {stat.title}
                      </h3>
                      <p className="text-lg font-bold text-white font-kodchasan tracking-tight">
                        {stat.value}
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Mobile Secondary Metrics */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {stats.slice(4, 8).map((stat, index) => (
                <div key={index} className="group relative bg-black rounded-xl p-4 shadow-xl border border-gray-800 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color === 'blue' ? 'from-blue-400/20 via-transparent to-blue-400/10' :
                      stat.color === 'green' ? 'from-green-400/20 via-transparent to-green-400/10' :
                        stat.color === 'yellow' ? 'from-yellow-400/20 via-transparent to-yellow-400/10' :
                          stat.color === 'purple' ? 'from-purple-400/20 via-transparent to-purple-400/10' :
                            stat.color === 'indigo' ? 'from-indigo-400/20 via-transparent to-indigo-400/10' :
                              stat.color === 'emerald' ? 'from-emerald-400/20 via-transparent to-emerald-400/10' :
                                stat.color === 'red' ? 'from-red-400/20 via-transparent to-red-400/10' :
                                  'from-orange-400/20 via-transparent to-orange-400/10'
                      }`}></div>
                  </div>

                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color === 'blue' ? 'bg-blue-500/20 border border-blue-500/30' :
                        stat.color === 'green' ? 'bg-green-500/20 border border-green-500/30' :
                          stat.color === 'yellow' ? 'bg-yellow-500/20 border border-yellow-500/30' :
                            stat.color === 'purple' ? 'bg-purple-500/20 border border-purple-500/30' :
                              stat.color === 'indigo' ? 'bg-indigo-500/20 border border-indigo-500/30' :
                                stat.color === 'emerald' ? 'bg-emerald-500/20 border border-emerald-500/30' :
                                  stat.color === 'red' ? 'bg-red-500/20 border border-red-500/30' :
                                    'bg-orange-500/20 border border-orange-500/30'
                        }`}>
                        <Icon name={stat.icon} className={`w-4 h-4 ${stat.color === 'blue' ? 'text-blue-400' :
                          stat.color === 'green' ? 'text-green-400' :
                            stat.color === 'yellow' ? 'text-yellow-400' :
                              stat.color === 'purple' ? 'text-purple-400' :
                                stat.color === 'indigo' ? 'text-indigo-400' :
                                  stat.color === 'emerald' ? 'text-emerald-400' :
                                    stat.color === 'red' ? 'text-red-400' :
                                      'text-orange-400'
                          }`} />
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${stat.color === 'blue' ? 'bg-blue-500' :
                        stat.color === 'green' ? 'bg-green-500' :
                          stat.color === 'yellow' ? 'bg-yellow-500' :
                            stat.color === 'purple' ? 'bg-purple-500' :
                              stat.color === 'indigo' ? 'bg-indigo-500' :
                                stat.color === 'emerald' ? 'bg-emerald-500' :
                                  stat.color === 'red' ? 'bg-red-500' :
                                    'bg-orange-500'
                        }`}></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <h3 className="text-xs font-medium text-gray-400 font-nunito tracking-wide uppercase">
                        {stat.title}
                      </h3>
                      <p className="text-lg font-bold text-white font-kodchasan tracking-tight">
                        {stat.value}
                      </p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Grid Layout (Overview-like) */}
        <div className="col-span-12 mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
            {/* Left Column */}
            <div className="w-full lg:col-span-8 space-y-4">

              {/* Weekly Progress Overview */}
              <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white font-kodchasan">Weekly Progress Overview</h2>
                  <div className="hidden md:flex items-center gap-2">
                    <button className="px-3 py-1.5 text-xs bg-white/5 text-gray-300 rounded-lg font-nunito border border-white/10 hover:bg-white/10 transition">This Week</button>
                    <button className="px-3 py-1.5 text-xs bg-white/0 text-gray-400 rounded-lg font-nunito border border-white/10 hover:bg-white/5 transition">Last Week</button>
                  </div>
                </div>

                {(() => {
                  const weekData = [
                    { day: 'Mon', scheduled: 8, completed: 6 },
                    { day: 'Tue', scheduled: 7, completed: 5 },
                    { day: 'Wed', scheduled: 9, completed: 7 },
                    { day: 'Thu', scheduled: 6, completed: 5 },
                    { day: 'Fri', scheduled: 8, completed: 7 },
                    { day: 'Sat', scheduled: 5, completed: 4 },
                    { day: 'Sun', scheduled: 4, completed: 3 }
                  ]
                  const totals = weekData.reduce(
                    (acc, d) => {
                      acc.scheduled += d.scheduled
                      acc.completed += d.completed
                      return acc
                    },
                    { scheduled: 0, completed: 0 }
                  )
                  const missed = Math.max(totals.scheduled - totals.completed, 0)
                  const completionRate = totals.scheduled > 0 ? Math.round((totals.completed / totals.scheduled) * 100) : 0

                  return (
                    <div className="space-y-6">
                      {/* KPIs */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="rounded-2xl p-3 shadow-xl border border-white/20 overflow-hidden relative bg-white/5 backdrop-blur-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-400 font-nunito">Completion</p>
                              <p className="text-2xl font-bold text-white font-kodchasan">{completionRate}%</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                              <Icon name="TrendingUp" className="w-5 h-5 text-blue-400" />
                            </div>
                          </div>
                        </div>
                        <div className="rounded-2xl p-3 shadow-xl border border-white/20 overflow-hidden relative bg-white/5 backdrop-blur-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-400 font-nunito">Sessions</p>
                              <p className="text-2xl font-bold text-white font-kodchasan">{totals.completed}/{totals.scheduled}</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                              <Icon name="CheckCircle" className="w-5 h-5 text-green-400" />
                            </div>
                          </div>
                        </div>
                        <div className="rounded-2xl p-3 shadow-xl border border-white/20 overflow-hidden relative bg-white/5 backdrop-blur-xl">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-xs text-gray-400 font-nunito">Missed</p>
                              <p className="text-2xl font-bold text-white font-kodchasan">{missed}</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                              <Icon name="Clock" className="w-5 h-5 text-red-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Chart */}
                      <div className="rounded-2xl p-3 shadow-xl border border-white/20 overflow-hidden relative bg-white/5 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-10">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                              <span className="text-xs text-gray-400">Completed</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-black"></span>
                              <span className="text-xs text-gray-400">Missed</span>
                            </div>
                          </div>
                          {(() => {
                            const today = new Date()
                            const day = (today.getDay() + 6) % 7 // Monday=0
                            const start = new Date(today)
                            start.setDate(today.getDate() - day)
                            start.setHours(0, 0, 0, 0)
                            const end = new Date(start)
                            end.setDate(start.getDate() + 6)
                            const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                            return (
                              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
                                <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{fmt(start)} - {fmt(end)}</span>
                              </div>
                            )
                          })()}
                        </div>

                        <div className="relative">
                          {/* Grid lines */}
                          {[25, 50, 75, 100].map((pct) => (
                            <div key={pct} className="absolute left-0 right-0" style={{ top: `${100 - pct}%`, height: 1 }}>
                            </div>
                          ))}

                          {/* Bars */}
                          <div className="relative h-56 flex items-end justify-between gap-2">
                            {weekData.map((d) => {
                              const total = d.scheduled || 0
                              const completedPct = total > 0 ? Math.round((d.completed / total) * 100) : 0
                              const missedPct = Math.max(100 - completedPct, 0)
                              return (
                                <div key={d.day} className="flex flex-col items-center gap-2 flex-1 group">
                                  <div className="w-full bg-white/5 rounded-lg relative h-48 border border-white/10 overflow-hidden">
                                    {/* Missed segment (bottom) */}
                                    <div
                                      className="absolute bottom-0 left-0 right-0 bg-black/70"
                                      style={{ height: `${missedPct}%` }}
                                      title={`${d.day}: Missed ${Math.max(total - d.completed, 0)} of ${total}`}
                                    ></div>
                                    {/* Completed segment (top of missed) */}
                                    <div
                                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-500 to-yellow-400 group-hover:from-yellow-400 group-hover:to-yellow-300 transition-all"
                                      style={{ height: `${completedPct}%` }}
                                      title={`${d.day}: Completed ${d.completed} of ${total}`}
                                    ></div>
                                    {/* Hover outline */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity border-2 border-yellow-400/30 rounded-lg pointer-events-none"></div>
                                  </div>
                                  {/* Label */}
                                  <div className="text-[11px] text-gray-300 font-nunito bg-white/5 border border-white/10 rounded px-2 py-0.5">
                                    {d.completed}/{total}
                                  </div>
                                  <div className="text-xs text-gray-400">{d.day}</div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions moved below chart */}
                      <div className="rounded-2xl p-3 shadow-xl border border-white/20 overflow-hidden relative bg-white/5 backdrop-blur-xl">
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/10"></div>
                        </div>
                        <div className="relative z-10">
                          <div className="hidden lg:grid lg:grid-cols-5 gap-4">
                            {quickActions.map((action, index) => (
                              <button key={index} className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 overflow-hidden">
                                <div className="absolute inset-0 bg-black group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 flex flex-col items-center space-y-2">
                                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-300 group-hover:scale-110`}>
                                    <Icon name={action.icon} className={`w-8 h-8 text-yellow-400`} />
                                  </div>
                                  <div className="text-center space-y-1">
                                    <span className="font-semibold text-white font-kodchasan text-sm block">{action.title}</span>
                                    <div className={`w-1 h-1 rounded-full mx-auto bg-yellow-400`}></div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Mobile Stack Layout */}
                          <div className="lg:hidden space-y-4">
                            {quickActions.map((action, index) => (
                              <button key={index} className="group relative w-full bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-800/80 transition-all duration-300 border border-gray-700/50 hover:border-gray-600/50 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="relative z-10 flex items-center space-x-4">
                                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-md border bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-300 group-hover:scale-105`}>
                                    <Icon name={action.icon} className={`w-6 h-6 text-yellow-400`} />
                                  </div>
                                  <div className="flex-1">
                                    <span className="font-semibold text-white font-kodchasan text-base block">{action.title}</span>
                                    <div className={`w-2 h-0.5 rounded-full mt-1 bg-yellow-400`}></div>
                                  </div>
                                  <div className="w-6 h-6 rounded-lg bg-gray-800/50 flex items-center justify-center group-hover:bg-gray-700/50 transition-colors duration-300">
                                    <svg className="w-3 h-3 text-gray-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>

              {/* Today's Sessions */}
              <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white font-kodchasan">Today's Sessions</h2>
                  <span className="hidden md:inline-flex items-center gap-2 text-xs text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    {todaySessions.length} total
                  </span>
                </div>

                {/* Hide scrollbar utility (scoped) */}
                <style>{`
                  .no-scrollbar::-webkit-scrollbar { display: none; }
                  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>

                {/* Desktop matrix view: time columns, client rows */}
                <div className="hidden md:block h-65 overflow-x-auto overflow-y-auto no-scrollbar rounded-lg border border-white/10 bg-gray-900/40" style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                  `,
                  backgroundSize: '80px 56px'
                }}>
                  {(() => {
                    const startHour = 6; const endHour = 22;
                    const to24h = (t) => {
                      const [hm, ampm] = t.split(' ');
                      let [h, m] = hm.split(':').map(Number);
                      if (ampm === 'PM' && h !== 12) h += 12;
                      if (ampm === 'AM' && h === 12) h = 0;
                      return { h, m };
                    };
                    const getInitials = (n) => (n || 'U').split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();

                    const now = new Date();
                    const currentHour = now.getHours();
                    // Build time columns
                    const timeSlots = [];
                    for (let hour = startHour; hour <= endHour; hour++) {
                      const labelDate = new Date(); labelDate.setHours(hour, 0, 0, 0);
                      const label = labelDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
                      timeSlots.push({ hour, label });
                    }
                    // Unique clients
                    const clientNames = Array.from(new Set(todaySessions.map(s => s.client)));
                    const gridTemplate = `200px repeat(${timeSlots.length}, minmax(80px, 1fr))`;
                    return (
                      <div className="relative min-w-[1100px]" style={{ contain: 'layout' }}>
                        {/* Grid overlay pattern */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                          backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                          `,
                          backgroundSize: '80px 56px'
                        }}></div>
                        <div className="grid auto-rows-[56px]" style={{ gridTemplateColumns: gridTemplate }}>
                          {/* Header row */}
                          <div className="sticky top-0 left-0 z-30 bg-yellow-400 backdrop-blur-sm border-b border-r border-white/25 flex items-center px-3 text-xs font-semibold text-black rounded-tl-lg">
                            Client
                          </div>
                          {timeSlots.map((slot) => (
                            <div key={`h-${slot.hour}`} className={`sticky shadow-xl top-0 z-10 bg-white/5 backdrop-blur-xl border-b border-r border-white/15 flex items-center justify-center text-[11px] text-gray-400 relative ${slot.hour === currentHour ? 'bg-white/[0.06]' : ''}`}>
                              {/* shadow-xl border border-white/20 overflow-hidden relative bg-white/5 backdrop-blur-xl */}
                              {slot.label}
                              {slot.hour === currentHour && (
                                <span className="absolute top-11 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-yellow-500 text-black text-[10px] font-semibold border border-yellow-400/50">Now</span>
                              )}
                            </div>
                          ))}

                          {/* Rows */}
                          {clientNames.length === 0 && (
                            <div className="col-span-full flex items-center justify-center h-40 text-sm text-gray-400">No sessions scheduled for today</div>
                          )}

                          {clientNames.map((client, rowIdx) => (
                            <>
                              {/* Left sticky client cell */}
                              <div key={`c-${client}`} className={`sticky left-0 z-20 bg-gray-900/60 backdrop-blur-sm border-b border-r border-white/15 flex items-center gap-3 px-3 ${rowIdx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.01]'} `}>
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 flex items-center justify-center text-[11px] text-yellow-300 font-semibold shadow-sm">
                                  {getInitials(client)}
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm text-white font-nunito truncate max-w-[160px]">{client}</div>
                                  <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[11px] text-gray-400">Today</span>
                                    {(() => {
                                      const nextSession = todaySessions
                                        .filter(s => s.client === client)
                                        .sort((a, b) => (to24h(a.time).h * 60 + to24h(a.time).m) - (to24h(b.time).h * 60 + to24h(b.time).m))[0]
                                      return nextSession ? (
                                        <span className="px-2 py-0.5 text-[10px] rounded-md bg-white/5 border border-white/10 text-gray-300">Next {nextSession.time}</span>
                                      ) : null
                                    })()}
                                  </div>
                                </div>
                              </div>
                              {/* Time cells */}
                              {timeSlots.map((slot) => {
                                // helpers to parse and cover ranges
                                const clean = (x) => String(x || '').trim();
                                const as24 = (str) => {
                                  if (!str) return { h: 0, m: 0 };
                                  const parts = String(str).trim();
                                  const ampmMatch = parts.match(/am|pm|AM|PM/);
                                  let ampm = ampmMatch ? ampmMatch[0].toUpperCase() : '';
                                  const hm = parts.replace(/\s?(AM|PM|am|pm)/, '');
                                  let [hStr, mStr] = hm.split(':');
                                  let h = parseInt(hStr || '0', 10);
                                  let m = parseInt(mStr || '0', 10);
                                  if (ampm) {
                                    if (ampm === 'PM' && h !== 12) h += 12;
                                    if (ampm === 'AM' && h === 12) h = 0;
                                  }
                                  return { h, m };
                                };
                                const fmtTime = (h, m = 0) => new Date(0, 0, 0, h, m).toLocaleTimeString('en-US', { hour: 'numeric', minute: m ? '2-digit' : 'numeric', hour12: true });
                                const parseRange = (s) => {
                                  let startH = 0, startM = 0, endH = 0, endM = 0, label = '';
                                  if (s.endTime) {
                                    const st = as24(s.time); const en = as24(s.endTime);
                                    startH = st.h; startM = st.m; endH = en.h; endM = en.m; label = `${clean(s.time)} – ${clean(s.endTime)}`;
                                  } else if (s.timeRange) {
                                    const parts = s.timeRange.split(/to|-/i).map(clean);
                                    const st = as24(parts[0]); const en = as24(parts[1]);
                                    startH = st.h; startM = st.m; endH = en.h; endM = en.m; label = `${fmtTime(st.h, st.m)} – ${fmtTime(en.h, en.m)}`;
                                  } else if (s.time && /(to|-)/i.test(s.time)) {
                                    const [a, b] = s.time.split(/to|-/i).map(clean);
                                    const st = as24(a); const en = as24(b);
                                    startH = st.h; startM = st.m; endH = en.h; endM = en.m; label = `${a} – ${b}`;
                                                                     } else if (typeof s.duration === 'number') {
                                     const st = as24(s.time);
                                     startH = st.h; startM = st.m; endH = st.h + s.duration; endM = 0; label = `${fmtTime(st.h)} – ${fmtTime(endH)}`;
                                   } else {
                                    const st = as24(s.time);
                                    startH = st.h; startM = st.m; endH = st.h; endM = 59; label = `${fmtTime(st.h, st.m)}`;
                                  }
                                  return { startH, startM, endH, endM, label };
                                };


                                const clientSessions = todaySessions.filter(s => s.client === client);
                                // coverage: if any session covers this hour based on duration
                                const covering = clientSessions.find(s => {
                                  const { startH, endH } = parseRange(s);
                                  return slot.hour >= startH && slot.hour < endH; // exclusive of end hour for proper spanning
                                });
                                const starting = clientSessions.find(s => {
                                  const { startH } = parseRange(s);
                                  return startH === slot.hour;
                                });

                                return (
                                  <div key={`cell-${client}-${slot.hour}`} className={`border-b border-r border-white/15 hover:bg-white/[0.05] transition-colors duration-200 ${slot.hour === currentHour ? 'bg-yellow-500/10 border-l-2 border-yellow-500/50' : ''} ${rowIdx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.01]'}`}>
                                    {starting ? (
                                      <div
                                        className={`h-full w-full ${starting.status === 'Completed' ? 'bg-green-500/30' : starting.status === 'Skipped' ? 'bg-red-500/30' : 'bg-blue-500/30'} relative group cursor-pointer`}
                                        title={`${starting.type} • ${starting.status} • ${starting.duration}h`}
                                      >
                                        <div className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                          {starting.type}
                                        </div>
                                      </div>
                                    ) : covering ? (
                                      <div className={`h-full w-full ${covering.status === 'Completed' ? 'bg-green-500/30' : covering.status === 'Skipped' ? 'bg-red-500/30' : 'bg-blue-500/30'} relative`}>
                                      </div>
                                    ) : (
                                      <div className="h-full" />
                                    )}
                                  </div>
                                );
                              })}
                            </>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Mobile matrix view: same as desktop but responsive */}
                <div className="md:hidden h-80 overflow-x-auto overflow-y-auto no-scrollbar rounded-lg border border-white/10 bg-gray-900/40" style={{
                  backgroundImage: `
                    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                  `,
                  backgroundSize: '60px 48px'
                }}>
                  {(() => {
                    const startHour = 6; const endHour = 22;
                    const to24h = (t) => {
                      const [hm, ampm] = t.split(' ');
                      let [h, m] = hm.split(':').map(Number);
                      if (ampm === 'PM' && h !== 12) h += 12;
                      if (ampm === 'AM' && h === 12) h = 0;
                      return { h, m };
                    };
                    const getInitials = (n) => (n || 'U').split(' ').map(x => x[0]).join('').slice(0, 2).toUpperCase();

                    const now = new Date();
                    const currentHour = now.getHours();
                    // Build time columns (all hours in sequence)
                    const timeSlots = [];
                    for (let hour = startHour; hour <= endHour; hour++) {
                      const labelDate = new Date(); labelDate.setHours(hour, 0, 0, 0);
                      const label = labelDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
                      timeSlots.push({ hour, label });
                    }
                    // Unique clients
                    const clientNames = Array.from(new Set(todaySessions.map(s => s.client)));
                    const gridTemplate = `100px repeat(${timeSlots.length}, minmax(60px, 1fr))`;
                    return (
                      <div className="relative min-w-[800px]" style={{ contain: 'layout' }}>
                        {/* Grid overlay pattern */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                          backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                          `,
                          backgroundSize: '60px 48px'
                        }}></div>
                        <div className="grid auto-rows-[48px]" style={{ gridTemplateColumns: gridTemplate }}>
                          {/* Header row */}
                          <div className="sticky top-0 left-0 z-30 bg-yellow-400 backdrop-blur-sm border-b border-r border-white/25 flex items-center px-2 text-xs font-semibold text-black rounded-tl-lg">
                            Client
                      </div>
                          {timeSlots.map((slot) => (
                            <div key={`h-${slot.hour}`} className={`sticky shadow-xl top-0 z-10 bg-white/5 backdrop-blur-xl border-b border-r border-white/15 flex items-center justify-center text-[10px] text-gray-400 relative ${slot.hour === currentHour ? 'bg-white/[0.06]' : ''}`}>
                              {slot.label}
                              {slot.hour === currentHour && (
                                <span className="absolute top-10 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-yellow-500 text-black text-[9px] font-semibold border border-yellow-400/50">Now</span>
                    )}
                        </div>
                          ))}

                          {/* Rows */}
                          {clientNames.length === 0 && (
                            <div className="col-span-full flex items-center justify-center h-48 text-sm text-gray-400">No sessions scheduled for today</div>
                          )}

                          {clientNames.map((client, rowIdx) => (
                            <>
                              {/* Left sticky client cell */}
                              <div key={`c-${client}`} className={`sticky left-0 z-20 bg-gray-900/60 backdrop-blur-sm border-b border-r border-white/15 flex items-center px-2 ${rowIdx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.01]'} `}>
                                <div className="text-sm text-white font-nunito truncate max-w-[80px]">{client}</div>
                          </div>
                              {/* Time cells */}
                              {timeSlots.map((slot) => {
                                // helpers to parse and cover ranges
                                const clean = (x) => String(x || '').trim();
                                const as24 = (str) => {
                                  if (!str) return { h: 0, m: 0 };
                                  const parts = String(str).trim();
                                  const ampmMatch = parts.match(/am|pm|AM|PM/);
                                  let ampm = ampmMatch ? ampmMatch[0].toUpperCase() : '';
                                  const hm = parts.replace(/\s?(AM|PM|am|pm)/, '');
                                  let [hStr, mStr] = hm.split(':');
                                  let h = parseInt(hStr || '0', 10);
                                  let m = parseInt(mStr || '0', 10);
                                  if (ampm) {
                                    if (ampm === 'PM' && h !== 12) h += 12;
                                    if (ampm === 'AM' && h === 12) h = 0;
                                  }
                                  return { h, m };
                                };
                                const fmtTime = (h, m = 0) => new Date(0, 0, 0, h, m).toLocaleTimeString('en-US', { hour: 'numeric', minute: m ? '2-digit' : 'numeric', hour12: true });
                                const parseRange = (s) => {
                                  let startH = 0, startM = 0, endH = 0, endM = 0, label = '';
                                  if (s.endTime) {
                                    const st = as24(s.time); const en = as24(s.endTime);
                                    startH = st.h; startM = st.m; endH = en.h; endM = en.m; label = `${clean(s.time)} – ${clean(s.endTime)}`;
                                  } else if (s.timeRange) {
                                    const parts = s.timeRange.split(/to|-/i).map(clean);
                                    const st = as24(parts[0]); const en = as24(parts[1]);
                                    startH = st.h; startM = st.m; endH = en.h; endM = en.m; label = `${fmtTime(st.h, st.m)} – ${fmtTime(en.h, en.m)}`;
                                  } else if (s.time && /(to|-)/i.test(s.time)) {
                                    const [a, b] = s.time.split(/to|-/i).map(clean);
                                    const st = as24(a); const en = as24(b);
                                    startH = st.h; startM = st.m; endH = en.h; endM = en.m; label = `${a} – ${b}`;
                                  } else if (typeof s.duration === 'number') {
                                    const st = as24(s.time);
                                    startH = st.h; startM = st.m; endH = st.h + s.duration; endM = 0; label = `${fmtTime(st.h)} – ${fmtTime(endH)}`;
                                  } else {
                                    const st = as24(s.time);
                                    startH = st.h; startM = st.m; endH = st.h; endM = 59; label = `${fmtTime(st.h, st.m)}`;
                                  }
                                  return { startH, startM, endH, endM, label };
                                };

                                const clientSessions = todaySessions.filter(s => s.client === client);
                                // coverage: if any session covers this hour based on duration
                                const covering = clientSessions.find(s => {
                                  const { startH, endH } = parseRange(s);
                                  return slot.hour >= startH && slot.hour < endH; // exclusive of end hour for proper spanning
                                });
                                const starting = clientSessions.find(s => {
                                  const { startH } = parseRange(s);
                                  return startH === slot.hour;
                                });

                                return (
                                  <div key={`cell-${client}-${slot.hour}`} className={`border-b border-r border-white/15 hover:bg-white/[0.05] transition-colors duration-200 ${slot.hour === currentHour ? 'bg-yellow-500/10 border-l-2 border-yellow-500/50' : ''} ${rowIdx % 2 === 0 ? 'bg-white/[0.02]' : 'bg-white/[0.01]'}`}>
                                    {starting ? (
                                      <div
                                        className={`h-full w-full ${starting.status === 'Completed' ? 'bg-green-500/30' : starting.status === 'Skipped' ? 'bg-red-500/30' : 'bg-blue-500/30'} relative group cursor-pointer`}
                                        title={`${starting.type} • ${starting.status} • ${starting.duration}h`}
                                      >
                                        <div className="absolute inset-0 flex items-center justify-center text-white text-[9px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                          {starting.type}
                        </div>
                      </div>
                                    ) : covering ? (
                                      <div className={`h-full w-full ${covering.status === 'Completed' ? 'bg-green-500/30' : covering.status === 'Skipped' ? 'bg-red-500/30' : 'bg-blue-500/30'} relative`}>
                                      </div>
                                    ) : (
                                      <div className="h-full" />
                                    )}
                                  </div>
                                );
                              })}
                            </>
                    ))}
                  </div>
                </div>
                    );
                  })()}
                </div>


              </div>

              {/* Progress Alerts */}
              <div className="bg-black rounded-2xl p-4 shadow-2xl border border-gray-800">
                {/* Custom scrollbar styles */}
                <style>{`
                  .progress-alerts-scroll::-webkit-scrollbar {
                    width: 6px;
                  }
                  .progress-alerts-scroll::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 3px;
                  }
                  .progress-alerts-scroll::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 3px;
                  }
                  .progress-alerts-scroll::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                  }
                `}</style>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div>
                      <h2 className="text-xl font-bold text-white font-kodchasan">Progress Alerts</h2>
                    </div>
                  </div>
                  
                  {/* Desktop Filter Controls */}
                  <div className="hidden lg:flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-1">
                      {['all', 'warning', 'success', 'info'].map(key => (
                        <button
                          key={key}
                          onClick={() => setAlertFilter(key)}
                          className={`px-2 py-1 text-xs rounded-md font-nunito transition-all duration-200 ${
                            alertFilter === key
                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {key === 'all' ? 'All' : key.charAt(0).toUpperCase() + key.slice(1)}
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-white/5 border border-white/10 rounded-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse"></div>
                      <span className="text-xs text-gray-300 font-medium">{progressAlerts.length}</span>
                    </div>
                  </div>
                  
                  {/* Mobile Filter Toggle */}
                  <div className="lg:hidden">
                    <button className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-gray-300 hover:bg-white/10 transition">
                      Filter
                    </button>
                  </div>
                </div>

                {/* Mobile Filter Bar */}
                <div className="lg:hidden mb-3">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {['all', 'warning', 'success', 'info'].map(key => (
                      <button
                        key={key}
                        onClick={() => setAlertFilter(key)}
                        className={`flex-shrink-0 px-2 py-1 text-xs rounded-md font-nunito transition-all duration-200 ${
                          alertFilter === key
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-white/5 text-gray-400 border border-white/10'
                        }`}
                      >
                        {key === 'all' ? 'All' : key.charAt(0).toUpperCase() + key.slice(1)}
                      </button>
                    ))}
                      </div>
                    </div>

                {/* Desktop Grid Layout */}
                <div className="hidden lg:block h-60 overflow-y-auto progress-alerts-scroll">
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 pr-2">
                    {progressAlerts
                      .filter(a => alertFilter === 'all' ? true : a.type === (alertFilter === 'info' ? 'info' : alertFilter))
                      .map((alert, index) => {
                        const colorMap = {
                          warning: { 
                            bg: 'bg-yellow-500/10', 
                            border: 'border-yellow-500/30', 
                            icon: 'bg-yellow-500/20', 
                            text: 'text-yellow-400',
                            accent: 'bg-yellow-500/20',
                            accentBorder: 'border-yellow-500/40'
                          },
                          success: { 
                            bg: 'bg-green-500/10', 
                            border: 'border-green-500/30', 
                            icon: 'bg-green-500/20', 
                            text: 'text-green-400',
                            accent: 'bg-green-500/20',
                            accentBorder: 'border-green-500/40'
                          },
                          info: { 
                            bg: 'bg-blue-500/10', 
                            border: 'border-blue-500/30', 
                            icon: 'bg-blue-500/20', 
                            text: 'text-blue-400',
                            accent: 'bg-blue-500/20',
                            accentBorder: 'border-blue-500/40'
                          }
                        };
                        const colors = colorMap[alert.type];
                        
                        return (
                          <div key={index} className={`group relative overflow-hidden rounded-xl p-3 ${colors.bg} border ${colors.border} hover:shadow-lg transition-all duration-200 hover:scale-[1.01]`}>
                            {/* Status Indicator */}
                            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                            
                            {/* Header */}
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-lg ${colors.icon} border ${colors.border} flex items-center justify-center shadow-md`}>
                                  <span className="text-xs font-bold text-white font-kodchasan">
                                {alert.client.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                  </span>
                              </div>
                                <div>
                                  <h3 className="text-sm font-semibold text-white font-nunito">{alert.client}</h3>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className={`px-1.5 py-0.5 rounded-md text-xs font-medium ${colors.accent} ${colors.accentBorder} text-white capitalize`}>
                                    {alert.type}
                                  </span>
                                    <span className="text-xs text-gray-400">Just now</span>
                                  </div>
                                </div>
                                </div>
                                
                              {/* Priority Indicator */}
                              <div className={`w-2 h-2 rounded-full ${colors.text} shadow-sm`}></div>
                            </div>
                            
                            {/* Message */}
                            <p className="text-xs text-gray-300 font-nunito leading-relaxed mb-2 line-clamp-2">
                                  {alert.message}
                                </p>
                                
                                {/* Action Bar */}
                            <div className="flex items-center justify-between pt-2 border-t border-white/10">
                              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <svg className="w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Action needed</span>
                                  </div>
                              <button className={`px-3 py-1 text-xs font-medium ${colors.accent} ${colors.accentBorder} text-white rounded-md hover:scale-105 transition-transform duration-200`}>
                                    {alert.action}
                                  </button>
                            </div>
                            
                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                          </div>
                        );
                      })}
                  </div>
                </div>
                
                {/* Mobile List Layout */}
                <div className="lg:hidden h-80 overflow-y-auto progress-alerts-scroll">
                  <div className="space-y-2 pr-2">
                    {progressAlerts
                      .filter(a => alertFilter === 'all' ? true : a.type === (alertFilter === 'info' ? 'info' : alertFilter))
                      .map((alert, index) => {
                        const colorMap = {
                          warning: { 
                            bg: 'bg-yellow-500/15', 
                            border: 'border-yellow-500/30', 
                            icon: 'bg-yellow-500/20', 
                            text: 'text-yellow-400',
                            accent: 'bg-yellow-500/20'
                          },
                          success: { 
                            bg: 'bg-green-500/15', 
                            border: 'border-green-500/30', 
                            icon: 'bg-green-500/20', 
                            text: 'text-green-400',
                            accent: 'bg-green-500/20'
                          },
                          info: { 
                            bg: 'bg-blue-500/15', 
                            border: 'border-blue-500/30', 
                            icon: 'bg-blue-500/20', 
                            text: 'text-blue-400',
                            accent: 'bg-blue-500/20'
                          }
                        };
                        const colors = colorMap[alert.type];
                        
                        return (
                          <div key={index} className={`group relative overflow-hidden rounded-lg p-3 ${colors.bg} border ${colors.border} active:scale-98 transition-all duration-150`}>
                            {/* Mobile Header */}
                            <div className="flex items-center gap-2 mb-2">
                              <div className={`w-7 h-7 rounded-md ${colors.icon} border ${colors.border} flex items-center justify-center shadow-sm`}>
                                <span className="text-xs font-bold text-white font-kodchasan">
                                  {alert.client.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-semibold text-white font-nunito truncate">{alert.client}</h3>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className={`px-1.5 py-0.5 rounded-md text-xs font-medium ${colors.accent} text-white capitalize`}>
                                    {alert.type}
                                  </span>
                                  <span className="text-xs text-gray-400">Just now</span>
                                </div>
                              </div>
                              <div className={`w-2 h-2 rounded-full ${colors.text} shadow-sm`}></div>
                            </div>
                            
                            {/* Mobile Message */}
                            <p className="text-xs text-gray-300 font-nunito leading-relaxed mb-2 line-clamp-2">
                              {alert.message}
                            </p>
                            
                            {/* Mobile Action */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1 text-xs text-gray-400">
                                <svg className="w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Action needed</span>
                              </div>
                              <button className={`px-2.5 py-1 text-xs font-medium ${colors.accent} text-white rounded-md active:scale-95 transition-transform duration-150`}>
                                {alert.action}
                    </button>
                            </div>
                            
                            {/* Mobile Swipe Indicator */}
                            <div className="absolute top-1/2 -translate-y-1/2 right-2 opacity-20 group-hover:opacity-40 transition-opacity duration-200">
                              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>

                {/* Empty State */}
                {progressAlerts.filter(a => alertFilter === 'all' ? true : a.type === (alertFilter === 'info' ? 'info' : alertFilter)).length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-semibold text-white font-kodchasan mb-1">All caught up!</h3>
                    <p className="text-xs text-gray-400 font-nunito">No progress alerts at the moment</p>
                  </div>
                )}
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="w-full lg:col-span-4 space-y-6">
              {/* Calendar Preview */}
              <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800 overflow-hidden relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/10"></div>
                </div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white font-kodchasan mb-1">Calendar Preview</h2>
                      <p className="text-gray-400 font-nunito text-xs">Your schedule at a glance</p>
                    </div>
                    <button className="px-3 py-1.5 text-xs bg-blue-500/20 text-blue-400 rounded-lg font-nunito border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                      View Full
                    </button>
                  </div>

                  {/* Desktop Calendar */}
                  <div className="hidden lg:block">
                    {/* Month Header */}
                    <div className="text-center mb-6">
                      <h3 className="text-lg font-semibold text-white font-kodchasan">{currentMonth}</h3>
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 mb-6">
                      {calendarDays.map((day, index) => {
                        if (day.type === 'header') {
                          return (
                            <div key={index} className="h-10 flex items-center justify-center">
                              <span className="text-xs font-semibold text-gray-400 font-nunito tracking-wide uppercase">{day.label}</span>
                            </div>
                          )
                        }
                        if (day.type === 'empty') {
                          return <div key={index} className="h-10"></div>
                        }
                        return (
                          <div key={index} className={`h-10 relative flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-800/80 transition-all duration-200 group ${day.isToday ? 'bg-yellow-500/20 border-2 border-yellow-500/50 shadow-lg' : ''
                            }`}>
                            <span className={`text-sm font-medium font-nunito ${day.isToday ? 'text-yellow-400 font-bold' : 'text-gray-300 group-hover:text-white'
                              }`}>
                              {day.number}
                            </span>
                            {day.event && (
                              <div className={`absolute -bottom-1 w-2 h-2 rounded-full shadow-sm ${day.event.color === 'blue' ? 'bg-blue-500' :
                                day.event.color === 'green' ? 'bg-green-500' :
                                  day.event.color === 'purple' ? 'bg-purple-500' :
                                    'bg-orange-500'
                                }`}></div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-900/50 rounded-xl p-3 border border-gray-700/50">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-400 font-nunito">Sessions</span>
                        </div>
                        <p className="text-lg font-bold text-white font-kodchasan mt-1">12</p>
                      </div>
                      <div className="bg-gray-900/50 rounded-xl p-3 border border-gray-700/50">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-400 font-nunito">Available</span>
                        </div>
                        <p className="text-lg font-bold text-white font-kodchasan mt-1">8</p>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Calendar */}
                  <div className="lg:hidden">
                    {/* Month Header */}
                    <div className="text-center mb-4">
                      <h3 className="text-base font-semibold text-white font-kodchasan">{currentMonth}</h3>
                    </div>

                    {/* Mobile Calendar Grid */}
                    <div className="grid grid-cols-7 gap-0.5 mb-4">
                      {calendarDays.map((day, index) => {
                        if (day.type === 'header') {
                          return (
                            <div key={index} className="h-8 flex items-center justify-center">
                              <span className="text-xs font-semibold text-gray-400 font-nunito">{day.label}</span>
                            </div>
                          )
                        }
                        if (day.type === 'empty') {
                          return <div key={index} className="h-8"></div>
                        }
                        return (
                          <div key={index} className={`h-8 relative flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-800/80 transition-all duration-200 ${day.isToday ? 'bg-yellow-500/20 border border-yellow-500/50' : ''
                            }`}>
                            <span className={`text-xs font-medium font-nunito ${day.isToday ? 'text-yellow-400 font-bold' : 'text-gray-300'
                              }`}>
                              {day.number}
                            </span>
                            {day.event && (
                              <div className={`absolute -bottom-0.5 w-1.5 h-1.5 rounded-full ${day.event.color === 'blue' ? 'bg-blue-500' :
                                day.event.color === 'green' ? 'bg-green-500' :
                                  day.event.color === 'purple' ? 'bg-purple-500' :
                                    'bg-orange-500'
                                }`}></div>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Mobile Quick Stats */}
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-gray-900/50 rounded-lg p-2 border border-gray-700/50">
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span className="text-xs text-gray-400 font-nunito">Today</span>
                        </div>
                        <p className="text-sm font-bold text-white font-kodchasan mt-0.5">3 sessions</p>
                      </div>
                      <div className="flex-1 bg-gray-900/50 rounded-lg p-2 border border-gray-700/50">
                        <div className="flex items-center space-x-1">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-400 font-nunito">Free</span>
                        </div>
                        <p className="text-sm font-bold text-white font-kodchasan mt-0.5">2 slots</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workout Compliance */}
              <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-white font-kodchasan">Workout Compliance</h2>
                  <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
                    <button className="px-2.5 py-1 text-xs rounded-md bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-nunito hover:bg-yellow-500/15 transition">7D</button>
                    <button className="px-2.5 py-1 text-xs rounded-md text-gray-400 font-nunito hover:text-white hover:bg-white/5 transition">30D</button>
                  </div>
                </div>

                {(() => {
                  // Dummy multi-client compliance data (aligns with app context)
                  const clients = [
                    { id: 1, name: 'John Doe', plan: 'Strength', scheduled: 10, completed: 8 },
                    { id: 2, name: 'Jane Smith', plan: 'Cardio', scheduled: 9, completed: 7 },
                    { id: 3, name: 'Mike Johnson', plan: 'Mobility', scheduled: 8, completed: 5 },
                    { id: 4, name: 'Sarah Wilson', plan: 'Strength', scheduled: 7, completed: 6 },
                    { id: 5, name: 'David Brown', plan: 'Cardio', scheduled: 6, completed: 3 }
                  ]

                  const clampSlide = (idx) => (idx + clients.length) % clients.length
                  const current = clients[clampSlide(clientSlide)]
                  const completed = current.completed
                  const total = current.scheduled
                  const missed = Math.max(total - completed, 0)
                  const rate = total > 0 ? Math.round((completed / total) * 100) : 0

                  return (
                    <div className="space-y-4">
                      {/* Carousel header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ring-1 ring-yellow-500/20">
                            <span className="text-sm font-bold text-white font-kodchasan">
                              {current.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white font-nunito leading-tight truncate">{current.name}</p>
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                              <span className="text-[11px] text-gray-300 font-nunito">{current.plan}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setClientSlide(s => clampSlide(s - 1))}
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-yellow-500/30 transition flex items-center justify-center"
                            aria-label="Previous client"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
                          </button>
                          <button
                            onClick={() => setClientSlide(s => clampSlide(s + 1))}
                            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-yellow-500/30 transition flex items-center justify-center"
                            aria-label="Next client"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
                          </button>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="border-t border-white/10"></div>
                      Progress Alerts
                      {/* Pie only */}
                      <div className="flex items-center justify-center py-1">
                        <div className="relative w-44 h-44 sm:w-48 sm:h-48">
                          <div
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: `conic-gradient(#f59e0b ${rate}%, rgba(255,255,255,0.06) ${rate}% 100%)`
                            }}
                          ></div>
                          <div className="absolute inset-3 bg-gray-900 rounded-full border border-white/10"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-white font-kodchasan">{rate}%</div>
                              <div className="text-[11px] text-gray-400 font-nunito">Compliance</div>
                              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                                <span className="text-[10px] text-yellow-400 font-medium">{completed}/{total}</span>
                              </div>
                            </div>
                          </div>
                          {/* soft glow */}
                          <div className="absolute -inset-1 rounded-full bg-yellow-500/5 blur-xl"></div>
                        </div>
                      </div>

                      {/* Legend + dots */}
                      <div className="flex items-center gap-5 text-xs text-gray-400">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                          <span>Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-black"></span>
                          <span>Missed</span>
                        </div>
                        <div className="ml-auto flex items-center gap-1.5">
                          {clients.map((c, i) => (
                            <button
                              key={c.id}
                              onClick={() => setClientSlide(i)}
                              className={`w-1.5 h-1.5 rounded-full transition ${i === clampSlide(clientSlide) ? 'bg-yellow-400' : 'bg-white/20 hover:bg-white/40'}`}
                              aria-label={`Go to ${c.name}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })()}
              </div>

                              {/* Recent Activity */}
                <div className="bg-black rounded-2xl p-5 shadow-2xl border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div>
                        <h2 className="text-xl font-bold text-white font-kodchasan">Recent Activity</h2>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-lg">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-300 font-medium">{recentActivity.length}</span>
                    </div>
                  </div>

                  {/* Hide scrollbar utility (scoped) */}
                  <style>{`
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                  `}</style>

                  <div className="h-86 overflow-y-auto no-scrollbar pr-1">
                    <div className="space-y-2">
                      {recentActivity.length === 0 ? (
                        <div className="text-center py-6">
                          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-gray-800/50 border border-gray-700/50 flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <p className="text-xs text-gray-400 font-nunito">No recent activity</p>
                        </div>
                      ) : (
                        recentActivity.map((activity, index) => {
                          const colorMap = {
                            workout: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: 'bg-blue-500/20', text: 'text-blue-400' },
                            registration: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: 'bg-emerald-500/20', text: 'text-emerald-400' },
                            progress: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', icon: 'bg-indigo-500/20', text: 'text-indigo-400' },
                            booking: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: 'bg-purple-500/20', text: 'text-purple-400' },
                            measurement: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', icon: 'bg-amber-500/20', text: 'text-amber-400' }
                          };
                          const colors = colorMap[activity.type] || colorMap.workout;
                          
                          return (
                            <div key={index} className={`group relative overflow-hidden rounded-lg p-3 ${colors.bg} border ${colors.border} hover:bg-white/[0.02] transition-all duration-200`}>
                              <div className="flex items-center gap-3">
                                {/* Icon */}
                                <div className={`flex-shrink-0 w-8 h-8 rounded-lg ${colors.icon} border border-white/10 flex items-center justify-center`}>
                                  <Icon name={activity.icon} className={`w-4 h-4 ${colors.text}`} />
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-white font-medium font-nunito leading-tight">
                                    <span className="font-semibold">{activity.client}</span> {activity.action}
                                  </p>
                                  <div className="mt-1.5 flex items-center gap-2">
                                    <span className={`px-1.5 py-0.5 rounded-md ${colors.bg} text-xs font-medium text-white capitalize border border-white/10`}>
                                      {activity.type}
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-gray-400">
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      {activity.time}
                                    </span>
                                  </div>
                                </div>
                                
                                {/* Action */}
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/10">
                                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
