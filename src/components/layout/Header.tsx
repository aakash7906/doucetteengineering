import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  Globe, 
  ClipboardList, 
  MessageSquare, 
  Bell, 
  Search, 
  HardHat, 
  Home, 
  Plus, 
  ShieldCheck, 
  ChevronDown
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { Button } from '@/components/ui/button'

export const Header: React.FC = () => {
  const { currentRole, setCurrentRole } = useProjects()
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  // Dynamic title based on route (matches ZipFixer app screenshots)
  const getHeaderTitle = () => {
    if (location.pathname === '/') return 'Dashboard'
    if (location.pathname === '/request') return 'New Service Request'
    if (location.pathname === '/track') return 'My Requests'
    if (location.pathname.startsWith('/project/')) return 'Project Details'
    if (location.pathname === '/calculator') return 'Cost Estimator'
    if (location.pathname === '/contractor') return 'Contractor Pro'
    if (location.pathname === '/guides') return 'Guides & Title 5'
    if (location.pathname === '/directory') return 'Engineering Directory'
    return 'Dashboard'
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-3">
        
        {/* LEFT: ZipFixer Style Page Title & Branding */}
        <div className="flex items-center gap-2.5">
          <Link to="/" className="flex items-center gap-2 group focus:outline-none">
            <div className="h-8 w-8 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-mono font-black text-xs shadow-2xs group-hover:bg-primary-hover transition-colors">
              DE
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-foreground leading-tight">
                {getHeaderTitle()}
              </span>
              <span className="text-[10px] text-muted-foreground hidden sm:flex items-center gap-1">
                <span>Doucette Engineering</span>
                <span>•</span>
                <span className="text-primary font-semibold flex items-center gap-0.5">
                  <ShieldCheck className="w-2.5 h-2.5" /> PE Stamped
                </span>
              </span>
            </div>
          </Link>
        </div>

        {/* CENTER (Tablet/Desktop): Search bar and Role Switcher */}
        <div className="hidden sm:flex items-center justify-center gap-2 flex-1 max-w-sm">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search requests or enter Zip..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 pl-8 pr-3 rounded-xl border border-input bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
            />
          </form>

          {/* Segmented Switcher */}
          <div className="app-segmented-group shrink-0">
            <button
              type="button"
              onClick={() => setCurrentRole('homeowner')}
              className={`app-segmented-pill ${currentRole === 'homeowner' ? 'app-segmented-pill-active' : ''}`}
            >
              <Home className="w-3 h-3" />
              <span>Owner</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentRole('contractor')}
              className={`app-segmented-pill ${currentRole === 'contractor' ? 'app-segmented-pill-pro' : ''}`}
            >
              <HardHat className="w-3 h-3" />
              <span>Pro</span>
            </button>
          </div>
        </div>

        {/* RIGHT: ZipFixer Exact Header Action Icons (Globe, Notes, Chat, Bell) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Mobile search toggle */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="sm:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language / Region Pill (Exact from ZipFixer screenshot) */}
          <div className="hidden xs:flex items-center gap-1 border border-border bg-card hover:bg-muted px-2 py-1 rounded-lg text-xs text-muted-foreground font-medium cursor-pointer transition-colors shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            <ChevronDown className="w-3 h-3 text-muted-foreground" />
          </div>

          {/* Clipboard / Requests Icon */}
          <Link
            to="/track"
            className="p-1.5 sm:p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors relative"
            title="My Requests"
          >
            <ClipboardList className="w-4 h-4" />
          </Link>

          {/* Messages Icon */}
          <Link
            to="/track"
            className="p-1.5 sm:p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4" />
          </Link>

          {/* Notification Bell */}
          <button
            type="button"
            className="p-1.5 sm:p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors relative"
            title="Notifications"
            onClick={() => alert('No new engineering notifications.')}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
          </button>

          {/* Green + New Request Button (ZipFixer square green button style) */}
          <Link to="/request">
            <button
              type="button"
              className="h-8 w-8 sm:h-8 sm:w-auto sm:px-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-1 hover:bg-primary-hover active:scale-95 transition-all shadow-2xs cursor-pointer"
              title="Create New Request"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Request</span>
            </button>
          </Link>

        </div>
      </div>

      {/* MOBILE SEARCH BAR SLIDEDOWN */}
      {searchOpen && (
        <div className="sm:hidden bg-card border-b border-border p-3 animate-in slide-in-from-top-1 duration-150 shadow-sm">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-2.5" />
              <input
                type="text"
                autoFocus
                placeholder="Search requests or enter Zip..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-xl border border-input bg-muted/40 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <Button type="submit" size="sm" className="h-9 px-3 text-xs font-bold">
              Search
            </Button>
          </form>
        </div>
      )}
    </header>
  )
}

export default Header
