import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  Search, 
  HardHat, 
  Home, 
  Plus, 
  ShieldCheck, 
  Bell,
  X
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { useToast } from '@/context/ToastContext'

export const Header: React.FC = () => {
  const { currentRole, setCurrentRole } = useProjects()
  const { showToast } = useToast()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  const isDetailPage = location.pathname.startsWith('/project/')
  const isFormPage = location.pathname === '/request'

  // Dynamic contextual title for mobile header
  const getHeaderTitle = () => {
    if (location.pathname === '/') return 'Dashboard'
    if (location.pathname === '/request') return 'Service Request'
    if (location.pathname === '/track') return 'My Requests'
    if (location.pathname.startsWith('/project/')) return 'Project Details'
    if (location.pathname === '/calculator') return 'Cost Estimator'
    if (location.pathname === '/contractor') return 'Contractor Pro'
    if (location.pathname === '/guides') return 'Guides & Title 5'
    if (location.pathname === '/directory') return 'Services Directory'
    return 'Doucette Engineering'
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    const q = searchQuery.trim()
    if (q.toUpperCase().includes('DE-') || /^\d{4}$/.test(q)) {
      navigate(`/track?query=${encodeURIComponent(q)}`)
    } else {
      navigate(`/request?location=${encodeURIComponent(q)}`)
    }
    setSearchQuery('')
    setSearchOpen(false)
  }

  return (
    <header className="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 app-header-inner">
        
        {/* LEFT: Contextual Back Button or Brand Logo */}
        <div className="flex items-center gap-2.5">
          {isDetailPage || isFormPage ? (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-10 w-10 -ml-2 rounded-xl flex items-center justify-center text-foreground hover:bg-muted active:scale-95 transition-all"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
          ) : (
            <Link to="/" className="flex items-center gap-2 group focus:outline-none">
              <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-mono font-black text-xs shadow-xs group-hover:bg-primary-hover transition-colors">
                DE
              </div>
            </Link>
          )}

          <div className="flex flex-col">
            <span className="font-extrabold text-base tracking-tight text-foreground leading-tight">
              {getHeaderTitle()}
            </span>
            <span className="text-[11px] text-muted-foreground hidden sm:flex items-center gap-1">
              <span>Doucette Engineering</span>
              <span>•</span>
              <span className="text-primary font-semibold flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" /> PE Stamped
              </span>
            </span>
          </div>
        </div>

        {/* CENTER: Desktop search & Role switch */}
        <div className="hidden md:flex items-center justify-center gap-2 flex-1 max-w-sm mx-4">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tracking # or address..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-3 rounded-xl border border-input bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
            />
          </form>

          {/* Segmented Persona Pill */}
          <div className="app-segmented-group shrink-0">
            <button
              type="button"
              onClick={() => {
                setCurrentRole('homeowner')
                showToast('Switched to Homeowner mode', 'info')
              }}
              className={`app-segmented-pill ${currentRole === 'homeowner' ? 'app-segmented-pill-active' : ''}`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Owner</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentRole('contractor')
                showToast('Switched to Contractor Pro mode', 'info')
              }}
              className={`app-segmented-pill ${currentRole === 'contractor' ? 'app-segmented-pill-pro' : ''}`}
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>Pro</span>
            </button>
          </div>
        </div>

        {/* RIGHT: Touch-friendly Quick Actions (min 44px) */}
        <div className="flex items-center gap-1">
          {/* Mobile Search Toggle Button */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="h-11 w-11 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 flex items-center justify-center transition-all md:hidden"
            aria-label="Search"
          >
            {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </button>

          {/* Notifications Button */}
          <button
            type="button"
            onClick={() => showToast('All engineering records are up to date.', 'info')}
            className="h-11 w-11 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted active:scale-95 flex items-center justify-center transition-all relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-primary" />
          </button>

          {/* New Request Action Button */}
          <Link to="/request">
            <button
              type="button"
              className="h-10 px-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 hover:bg-primary-hover active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="inline">New</span>
            </button>
          </Link>
        </div>
      </div>

      {/* MOBILE SEARCH BAR SLIDEDOWN */}
      {searchOpen && (
        <div className="md:hidden bg-card border-b border-border p-3 animate-in slide-in-from-top-1 duration-150 shadow-md">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              <input
                type="text"
                autoFocus
                placeholder="Search tracking # or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-input bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button 
              type="submit" 
              className="h-11 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold active:scale-95 transition-transform"
            >
              Search
            </button>
          </form>
        </div>
      )}
    </header>
  )
}

export default Header
