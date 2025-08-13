import { useState } from 'preact/hooks'
import { Eye, EyeOff, Lock, User, Zap } from 'lucide-preact'

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate login validation
    setTimeout(() => {
      if (formData.username && formData.password) {
        // For demo purposes, accept any non-empty credentials
        onLogin(formData)
      } else {
        setError('Please enter both username and password')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-yellow-400/10"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-3xl flex items-center justify-center shadow-2xl border border-yellow-300/40 transform rotate-3 hover:rotate-0 transition-transform duration-300 mx-auto">
              <Zap className="w-10 h-10 text-black" />
            </div>
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-yellow-400/20 rounded-3xl blur-xl -z-10"></div>
          </div>
          
          <h1 className="text-4xl font-bold text-white font-kodchasan tracking-tight mb-2">
            FitTrackPro
          </h1>
          <p className="text-gray-400 font-nunito text-sm">
            Welcome back! Please sign in to your account
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-black/50 backdrop-blur-sm rounded-3xl border border-gray-800 shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-semibold text-gray-300 font-nunito">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 font-nunito"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-300 font-nunito">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300 font-nunito"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                <p className="text-red-400 text-sm font-nunito">{error}</p>
              </div>
            )}

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-yellow-500 bg-gray-900 border-gray-700 rounded focus:ring-yellow-500/50 focus:ring-2"
                />
                <span className="text-sm text-gray-400 font-nunito">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-yellow-400 hover:text-yellow-300 font-nunito transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>

                         {/* Login Button */}
             <button
               type="submit"
               disabled={isLoading}
               className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl font-kodchasan"
             >
               {isLoading ? (
                 <div className="flex items-center justify-center space-x-2">
                   <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                   <span>Signing in...</span>
                 </div>
               ) : (
                 'Sign In'
               )}
             </button>
           </form>

           {/* Create Account Option */}
           <div className="mt-6 text-center">
             <p className="text-sm text-gray-400 font-nunito">
               Don't have an account?{' '}
               <button
                 type="button"
                 className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors duration-200"
               >
                 Create new account
               </button>
             </p>
           </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm font-nunito">
            © 2024 FitTrackPro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
