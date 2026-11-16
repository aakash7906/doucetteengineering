import React, { useState, useEffect, useRef } from 'react'
import { Iphone } from '@/components/ui/iphone'

interface DesktopDeviceFrameProps {
  children: React.ReactNode
}

export const DesktopDeviceFrame: React.FC<DesktopDeviceFrameProps> = ({ children }) => {
  // Detect if running inside an iframe (e.g. nested inside the iPhone preview)
  const isInsideIframe = typeof window !== 'undefined' && window.self !== window.top

  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth >= 768
  })

  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleResize = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches)
    }

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

  // Synchronize browser history (Back / Forward) with the inner iframe on desktop
  useEffect(() => {
    if (isInsideIframe || !isDesktop) return

    const handlePopState = () => {
      if (iframeRef.current?.contentWindow) {
        try {
          const targetUrl = window.location.pathname + window.location.search
          iframeRef.current.contentWindow.location.replace(targetUrl)
        } catch {
          // fallback
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [isInsideIframe, isDesktop])

  // 1. If already inside the mobile iframe OR on an actual mobile device (< 768px):
  // Render the pure mobile web application directly!
  if (isInsideIframe || !isDesktop) {
    return <>{children}</>
  }

  // 2. On Desktop screens (>= 768px) at top level:
  // Render the MagicUI iPhone frame with the true isolated mobile viewport iframe!
  const initialPath = typeof window !== 'undefined'
    ? (window.location.pathname + window.location.search)
    : '/splash'

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-tr from-[#e0f2fe] via-[#ede9fe] to-[#f5f3ff] p-4 relative overflow-hidden select-none">
      
      {/* Light Blue Ambient Accent (Top-Left) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          background: 'radial-gradient(circle at 20% 25%, rgba(56, 189, 248, 0.18) 0%, rgba(147, 197, 253, 0.08) 45%, transparent 70%)'
        }}
      />

      {/* Light Violet Ambient Accent (Bottom-Right) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0 opacity-80"
        style={{
          background: 'radial-gradient(circle at 80% 70%, rgba(167, 139, 250, 0.22) 0%, rgba(192, 132, 252, 0.1) 45%, transparent 70%)'
        }}
      />

      {/* Top subtle soft luminous highlight */}
      <div 
        className="pointer-events-none absolute inset-x-0 top-0 h-96 z-0 opacity-90"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(255, 255, 255, 0.95), transparent)'
        }}
      />

      {/* Responsive iPhone Mockup Container with Light-Mode Dual-Tone Device Shadows */}
      <div className="relative z-10 h-[min(882px,94vh)] aspect-[433/882] w-auto max-w-[433px] flex items-center justify-center filter drop-shadow-[0_25px_50px_rgba(30,58,138,0.12)] drop-shadow-[0_10px_25px_rgba(109,40,217,0.1)]">
        <Iphone className="w-full h-full">
          
          {/* Internal Phone Screen Container hosting the true mobile viewport */}
          <div className="relative w-full h-full flex flex-col bg-background text-foreground overflow-hidden [transform:translateZ(0)]">
            <iframe
              ref={iframeRef}
              src={initialPath}
              title="Doucette Engineering Mobile Experience"
              className="w-full h-full border-0 select-auto bg-background no-scrollbar"
              style={{
                colorScheme: 'light',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            />
          </div>

        </Iphone>
      </div>

    </div>
  )
}

export default DesktopDeviceFrame
