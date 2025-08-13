import { useState } from 'preact/hooks'

function WorkoutPlans() {
  const [workoutPlans] = useState([
    { id: 1, name: 'Weight Loss Beginner', category: 'Weight Loss', difficulty: 'Beginner', duration: '8 weeks', exercises: 12, clients: 8, status: 'Active', description: 'Low-impact cardio and strength training for sustainable weight loss' },
    { id: 2, name: 'Muscle Building Pro', category: 'Muscle Gain', difficulty: 'Advanced', duration: '12 weeks', exercises: 18, clients: 15, status: 'Active', description: 'Progressive overload training for maximum muscle growth' },
    { id: 3, name: 'Endurance Runner', category: 'Endurance', difficulty: 'Intermediate', duration: '10 weeks', exercises: 15, clients: 12, status: 'Active', description: 'Cardio-focused training to improve running performance' },
    { id: 4, name: 'Flexibility Flow', category: 'Flexibility', difficulty: 'Beginner', duration: '6 weeks', exercises: 8, clients: 6, status: 'Active', description: 'Yoga-inspired movements for improved flexibility and mobility' },
    { id: 5, name: 'Strength Foundation', category: 'Strength', difficulty: 'Intermediate', duration: '10 weeks', exercises: 16, clients: 20, status: 'Active', description: 'Compound movements to build functional strength' },
    { id: 6, name: 'Rehabilitation Core', category: 'Rehabilitation', difficulty: 'Beginner', duration: '6 weeks', exercises: 10, clients: 4, status: 'Active', description: 'Gentle exercises for post-injury recovery' },
    { id: 7, name: 'HIIT Burner', category: 'Cardio', difficulty: 'Advanced', duration: '8 weeks', exercises: 14, clients: 18, status: 'Active', description: 'High-intensity interval training for maximum calorie burn' },
    { id: 8, name: 'Senior Fitness', category: 'Senior', difficulty: 'Beginner', duration: '12 weeks', exercises: 9, clients: 10, status: 'Active', description: 'Low-impact exercises designed for older adults' }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [difficultyFilter, setDifficultyFilter] = useState('all')

  const filteredPlans = workoutPlans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || plan.category === categoryFilter
    const matchesDifficulty = difficultyFilter === 'all' || plan.difficulty === difficultyFilter
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Weight Loss': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Muscle Gain': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Endurance': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Flexibility': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'Strength': return 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      case 'Rehabilitation': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Cardio': return 'bg-pink-500/20 text-pink-400 border-pink-500/30'
      case 'Senior': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-400'
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-400'
      case 'Advanced': return 'bg-red-500/20 text-red-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'Draft': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
  }

  return (
    <div className="min-h-screen rounded-3xl bg-yellow-400 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
      {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Workout Plans</h1>
          <p className="text-black/70 text-lg">Create and manage customized workout programs for your clients</p>
      </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-black rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-400 text-sm font-medium">Total Plans</p>
                <p className="text-3xl font-bold text-white">{workoutPlans.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            </div>
          </div>
        </div>

          <div className="bg-black rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-400 text-sm font-medium">Active Plans</p>
                <p className="text-3xl font-bold text-white">{workoutPlans.filter(p => p.status === 'Active').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
          </div>
        </div>

          <div className="bg-black rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-400 text-sm font-medium">Total Clients</p>
                <p className="text-3xl font-bold text-white">
                  {workoutPlans.reduce((sum, p) => sum + p.clients, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
          </div>
        </div>

          <div className="bg-black rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-400 text-sm font-medium">Avg Duration</p>
                <p className="text-3xl font-bold text-white">
                  {Math.round(workoutPlans.reduce((sum, p) => sum + parseInt(p.duration), 0) / workoutPlans.length)} weeks
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-black rounded-2xl p-6 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search workout plans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Muscle Gain">Muscle Gain</option>
                <option value="Endurance">Endurance</option>
                <option value="Flexibility">Flexibility</option>
                <option value="Strength">Strength</option>
                <option value="Rehabilitation">Rehabilitation</option>
                <option value="Cardio">Cardio</option>
                <option value="Senior">Senior</option>
              </select>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200">
                Create Plan
              </button>
          </div>
        </div>
      </div>

      {/* Workout Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <div key={plan.id} className="bg-black rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-200 group">
              {/* Plan Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-200 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{plan.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(plan.status)}`}>
                  {plan.status}
                </span>
              </div>
              
              {/* Plan Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getCategoryColor(plan.category)}`}>
                    {plan.category}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(plan.difficulty)}`}>
                    {plan.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-300">{plan.duration}</span>
                </div>
              </div>

              {/* Plan Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-white">{plan.exercises}</p>
                  <p className="text-xs text-gray-400">Exercises</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-white">{plan.clients}</p>
                  <p className="text-xs text-gray-400">Clients</p>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                  View Details
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                  Edit
                </button>
            </div>
          </div>
        ))}
      </div>

        {/* Empty State */}
        {filteredPlans.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No workout plans found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200">
              Create Your First Plan
          </button>
        </div>
        )}
      </div>
    </div>
  )
}

export default WorkoutPlans
