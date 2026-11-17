import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, HardHat, Home, Eye, EyeOff } from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/button'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { currentRole, setCurrentRole } = useProjects()
  const { showToast } = useToast()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      const userDisplayName = email ? email.split('@')[0] : (currentRole === 'contractor' ? 'Contractor' : 'Homeowner')
      showToast(`Welcome back, ${userDisplayName}!`, 'success')
      navigate('/', { replace: true })
    }, 400)
  }

  return (
    <div
      data-role={currentRole}
      className="fixed inset-0 z-50 flex flex-col justify-between bg-card text-foreground px-6 py-8 pb-10 overflow-y-auto select-none transition-colors duration-200"
    >

      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={`h-9 w-9 rounded-xl font-mono font-black text-xs flex items-center justify-center shadow-xs transition-colors duration-200 text-white ${
              currentRole === 'contractor' ? 'bg-[var(--contractor-primary)]' : 'bg-primary'
            }`}
          >
            DE
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-sm text-foreground">Doucette Engineering</span>
            {currentRole === 'contractor' && (
              <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black bg-sky-100 text-[var(--contractor-primary)] border border-sky-300 tracking-wider uppercase transition-colors">
                PRO
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-sm mx-auto my-auto space-y-6 py-6">

        {/* Title & Microcopy */}
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Sign In
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground transition-all">
            {currentRole === 'contractor'
              ? 'Access your commercial bids & P.E. stamped plans'
              : 'Access your Title 5 permits & engineering projects'}
          </p>
        </div>

        {/* Persona Switch (Homeowner vs contractors) */}
        <div className="app-segmented-group w-full justify-center">
          <button
            type="button"
            onClick={() => setCurrentRole('homeowner')}
            className={`flex-1 justify-center app-segmented-pill ${currentRole === 'homeowner' ? 'app-segmented-pill-active' : ''}`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Homeowner</span>
          </button>
          <button
            type="button"
            onClick={() => setCurrentRole('contractor')}
            className={`flex-1 justify-center app-segmented-pill ${currentRole === 'contractor' ? 'app-segmented-pill-pro' : ''}`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>contractors</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLogin} noValidate className="space-y-4">

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              {currentRole === 'contractor' ? 'Contractor Business Email' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
              <input
                type="text"
                autoComplete="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full h-11 pl-10 pr-3 rounded-2xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 shadow-2xs transition-all ${
                  currentRole === 'contractor' ? 'focus:ring-[var(--contractor-primary)]' : 'focus:ring-primary'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-foreground uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => showToast('Password reset link sent to registered email.', 'info')}
                className={`font-bold hover:underline transition-colors duration-200 cursor-pointer ${
                  currentRole === 'contractor'
                    ? 'text-[var(--contractor-primary)] hover:text-[var(--contractor-primary-hover)]'
                    : 'text-primary hover:text-primary-hover'
                }`}
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full h-11 pl-10 pr-10 rounded-2xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 shadow-2xs transition-all ${
                  currentRole === 'contractor' ? 'focus:ring-[var(--contractor-primary)]' : 'focus:ring-primary'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full h-12 rounded-2xl font-bold text-sm shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer transition-colors duration-200 ${
              currentRole === 'contractor'
                ? 'bg-[var(--contractor-primary)] hover:bg-[var(--contractor-primary-hover)] text-white shadow-sky-600/20'
                : 'bg-primary hover:bg-primary-hover text-primary-foreground shadow-emerald-600/20'
            }`}
          >
            <span>{loading ? 'Signing in...' : (currentRole === 'contractor' ? 'Sign In as Contractor' : 'Sign In as Homeowner')}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Quick Demo Fill button */}
        <div className="flex justify-center pt-1">
          <Link
            to="/"
            className={`text-xs font-bold text-muted-foreground transition-colors duration-200 ${
              currentRole === 'contractor' ? 'hover:text-[var(--contractor-primary)]' : 'hover:text-primary'
            }`}
          >
            Guest login →
          </Link>
        </div>

      </div>

      {/* Footer Signup Link */}
      <div className="text-center text-xs text-muted-foreground space-y-2 max-w-sm mx-auto w-full">
        <div>
          Don't have an account?{' '}
          <Link
            to="/signup"
            className={`font-bold hover:underline transition-colors duration-200 ${
              currentRole === 'contractor' ? 'text-[var(--contractor-primary)]' : 'text-primary'
            }`}
          >
            Create Account
          </Link>
        </div>
      </div>

    </div>
  )
}

export default LoginPage
