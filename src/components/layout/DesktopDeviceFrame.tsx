import React, { useState, useEffect } from 'react'
import { Iphone } from '@/components/ui/iphone'

interface DesktopDeviceFrameProps {
  children: React.ReactNode
}

export const DesktopDeviceFrame: React.FC<DesktopDeviceFrameProps> = ({ children }) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth >= 768
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleResize = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
    }

    // Modern event listener with fallback
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleResize)
    } else {
      mediaQuery.addListener(handleResize)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleResize)
      } else {
        mediaQuery.removeListener(handleResize)
      }
    }
  }, [])

  // On Mobile screens (< 768px): Render full-screen native mobile web app directly
  if (!isDesktop) {
    return <>{children}</>
  }

  // On Desktop screens (>= 768px): Center inside MagicUI iPhone mockup frame
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#070d1c] bg-gradient-to-b from-[#0a1329] via-[#070d1d] to-[#050914] p-4 relative overflow-hidden select-none">
      
      {/* Background Ambient Blue Radial Glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-60"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(29, 78, 216, 0.25) 0%, rgba(15, 34, 78, 0.2) 45%, rgba(5, 9, 20, 0) 75%)'
        }}
      />

      {/* Top subtle blue ambient highlight */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 h-96 z-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(59, 130, 246, 0.18), transparent)'
        }}
      />

      {/* Decorative Subtle Background Grid */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #60a5fa 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Responsive iPhone Mockup Container */}
      <div className="relative z-10 h-[min(882px,94vh)] aspect-[433/882] w-auto max-w-[433px] flex items-center justify-center filter drop-shadow-[0_25px_60px_rgba(0,0,0,0.85)]">
        <Iphone className="w-full h-full">
          
          {/* Internal Phone Screen Container */}
          <div className="relative w-full h-full flex flex-col bg-background text-foreground overflow-hidden [transform:translateZ(0)]">
            {children}
          </div>

        </Iphone>
      </div>

    </div>
  )
}

export default DesktopDeviceFrame