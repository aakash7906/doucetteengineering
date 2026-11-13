import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  LayoutGrid, 
  Folder, 
  MoreHorizontal,
  X,
  User,
  MessageSquare,
  Bell,
  Search,
  Flag,
  BookOpen,
  HelpCircle,
  Ticket,
  Wallet,
  LogOut,
  ChevronRight,
  Building2,
  Compass,
  ClipboardList,
  FileText
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { useToast } from '@/context/ToastContext'
import { Badge } from '@/components/ui/badge'

export const BottomNav: React.FC = () => {
  const location = useLocation()
  const { currentRole, setCurrentRole } = useProjects()
  const { showToast } = useToast()
  const [moreDrawerOpen, setMoreDrawerOpen] = useState(false)

  const isTabActive = (tab: string) => {
    if (tab === 'dashboard' && location.pathname === '/') return true
    if (tab === 'requests' && location.pathname === '/track') return true
    if (tab === 'jobs' && location.pathname === '/contractor') return true
    if (tab === 'quotes' && (location.pathname === '/calculator' || location.pathname === '/request')) return true
    if (tab === 'more' && (moreDrawerOpen || location.pathname === '/directory' || location.pathname === '/guides')) return true
    return false
  }

  return (
    <>
      {/* FLOATING PILL BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center pointer-events-none px-4 pb-[env(safe-area-inset-bottom,0px)]">
        <nav className="pointer-events-auto bg-card/95 backdrop-blur-md border border-border/80 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-2 py-1.5 flex items-center justify-between gap-1 w-full max-w-[390px] transition-all">
          
          {/* Tab 1: Dashboard */}
          <Link
            to="/"
            onClick={() => setMoreDrawerOpen(false)}
            className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1"
          >
            <div className={`flex flex-col items-center justify-center transition-all ${
              isTabActive('dashboard')
                ? 'w-16 h-12 rounded-full bg-primary-light text-primary font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}>
              <LayoutGrid className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] leading-tight font-bold mt-0.5">
                Dashboard
              </span>
            </div>
            {isTabActive('dashboard') && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </Link>

          {/* Tab 2: Requests */}
          <Link
            to="/track"
            onClick={() => setMoreDrawerOpen(false)}
            className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1"
          >
            <div className={`flex flex-col items-center justify-center transition-all ${
              isTabActive('requests')
                ? 'w-16 h-12 rounded-full bg-primary-light text-primary font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}>
              <ClipboardList className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] leading-tight font-medium mt-0.5">
                Requests
              </span>
            </div>
            {isTabActive('requests') && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </Link>

          {/* Tab 3: My Jobs */}
          <Link
            to="/contractor"
            onClick={() => setMoreDrawerOpen(false)}
            className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1"
          >
            <div className={`flex flex-col items-center justify-center transition-all ${
              isTabActive('jobs')
                ? 'w-16 h-12 rounded-full bg-primary-light text-primary font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}>
              <Folder className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] leading-tight font-medium mt-0.5">
                My Jobs
              </span>
            </div>
            {isTabActive('jobs') && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </Link>

          {/* Tab 4: Quotes */}
          <Link
            to="/calculator"
            onClick={() => setMoreDrawerOpen(false)}
            className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1"
          >
            <div className={`flex flex-col items-center justify-center transition-all ${
              isTabActive('quotes')
                ? 'w-16 h-12 rounded-full bg-primary-light text-primary font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}>
              <FileText className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] leading-tight font-medium mt-0.5">
                Quotes
              </span>
            </div>
            {isTabActive('quotes') && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </Link>

          {/* Tab 5: More */}
          <button
            type="button"
            onClick={() => setMoreDrawerOpen(!moreDrawerOpen)}
            className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1 cursor-pointer"
          >
            <div className={`flex flex-col items-center justify-center transition-all ${
              isTabActive('more')
                ? 'w-16 h-12 rounded-full bg-primary-light text-primary font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}>
              <MoreHorizontal className="w-5 h-5 stroke-[2.2]" />
              <span className="text-[10px] leading-tight font-medium mt-0.5">
                More
              </span>
            </div>
            {isTabActive('more') && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-primary" />
            )}
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

          {/* Sheet Body */}
          <div className="relative z-50 bg-card rounded-t-3xl border-t border-border max-h-[85vh] overflow-y-auto px-5 pt-3 pb-8 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-250">
            
            {/* Top Sheet Pill Handle & Close */}
            <div className="flex items-center justify-between pt-1">
              <div className="w-12 h-1 rounded-full bg-muted-foreground/30 mx-auto" />
              <button 
                onClick={() => setMoreDrawerOpen(false)}
                className="p-1 rounded-full text-muted-foreground hover:bg-muted"
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
                    {currentRole === 'contractor' ? 'CONTRACTOR PRO' : 'HOMEOWNER'}
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

            {/* Quick Actions Row (Post RFQ / Messages / Notifications) */}
            <div className="grid grid-cols-3 gap-2">
              <Link
                to="/request"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary font-bold text-xs gap-1.5 hover:bg-primary/20 transition-all text-center"
              >
                <ClipboardList className="w-5 h-5 text-primary" />
                <span className="text-[11px]">Post RFQ</span>
              </Link>

              <Link
                to="/track"
                onClick={() => setMoreDrawerOpen(false)}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-card border border-border text-muted-foreground hover:text-foreground font-semibold text-xs gap-1.5 hover:bg-muted transition-all text-center shadow-2xs"
              >
                <MessageSquare className="w-5 h-5 text-primary" />
                <span className="text-[11px]">Messages</span>
              </Link>

              <button
                type="button"
                onClick={() => { showToast('No new engineering notifications.', 'info'); setMoreDrawerOpen(false); }}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-card border border-border text-muted-foreground hover:text-foreground font-semibold text-xs gap-1.5 hover:bg-muted transition-all text-center shadow-2xs"
              >
                <Bell className="w-5 h-5 text-primary" />
                <span className="text-[11px]">Notifications</span>
              </button>
            </div>

            {/* SECTION: PLATFORM */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-1">
                Platform
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  to="/"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-primary/10 text-primary font-bold border border-primary/20"
                >
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-primary" />
                    <span>Dashboard</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-primary" />
                </Link>

                <Link
                  to="/contractor"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-primary" />
                    <span>My Jobs</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <Link
                  to="/request"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-primary" />
                    <span>Request RFQ</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

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
                  to="/request"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-primary" />
                    <span>Find Service</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <Link
                  to="/track"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Flag className="w-4 h-4 text-primary" />
                    <span>Reports</span>
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
                    <span>Directory</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              </div>
            </div>

            {/* SECTION: SUPPORT TOOLS */}
            <div className="space-y-1.5 pt-2">
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-1">
                Support Tools
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link
                  to="/directory"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-primary" />
                    <span>Company & Dispatch</span>
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
                    <span>Guides</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <Link
                  to="/guides"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-primary" />
                    <span>FAQ</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>

                <a
                  href="tel:9783694200"
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-primary" />
                    <span>Support</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </a>

                <Link
                  to="/contractor"
                  onClick={() => setMoreDrawerOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-card border border-border text-foreground font-semibold hover:bg-muted shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-primary" />
                    <span>Trade Rates</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
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
