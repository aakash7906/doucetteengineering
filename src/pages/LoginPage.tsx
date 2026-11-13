import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, ShieldCheck, HardHat, Home, Eye, EyeOff } from 'lucide-react'
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
      showToast(`Welcome back, ${email.split('@')[0] || 'User'}!`, 'success')
      navigate('/', { replace: true })
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-card text-foreground px-6 py-8 pb-10 overflow-y-auto select-none">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground font-mono font-black text-xs flex items-center justify-center shadow-xs">
            DE
          </div>
          <span className="font-extrabold text-sm text-foreground">Doucette Engineering</span>
        </div>

        <Link to="/" className="text-xs font-bold text-muted-foreground hover:text-primary">
          Guest Preview →
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-sm mx-auto my-auto space-y-6 py-6">
        
        {/* Title & Microcopy */}
        <div className="space-y-1.5 text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Sign In
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Access your Title 5 permits & engineering projects
          </p>
        </div>

        {/* Persona Switch (Homeowner vs Contractor Pro) */}
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
            <span>Contractor Pro</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-2xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
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
                className="text-primary font-bold hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-10 rounded-2xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-2xl font-bold text-sm shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Signing in...' : 'Sign In to Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Quick Demo Fill button */}
        <div className="pt-1 text-center">
          <button
            type="button"
            onClick={() => {
              setEmail('david.henderson@example.com')
              setPassword('doucette2026')
              showToast('Demo credentials autofilled', 'info')
            }}
            className="text-xs text-muted-foreground hover:text-primary font-medium underline"
          >
            Autofill Demo Credentials
          </button>
        </div>

      </div>

      {/* Footer Signup Link */}
      <div className="text-center text-xs text-muted-foreground space-y-2 max-w-sm mx-auto w-full">
        <div>
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            Create Account
          </Link>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Encrypted Civil Engineering Records</span>
        </div>
      </div>

    </div>
  )
}

export default LoginPage
