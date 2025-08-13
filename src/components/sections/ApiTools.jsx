import { useState } from 'preact/hooks'

function ApiTools() {
  const [apiEndpoints] = useState([
    { name: 'Client Management', endpoint: '/api/clients', method: 'GET', status: 'Active' },
    { name: 'Workout Plans', endpoint: '/api/workouts', method: 'POST', status: 'Active' },
    { name: 'Progress Tracking', endpoint: '/api/progress', method: 'PUT', status: 'Active' },
    { name: 'Nutrition Data', endpoint: '/api/nutrition', method: 'GET', status: 'Active' },
    { name: 'Schedule Management', endpoint: '/api/schedule', method: 'POST', status: 'Active' }
  ])

  return (
    <div className="min-h-screen rounded-3xl bg-yellow-400 p-4 md:p-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Header */}
        <div className="lg:col-span-2 xl:col-span-3">
          <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h1 className="text-3xl font-bold text-white font-kodchasan mb-2">API Tools</h1>
            <p className="text-gray-400 font-nunito">
              Access and manage API endpoints, test integrations, and monitor system performance for seamless data flow.
            </p>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h2 className="text-xl font-bold text-white font-kodchasan mb-4">API Endpoints</h2>
            <div className="space-y-3">
              {apiEndpoints.map((endpoint, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="text-yellow-400 font-semibold text-sm min-w-[80px]">{endpoint.method}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{endpoint.name}</h3>
                      <p className="text-gray-400 text-sm font-mono">{endpoint.endpoint}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-green-400 text-sm font-medium">{endpoint.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
          <h2 className="text-xl font-bold text-white font-kodchasan mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full bg-yellow-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
              Test API
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              View Docs
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Monitor Status
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiTools
