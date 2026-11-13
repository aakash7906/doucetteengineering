import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const SplashScreen: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // Navigate smoothly to onboarding after 2 seconds
    const timer = setTimeout(() => {
      navigate('/onboarding', { replace: true })
    }, 2200)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-secondary text-secondary-foreground px-6 py-12 select-none">
      
      {/* Top subtle badge */}
      <div className="pt-8">
      </div>

      {/* Center Branding & Animated Logo */}
      <div className="flex flex-col items-center text-center space-y-6 max-w-xs animate-in zoom-in-95 duration-500">
        
        {/* Glow emblem */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-primary/30 blur-xl animate-pulse" />
          <div className="relative h-24 w-24 rounded-3xl bg-primary text-primary-foreground flex items-center justify-center font-mono font-black text-4xl shadow-2xl border border-white/20">
            DE
          </div>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            DOUCETTE
          </h1>
          <p className="text-xs font-bold tracking-widest uppercase text-slate-300">
            Civil & Septic Engineering
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="pt-2 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>

      {/* Bottom Certified Stamp */}
      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium pb-4">
      </div>

    </div>
  )
}

export default SplashScreen
