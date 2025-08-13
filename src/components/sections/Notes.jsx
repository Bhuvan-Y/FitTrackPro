import { useState } from 'preact/hooks'

function Notes() {
  const [notes] = useState([
    { id: 1, title: 'John Doe - Progress Notes', content: 'Client showing excellent progress in strength training. Increased bench press by 15 lbs this month.', date: '2024-03-20', client: 'John Doe' },
    { id: 2, title: 'Jane Smith - Nutrition Feedback', content: 'Client struggling with meal prep. Need to create simpler meal plans and provide more support.', date: '2024-03-19', client: 'Jane Smith' },
    { id: 3, title: 'Mike Johnson - Injury Update', content: 'Client recovering well from shoulder injury. Can resume light upper body exercises next week.', date: '2024-03-18', client: 'Mike Johnson' },
    { id: 4, title: 'Sarah Wilson - Goal Setting', content: 'Client wants to run a marathon in 6 months. Need to create progressive training program.', date: '2024-03-17', client: 'Sarah Wilson' }
  ])

  return (
    <div className="min-h-screen rounded-3xl bg-yellow-400 p-4 md:p-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Header */}
        <div className="lg:col-span-2 xl:col-span-3">
          <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h1 className="text-3xl font-bold text-white font-kodchasan mb-2">Notes</h1>
            <p className="text-gray-400 font-nunito">
              Keep detailed notes about client progress, observations, and important information for personalized coaching.
            </p>
          </div>
        </div>

        {/* Notes List */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h2 className="text-xl font-bold text-white font-kodchasan mb-4">Recent Notes</h2>
            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-semibold">{note.title}</h3>
                    <span className="text-yellow-400 text-sm">{note.date}</span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{note.content}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-400 text-sm font-medium">{note.client}</span>
                    <div className="space-x-2">
                      <button className="text-gray-400 hover:text-white text-sm">Edit</button>
                      <button className="text-gray-400 hover:text-white text-sm">Delete</button>
                    </div>
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
              Add Note
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Search Notes
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Export Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes
