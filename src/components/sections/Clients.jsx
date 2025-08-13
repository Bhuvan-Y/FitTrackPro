import { useState } from 'preact/hooks'

function Clients() {
  const [clients] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1-555-0123',
      status: 'Active',
      plan: 'Weight Loss',
      lastSession: '2024-03-20',
      progress: 75,
      gender: 'Male',
      age: 28,
      joinDate: '2024-01-15',
      trainer: 'Mike Trainer',
      weight: 185,
      bmi: 26.2,
      bodyFat: 18.5,
      attendance: 45,
      sessions: 45,
      profilePhoto: null,
      // New fields for enhanced functionality
      membership: {
        status: 'Active',
        type: 'Premium',
        startDate: '2024-01-15',
        endDate: '2025-01-15',
        autoRenew: true,
        price: 99.99
      },
      medical: {
        conditions: ['None'],
        allergies: ['None'],
        medications: ['None'],
        emergencyContact: {
          name: 'Jane Doe',
          relationship: 'Spouse',
          phone: '+1-555-0126'
        }
      },
      workoutSplit: {
        current: 'Push-Pull-Legs',
        frequency: '6 days/week',
        restDays: ['Sunday'],
        preferences: ['Compound movements', 'Progressive overload']
      },
      measurements: {
        neck: 16.5,
        chest: 42,
        waist: 36,
        arms: 15,
        thighs: 24,
        calves: 16
      },
      goals: ['Lose 20 lbs', 'Improve endurance', 'Build muscle tone'],
      notes: 'Client shows great dedication. Focus on form during compound movements.',
      workoutHistory: [
        { date: '2024-03-20', type: 'Strength', exercises: 8, completed: true },
        { date: '2024-03-18', type: 'Cardio', exercises: 6, completed: true },
        { date: '2024-03-15', type: 'Strength', exercises: 7, completed: false }
      ]
    },
    {
      id: 2,
      name: 'Sarah Wilson',
      email: 'sarah@example.com',
      phone: '+1-555-0124',
      status: 'Active',
      plan: 'Muscle Gain',
      lastSession: '2024-03-19',
      progress: 60,
      gender: 'Female',
      age: 32,
      joinDate: '2024-02-01',
      trainer: 'Mike Trainer',
      weight: 135,
      bmi: 22.1,
      bodyFat: 24.2,
      attendance: 38,
      sessions: 38,
      profilePhoto: null,
      // New fields for enhanced functionality
      membership: {
        status: 'Active',
        type: 'Standard',
        startDate: '2024-02-01',
        endDate: '2025-02-01',
        autoRenew: true,
        price: 79.99
      },
      medical: {
        conditions: ['None'],
        allergies: ['None'],
        medications: ['None'],
        emergencyContact: {
          name: 'Tom Wilson',
          relationship: 'Husband',
          phone: '+1-555-0127'
        }
      },
      workoutSplit: {
        current: 'Upper-Lower',
        frequency: '4 days/week',
        restDays: ['Wednesday', 'Saturday', 'Sunday'],
        preferences: ['Form focus', 'Moderate weights']
      },
      measurements: {
        neck: 13.5,
        chest: 36,
        waist: 28,
        arms: 12,
        thighs: 20,
        calves: 14
      },
      goals: ['Gain 15 lbs muscle', 'Improve strength', 'Better posture'],
      notes: 'Excellent progress on deadlifts. Consider increasing protein intake.',
      workoutHistory: [
        { date: '2024-03-19', type: 'Strength', exercises: 9, completed: true },
        { date: '2024-03-17', type: 'Strength', exercises: 8, completed: true },
        { date: '2024-03-14', type: 'Recovery', exercises: 5, completed: true }
      ]
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '+1-555-0125',
      status: 'Inactive',
      plan: 'General Fitness',
      lastSession: '2024-02-15',
      progress: 30,
      gender: 'Male',
      age: 35,
      joinDate: '2023-11-10',
      trainer: 'Sarah Trainer',
      weight: 200,
      bmi: 28.5,
      bodyFat: 22.1,
      attendance: 25,
      sessions: 25,
      profilePhoto: null,
      // New fields for enhanced functionality
      membership: {
        status: 'Expired',
        type: 'Standard',
        startDate: '2023-11-10',
        endDate: '2024-11-10',
        autoRenew: false,
        price: 79.99
      },
      medical: {
        conditions: ['None'],
        allergies: ['None'],
        medications: ['None'],
        emergencyContact: {
          name: 'Lisa Johnson',
          relationship: 'Wife',
          phone: '+1-555-0128'
        }
      },
      workoutSplit: {
        current: 'Full Body',
        frequency: '3 days/week',
        restDays: ['Tuesday', 'Thursday', 'Saturday', 'Sunday'],
        preferences: ['Functional fitness', 'Cardio focus']
      },
      measurements: {
        neck: 17,
        chest: 44,
        waist: 38,
        arms: 16,
        thighs: 26,
        calves: 17
      },
      goals: ['Lose weight', 'Improve flexibility', 'Better sleep'],
      notes: 'Client needs motivation. Consider group sessions or buddy system.',
      workoutHistory: [
        { date: '2024-02-15', type: 'General', exercises: 6, completed: true },
        { date: '2024-02-12', type: 'Cardio', exercises: 5, completed: false },
        { date: '2024-02-08', type: 'General', exercises: 7, completed: true }
      ]
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily@example.com',
      phone: '+1-555-0126',
      status: 'Active',
      plan: 'Endurance',
      lastSession: '2024-03-18',
      progress: 85,
      gender: 'Female',
      age: 26,
      joinDate: '2023-09-20',
      trainer: 'Sarah Trainer',
      weight: 125,
      bmi: 20.8,
      bodyFat: 19.8,
      attendance: 52,
      sessions: 52,
      profilePhoto: null,
      // New fields for enhanced functionality
      membership: {
        status: 'Active',
        type: 'Premium',
        startDate: '2023-09-20',
        endDate: '2024-09-20',
        autoRenew: true,
        price: 99.99
      },
      medical: {
        conditions: ['None'],
        allergies: ['None'],
        medications: ['None'],
        emergencyContact: {
          name: 'David Davis',
          relationship: 'Brother',
          phone: '+1-555-0129'
        }
      },
      workoutSplit: {
        current: 'Cardio-Focused',
        frequency: '5 days/week',
        restDays: ['Wednesday', 'Sunday'],
        preferences: ['High intensity', 'Endurance building']
      },
      measurements: {
        neck: 12.5,
        chest: 34,
        waist: 26,
        arms: 11,
        thighs: 18,
        calves: 13
      },
      goals: ['Run 10K', 'Improve stamina', 'Maintain weight'],
      notes: 'Excellent runner. Consider marathon training program.',
      workoutHistory: [
        { date: '2024-03-18', type: 'Cardio', exercises: 10, completed: true },
        { date: '2024-03-16', type: 'Strength', exercises: 7, completed: true },
        { date: '2024-03-14', type: 'Cardio', exercises: 8, completed: true }
      ]
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david@example.com',
      phone: '+1-555-0127',
      status: 'Active',
      plan: 'Strength Training',
      lastSession: '2024-03-17',
      progress: 45,
      gender: 'Male',
      age: 29,
      joinDate: '2024-01-20',
      trainer: 'Mike Trainer',
      weight: 175,
      bmi: 24.8,
      bodyFat: 16.2,
      attendance: 32,
      sessions: 32,
      profilePhoto: null,
      measurements: {
        neck: 16,
        chest: 40,
        waist: 32,
        arms: 14.5,
        thighs: 22,
        calves: 15
      },
      goals: ['Bench press 225 lbs', 'Squat 315 lbs', 'Improve power'],
      notes: 'Good form on compound lifts. Focus on progressive overload.',
      workoutHistory: [
        { date: '2024-03-17', type: 'Strength', exercises: 9, completed: true },
        { date: '2024-03-15', type: 'Power', exercises: 7, completed: true },
        { date: '2024-03-12', type: 'Strength', exercises: 8, completed: false }
      ]
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      phone: '+1-555-0128',
      status: 'Active',
      plan: 'Flexibility',
      lastSession: '2024-03-16',
      progress: 90,
      gender: 'Female',
      age: 31,
      joinDate: '2023-12-05',
      trainer: 'Sarah Trainer',
      weight: 130,
      bmi: 21.5,
      bodyFat: 23.1,
      attendance: 55,
      sessions: 55,
      profilePhoto: null,
      measurements: {
        neck: 13.5,
        chest: 35,
        waist: 27,
        arms: 11.5,
        thighs: 20.5,
        calves: 14
      },
      goals: ['Full splits', 'Better balance', 'Stress relief'],
      notes: 'Excellent flexibility gains. Ready for advanced yoga poses.',
      workoutHistory: [
        { date: '2024-03-16', type: 'Flexibility', exercises: 12, completed: true },
        { date: '2024-03-14', type: 'Yoga', exercises: 15, completed: true },
        { date: '2024-03-11', type: 'Recovery', exercises: 6, completed: true }
      ]
    }
  ])

  // Enhanced state variables
  const [selectedClient, setSelectedClient] = useState(null)
  const [showAddClient, setShowAddClient] = useState(false)
  const [showEditClient, setShowEditClient] = useState(false)
  const [editingClient, setEditingClient] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [planFilter, setPlanFilter] = useState('all')
  const [showWorkoutLog, setShowWorkoutLog] = useState(false)
  const [currentWorkout, setCurrentWorkout] = useState(null)
  const [showProfilePhotoModal, setShowProfilePhotoModal] = useState(false)
  const [showMembershipModal, setShowMembershipModal] = useState(false)
  const [showMedicalModal, setShowMedicalModal] = useState(false)
  const [showWorkoutSplitModal, setShowWorkoutSplitModal] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportFormat, setExportFormat] = useState('pdf')
  const [showNutritionModal, setShowNutritionModal] = useState(false)
  const [showProgressPhotosModal, setShowProgressPhotosModal] = useState(false)
  const [viewMode, setViewMode] = useState('list') // 'list' or 'detail'
  const [activeTab, setActiveTab] = useState('overview') // 'overview', 'workouts', 'progress', 'measurements', 'notes', 'membership', 'medical', 'workoutSplit'
  
  // Additional state for nutrition and progress photos
  const [nutritionData, setNutritionData] = useState({})
  const [progressPhotos, setProgressPhotos] = useState({})
  const [currentNutritionForm, setCurrentNutritionForm] = useState({
    mealType: 'breakfast',
    time: '',
    foodItems: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: ''
  })

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Inactive': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    }
  }

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-green-500'
    if (progress >= 60) return 'bg-yellow-500'
    if (progress >= 40) return 'bg-orange-500'
    return 'bg-red-500'
  }

  // Enhanced helper functions
  const getMembershipStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'Expired': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Suspended': return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getMembershipTypeColor = (type) => {
    switch (type) {
      case 'Premium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'Standard': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'Basic': return 'bg-green-500/20 text-green-400 border-green-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const isMembershipExpiringSoon = (endDate) => {
    const end = new Date(endDate)
    const now = new Date()
    const daysUntilExpiry = Math.ceil((end - now) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0
  }

  const isMembershipExpired = (endDate) => {
    const end = new Date(endDate)
    const now = new Date()
    return end < now
  }

  const getDaysUntilExpiry = (endDate) => {
    const end = new Date(endDate)
    const now = new Date()
    return Math.ceil((end - now) / (1000 * 60 * 60 * 24))
  }

  const formatMembershipDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  // Handler functions for new functionality
  const handleProfilePhotoUpload = (clientId, photoData) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === clientId 
          ? { ...client, profilePhoto: photoData }
          : client
      )
    );
    setShowProfilePhotoModal(false);
  };

  const handleMembershipUpdate = (clientId, membershipData) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === clientId 
          ? { ...client, membership: { ...client.membership, ...membershipData } }
          : client
      )
    );
    setShowMembershipModal(false);
  };

  const handleMedicalUpdate = (clientId, medicalData) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === clientId 
          ? { ...client, medical: { ...client.medical, ...medicalData } }
          : client
      )
    );
    setShowMedicalModal(false);
  };

  const handleWorkoutSplitUpdate = (clientId, splitData) => {
    setClients(prevClients => 
      prevClients.map(client => 
        client.id === clientId 
          ? { ...client, workoutSplit: { ...client.workoutSplit, ...splitData } }
          : client
      )
    );
    setShowWorkoutSplitModal(false);
  };

  const handleExportData = (clientId, format) => {
    // TODO: Implement actual export functionality
    console.log(`Exporting client ${clientId} data in ${format} format`);
    setShowExportModal(false);
  };

  const handleNutritionLog = (clientId) => {
    // TODO: Implement nutrition logging functionality
    console.log(`Opening nutrition tracking for client ${clientId}`);
    setShowNutritionModal(true);
  };

  const handleProgressPhotos = (clientId) => {
    // TODO: Implement progress photos functionality
    console.log(`Opening progress photos for client ${clientId}`);
    setShowProgressPhotosModal(true);
  };

  // Additional handlers for nutrition and progress photos
  const handleNutritionFormChange = (field, value) => {
    setCurrentNutritionForm(prev => ({ ...prev, [field]: value }));
  };

  const handleNutritionSubmit = (clientId) => {
    const newMeal = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      ...currentNutritionForm
    };

    setNutritionData(prev => ({
      ...prev,
      [clientId]: [...(prev[clientId] || []), newMeal]
    }));

    // Reset form
    setCurrentNutritionForm({
      mealType: 'breakfast',
      time: '',
      foodItems: '',
      calories: '',
      protein: '',
      carbs: '',
      fat: ''
    });
  };

  const handleProgressPhotoUpload = (clientId, photoData, photoType, date, notes) => {
    const newPhoto = {
      id: Date.now(),
      type: photoType,
      date: date,
      notes: notes,
      url: photoData
    };

    setProgressPhotos(prev => ({
      ...prev,
      [clientId]: [...(prev[clientId] || []), newPhoto]
    }));
  };

  const handleDeleteProgressPhoto = (clientId, photoId) => {
    setProgressPhotos(prev => ({
      ...prev,
      [clientId]: prev[clientId]?.filter(photo => photo.id !== photoId) || []
    }));
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client)
    setShowWorkoutLog(true)
  }

  const handleBackToList = () => {
    setSelectedClient(null)
  }

  const handleLogWorkout = () => {
    setShowWorkoutLog(true)
  }

  const handleCompleteExercise = (exerciseIndex) => {
    const updatedExercises = [...currentWorkout.exercises]
    updatedExercises[exerciseIndex].completed = !updatedExercises[exerciseIndex].completed
    setCurrentWorkout({ ...currentWorkout, exercises: updatedExercises })
  }

  const handleUpdateExercise = (exerciseIndex, field, value) => {
    const updatedExercises = [...currentWorkout.exercises]
    updatedExercises[exerciseIndex][field] = value
    setCurrentWorkout({ ...currentWorkout, exercises: updatedExercises })
  }

  const handleFinishWorkout = () => {
    const completedExercises = currentWorkout.exercises.filter(ex => ex.completed).length
    const totalExercises = currentWorkout.exercises.length

    // Add to workout history
    const newWorkout = {
      date: new Date().toISOString().split('T')[0],
      type: 'Strength',
      exercises: totalExercises,
      completed: completedExercises > 0,
      startTime: currentWorkout.startTime,
      endTime: new Date().toLocaleTimeString(),
      exercisesDetail: currentWorkout.exercises,
      notes: currentWorkout.notes
    }

    // Update client's workout history
    const updatedClient = { ...selectedClient }
    updatedClient.workoutHistory.unshift(newWorkout)
    setSelectedClient(updatedClient)

    // Reset and close logger
    setCurrentWorkout({
      exercises: [
        { name: 'Bench Press', sets: 3, reps: 10, weight: 135, completed: false, notes: '' },
        { name: 'Squats', sets: 3, reps: 12, weight: 185, completed: false, notes: '' },
        { name: 'Deadlifts', sets: 3, reps: 8, weight: 225, completed: false, notes: '' },
        { name: 'Pull-ups', sets: 3, reps: 8, weight: 0, completed: false, notes: '' },
        { name: 'Overhead Press', sets: 3, reps: 10, weight: 95, completed: false, notes: '' }
      ],
      startTime: new Date().toLocaleTimeString(),
      endTime: null,
      notes: ''
    })
    setShowWorkoutLog(false)
  }

  const handleAddClient = () => {
    setShowAddClient(true)
  }

  const handleSaveClient = () => {
    if (!newClient.name || !newClient.email) {
      alert('Name and email are required')
      return
    }

    const client = {
      ...newClient,
      id: clients.length + 1,
      progress: Math.floor(Math.random() * 100),
      lastSession: new Date().toISOString().split('T')[0],
      weight: Math.floor(Math.random() * 50) + 60,
      bmi: (Math.random() * 10 + 20).toFixed(1),
      bodyFat: (Math.random() * 15 + 10).toFixed(1),
      attendance: Math.floor(Math.random() * 20) + 5,
      sessions: Math.floor(Math.random() * 20) + 5,
      profilePhoto: null,
      measurements: {
        neck: Math.floor(Math.random() * 10) + 35,
        chest: Math.floor(Math.random() * 20) + 90,
        waist: Math.floor(Math.random() * 20) + 80,
        arms: Math.floor(Math.random() * 10) + 30,
        thighs: Math.floor(Math.random() * 10) + 55,
        calves: Math.floor(Math.random() * 10) + 35
      },
      workoutHistory: []
    }

    clients.push(client)
    setShowAddClient(false)
    setNewClient({
      name: '',
      email: '',
      phone: '',
      gender: '',
      age: '',
      joinDate: '',
      trainer: '',
      plan: '',
      status: 'Active',
      goals: [''],
      notes: ''
    })
  }

  const handleEditClient = (client) => {
    setEditingClient({ ...client })
    setShowEditClient(true)
  }

  const handleUpdateClient = () => {
    if (!editingClient.name || !editingClient.email) {
      alert('Name and email are required')
      return
    }

    const index = clients.findIndex(c => c.id === editingClient.id)
    if (index !== -1) {
      clients[index] = { ...editingClient }
      setShowEditClient(false)
      setEditingClient(null)
    }
  }

  const handleCancelEdit = () => {
    setShowEditClient(false)
    setEditingClient(null)
  }

  const handleAddGoal = () => {
    setNewClient({ ...newClient, goals: [...newClient.goals, ''] })
  }

  const handleRemoveGoal = (index) => {
    const updatedGoals = newClient.goals.filter((_, i) => i !== index)
    setNewClient({ ...newClient, goals: updatedGoals })
  }

  const handleUpdateGoal = (index, value) => {
    const updatedGoals = [...newClient.goals]
    updatedGoals[index] = value
    setNewClient({ ...newClient, goals: updatedGoals })
  }

  const renderClientDetail = () => {
    if (!selectedClient) return null

    return (
      <div className="h-[calc(100vh-4rem)] rounded-t-3xl bg-yellow-400 overflow-hidden">
        {/* Scrollable Content Wrapper */}
        <div className="h-full overflow-y-auto px-4 md:px-6 no-scrollbar">
          <div className="max-w-7xl mx-auto">
            {/* Header with Back Button */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={handleBackToList}
                  className="p-2 bg-black/20 hover:bg-black/30 rounded-xl transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-3xl md:text-4xl font-bold text-black">Client Details</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                  {selectedClient.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-black">{selectedClient.name}</h2>
                  <p className="text-black/70">{selectedClient.email}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border mt-2 ${getStatusColor(selectedClient.status)}`}>
                    {selectedClient.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="bg-black rounded-2xl p-2 mb-8 border border-white/10">
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'overview', label: 'Overview', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { id: 'workouts', label: 'Workouts', icon: 'M9 6v2m3-2v2m3-2v2M9 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18z' },
                  { id: 'progress', label: 'Progress', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' },
                  { id: 'measurements', label: 'Measurements', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                  { id: 'membership', label: 'Membership', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1' },
                  { id: 'medical', label: 'Medical', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
                  { id: 'workoutSplit', label: 'Workout Split', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                  { id: 'nutrition', label: 'Nutrition', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01' },
                  { id: 'notes', label: 'Notes', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${activeTab === tab.id
                      ? 'bg-yellow-400 text-black'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={tab.icon} />
                    </svg>
                    <span className="hidden md:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-black rounded-2xl p-6 border border-white/10">
              {/* Workout Logger Modal */}
              {showWorkoutLog && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold text-white">Log Today's Workout</h3>
                        <button
                          onClick={() => setShowWorkoutLog(false)}
                          className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                        >
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      {/* Workout Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-800 rounded-lg p-4">
                          <div className="text-gray-400 text-sm mb-1">Start Time</div>
                          <div className="text-white font-medium">{currentWorkout.startTime}</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4">
                          <div className="text-gray-400 text-sm mb-1">Client</div>
                          <div className="text-white font-medium">{selectedClient.name}</div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4">
                          <div className="text-gray-400 text-sm mb-1">Plan</div>
                          <div className="text-white font-medium">{selectedClient.plan}</div>
                        </div>
                      </div>

                      {/* Exercises List */}
                      <div className="space-y-4 mb-6">
                        <h4 className="text-lg font-semibold text-white">Exercises</h4>
                        {currentWorkout.exercises.map((exercise, index) => (
                          <div key={index} className={`bg-gray-800 rounded-lg p-4 border-2 transition-all duration-200 ${exercise.completed ? 'border-green-500/50 bg-green-500/10' : 'border-gray-700'
                            }`}>
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="text-white font-medium">{exercise.name}</h5>
                              <button
                                onClick={() => handleCompleteExercise(index)}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${exercise.completed
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                                  }`}
                              >
                                {exercise.completed ? 'Completed' : 'Mark Complete'}
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-gray-400 text-sm mb-1">Sets</label>
                                <input
                                  type="number"
                                  value={exercise.sets}
                                  onChange={(e) => handleUpdateExercise(index, 'sets', parseInt(e.target.value) || 0)}
                                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-400 text-sm mb-1">Reps</label>
                                <input
                                  type="number"
                                  value={exercise.reps}
                                  onChange={(e) => handleUpdateExercise(index, 'reps', parseInt(e.target.value) || 0)}
                                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              <div>
                                <label className="block text-gray-400 text-sm mb-1">Weight (lbs)</label>
                                <input
                                  type="number"
                                  value={exercise.weight}
                                  onChange={(e) => handleUpdateExercise(index, 'weight', parseInt(e.target.value) || 0)}
                                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>

                            <div className="mt-3">
                              <label className="block text-gray-400 text-sm mb-1">Notes</label>
                              <input
                                type="text"
                                value={exercise.notes}
                                onChange={(e) => handleUpdateExercise(index, 'notes', e.target.value)}
                                placeholder="Form notes, difficulty, etc."
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Overall Workout Notes */}
                      <div className="mb-6">
                        <label className="block text-gray-400 text-sm mb-2">Overall Workout Notes</label>
                        <textarea
                          value={currentWorkout.notes}
                          onChange={(e) => setCurrentWorkout({ ...currentWorkout, notes: e.target.value })}
                          placeholder="Overall feedback, energy level, client mood..."
                          className="w-full h-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={handleFinishWorkout}
                          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                          Complete Workout
                        </button>
                        <button
                          onClick={() => setShowWorkoutLog(false)}
                          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                      <div className="text-gray-400 text-sm mb-1">Current Weight</div>
                      <div className="text-2xl font-bold text-white">{selectedClient.weight} lbs</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                      <div className="text-gray-400 text-sm mb-1">BMI</div>
                      <div className="text-2xl font-bold text-white">{selectedClient.bmi}</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                      <div className="text-gray-400 text-sm mb-1">Body Fat %</div>
                      <div className="text-2xl font-bold text-white">{selectedClient.bodyFat}%</div>
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                      <div className="text-gray-400 text-sm mb-1">Sessions Attended</div>
                      <div className="text-2xl font-bold text-white">{selectedClient.attendance}</div>
                    </div>
                  </div>

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Gender:</span>
                          <span className="text-white">{selectedClient.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Age:</span>
                          <span className="text-white">{selectedClient.age} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Join Date:</span>
                          <span className="text-white">{selectedClient.joinDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Trainer:</span>
                          <span className="text-white">{selectedClient.trainer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Phone:</span>
                          <span className="text-white">{selectedClient.phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                      <h3 className="text-lg font-semibold text-white mb-4">Goals</h3>
                      <div className="space-y-2">
                        {selectedClient.goals.map((goal, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                            <span className="text-white text-sm">{goal}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Progress Overview */}
                  <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-semibold text-white mb-4">Progress Overview</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Overall Progress</span>
                          <span className="text-white font-medium">{selectedClient.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(selectedClient.progress)}`}
                            style={{ width: `${selectedClient.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{selectedClient.workoutHistory.filter(w => w.completed).length}</div>
                          <div className="text-gray-400 text-sm">Workouts Completed</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{selectedClient.workoutHistory.length}</div>
                          <div className="text-gray-400 text-sm">Total Workouts</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{Math.round((selectedClient.workoutHistory.filter(w => w.completed).length / selectedClient.workoutHistory.length) * 100)}%</div>
                          <div className="text-gray-400 text-sm">Completion Rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'workouts' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Workout History</h3>
                    <button
                      onClick={handleLogWorkout}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Log Today's Workout
                    </button>
                  </div>

                  <div className="space-y-4">
                    {selectedClient.workoutHistory.map((workout, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-medium">{workout.date}</div>
                            <div className="text-gray-400 text-sm">{workout.type} • {workout.exercises} exercises</div>
                            {workout.startTime && workout.endTime && (
                              <div className="text-gray-400 text-xs mt-1">
                                {workout.startTime} - {workout.endTime}
                              </div>
                            )}
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${workout.completed
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                            }`}>
                            {workout.completed ? 'Completed' : 'Missed'}
                          </div>
                        </div>
                        {workout.notes && (
                          <div className="mt-3 p-3 bg-gray-800/50 rounded-lg">
                            <div className="text-gray-400 text-xs mb-1">Notes:</div>
                            <div className="text-white text-sm">{workout.notes}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'progress' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Progress Tracking</h3>

                  {/* Weight Progress */}
                  <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-medium text-white mb-4">Weight Progress</h4>
                    <div className="h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">Weight chart will be displayed here</span>
                    </div>
                  </div>

                  {/* Progress Photos */}
                  <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-medium text-white mb-4">Progress Photos</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="h-32 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-600">
                        <div className="text-center">
                          <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span className="text-gray-400 text-sm">Add Photo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'measurements' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Body Measurements</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(selectedClient.measurements).map(([key, value]) => (
                      <div key={key} className="bg-gray-900/50 rounded-xl p-4 border border-white/10">
                        <div className="text-gray-400 text-sm mb-1 capitalize">{key}</div>
                        <div className="text-2xl font-bold text-white">{value}"</div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-medium text-white mb-4">Measurement Trends</h4>
                    <div className="h-32 bg-gray-800 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400">Measurement charts will be displayed here</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Trainer Notes</h3>

                  <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                    <div className="mb-4">
                      <label className="block text-gray-400 text-sm mb-2">Add New Note</label>
                      <textarea
                        className="w-full h-32 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your notes about this client..."
                      ></textarea>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200">
                      Save Note
                    </button>
                  </div>

                  <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-medium text-white mb-4">Previous Notes</h4>
                    <div className="space-y-4">
                      <div className="border-l-4 border-yellow-400 pl-4">
                        <div className="text-gray-400 text-sm mb-1">March 20, 2024</div>
                        <div className="text-white">{selectedClient.notes}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* New Enhanced Tab Content */}
              {activeTab === 'membership' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Membership Management</h3>
                    <button
                      onClick={() => setShowMembershipModal(true)}
                      className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Update Membership
                    </button>
                  </div>

                  {selectedClient.membership ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Membership Status */}
                      <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                        <h4 className="text-lg font-medium text-white mb-4">Current Status</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getMembershipStatusColor(selectedClient.membership.status)}`}>
                              {selectedClient.membership.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Type:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getMembershipTypeColor(selectedClient.membership.type)}`}>
                              {selectedClient.membership.type}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Price:</span>
                            <span className="text-white font-medium">${selectedClient.membership.price}/month</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Auto-renewal:</span>
                            <span className={`px-2 py-1 rounded text-xs ${selectedClient.membership.autoRenew ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                              {selectedClient.membership.autoRenew ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Membership Dates */}
                      <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                        <h4 className="text-lg font-medium text-white mb-4">Membership Period</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Start Date:</span>
                            <span className="text-white font-medium">{formatMembershipDate(selectedClient.membership.startDate)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">End Date:</span>
                            <span className="text-white font-medium">{formatMembershipDate(selectedClient.membership.endDate)}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Days Remaining:</span>
                            <span className={`font-medium ${isMembershipExpired(selectedClient.membership.endDate) ? 'text-red-400' : 'text-white'}`}>
                              {isMembershipExpired(selectedClient.membership.endDate) 
                                ? `${Math.abs(getDaysUntilExpiry(selectedClient.membership.endDate))} days expired`
                                : `${getDaysUntilExpiry(selectedClient.membership.endDate)} days`
                              }
                            </span>
                          </div>
                          {isMembershipExpiringSoon(selectedClient.membership.endDate) && (
                            <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <span className="text-yellow-400 text-sm font-medium">
                                  Membership expires soon! Consider renewal.
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10 text-center">
                      <div className="text-gray-400 mb-4">No membership information available</div>
                      <button
                        onClick={() => setShowMembershipModal(true)}
                        className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                      >
                        Add Membership
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'medical' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Medical Information</h3>
                    <button
                      onClick={() => setShowMedicalModal(true)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Update Medical Info
                    </button>
                  </div>

                  {selectedClient.medical ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Medical Conditions */}
                      <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                        <h4 className="text-lg font-medium text-white mb-4">Medical Conditions</h4>
                        <div className="space-y-3">
                          {selectedClient.medical.conditions.map((condition, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                              <span className="text-white text-sm">{condition}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Allergies & Medications */}
                      <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                        <h4 className="text-lg font-medium text-white mb-4">Allergies & Medications</h4>
                        <div className="space-y-4">
                          <div>
                            <h5 className="text-gray-400 text-sm mb-2">Allergies:</h5>
                            <div className="space-y-2">
                              {selectedClient.medical.allergies.map((allergy, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                                  <span className="text-white text-sm">{allergy}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-gray-400 text-sm mb-2">Current Medications:</h5>
                            <div className="space-y-2">
                              {selectedClient.medical.medications.map((med, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                  <span className="text-white text-sm">{med}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Emergency Contact */}
                      <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10 lg:col-span-2">
                        <h4 className="text-lg font-medium text-white mb-4">Emergency Contact</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <span className="text-gray-400 text-sm">Name:</span>
                            <p className="text-white font-medium">{selectedClient.medical.emergencyContact.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">Relationship:</span>
                            <p className="text-white font-medium">{selectedClient.medical.emergencyContact.relationship}</p>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">Phone:</span>
                            <p className="text-white font-medium">{selectedClient.medical.emergencyContact.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10 text-center">
                      <div className="text-gray-400 mb-4">No medical information available</div>
                      <button
                        onClick={() => setShowMedicalModal(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                      >
                        Add Medical Info
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'workoutSplit' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Workout Split & Preferences</h3>
                    <button
                      onClick={() => setShowWorkoutSplitModal(true)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Update Split
                    </button>
                  </div>

                  {selectedClient.workoutSplit ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Current Split */}
                      <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                        <h4 className="text-lg font-medium text-white mb-4">Current Split</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Split Type:</span>
                            <span className="text-white font-medium">{selectedClient.workoutSplit.current}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">Frequency:</span>
                            <span className="text-white font-medium">{selectedClient.workoutSplit.frequency}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 text-sm">Rest Days:</span>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedClient.workoutSplit.restDays.map((day, index) => (
                                <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded">
                                  {day}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Preferences */}
                      <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                        <h4 className="text-lg font-medium text-white mb-4">Training Preferences</h4>
                        <div className="space-y-3">
                          {selectedClient.workoutSplit.preferences.map((pref, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                              <span className="text-white text-sm">{pref}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10 text-center">
                      <div className="text-gray-400 mb-4">No workout split information available</div>
                      <button
                        onClick={() => setShowWorkoutSplitModal(true)}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                      >
                        Add Workout Split
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">Nutrition & Meal Tracking</h3>
                    <button
                      onClick={() => handleNutritionLog(selectedClient.id)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      Log Meal
                    </button>
                  </div>

                  <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-medium text-white mb-4">Today's Nutrition</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">0</div>
                        <div className="text-gray-400 text-sm">Calories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">0g</div>
                        <div className="text-gray-400 text-sm">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">0g</div>
                        <div className="text-gray-400 text-sm">Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">0g</div>
                        <div className="text-gray-400 text-sm">Fat</div>
                      </div>
                    </div>
                    <div className="text-center text-gray-400">
                      No meals logged today. Click "Log Meal" to get started.
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-xl p-6 border border-white/10">
                    <h4 className="text-lg font-medium text-white mb-4">Nutrition Goals</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-lg font-bold text-white">2,000</div>
                        <div className="text-gray-400 text-sm">Daily Calories</div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-lg font-bold text-white">150g</div>
                        <div className="text-gray-400 text-sm">Daily Protein</div>
                      </div>
                      <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                        <div className="text-lg font-bold text-white">200g</div>
                        <div className="text-gray-400 text-sm">Daily Carbs</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
}

if (viewMode === 'detail') {
  return renderClientDetail()
}

return (
  <div className="h-[calc(100vh-4rem)] rounded-t-3xl bg-yellow-400 overflow-hidden">
    {/* Scrollable Content Wrapper */}
    <div className="h-full overflow-y-auto px-4 md:px-6 no-scrollbar">
      <div className="max-w-7xl mx-auto">
        {/* Header and Stats Container */}
        <div className="bg-black rounded-3xl shadow-2xl border border-gray-800 overflow-hidden relative mb-4 mt-6">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/10"></div>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block relative z-10">
            <div className="px-10 py-5">
              <div className="flex items-center justify-between">
                {/* Left Section - Brand & Content */}
                <div className="flex items-center space-x-6">
                  {/* Logo Container */}
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl flex items-center justify-center shadow-2xl border border-blue-400/40 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                      <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-blue-500/20 rounded-3xl blur-xl -z-10"></div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <h1 className="text-5xl font-bold text-white font-kodchasan tracking-tight">Client Management</h1>
                      <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-xs font-medium text-green-400 font-nunito">Active</span>
                      </div>
                    </div>
                    <p className="text-gray-300 font-nunito text-mt leading-relaxed max-w-2xl">
                      Manage your fitness clients, track their progress, and optimize their workout plans for maximum results.
                    </p>
                  </div>
                </div>

                {/* Right Section - Quick Actions */}
                <div className="flex flex-col items-end space-y-4">
                  {/* Stats Summary */}
                  <div className="text-right space-y-1">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                      <p className="text-sm text-gray-400 font-nunito font-medium">Total Clients</p>
                    </div>
                    <p className="text-3xl font-bold text-white font-kodchasan">{clients.length}</p>
                  </div>

                  {/* Cards Info */}
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl p-3 border border-yellow-500/20">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                          <svg className="w-3 h-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <span className="text-xs font-semibold text-yellow-400 font-nunito">Performance Overview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="lg:hidden relative z-10">
            <div className="p-6">
              {/* Top Section - Logo & Status */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  {/* Mobile Logo */}
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 via-yellow-600 to-yellow-700 rounded-2xl flex items-center justify-center shadow-xl border border-yellow-400/40">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="absolute inset-0 bg-blue-500/20 rounded-2xl blur-lg -z-10"></div>
                  </div>

                  <div className="space-y-1">
                    <h1 className="text-2xl font-bold text-white font-kodchasan">Client Management</h1>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400 font-nunito font-medium">Active</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Stats */}
                <div className="text-right">
                  <p className="text-lg font-semibold text-white font-kodchasan">{clients.length}</p>
                  <p className="text-xs text-gray-500 font-nunito">Clients</p>
                </div>
              </div>

              {/* Middle Section - Description */}
              <div className="mb-5">
                <p className="text-gray-300 font-nunito text-base leading-relaxed">
                  Manage your fitness clients, track their progress, and optimize their workout plans.
                </p>
              </div>

              {/* Bottom Section - Cards Info */}
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-xl p-3 border border-yellow-500/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-semibold text-yellow-400 font-kodchasan">Performance Overview</p>
                      <p className="text-xs text-yellow-400/70 font-nunito">Live client metrics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Gradient Border */}
          <div className="h-1 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>

        {/* Stats Cards Section */}
        <div className="space-y-6 mb-5">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Total Clients */}
            <div className="group relative bg-black backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-gray-800 hover:border-yellow-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/10"></div>
              </div>

              <div className="relative z-10">
                {/* Icon and Metric Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-yellow-500/30 group-hover:border-yellow-400/50">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs md:text-sm font-medium font-nunito mb-1">Total</p>
                    <p className="text-3xl md:text-4xl font-bold text-white font-kodchasan leading-none">{clients.length}</p>
                  </div>
                </div>

                {/* Description and Trend */}
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm md:text-base font-semibold font-nunito">Active Clients</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-xs text-gray-400 font-nunito">All time clients</span>
                  </div>
                </div>
              </div>
            </div>

            {/* New Clients This Month */}
            <div className="group relative bg-black backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 via-transparent to-green-400/10"></div>
              </div>

              <div className="relative z-10">
                {/* Icon and Metric Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-green-500/30 group-hover:border-green-400/50">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs md:text-sm font-medium font-nunito mb-1">New</p>
                    <p className="text-3xl md:text-4xl font-bold text-white font-kodchasan leading-none">
                      {clients.filter(c => {
                        const joinDate = new Date(c.joinDate)
                        const now = new Date()
                        return joinDate.getMonth() === now.getMonth() && joinDate.getFullYear() === now.getFullYear()
                      }).length}
                    </p>
                  </div>
                </div>

                {/* Description and Trend */}
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm md:text-base font-semibold font-nunito">This Month</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-400 font-nunito">Recent signups</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Average Session Attendance */}
            <div className="group relative bg-black backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-gray-800 hover:border-blue-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-transparent to-blue-400/10"></div>
              </div>

              <div className="relative z-10">
                {/* Icon and Metric Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-blue-500/30 group-hover:border-blue-400/50">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs md:text-sm font-medium font-nunito mb-1">Avg</p>
                    <p className="text-3xl md:text-4xl font-bold text-white font-kodchasan leading-none">
                      {clients.length > 0 ? Math.round(clients.reduce((sum, c) => sum + c.attendance, 0) / clients.length) : 0}
                    </p>
                  </div>
                </div>

                {/* Description and Trend */}
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm md:text-base font-semibold font-nunito">Sessions</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-xs text-gray-400 font-nunito">Per client</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clients with Workouts Today */}
            <div className="group relative bg-black backdrop-blur-sm rounded-2xl p-5 md:p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-500 hover:transform hover:-translate-y-2 overflow-hidden">
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-transparent to-purple-400/10"></div>
              </div>

              <div className="relative z-10">
                {/* Icon and Metric Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-purple-500/30 group-hover:border-purple-400/50">
                    <svg className="w-6 h-6 md:w-7 md:h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-xs md:text-sm font-medium font-nunito mb-1">Today</p>
                    <p className="text-3xl md:text-4xl font-bold text-white font-kodchasan leading-none">
                      {clients.filter(c => {
                        const lastSession = new Date(c.lastSession)
                        const today = new Date()
                        return lastSession.toDateString() === today.toDateString()
                      }).length}
                    </p>
                  </div>
                </div>

                {/* Description and Trend */}
                <div className="space-y-3">
                  <p className="text-gray-300 text-sm md:text-base font-semibold font-nunito">Workouts</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-xs text-gray-400 font-nunito">Scheduled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="p-3 bg-black rounded-3xl">
          {/* Search and Filters Container */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            {/* Search Section */}
            <div className="flex-1 max-w-xl">
              <div className="relative group">
                {/* Search Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search clients by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-yellow-300/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm hover:border-gray-600/70"
                />

                {/* Search Focus Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/5 via-transparent to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Filters and Actions Section */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
              {/* Status Filter */}
              <div className="relative group">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm hover:border-gray-600/70 appearance-none cursor-pointer min-w-[140px]"
                >
                  <option value="all" className="bg-gray-900 text-white">All Status</option>
                  <option value="Active" className="bg-gray-900 text-white">Active</option>
                  <option value="Inactive" className="bg-gray-900 text-white">Inactive</option>
                </select>

                {/* Custom Dropdown Arrow */}
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none group-focus-within:text-yellow-400 transition-colors duration-300">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Add Client Button */}
              <button
                onClick={handleAddClient}
                className="group relative bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/30 hover:to-yellow-600/30 px-6 py-3 text-yellow-400 font-semibold rounded-2xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 backdrop-blur-sm hover:transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 bg-yellow-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-3 h-3 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="font-nunito">Add Client</span>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || statusFilter !== 'all') && (
            <div className="mt-4 pt-4 border-t border-gray-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400 font-nunito">Active filters:</span>
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                      Search: "{searchTerm}"
                    </span>
                  )}
                  {statusFilter !== 'all' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      Status: {statusFilter}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
                  className="text-sm text-gray-400 hover:text-yellow-400 transition-colors duration-200 font-nunito"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Professional Spacing */}
        <div className="mb-3"></div>

        {/* Main Grid Layout */}
        <div className="col-span-12 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
            {/* Left Column - Clients Grid */}
            <div className="w-full lg:col-span-8 space-y-4">
              {/* Clients Grid Container */}
              <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white font-kodchasan">Client Management</h2>
                    <p className="text-gray-400 font-nunito text-sm">Manage your clients and their progress</p>
                  </div>
                </div>

                {/* Hide scrollbar utility (scoped) */}
                <style>{`
                  .no-scrollbar::-webkit-scrollbar { display: none; }
                  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>

                {/* Professional Clients Grid */}
                <div className="h-88 overflow-y-auto no-scrollbar py-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredClients.map((client) => (
                      <div key={client.id} className="group relative bg-black/25 rounded-xl p-5 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:-translate-y-1 cursor-pointer overflow-hidden" onClick={() => handleViewDetails(client)}>
                        {/* Hover Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/10"></div>
                        </div>

                        <div className="relative z-10">
                          {/* Client Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {/* Profile Photo or Initials */}
                              {client.profilePhoto ? (
                                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-yellow-400/30 group-hover:border-yellow-400/50 transition-all duration-300 shadow-lg">
                                  <img 
                                    src={client.profilePhoto} 
                                    alt={client.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg border border-yellow-400/30 group-hover:border-yellow-400/50 transition-all duration-300">
                                  {client.name.charAt(0)}
                                </div>
                              )}
                              <div className="min-w-0 flex-1">
                                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300 truncate">
                                  {client.name}
                                </h3>
                                <p className="text-gray-400 text-sm truncate">{client.email}</p>
                                {/* Membership Status */}
                                <div className="flex items-center gap-2 mt-1">
                                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getMembershipStatusColor(client.membership?.status)}`}>
                                    {client.membership?.status || 'No Membership'}
                                  </span>
                                  {client.membership?.status === 'Active' && (
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getMembershipTypeColor(client.membership?.type)}`}>
                                      {client.membership?.type}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <span className={`px-3 py-1.5 rounded-full text-xs font-medium border flex-shrink-0 ${getStatusColor(client.status)}`}>
                              {client.status}
                            </span>
                          </div>

                          {/* Client Stats Grid */}
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-gray-800/60 rounded-lg p-2 text-center border border-gray-700/50 group-hover:border-gray-600/50 transition-all duration-300">
                              <p className="text-xs text-gray-400 font-medium mb-1">Progress</p>
                              <div className="flex items-center justify-center space-x-2">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <p className="text-sm font-bold text-white">{client.progress}%</p>
                              </div>
                            </div>
                            <div className="bg-gray-800/60 rounded-lg p-2 text-center border border-gray-700/50 group-hover:border-gray-600/50 transition-all duration-300">
                              <p className="text-xs text-gray-400 font-medium mb-1">Plan</p>
                              <p className="text-sm font-semibold text-white truncate">{client.plan}</p>
                            </div>
                          </div>

                          {/* Workout Split Info */}
                          {client.workoutSplit && (
                            <div className="bg-gray-800/40 rounded-lg p-3 mb-4 border border-gray-700/30">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-gray-400 font-medium">Workout Split</span>
                                <span className="text-xs text-yellow-400 font-medium">{client.workoutSplit.frequency}</span>
                              </div>
                              <p className="text-sm text-white font-medium">{client.workoutSplit.current}</p>
                            </div>
                          )}

                          {/* Additional Info */}
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Last Session:</span>
                              <span className="text-gray-300 font-medium">{client.lastSession}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">Trainer:</span>
                              <span className="text-gray-300 font-medium">{client.trainer}</span>
                            </div>
                            {/* Membership Expiry Warning */}
                            {client.membership && isMembershipExpiringSoon(client.membership.endDate) && (
                              <div className="flex items-center gap-2 text-xs">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <span className="text-yellow-400 font-medium">
                                  Expires in {getDaysUntilExpiry(client.membership.endDate)} days
                                </span>
                              </div>
                            )}
                            {client.membership && isMembershipExpired(client.membership.endDate) && (
                              <div className="flex items-center gap-2 text-xs">
                                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                <span className="text-red-400 font-medium">
                                  Expired {Math.abs(getDaysUntilExpiry(client.membership.endDate))} days ago
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Quick Action */}
                          <div className="flex justify-center">
                            <button className="w-full px-4 py-2.5 text-sm bg-yellow-400 text-white rounded-lg border border-yellow-500 hover:bg-yellow-500 hover:border-yellow-400 transition-all duration-300 group-hover:bg-yellow-500 group-hover:border-yellow-400/50">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Workout Logging Shortcuts */}
            <div className="w-full lg:col-span-4 space-y-6">
              {/* Quick Workout Logging */}
              <div className="bg-black rounded-2xl p-6 shadow-2xl border border-gray-800 relative overflow-hidden">
                {/* Background gradient effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-yellow-400/3"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-white font-kodchasan">Quick Actions</h2>
                      <p className="text-gray-400 font-nunito text-sm">Log today's workouts quickly</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-xl flex items-center justify-center border border-yellow-400/30 shadow-lg">
                      <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Today's Workout Logs */}
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-gray-900/80 to-gray-800/60 rounded-xl p-4 border border-gray-700/50 backdrop-blur-sm">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-white font-kodchasan">Today's Sessions</h3>
                        <span className="text-xs text-yellow-400 bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20 font-medium">
                          {filteredClients.filter(client => client.status === 'Active').length} Active
                        </span>
                      </div>
                      <div className="space-y-3">
                        {filteredClients.slice(0, 3).map((client) => (
                          <div key={client.id} className="group flex items-center justify-between p-3 bg-gradient-to-r from-gray-800/50 to-gray-700/30 rounded-xl border border-gray-600/30 hover:border-yellow-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-lg flex items-center justify-center text-black text-sm font-bold shadow-md border border-yellow-300/50 group-hover:scale-110 transition-transform duration-200">
                                {client.name.charAt(0)}
                              </div>
                              <div>
                                <span className="text-sm font-medium text-white font-nunito">{client.name}</span>
                                <p className="text-xs text-gray-400">{client.plan}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleLogWorkout()}
                              className="px-4 py-2 text-xs bg-gradient-to-r from-green-500/20 to-green-600/20 text-green-400 rounded-lg border border-green-500/30 hover:from-green-500/30 hover:to-green-600/30 hover:border-green-400/50 transition-all duration-200 font-medium shadow-sm hover:shadow-lg hover:shadow-green-500/20"
                            >
                              Log Workout
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Stats with enhanced design */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-xl p-4 border border-blue-500/20 text-center group hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mx-auto mb-3 border border-blue-500/30 group-hover:scale-110 transition-transform duration-200">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-400 font-nunito mb-1">Logged Today</p>
                        <p className="text-xl font-bold text-white font-kodchasan">8</p>
                        <div className="w-full bg-blue-500/20 rounded-full h-1 mt-2">
                          <div className="bg-blue-400 h-1 rounded-full" style={{width: '80%'}}></div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-xl p-4 border border-green-500/20 text-center group hover:border-green-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl flex items-center justify-center mx-auto mb-3 border border-green-500/30 group-hover:scale-110 transition-transform duration-200">
                          <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-400 font-nunito mb-1">Completed</p>
                        <p className="text-xl font-bold text-white font-kodchasan">6</p>
                        <div className="w-full bg-green-500/20 rounded-full h-1 mt-2">
                          <div className="bg-green-400 h-1 rounded-full" style={{width: '75%'}}></div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <button className="flex-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500/30 hover:to-yellow-600/30 text-yellow-400 px-4 py-3 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-200 font-medium text-sm font-nunito hover:shadow-lg hover:shadow-yellow-500/20">
                          <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          New Workout
                        </button>
                        <button className="flex-1 bg-gradient-to-r from-purple-500/20 to-purple-600/20 hover:from-purple-500/30 hover:to-purple-600/30 text-purple-400 px-4 py-3 rounded-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-200 font-medium text-sm font-nunito hover:shadow-lg hover:shadow-purple-500/20">
                          <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          View Logs
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 lg:w-12 lg:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-lg lg:text-xl font-semibold text-white mb-2">No clients found</h3>
          <p className="text-gray-400 mb-6 text-sm lg:text-base">Try adjusting your search or filter criteria</p>
          <button
            onClick={handleAddClient}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200"
          >
            Add Your First Client
          </button>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Add New Client</h3>
                <button
                  onClick={() => setShowAddClient(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Email *</label>
                    <input
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Phone *</label>
                    <input
                      type="tel"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Gender</label>
                    <select
                      value={newClient.gender}
                      onChange={(e) => setNewClient({ ...newClient, gender: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Age</label>
                    <input
                      type="number"
                      value={newClient.age}
                      onChange={(e) => setNewClient({ ...newClient, age: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter age"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Join Date</label>
                    <input
                      type="date"
                      value={newClient.joinDate}
                      onChange={(e) => setNewClient({ ...newClient, joinDate: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Trainer</label>
                    <select
                      value={newClient.trainer}
                      onChange={(e) => setNewClient({ ...newClient, trainer: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Mike Trainer">Mike Trainer</option>
                      <option value="Sarah Trainer">Sarah Trainer</option>
                      <option value="John Trainer">John Trainer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">Plan</label>
                    <select
                      value={newClient.plan}
                      onChange={(e) => setNewClient({ ...newClient, plan: e.target.value })}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="General Fitness">General Fitness</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Muscle Gain">Muscle Gain</option>
                      <option value="Strength Training">Strength Training</option>
                      <option value="Endurance">Endurance</option>
                      <option value="Flexibility">Flexibility</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Status</label>
                  <select
                    value={newClient.status}
                    onChange={(e) => setNewClient({ ...newClient, status: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Goals */}
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Goals</label>
                  <div className="space-y-2">
                    {newClient.goals.map((goal, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={goal}
                          onChange={(e) => handleUpdateGoal(index, e.target.value)}
                          className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter goal"
                        />
                        {newClient.goals.length > 1 && (
                          <button
                            onClick={() => handleRemoveGoal(index)}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={handleAddGoal}
                      className="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors duration-200 text-sm"
                    >
                      + Add Goal
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Notes</label>
                  <textarea
                    value={newClient.notes}
                    onChange={(e) => setNewClient({ ...newClient, notes: e.target.value })}
                    className="w-full h-24 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Any additional notes about the client..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleSaveClient}
                  className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Add Client
                </button>
                <button
                  onClick={() => setShowAddClient(false)}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Client Modal */}
      {showEditClient && editingClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-white">Edit Client</h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  value={editingClient.name}
                  onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  value={editingClient.email}
                  onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  value={editingClient.phone}
                  onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                <select
                  value={editingClient.gender}
                  onChange={(e) => setEditingClient({ ...editingClient, gender: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                <input
                  type="number"
                  value={editingClient.age}
                  onChange={(e) => setEditingClient({ ...editingClient, age: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Join Date</label>
                <input
                  type="date"
                  value={editingClient.joinDate}
                  onChange={(e) => setEditingClient({ ...editingClient, joinDate: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Trainer</label>
                <input
                  type="text"
                  value={editingClient.trainer}
                  onChange={(e) => setEditingClient({ ...editingClient, trainer: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Assigned trainer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Plan</label>
                <select
                  value={editingClient.plan}
                  onChange={(e) => setEditingClient({ ...editingClient, plan: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select plan</option>
                  <option value="Weight Loss">Weight Loss</option>
                  <option value="Muscle Gain">Muscle Gain</option>
                  <option value="General Fitness">General Fitness</option>
                  <option value="Athletic Performance">Athletic Performance</option>
                  <option value="Rehabilitation">Rehabilitation</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <select
                  value={editingClient.status}
                  onChange={(e) => setEditingClient({ ...editingClient, status: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Goals</label>
              {editingClient.goals.map((goal, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => {
                      const newGoals = [...editingClient.goals]
                      newGoals[index] = e.target.value
                      setEditingClient({ ...editingClient, goals: newGoals })
                    }}
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter goal"
                  />
                  <button
                    onClick={() => {
                      const newGoals = editingClient.goals.filter((_, i) => i !== index)
                      setEditingClient({ ...editingClient, goals: newGoals })
                    }}
                    className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={() => setEditingClient({ ...editingClient, goals: [...editingClient.goals, ''] })}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Goal
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
              <textarea
                value={editingClient.notes}
                onChange={(e) => setEditingClient({ ...editingClient, notes: e.target.value })}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Additional notes about the client"
              />
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={handleCancelEdit}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateClient}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Update Client
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Photo Management Modal */}
      {showProfilePhotoModal && selectedClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-kodchasan">Profile Photo</h3>
              <button
                onClick={() => setShowProfilePhotoModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="text-center mb-6">
              {selectedClient.profilePhoto ? (
                <div className="relative inline-block">
                  <img
                    src={selectedClient.profilePhoto}
                    alt={selectedClient.name}
                    className="w-32 h-32 rounded-2xl object-cover border-4 border-yellow-400/30 shadow-2xl"
                  />
                  <button
                    onClick={() => handleProfilePhotoUpload(selectedClient.id, null)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold mx-auto border-4 border-yellow-400/30 shadow-2xl">
                  {selectedClient.name.charAt(0)}
                </div>
              )}
              <p className="text-gray-400 mt-3 font-nunito">{selectedClient.name}</p>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-sm text-gray-300 font-medium mb-2 block">Upload New Photo</span>
                <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          handleProfilePhotoUpload(selectedClient.id, e.target.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                    id="profile-photo-upload"
                  />
                  <label htmlFor="profile-photo-upload" className="cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl flex items-center justify-center mx-auto mb-3 border border-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-200">
                      <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-400 group-hover:text-yellow-400 transition-colors">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </label>
                </div>
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowProfilePhotoModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowProfilePhotoModal(false)}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Membership Management Modal */}
      {showMembershipModal && selectedClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-kodchasan">Membership Management</h3>
              <button
                onClick={() => setShowMembershipModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-2">Status</label>
                  <select 
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    defaultValue={selectedClient.membership?.status || 'Active'}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Expired">Expired</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-2">Type</label>
                  <select 
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    defaultValue={selectedClient.membership?.type || 'Basic'}
                  >
                    <option value="Basic">Basic</option>
                    <option value="Premium">Premium</option>
                    <option value="Elite">Elite</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-2">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    placeholder="0.00"
                    defaultValue={selectedClient.membership?.price || ''}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-2">Start Date</label>
                  <input
                    type="date"
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    defaultValue={selectedClient.membership?.startDate || ''}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-2">End Date</label>
                  <input
                    type="date"
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    defaultValue={selectedClient.membership?.endDate || ''}
                  />
                </div>

                <div className="flex items-center pt-6">
                  <input
                    type="checkbox"
                    id="auto-renew"
                    className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                    defaultChecked={selectedClient.membership?.autoRenew || false}
                  />
                  <label htmlFor="auto-renew" className="ml-2 text-sm text-gray-300">
                    Auto-renew membership
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={() => setShowMembershipModal(false)}
                className="flex-1 px-4 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
                              <button
                  onClick={() => {
                    const formData = {
                      status: document.querySelector('select[defaultValue]').value,
                      type: document.querySelectorAll('select')[1].value,
                      price: parseFloat(document.querySelector('input[type="number"]').value) || 0,
                      startDate: document.querySelector('input[type="date"]').value,
                      endDate: document.querySelectorAll('input[type="date"]')[1].value,
                      autoRenew: document.querySelector('input[type="checkbox"]').checked
                    };
                    handleMembershipUpdate(selectedClient.id, formData);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
                >
                  Update Membership
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Medical Details Modal */}
      {showMedicalModal && selectedClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-kodchasan">Medical Information</h3>
              <button
                onClick={() => setShowMedicalModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Medical Conditions</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors h-20 resize-none"
                  placeholder="List any medical conditions..."
                  defaultValue={selectedClient.medical?.conditions?.join(', ') || ''}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Allergies</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors h-20 resize-none"
                  placeholder="List any allergies..."
                  defaultValue={selectedClient.medical?.allergies?.join(', ') || ''}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Current Medications</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors h-20 resize-none"
                  placeholder="List current medications..."
                  defaultValue={selectedClient.medical?.medications?.join(', ') || ''}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-2">Emergency Contact Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    placeholder="Full Name"
                    defaultValue={selectedClient.medical?.emergencyContact?.name || ''}
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 font-medium mb-2">Relationship</label>
                  <input
                    type="text"
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    placeholder="e.g., Spouse, Parent"
                    defaultValue={selectedClient.medical?.emergencyContact?.relationship || ''}
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm text-gray-300 font-medium mb-2">Emergency Contact Phone</label>
                  <input
                    type="tel"
                    className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                    placeholder="Phone Number"
                    defaultValue={selectedClient.medical?.emergencyContact?.phone || ''}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={() => setShowMedicalModal(false)}
                className="flex-1 px-4 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
                              <button
                  onClick={() => {
                    const formData = {
                      conditions: document.querySelectorAll('textarea')[0].value.split(',').map(s => s.trim()).filter(s => s),
                      allergies: document.querySelectorAll('textarea')[1].value.split(',').map(s => s.trim()).filter(s => s),
                      medications: document.querySelectorAll('textarea')[2].value.split(',').map(s => s.trim()).filter(s => s),
                      emergencyContact: {
                        name: document.querySelectorAll('input[type="text"]')[0].value,
                        relationship: document.querySelectorAll('input[type="text"]')[1].value,
                        phone: document.querySelector('input[type="tel"]').value
                      }
                    };
                    handleMedicalUpdate(selectedClient.id, formData);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
                >
                  Update Medical Info
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Workout Split Management Modal */}
      {showWorkoutSplitModal && selectedClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-kodchasan">Workout Split Management</h3>
              <button
                onClick={() => setShowWorkoutSplitModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Current Split</label>
                <select 
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  defaultValue={selectedClient.workoutSplit?.current || 'Push-Pull-Legs'}
                >
                  <option value="Push-Pull-Legs">Push-Pull-Legs</option>
                  <option value="Upper-Lower">Upper-Lower</option>
                  <option value="Full Body">Full Body</option>
                  <option value="Bro Split">Bro Split</option>
                  <option value="Custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Training Frequency</label>
                <select 
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  defaultValue={selectedClient.workoutSplit?.frequency || '6 days/week'}
                >
                  <option value="3 days/week">3 days/week</option>
                  <option value="4 days/week">4 days/week</option>
                  <option value="5 days/week">5 days/week</option>
                  <option value="6 days/week">6 days/week</option>
                  <option value="7 days/week">7 days/week</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Rest Days</label>
                <div className="grid grid-cols-7 gap-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                    <label key={day} className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                        defaultChecked={selectedClient.workoutSplit?.restDays?.includes(day) || false}
                      />
                      <span className="ml-2 text-sm text-gray-300">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Training Preferences</label>
                <textarea
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors h-20 resize-none"
                  placeholder="e.g., Compound movements, Progressive overload, High volume..."
                  defaultValue={selectedClient.workoutSplit?.preferences?.join(', ') || ''}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={() => setShowWorkoutSplitModal(false)}
                className="flex-1 px-4 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
                              <button
                  onClick={() => {
                    const formData = {
                      current: document.querySelector('select').value,
                      frequency: document.querySelectorAll('select')[1].value,
                      restDays: Array.from(document.querySelectorAll('input[type="checkbox"]')).map((checkbox, index) => 
                        checkbox.checked ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] : null
                      ).filter(day => day),
                      preferences: document.querySelector('textarea').value.split(',').map(s => s.trim()).filter(s => s)
                    };
                    handleWorkoutSplitUpdate(selectedClient.id, formData);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
                >
                  Update Workout Split
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Data Modal */}
      {showExportModal && selectedClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-kodchasan">Export Client Data</h3>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Export Format</label>
                <select 
                  className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                >
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                  <option value="excel">Excel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 font-medium mb-2">Data to Include</label>
                <div className="space-y-2">
                  {[
                    { id: 'profile', label: 'Profile Information', defaultChecked: true },
                    { id: 'workouts', label: 'Workout History', defaultChecked: true },
                    { id: 'progress', label: 'Progress Data', defaultChecked: true },
                    { id: 'measurements', label: 'Body Measurements', defaultChecked: true },
                    { id: 'membership', label: 'Membership Details', defaultChecked: true },
                    { id: 'medical', label: 'Medical Information', defaultChecked: false },
                    { id: 'notes', label: 'Notes & Comments', defaultChecked: true }
                  ].map(item => (
                    <label key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded focus:ring-yellow-500 focus:ring-2"
                        defaultChecked={item.defaultChecked}
                      />
                      <span className="ml-2 text-sm text-gray-300">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
                              <button
                  onClick={() => {
                    const selectedData = Array.from(document.querySelectorAll('input[type="checkbox"]')).map((checkbox, index) => 
                      checkbox.checked ? ['profile', 'workouts', 'progress', 'measurements', 'membership', 'medical', 'notes'][index] : null
                    ).filter(item => item);
                    handleExportData(selectedClient.id, exportFormat);
                  }}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
                >
                  Export Data
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Nutrition Tracking Modal */}
      {showNutritionModal && selectedClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-4xl border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-kodchasan">Nutrition Tracking</h3>
              <button
                onClick={() => setShowNutritionModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Daily Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-white mb-4 font-kodchasan">Today's Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Calories</span>
                      <span className="text-white font-medium">1,850 / 2,200</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '84%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Protein</span>
                      <span className="text-white font-medium">120g / 150g</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '80%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Carbs</span>
                      <span className="text-white font-medium">180g / 220g</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '82%'}}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Fat</span>
                      <span className="text-white font-medium">65g / 75g</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '87%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Meal Logging */}
              <div className="lg:col-span-2">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                  <h4 className="text-lg font-semibold text-white mb-4 font-kodchasan">Log Meal</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                             <div>
                         <label className="block text-sm text-gray-300 font-medium mb-2">Meal Type</label>
                         <select 
                           className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                           value={currentNutritionForm.mealType}
                           onChange={(e) => handleNutritionFormChange('mealType', e.target.value)}
                         >
                           <option value="breakfast">Breakfast</option>
                           <option value="lunch">Lunch</option>
                           <option value="dinner">Dinner</option>
                           <option value="snack">Snack</option>
                         </select>
                       </div>
                       <div>
                         <label className="block text-sm text-gray-300 font-medium mb-2">Time</label>
                         <input
                           type="time"
                           className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                           value={currentNutritionForm.time}
                           onChange={(e) => handleNutritionFormChange('time', e.target.value)}
                         />
                       </div>
                    </div>
                    
                                         <div>
                       <label className="block text-sm text-gray-300 font-medium mb-2">Food Items</label>
                       <textarea
                         className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors h-20 resize-none"
                         placeholder="Describe what you ate..."
                         value={currentNutritionForm.foodItems}
                         onChange={(e) => handleNutritionFormChange('foodItems', e.target.value)}
                       />
                     </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                             <div>
                         <label className="block text-sm text-gray-300 font-medium mb-2">Calories</label>
                         <input
                           type="number"
                           className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                           placeholder="0"
                           value={currentNutritionForm.calories}
                           onChange={(e) => handleNutritionFormChange('calories', e.target.value)}
                         />
                       </div>
                       <div>
                         <label className="block text-sm text-gray-300 font-medium mb-2">Protein (g)</label>
                         <input
                           type="number"
                           className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-2 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                           placeholder="0"
                           value={currentNutritionForm.protein}
                           onChange={(e) => handleNutritionFormChange('protein', e.target.value)}
                         />
                       </div>
                       <div>
                         <label className="block text-sm text-gray-300 font-medium mb-2">Carbs (g)</label>
                         <input
                           type="number"
                           className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                           placeholder="0"
                           value={currentNutritionForm.carbs}
                           onChange={(e) => handleNutritionFormChange('carbs', e.target.value)}
                         />
                       </div>
                       <div>
                         <label className="block text-sm text-gray-300 font-medium mb-2">Fat (g)</label>
                         <input
                           type="number"
                           className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                           placeholder="0"
                           value={currentNutritionForm.fat}
                           onChange={(e) => handleNutritionFormChange('fat', e.target.value)}
                         />
                       </div>
                    </div>

                                         <div className="flex gap-3 pt-4">
                       <button 
                         onClick={() => setCurrentNutritionForm({
                           mealType: 'breakfast',
                           time: '',
                           foodItems: '',
                           calories: '',
                           protein: '',
                           carbs: '',
                           fat: ''
                         })}
                         className="flex-1 px-4 py-3 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition-colors font-medium"
                       >
                         Clear
                       </button>
                       <button 
                         onClick={() => handleNutritionSubmit(selectedClient.id)}
                         className="flex-1 px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
                       >
                         Log Meal
                       </button>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Photos Modal */}
      {showProgressPhotosModal && selectedClient && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-6xl border border-gray-700 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-kodchasan">Progress Photos</h3>
              <button
                onClick={() => setShowProgressPhotosModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Photo Upload */}
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <h4 className="text-lg font-semibold text-white mb-4 font-kodchasan">Upload New Photo</h4>
                <div className="space-y-4">
                                     <div>
                     <label className="block text-sm text-gray-300 font-medium mb-2">Photo Type</label>
                     <select 
                       className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                       id="photo-type-select"
                     >
                       <option value="front">Front View</option>
                       <option value="back">Back View</option>
                       <option value="side">Side View</option>
                       <option value="other">Other</option>
                     </select>
                   </div>
                   
                   <div>
                     <label className="block text-sm text-gray-300 font-medium mb-2">Date Taken</label>
                     <input
                       type="date"
                       className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                       id="photo-date-input"
                     />
                   </div>

                   <div>
                     <label className="block text-sm text-gray-300 font-medium mb-2">Notes</label>
                     <textarea
                       className="w-full bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-yellow-500 focus:outline-none transition-colors h-20 resize-none"
                       placeholder="Add notes about this progress photo..."
                       id="photo-notes-input"
                     />
                   </div>

                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-6 text-center hover:border-yellow-500/50 transition-colors cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="progress-photo-upload"
                    />
                    <label htmlFor="progress-photo-upload" className="cursor-pointer">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl flex items-center justify-center mx-auto mb-3 border border-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-200">
                        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-400 group-hover:text-yellow-400 transition-colors">
                        Click to upload progress photo
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    </label>
                  </div>

                                     <button 
                     onClick={() => {
                       const photoType = document.getElementById('photo-type-select').value;
                       const date = document.getElementById('photo-date-input').value;
                       const notes = document.getElementById('photo-notes-input').value;
                       // For now, we'll use a placeholder image URL
                       const photoData = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xMDAgMTEwQzExMC45NTYgMTEwIDEyMCAxMDAuOTU2IDEyMCA5MEMxMjAgNzkuMDQ0NCAxMTAuOTU2IDcwIDEwMCA3MEM4OS4wNDQ0IDcwIDgwIDc5LjA0NDQgODAgOTBDODAgMTAwLjk1NiA4OS4wNDQ0IDExMCAxMDAgMTEwWiIgZmlsbD0iI0Y5Q0EwNCIvPgo8L3N2Zz4K';
                       handleProgressPhotoUpload(selectedClient.id, photoData, photoType, date, notes);
                     }}
                     className="w-full px-4 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-xl hover:from-yellow-400 hover:to-yellow-500 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:shadow-yellow-500/25"
                   >
                     Upload Photo
                   </button>
                </div>
              </div>

              {/* Photo Gallery */}
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <h4 className="text-lg font-semibold text-white mb-4 font-kodchasan">Photo Gallery</h4>
                                 <div className="grid grid-cols-2 gap-3">
                   {progressPhotos[selectedClient.id] && progressPhotos[selectedClient.id].length > 0 ? (
                     progressPhotos[selectedClient.id].map((photo) => (
                       <div key={photo.id} className="relative aspect-square bg-gray-700 rounded-lg border border-gray-600 overflow-hidden group">
                         <img
                           src={photo.url}
                           alt={`${photo.type} view`}
                           className="w-full h-full object-cover"
                         />
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                           <button
                             onClick={() => handleDeleteProgressPhoto(selectedClient.id, photo.id)}
                             className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                           >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                             </svg>
                           </button>
                         </div>
                         <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2 text-xs text-white">
                           <div className="font-medium">{photo.type}</div>
                           <div className="text-gray-300">{photo.date}</div>
                         </div>
                       </div>
                     ))
                   ) : (
                     <>
                       <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                         <span className="text-gray-400 text-sm">No photos yet</span>
                       </div>
                       <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                         <span className="text-gray-400 text-sm">No photos yet</span>
                       </div>
                       <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                         <span className="text-gray-400 text-sm">No photos yet</span>
                       </div>
                       <div className="aspect-square bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                         <span className="text-gray-400 text-sm">No photos yet</span>
                       </div>
                     </>
                   )}
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default Clients
