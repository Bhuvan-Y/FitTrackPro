import { useState } from 'preact/hooks'

function Schedule() {
  const [scheduleData] = useState([
    { time: '6:00 AM', client: 'John Doe', type: 'Personal Training', duration: '60 min' },
    { time: '8:00 AM', client: 'Jane Smith', type: 'Group Class', duration: '45 min' },
    { time: '10:00 AM', client: 'Mike Johnson', type: 'Consultation', duration: '30 min' },
    { time: '2:00 PM', client: 'Sarah Wilson', type: 'Personal Training', duration: '60 min' },
    { time: '4:00 PM', client: 'Group', type: 'HIIT Class', duration: '45 min' },
    { time: '6:00 PM', client: 'David Brown', type: 'Personal Training', duration: '60 min' }
  ])

  return (
    <div className="min-h-screen rounded-3xl bg-yellow-400 p-4 md:p-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Header */}
        <div className="lg:col-span-2 xl:col-span-3">
          <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h1 className="text-3xl font-bold text-white font-kodchasan mb-2">Schedule</h1>
            <p className="text-gray-400 font-nunito">
              Manage your daily schedule, book sessions, and coordinate with clients for optimal time management.
            </p>
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h2 className="text-xl font-bold text-white font-kodchasan mb-4">Today's Schedule</h2>
            <div className="space-y-3">
              {scheduleData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="text-yellow-400 font-semibold text-sm min-w-[80px]">{item.time}</div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">{item.client}</h3>
                      <p className="text-gray-400 text-sm">{item.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-yellow-400 text-sm font-medium">{item.duration}</span>
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
              Book Session
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              View Calendar
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Manage Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Schedule
