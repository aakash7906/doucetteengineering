import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft,
  Bell
} from 'lucide-react'
import { useToast } from '@/context/ToastContext'

export const Header: React.FC = () => {
  const { showToast } = useToast()
  const location = useLocation()
  const navigate = useNavigate()

  const isDetailPage = location.pathname.startsWith('/project/')
  const isFormPage = location.pathname === '/request'

  // Dynamic contextual title for header
  const getHeaderTitle = () => {
    if (location.pathname === '/') return 'Dashboard'
    if (location.pathname === '/request') return 'Service Request'
    if (location.pathname === '/track') return 'My Requests'
    if (location.pathname.startsWith('/project/')) return 'Project Details'
    if (location.pathname === '/calculator') return 'Cost Estimator'
    if (location.pathname === '/contractor') return 'Contractor Hub'
    if (location.pathname === '/guides') return 'Title 5 Guides'
    if (location.pathname === '/directory') return 'Engineering Directory'
    return 'Doucette Engineering'
  }

  return (
    <header className="app-header bg-card/95 backdrop-blur-md border-b border-border shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 app-header-inner flex items-center justify-between gap-3">
        
        {/* LEFT: Contextual Title / Back Button */}
        <div className="flex items-center gap-2 min-w-0">
          {isDetailPage || isFormPage ? (
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-10 w-10 -ml-2 rounded-xl flex items-center justify-center text-foreground hover:bg-muted active:scale-95 transition-all cursor-pointer shrink-0"
              aria-label="Back"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
            </button>
          ) : (
            <Link to="/" className="h-9 w-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-mono font-black text-xs shadow-xs hover:bg-primary-hover active:scale-95 transition-all shrink-0">
              DE
            </Link>
          )}

          <h1 className="font-extrabold text-base sm:text-lg md:text-xl tracking-tight text-foreground leading-tight truncate">
            {getHeaderTitle()}
          </h1>
        </div>

        {/* RIGHT: Quick App Action Icons (Responsive & Touch-Friendly) */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          
          {/* Notifications Icon */}
          <button
            type="button"
            onClick={() => showToast('All engineering records are up to date.', 'info')}
            className="h-10 w-10 rounded-xl flex items-center justify-center text-slate-600 hover:text-foreground hover:bg-muted active:scale-95 transition-all relative cursor-pointer"
            title="Notifications"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
          </button>

        </div>
      </div>
    </header>
  )
}

export default Header
