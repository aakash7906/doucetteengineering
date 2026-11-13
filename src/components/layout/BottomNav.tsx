import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutGrid,
  Folder,
  MoreHorizontal,
  X,
  User,
  BookOpen,
  HelpCircle,
  Ticket,
  Wallet,
  LogOut,
  ChevronRight,
  Building2,
  Compass,
  ClipboardList,
  FileText,
  Plus
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { useToast } from '@/context/ToastContext'
import { Badge } from '@/components/ui/badge'

export const BottomNav: React.FC = () => {
  const location = useLocation()
  const { currentRole, setCurrentRole } = useProjects()
  const { showToast } = useToast()
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false)

  // Drag down gesture state for "More" bottom sheet
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startYRef = useRef<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    startYRef.current = clientY
    setIsDragging(true)
  }

  const handleTouchMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (startYRef.current === null) return
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const deltaY = clientY - startYRef.current
    if (deltaY > 0) {
      setDragOffsetY(deltaY)
    } else {
      setDragOffsetY(0)
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (startYRef.current === null) return
    if (dragOffsetY > 80) {
      setMoreDrawerOpen(false)
    }
    setDragOffsetY(0)
    startYRef.current = null
    setIsDragging(false)
  }, [dragOffsetY])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleTouchMove)
      window.addEventListener('mouseup', handleTouchEnd)
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
      window.addEventListener('touchend', handleTouchEnd)
    } else {
      window.removeEventListener('mousemove', handleTouchMove)
      window.removeEventListener('mouseup', handleTouchEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleTouchMove)
      window.removeEventListener('mouseup', handleTouchEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, handleTouchMove, handleTouchEnd])

  const isTabActive = (tab: string) => {
    if (tab === 'dashboard' && location.pathname === '/') return true
    if (tab === 'track' && location.pathname === '/track') return true
    if (tab === 'request' && location.pathname === '/request') return true
    if (tab === 'jobs' && location.pathname === '/contractor') return true
    if (tab === 'more' && (moreDrawerOpen || location.pathname === '/calculator' || location.pathname === '/directory' || location.pathname === '/guides')) return true
    return false
  }

  return (
    <>
      {/* FLOATING PILL BOTTOM NAVIGATION BAR WITH ELEVATED REQUEST BUTTON */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center pointer-events-none px-4 pb-[env(safe-area-inset-bottom,0px)]">
        <nav className="pointer-events-auto bg-card/95 backdrop-blur-md border border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-2 py-1.5 flex items-center justify-between gap-1 w-full max-w-[390px] transition-all relative overflow-visible">

          {/* Tab 1: Dashboard */}
          <Link
            to="/"
            onClick={() => setMoreDrawerOpen(false)}
            className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1"
          >
            <div className={`flex flex-col items-center justify-center transition-all ${isTabActive('dashboard')
                ? 'w-16 h-12 rounded-full bg-primary-light text-primary font-bold'
                : 'text-slate-500 hover:text-slate-800'
              }`}>
              <LayoutGrid className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] leading-tight font-bold mt-0.5">
                Dashboard
              </span>
            </div>
          </Link>

          {/* Tab 2: Track */}
          <Link
            to="/track"
            onClick={() => setMoreDrawerOpen(false)}
            className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1"
          >
            <div className={`flex flex-col items-center justify-center transition-all ${isTabActive('track')
                ? 'w-16 h-12 rounded-full bg-primary-light text-primary font-bold'
                : 'text-slate-500 hover:text-slate-800'
              }`}>
              <ClipboardList className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] leading-tight font-medium mt-0.5">
                Track
              </span>
            </div>
          </Link>

          {/* Tab 3: Elevated Center Action Button - Request */}
          <Link
            to="/request"
            onClick={() => setMoreDrawerOpen(false)}
            className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative -mt-5 z-10"
            title="Request Service & Submit Details"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-[0_8px_20px_rgba(16,188,0,0.38)] transition-all transform active:scale-90 group-hover:scale-105 ${
              isTabActive('request')
                ? 'bg-primary text-primary-foreground ring-4 ring-primary/25 scale-105'
                : 'bg-primary text-primary-foreground hover:brightness-105'
            }`}>
              <Plus className="w-6 h-6 stroke-[2.8]" />
            </div>
            <span className={`text-[10px] leading-tight font-extrabold mt-1 transition-colors ${
              isTabActive('request') ? 'text-primary' : 'text-slate-700'
            }`}>
              Request
            </span>
          </Link>

          {/* Tab 4: My Jobs */}
          <Link
            to="/contractor"
            onClick={() => setMoreDrawerOpen(false)}
            className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1"
          >
            <div className={`flex flex-col items-center justify-center transition-all ${isTabActive('jobs')
                ? 'w-16 h-12 rounded-full bg-primary-light text-primary font-bold'
                : 'text-slate-500 hover:text-slate-800'
              }`}>
              <Folder className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] leading-tight font-medium mt-0.5">
                My Jobs
              </span>
            </div>
          </Link>

          {/* Tab 5: More */}
          <button
            type="button"
            onClick={() => setMoreDrawerOpen(!moreDrawerOpen)}
            className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1 cursor-pointer"
          >
            <div className={`flex flex-col items-center justify-center transition-all ${isTabActive('more')
                ? 'w-16 h-12 rounded-full bg-primary-light text-primary font-bold'
                : 'text-slate-500 hover:text-slate-800'
              }`}>
              <MoreHorizontal className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] leading-tight font-medium mt-0.5">
                More
              </span>
            </div>
          </button>

        </nav>
      </div>

      {/* ZIPFIXER "MORE" BOTTOM SHEET MODAL (Exact layout from user's screenshots 5 & 6) */}
      {moreDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end md:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setMoreDrawerOpen(false)}
          />

          {/* Sheet Body with Downward Drag to Dismiss */}
          <div
            style={{
              transform: `translateY(${dragOffsetY}px)`,
              transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className="relative z-50 bg-card rounded-t-3xl border-t border-border max-h-[85vh] overflow-y-auto px-5 pt-3 pb-8 space-y-4 shadow-2xl select-none"
          >

            {/* Top Sheet Drag Pill Handle & Close */}
            <div
              onMouseDown={handleTouchStart}
              onTouchStart={handleTouchStart}
              className="flex items-center justify-between pt-1 cursor-grab active:cursor-grabbing touch-none"
            >
              <div className="w-14 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400 mx-auto transition-colors" />
              <button
                onClick={() => setMoreDrawerOpen(false)}
                className="p-1 rounded-full text-muted-foreground hover:bg-muted cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* User Profile Header (ZipFixer exact style: Avatar circle + name + HOMEOWNER badge) */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-primary/15 text-primary font-extrabold text-base flex items-center justify-center">
                  A
                </div>
                <div>
                  <h3 className="font-extrabold text-foreground text-sm">
                    Aakash
                  </h3>
                  <Badge variant="success" className="text-[10px] px-2 py-0.2 mt-0.5">
                    {currentRole === 'contractor' ? 'contractors' : 'HOMEOWNER'}
                  </Badge>
                </div>
              </div>

              <button
                onClick={() => {
                  setCurrentRole(currentRole === 'homeowner' ? 'contractor' : 'homeowner')
                }}
                className="text-xs font-semibold text-muted-foreground border border-border px-3 py-1.5 rounded-full hover:bg-muted transition-colors flex items-center gap-1"
              >
                <User className="w-3 h-3" />
                <span>Switch Role</span>
              </button>
            </div>

            {/* SECTION: RESOURCES & ESTIMATOR */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-1">
                Resources & Tools
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  to="/calculator"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    <span>My Quotes</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <Link
                  to="/calculator"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-primary" />
                    <span>Trade Rates</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <Link
                  to="/directory"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-primary" />
                    <span>BOH Directory</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <Link
                  to="/guides"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>Title 5 Guides</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              </div>
            </div>

            {/* SECTION: SUPPORT & DISPATCH */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-1">
                Support & Contact
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  to="/guides"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <span>FAQ & Help</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <Link
                  to="/directory"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-primary" />
                    <span>Company Info</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <a
                  href="tel:9783694200"
                  className="col-span-2 flex items-center justify-between p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-primary" />
                    <span>Direct Engineering Hotline: (978) 369-4200</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-primary" />
                </a>
              </div>
            </div>

            {/* Bottom Sign Out / Reset button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  showToast('Signed out of session.', 'info')
                  setMoreDrawerOpen(false)
                }}
                className="w-full h-11 rounded-2xl border border-destructive/30 text-destructive font-bold text-xs flex items-center justify-center gap-2 hover:bg-destructive/5 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Account</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default BottomNav
