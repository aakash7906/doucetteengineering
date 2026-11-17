import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutGrid,
  Folder,
  ClipboardList,
  User,
  Plus,
  Wallet,
  BookOpen
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'

export const BottomNav: React.FC = () => {
  const location = useLocation()
  const { currentRole } = useProjects()

  const isTabActive = (tab: string) => {
    if (tab === 'home' && location.pathname === '/') return true
    if (tab === 'track' && location.pathname === '/track') return true
    if (tab === 'request' && location.pathname === '/request') return true
    if (tab === 'jobs' && location.pathname === '/contractor') return true
    if (tab === 'rates' && location.pathname === '/calculator') return true
    if (tab === 'guides' && location.pathname === '/guides') return true
    if (tab === 'profile' && location.pathname === '/profile') return true
    return false
  }

  const isContractor = currentRole === 'contractor'

  return (
    <footer className="shrink-0 z-40 w-full bg-card/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.04)] px-2 pt-1 pb-[max(0.5rem,env(safe-area-inset-bottom,0.5rem))] relative">
      <nav className="flex items-center justify-between gap-1 w-full max-w-lg mx-auto relative">

        {/* Tab 1: Home (or Contractor Hub) */}
        <Link
          to="/"
          className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1"
        >
          <div className={`flex flex-col items-center justify-center transition-all ${
            isTabActive('home')
              ? 'w-14 sm:w-16 h-11 rounded-full bg-primary-light text-primary font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}>
            <LayoutGrid className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] leading-tight font-bold mt-0.5">
              {isContractor ? 'Pro Hub' : 'Home'}
            </span>
          </div>
        </Link>

        {/* Tab 2: Track (Homeowner) OR My Jobs (Contractor) */}
        <Link
          to={isContractor ? "/contractor" : "/track"}
          className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1"
        >
          <div className={`flex flex-col items-center justify-center transition-all ${
            isTabActive(isContractor ? 'jobs' : 'track')
              ? 'w-14 sm:w-16 h-11 rounded-full bg-primary-light text-primary font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}>
            {isContractor ? (
              <Folder className="w-5 h-5 stroke-[2.2]" />
            ) : (
              <ClipboardList className="w-5 h-5 stroke-[2.2]" />
            )}
            <span className="text-[10px] leading-tight font-medium mt-0.5">
              {isContractor ? 'My Jobs' : 'Track'}
            </span>
          </div>
        </Link>

        {/* Tab 3: Elevated Center Action Button - Request / New Job */}
        <Link
          to="/request"
          className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative -mt-6 z-10"
          title={isContractor ? "Book New Contractor Engineering Request" : "Request Service & Submit Details"}
        >
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all transform active:scale-90 group-hover:scale-105 ${
            isContractor
              ? 'shadow-[0_8px_20px_rgba(2,132,199,0.38)]'
              : 'shadow-[0_8px_20px_rgba(16,188,0,0.35)]'
          } ${
            isTabActive('request')
              ? 'bg-primary text-primary-foreground ring-4 ring-primary/25 scale-105'
              : 'bg-primary text-primary-foreground hover:brightness-105'
          }`}>
            <Plus className="w-6 h-6 stroke-[2.8]" />
          </div>
          <span className={`text-[10px] leading-tight font-extrabold mt-1 transition-colors ${
            isTabActive('request') ? 'text-primary' : 'text-slate-700'
          }`}>
            {isContractor ? 'New Job' : 'Request'}
          </span>
        </Link>

        {/* Tab 4: Title 5 (Homeowner) OR Trade Rates (Contractor) */}
        <Link
          to={isContractor ? "/calculator" : "/guides"}
          className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1"
        >
          <div className={`flex flex-col items-center justify-center transition-all ${
            isTabActive(isContractor ? 'rates' : 'guides')
              ? 'w-14 sm:w-16 h-11 rounded-full bg-primary-light text-primary font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}>
            {isContractor ? (
              <Wallet className="w-5 h-5 stroke-[2.2]" />
            ) : (
              <BookOpen className="w-5 h-5 stroke-[2.2]" />
            )}
            <span className="text-[10px] leading-tight font-medium mt-0.5">
              {isContractor ? 'Trade Rates' : 'Title 5'}
            </span>
          </div>
        </Link>

        {/* Tab 5: Profile */}
        <Link
          to="/profile"
          className="flex-1 flex flex-col items-center justify-center focus:outline-none group relative py-1"
        >
          <div className={`flex flex-col items-center justify-center transition-all ${
            isTabActive('profile')
              ? 'w-14 sm:w-16 h-11 rounded-full bg-primary-light text-primary font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}>
            <User className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] leading-tight font-medium mt-0.5">
              Profile
            </span>
          </div>
        </Link>

      </nav>
    </footer>
  )
}

export default BottomNav
