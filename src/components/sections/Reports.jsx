import { useState } from 'preact/hooks'

function Reports() {
  const [reports] = useState([
    { name: 'Monthly Progress Report', type: 'Progress', lastGenerated: '2024-03-01', status: 'Ready' },
    { name: 'Client Performance Summary', type: 'Analytics', lastGenerated: '2024-03-15', status: 'Ready' },
    { name: 'Revenue Analysis', type: 'Financial', lastGenerated: '2024-03-10', status: 'Ready' },
    { name: 'Workout Plan Effectiveness', type: 'Analytics', lastGenerated: '2024-03-05', status: 'Ready' },
    { name: 'Nutrition Compliance Report', type: 'Nutrition', lastGenerated: '2024-02-28', status: 'Ready' }
  ])

  return (
    <div className="min-h-screen rounded-3xl bg-yellow-400 p-4 md:p-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Header */}
        <div className="lg:col-span-2 xl:col-span-3">
          <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h1 className="text-3xl font-bold text-white font-kodchasan mb-2">Reports</h1>
            <p className="text-gray-400 font-nunito">
              Generate comprehensive reports, analyze performance metrics, and gain insights into your fitness business operations.
            </p>
          </div>
        </div>

        {/* Available Reports */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h2 className="text-xl font-bold text-white font-kodchasan mb-4">Available Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reports.map((report, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-semibold">{report.name}</h3>
                    <span className="text-yellow-400 text-sm font-medium">{report.type}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Generated:</span>
                      <span className="text-white">{report.lastGenerated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className="text-green-400">{report.status}</span>
                    </div>
                  </div>
                  <button className="w-full mt-3 bg-yellow-400 text-black px-3 py-2 rounded text-sm font-semibold hover:bg-yellow-300 transition-colors">
                    Generate Report
                  </button>
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
              Create Custom Report
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Export All Reports
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Schedule Reports
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Reports
