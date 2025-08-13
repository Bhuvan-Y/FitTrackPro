import { useState } from 'preact/hooks'

function ProgressTracker() {
  const [progressData] = useState([
    { client: 'John Doe', metric: 'Weight Loss', current: '185 lbs', target: '170 lbs', progress: 65 },
    { client: 'Jane Smith', metric: 'Muscle Gain', current: '140 lbs', target: '150 lbs', progress: 40 },
    { client: 'Mike Johnson', metric: 'Endurance', current: '15 min', target: '30 min', progress: 80 },
    { client: 'Sarah Wilson', metric: 'Strength', current: '135 lbs', target: '185 lbs', progress: 25 }
  ])

  return (
    <div className="min-h-screen rounded-3xl bg-yellow-400 p-4 md:p-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Header */}
        <div className="lg:col-span-2 xl:col-span-3">
          <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h1 className="text-3xl font-bold text-white font-kodchasan mb-2">Progress Tracker</h1>
            <p className="text-gray-400 font-nunito">
              Monitor client progress, track metrics, and visualize fitness journey milestones.
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
          <h2 className="text-xl font-bold text-white font-kodchasan mb-4">Progress Overview</h2>
          <div className="space-y-4">
            {progressData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300 font-nunito">{item.client}</span>
                  <span className="text-white font-semibold">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-400">
                  {item.metric}: {item.current} → {item.target}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
          <h2 className="text-xl font-bold text-white font-kodchasan mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Add Progress Entry
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Generate Report
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressTracker
