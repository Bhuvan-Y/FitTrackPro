import { useState } from 'preact/hooks'

function Nutrition() {
  const [nutritionData] = useState([
    { client: 'John Doe', plan: 'Weight Loss', calories: '1800', protein: '150g', carbs: '150g', fat: '60g' },
    { client: 'Jane Smith', plan: 'Muscle Gain', calories: '2200', protein: '180g', carbs: '200g', fat: '70g' },
    { client: 'Mike Johnson', plan: 'Maintenance', calories: '2000', protein: '160g', carbs: '180g', fat: '65g' },
    { client: 'Sarah Wilson', plan: 'Athletic', calories: '2400', protein: '200g', carbs: '250g', fat: '80g' }
  ])

  return (
    <div className="min-h-screen rounded-3xl bg-yellow-400 p-4 md:p-6">
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Header */}
        <div className="lg:col-span-2 xl:col-span-3">
          <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h1 className="text-3xl font-bold text-white font-kodchasan mb-2">Nutrition</h1>
            <p className="text-gray-400 font-nunito">
              Design personalized meal plans, track nutritional intake, and optimize client nutrition for fitness goals.
            </p>
          </div>
        </div>

        {/* Nutrition Plans */}
        <div className="lg:col-span-2">
          <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
            <h2 className="text-xl font-bold text-white font-kodchasan mb-4">Client Nutrition Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {nutritionData.map((item, index) => (
                <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-white font-semibold">{item.client}</h3>
                    <span className="text-yellow-400 text-sm font-medium">{item.plan}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Calories:</span>
                      <span className="text-white">{item.calories}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Protein:</span>
                      <span className="text-white">{item.protein}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Carbs:</span>
                      <span className="text-white">{item.carbs}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Fat:</span>
                      <span className="text-white">{item.fat}</span>
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
              Create Meal Plan
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Track Nutrition
            </button>
            <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nutrition
