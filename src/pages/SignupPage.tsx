import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, User, Phone, ArrowRight, ShieldCheck, HardHat, Home, Building } from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/button'

export const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const { currentRole, setCurrentRole } = useProjects()
  const { showToast } = useToast()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [company, setCompany] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      showToast('Account created successfully! Welcome to Doucette Engineering.', 'success')
      navigate('/', { replace: true })
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-card text-foreground px-6 py-6 pb-10 overflow-y-auto select-none">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground font-mono font-black text-xs flex items-center justify-center shadow-xs">
            DE
          </div>
          <span className="font-extrabold text-sm text-foreground">Doucette Engineering</span>
        </div>

        <Link to="/login" className="text-xs font-bold text-muted-foreground hover:text-primary">
          Sign In →
        </Link>
      </div>

      {/* Main Signup Form Card */}
      <div className="w-full max-w-sm mx-auto my-auto space-y-5 py-4">
        
        {/* Title & Tagline */}
        <div className="space-y-1 text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Create Account
          </h1>
          <p className="text-xs text-muted-foreground">
            Connect with licensed civil P.E. engineers & evaluators
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
        <form onSubmit={handleSignup} className="space-y-3.5">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="e.g. David Henderson"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-2xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-2xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                Phone
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                <input
                  type="tel"
                  placeholder="(978) 555-0192"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 pl-9 pr-3 rounded-2xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                />
              </div>
            </div>

            {currentRole === 'contractor' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
                  Company / Trade
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 text-muted-foreground absolute left-3 top-3.5" />
                  <input
                    type="text"
                    placeholder="Excavation LLC"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full h-11 pl-9 pr-3 rounded-2xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                placeholder="Create secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-2xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-2xl font-bold text-sm shadow-md mt-2 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{loading ? 'Creating Account...' : 'Complete Registration'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-muted-foreground space-y-1.5 max-w-sm mx-auto w-full">
        <div>
          Already have an account?{' '}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Sign In
          </Link>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-primary" />
          <span>Title 5 Civil Engineering Compliance</span>
        </div>
      </div>

    </div>
  )
}

export default SignupPage
