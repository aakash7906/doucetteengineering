import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MapPin,
  ArrowRight,
  Building2,
  Trees,
  Shovel,
  Compass,
  ChevronRight,
  Layers,
  Wrench,
  ClipboardList,
  MessageSquare,
  Wallet,
  BookOpen,
  Briefcase,
  Folder,
  ShieldCheck,
  Zap,
  Calculator,
  Activity,
  Award,
  Smartphone,
  Video,
  Play,
  CheckCircle2,
  HardHat,
  FileText,
  Phone
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { SERVICES_CATALOG } from '@/data/services'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

const HERO_SLIDES = [
  {
    image: '/hero/high_end_realistic_4k_drone_aerial_view_of_a_picturesque_residential_landscape.png',
    tag: 'Licensed P.E. Engineering',
    link: '/request?service=septic-design'
  },
  {
    image: '/hero/realistic_4k_photograph_of_a_licensed_septic_contractor_in_high_visibility (1).png',
    tag: ' Perc Testing',
    link: '/request?service=soil-perc-test'
  },
  {
    image: '/hero/ultra_realistic_4k_commercial_photography_of_a_modern_suburban_property_during (1).png',
    tag: 'Civil & Environmental',
    link: '/request?service=site-development'
  }
]

const CONTRACTOR_HERO_SLIDES = [
  {
    image: '/hero/realistic_4k_photograph_of_a_licensed_septic_contractor_in_high_visibility (1).png',
    tag: '24-48 Hr Perc Test Witnessing',
    link: '/request?service=soil-perc-test'
  },
  {
    image: '/hero/engineer_field_inspection_4k.jpg',
    tag: 'Stamped Civil 3D CAD Plans',
    link: '/contractor'
  },
  {
    image: '/hero/high_end_realistic_4k_drone_aerial_view_of_a_picturesque_residential_landscape.png',
    tag: 'Wholesale Trade Partner Rates',
    link: '/calculator'
  }
]

export const HomePage: React.FC = () => {
  const { currentRole, projects, userProfile } = useProjects()
  const navigate = useNavigate()

  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [addressInput, setAddressInput] = useState('')
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide(prev => (prev + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams()
    if (addressInput.trim()) queryParams.set('location', addressInput.trim())
    navigate(`/request?${queryParams.toString()}`)
  }

  const iconMap: Record<string, React.ReactNode> = {
    Shovel: <Shovel className="w-5 h-5 text-primary" />,
    Compass: <Compass className="w-5 h-5 text-primary" />,
    DraftingCompass: <Layers className="w-5 h-5 text-primary" />,
    Wrench: <Wrench className="w-5 h-5 text-primary" />,
    Building2: <Building2 className="w-5 h-5 text-primary" />,
    Trees: <Trees className="w-5 h-5 text-primary" />
  }

  const renderMediaShowcase = () => (
    <div className="space-y-4">
      {/* 1. On-Site Field Video Showcase Card */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary-light text-primary flex items-center justify-center">
              <Video className="w-3.5 h-3.5" />
            </div>
            <h2 className="text-base font-bold text-slate-800 tracking-tight">
              On-Site Field Inspection
            </h2>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary-light px-2 py-0.5 rounded-full">
            Live Action
          </span>
        </div>

        {/* Video Player Card */}
        <div
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-border shadow-xs group cursor-pointer bg-slate-900"
          onClick={() => setIsPlayingVideo(!isPlayingVideo)}
        >
          {!isPlayingVideo ? (
            <>
              <img
                src="/hero/engineer_field_inspection_4k.jpg"
                alt="Massachusetts Title 5 Field Inspection"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-between p-3.5 sm:p-4">
                <div className="flex items-center justify-between">
                </div>

                {/* Center Play Pulse Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-13 h-13 rounded-full bg-primary/95 text-primary-foreground flex items-center justify-center shadow-lg transform group-hover:scale-110 active:scale-95 transition-all ring-4 ring-white/30 backdrop-blur-xs">
                    <Play className="w-6 h-6 fill-current ml-0.5 stroke-[2]" />
                  </div>
                </div>

                {/* Bottom Caption */}
                <div>
                  <div className="flex items-center gap-1.5 text-white/90 text-xs font-bold">
                    <span>Deep-Hole & Soil Perc Witnessing</span>
                  </div>
          
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-950 text-white relative">
              <img
                src="/hero/engineer_field_inspection_4k.jpg"
                alt="Playing Video"
                className="absolute inset-0 w-full h-full object-cover opacity-35"
              />
              <div className="relative z-10 space-y-2 max-w-xs">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-black text-white">Title 5 Perc Test Walkthrough</h4>
                <p className="text-[11px] text-slate-300">
                  Witnessed deep hole evaluation passed with 8.5 min/in rate. Town BOH signed on-site.
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsPlayingVideo(false)
                  }}
                  className="text-[10px] font-bold text-white/80 hover:text-white underline pt-1 cursor-pointer"
                >
                  Close Video Preview
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Recent On-Site Project Photos (Horizontal Photo Cards) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-2 px-0.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight truncate">
              Recent Field Work & Inspections
            </h3>
          </div>
          <span className="text-[10px] font-semibold text-muted-foreground bg-slate-100 px-2 py-0.5 rounded-md shrink-0">
            MA Statewide
          </span>
        </div>

        {/* Horizontal Scroll Gallery */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 pt-0.5 px-0.5">
          {/* Photo Card 1 */}
          <div className="w-[calc(50%-6px)] min-w-[150px] shrink-0 snap-start bg-card rounded-2xl border border-border shadow-xs overflow-hidden flex flex-col group">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src="/onboarding/vertical_mobile_onboarding_screen_photography_4k_realistic_a_compact_mini.png"
                alt="Mini-excavator deep hole test"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-white text-[9px] font-bold">
                📍 Acton, MA
              </span>
            </div>
            <div className="p-2 sm:p-2.5">
              <h4 className="font-bold text-xs text-slate-800 leading-tight truncate">
                Backyard Perc Testing
              </h4>
              <span className="text-[10px] text-primary font-bold block mt-0.5 truncate">
                Passed BOH Witness
              </span>
            </div>
          </div>

          {/* Photo Card 2 */}
          <div className="w-[calc(50%-6px)] min-w-[150px] shrink-0 snap-start bg-card rounded-2xl border border-border shadow-xs overflow-hidden flex flex-col group">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src="/onboarding/vertical_mobile_onboarding_screen_photography_4k_realistic_close_up_hands_of_a.png"
                alt="Title 5 Stamped Blueprints"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-white text-[9px] font-bold">
                📍 Chelmsford, MA
              </span>
            </div>
            <div className="p-2 sm:p-2.5">
              <h4 className="font-bold text-xs text-slate-800 leading-tight truncate">
                Civil 3D Septic Plans
              </h4>
              <span className="text-[10px] text-primary font-bold block mt-0.5 truncate">
                P.E. Stamped & Approved
              </span>
            </div>
          </div>

          {/* Photo Card 3 */}
          <div className="w-[calc(50%-6px)] min-w-[150px] shrink-0 snap-start bg-card rounded-2xl border border-border shadow-xs overflow-hidden flex flex-col group">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src="/hero/engineer_field_inspection_4k.jpg"
                alt="Licensed P.E. reviewing site"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-white text-[9px] font-bold">
                📍 Littleton, MA
              </span>
            </div>
            <div className="p-2 sm:p-2.5">
              <h4 className="font-bold text-xs text-slate-800 leading-tight truncate">
                Form 11 Certification
              </h4>
              <span className="text-[10px] text-primary font-bold block mt-0.5 truncate">
                Cleared for Closing
              </span>
            </div>
          </div>

          {/* Photo Card 4 */}
          <div className="w-[calc(50%-6px)] min-w-[150px] shrink-0 snap-start bg-card rounded-2xl border border-border shadow-xs overflow-hidden flex flex-col group">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src="/hero/high_end_realistic_4k_drone_aerial_view_of_a_picturesque_residential_landscape.png"
                alt="Drone site survey"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-white text-[9px] font-bold">
                📍 Sudbury, MA
              </span>
            </div>
            <div className="p-2 sm:p-2.5">
              <h4 className="font-bold text-xs text-slate-800 leading-tight truncate">
                GIS Drone Parcel Survey
              </h4>
              <span className="text-[10px] text-primary font-bold block mt-0.5 truncate">
                Conservation Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 px-4 max-w-lg mx-auto pt-4 pb-8 sm:pb-10">

      {currentRole === 'contractor' ? (
        /* ================= CONTRACTOR PRO VIEW ================= */
        <div className="space-y-6">
          {/* 1. CONTRACTOR PRO HEADER */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-slate-800">
                {userProfile?.companyName || 'Apex Site Contracting'}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-primary/15 text-primary border border-primary/25 uppercase shrink-0">
                PRO PORTAL
              </span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">
              Welcome back, {userProfile?.name || 'Contractor'} • Priority P.E. Engineering Dispatch
            </p>
          </div>

          {/* 2. CONTRACTOR HERO SECTION */}
          <div
            onClick={() => navigate(CONTRACTOR_HERO_SLIDES[activeHeroSlide].link)}
            className="w-full relative overflow-hidden rounded-2xl shadow-sm border border-border/60 aspect-[16/9] select-none group flex flex-col justify-end cursor-pointer"
          >
            {/* Slide Images with cross-fade */}
            {CONTRACTOR_HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.image}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${idx === activeHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
              >
                <img
                  src={slide.image}
                  alt={slide.tag}
                  className="w-full h-full object-cover object-center pointer-events-none"
                />
                {/* Bottom gradient overlay for badge and indicators */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}

            {/* Slide Bottom Bar: Badge & Slide Indicators */}
            <div className="relative z-20 w-full flex items-center justify-between p-3.5 text-white">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground shadow-xs shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {CONTRACTOR_HERO_SLIDES[activeHeroSlide].tag}
              </span>

              {/* Dots Indicator */}
              <div
                className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-full border border-white/15 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {CONTRACTOR_HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveHeroSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${idx === activeHeroSlide
                        ? 'w-5 h-1.5 bg-primary'
                        : 'w-1.5 h-1.5 bg-white/50 hover:bg-white'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3. CONTRACTOR DISPATCH SEARCH */}
          <form
            onSubmit={handleHeroSubmit}
            className="w-full bg-card rounded-2xl p-1.5 sm:p-2 border border-border shadow-xs flex items-center gap-2 transition-all focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
              <HardHat className="w-5 h-5 text-primary stroke-[2.2]" />
            </div>

            <input
              type="text"
              placeholder="Enter jobsite address or parcel ID..."
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              className="flex-1 bg-transparent text-xs sm:text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
            />

            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Dispatch</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </form>

          {/* 3. CONTRACTOR 4 KPI CARDS (2x2 Responsive Grid) */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted-foreground font-semibold block leading-tight">Active Sites</span>
                <span className="text-2xl font-black text-slate-800 block mt-0.5 leading-tight">
                  {projects.filter(p => p.percentComplete < 100).length}
                </span>
                <span className="text-[10px] text-primary font-bold mt-0.5 block">In Progress</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                <Folder className="w-4 h-4 text-primary" />
              </div>
            </div>

            <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted-foreground font-semibold block leading-tight">P.E. Stamped</span>
                <span className="text-2xl font-black text-slate-800 block mt-0.5 leading-tight">100%</span>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">MA Certified</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>
            </div>

            <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted-foreground font-semibold block leading-tight">Total Jobs</span>
                <span className="text-2xl font-black text-slate-800 block mt-0.5 leading-tight">{projects.length}</span>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">All Time</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                <ClipboardList className="w-4 h-4 text-primary" />
              </div>
            </div>

            <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[11px] text-muted-foreground font-semibold block leading-tight">Wholesale Rates</span>
                <span className="text-2xl font-black text-primary block mt-0.5 leading-tight">Tier 1</span>
                <span className="text-[10px] text-muted-foreground mt-0.5 block">Pro Discount</span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                <Wallet className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>

          {/* 4. CONTRACTOR ACTION TILES */}
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              to="/request"
              className="p-3.5 rounded-2xl bg-primary text-primary-foreground flex flex-col justify-between shadow-xs hover:bg-primary-hover active:scale-[0.98] transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-white" />
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold block">New Engineering Job</span>
                <span className="text-[10px] text-white/80 block mt-0.5">Priority Dispatch</span>
              </div>
            </Link>

            <Link
              to="/calculator"
              className="p-3.5 rounded-2xl bg-card border border-border shadow-2xs flex flex-col justify-between hover:border-primary/50 active:scale-[0.98] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                <Wallet className="w-4 h-4 text-primary" />
              </div>
              <div className="mt-4">
                <span className="text-xs font-bold text-slate-800 group-hover:text-primary transition-colors block">
                  Trade Rate Sheet
                </span>
                <span className="text-[10px] text-muted-foreground block mt-0.5">Wholesale Estimator</span>
              </div>
            </Link>
          </div>

          {/* 5. RECENT ACTIVE CONTRACTOR JOBS */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800">
                Active Construction Sites
              </h2>
              <Link to="/contractor" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                View All ({projects.length}) <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 3).map((job) => (
                <Link
                  key={job.id}
                  to={`/project/${job.id}`}
                  className="block p-3.5 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/50 active:scale-[0.99] transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-black text-slate-800 truncate">
                          {job.propertyAddress}
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono">
                          • {job.city}
                        </span>
                      </div>
                      <span className="text-[11px] text-muted-foreground block mt-0.5">
                        {job.title}
                      </span>
                    </div>
                    <Badge variant={job.percentComplete === 100 ? 'success' : 'secondary'} className="text-[10px] shrink-0 font-bold">
                      {job.percentComplete}% Done
                    </Badge>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${job.percentComplete}%` }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* 6. ON-SITE FIELD VIDEO & PHOTO GALLERY */}
          {renderMediaShowcase()}

          {/* 7. THE DOUCETTE TRADE ADVANTAGE (2x2 Mobile Bento Grid) */}
          <div className="space-y-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                Built For Site Contractors
              </span>
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                The Doucette Trade Advantage
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex flex-col justify-between space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-800 leading-snug">
                    24-48 Hr Dispatch
                  </h3>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                    Prioritize contractor test-pit witnessing.
                  </p>
                </div>
              </div>

              <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex flex-col justify-between space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <Award className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-800 leading-snug">
                    100% Approval
                  </h3>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                    Zero rejected Title 5 filings.
                  </p>
                </div>
              </div>

              <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex flex-col justify-between space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <Layers className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-800 leading-snug">
                    Rapid CAD Revisions
                  </h3>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                    Ledge or water table shifts on-site.
                  </p>
                </div>
              </div>

              <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex flex-col justify-between space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <Wallet className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-800 leading-snug">
                    Wholesale Rates
                  </h3>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                    Volume partner discounts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 8. CONTRACTOR PRO TOOLS HUB */}
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                Field & Office Suite
              </span>
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                Contractor Pro Tools & Hub
              </h2>
            </div>

            <div className="space-y-4">
              {/* Tile 1: Priority Soil Perc Witnessing */}
              <Link
                to="/request?service=soil-perc-test"
                className="p-3.5 rounded-2xl bg-card border border-border shadow-2xs hover:border-primary/50 hover:shadow-xs active:scale-[0.98] transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Shovel className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-primary transition-colors">
                      Priority Soil Perc Witnessing
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      Lock in test dates directly synced with your backhoe crew.
                    </p>
                  </div>
                </div>
                <div className="h-7 w-7 rounded-lg bg-slate-100 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-slate-500 shrink-0 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </Link>

              {/* Tile 2: Wholesale Trade Rate Estimator */}
              <Link
                to="/calculator"
                className="p-3.5 rounded-2xl bg-card border border-border shadow-2xs hover:border-primary/50 hover:shadow-xs active:scale-[0.98] transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Calculator className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-primary transition-colors">
                      Wholesale Project Cost Estimator
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      Instant Title 5 engineering estimates for client bids.
                    </p>
                  </div>
                </div>
                <div className="h-7 w-7 rounded-lg bg-slate-100 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-slate-500 shrink-0 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </Link>

              {/* Tile 3: Stamped Municipal Plans & As-Builts */}
              <Link
                to="/contractor"
                className="p-3.5 rounded-2xl bg-card border border-border shadow-2xs hover:border-primary/50 hover:shadow-xs active:scale-[0.98] transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-primary transition-colors">
                      Stamped Plans & COC Vault
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      Download official P.E. PDFs, Form 11s, and municipal records.
                    </p>
                  </div>
                </div>
                <div className="h-7 w-7 rounded-lg bg-slate-100 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-slate-500 shrink-0 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </Link>

              {/* Tile 4: Direct P.E. Hotline */}
              <a
                href="tel:9785550199"
                className="p-3.5 rounded-2xl bg-card border border-border shadow-2xs hover:border-primary/50 hover:shadow-xs active:scale-[0.98] transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-primary transition-colors">
                      Direct P.E. Jobsite Hotline
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      Direct line to Robert Doucette, P.E. #41908 for site questions.
                    </p>
                  </div>
                </div>
                <div className="h-7 w-7 rounded-lg bg-slate-100 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-slate-500 shrink-0 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </a>
            </div>
          </div>

          {/* 9. CONTRACTOR EXPEDITED FIELD WORKFLOW */}
          <div className="bg-card rounded-2xl p-4 sm:p-5 border border-border shadow-xs space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                Expedited Field Protocol
              </span>
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                From Test-Pit to Final COC
              </h2>
            </div>

            <div className="space-y-5 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {/* Step 1 */}
              <div className="relative flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground font-black text-xs flex items-center justify-center shrink-0 z-10 shadow-xs ring-4 ring-card">
                  1
                </div>
                <div className="pt-0.5">
                  <h3 className="text-xs font-bold text-slate-800 leading-snug">
                    Book Witness & DigSafe Clearance
                  </h3>
                  
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground font-black text-xs flex items-center justify-center shrink-0 z-10 shadow-xs ring-4 ring-card">
                  2
                </div>
                <div className="pt-0.5">
                  <h3 className="text-xs font-bold text-slate-800 leading-snug">
                    Witnessed Perc & Civil 3D CAD
                  </h3>
                
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground font-black text-xs flex items-center justify-center shrink-0 z-10 shadow-xs ring-4 ring-card">
                  3
                </div>
                <div className="pt-0.5">
                  <h3 className="text-xs font-bold text-slate-800 leading-snug">
                    Town Approval & As-Built Certification
                  </h3>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= HOMEOWNER VIEW ================= */
        <div className="space-y-6">
          {/* 1. DASHBOARD GREETING HEADER */}
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">
              Welcome back, {userProfile?.name || 'Aakash'} !
            </h1>
          </div>

          {/* 2. HERO SECTION */}
          <div
            onClick={() => navigate(HERO_SLIDES[activeHeroSlide].link)}
            className="w-full relative overflow-hidden rounded-2xl shadow-sm border border-border/60 aspect-[16/9] select-none group flex flex-col justify-end cursor-pointer"
          >
            {/* Slide Images with cross-fade */}
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.image}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${idx === activeHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
              >
                <img
                  src={slide.image}
                  alt={slide.tag}
                  className="w-full h-full object-cover object-center pointer-events-none"
                />
                {/* Bottom gradient overlay for badge and indicators */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}

            {/* Slide Bottom Bar: Badge & Slide Indicators */}
            <div className="relative z-20 w-full flex items-center justify-between p-3.5 text-white">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-primary-foreground shadow-xs shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {HERO_SLIDES[activeHeroSlide].tag}
              </span>

              {/* Dots Indicator */}
              <div
                className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2 py-1 rounded-full border border-white/15 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveHeroSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${idx === activeHeroSlide
                        ? 'w-5 h-1.5 bg-primary'
                        : 'w-1.5 h-1.5 bg-white/50 hover:bg-white'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* 3. TWO QUICK ACCESS TABS (Trade Rates & Title 5 Guide) */}
          <div className="grid grid-cols-2 gap-2.5 w-full">
            {/* Tab 1: Trade Rates */}
            <Link
              to="/calculator"
              className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/50 hover:shadow-sm active:scale-[0.98] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Wallet className="w-5 h-5 text-primary stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-800 block truncate group-hover:text-primary transition-colors">
                  Trade Rates
                </span>
                <span className="text-[10px] text-muted-foreground block truncate">
                  Cost Estimator
                </span>
              </div>
            </Link>

            {/* Tab 2: Title 5 Guide */}
            <Link
              to="/guides"
              className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border shadow-xs hover:border-primary/50 hover:shadow-sm active:scale-[0.98] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 text-primary stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-slate-800 block truncate group-hover:text-primary transition-colors">
                  Guide
                </span>
                <span className="text-[10px] text-muted-foreground block truncate">
                  Septic Manual
                </span>
              </div>
            </Link>
          </div>

          {/* 4. APP ACTION SEARCH BAR (Airbnb / TaskRabbit Style) */}
          <form
            onSubmit={handleHeroSubmit}
            className="w-full bg-card rounded-2xl p-1.5 sm:p-2 border border-border shadow-xs flex items-center gap-2 transition-all focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/20"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-primary stroke-[2.2]" />
            </div>

            <input
              type="text"
              placeholder="Enter property address or ZIP..."
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              className="flex-1 bg-transparent text-xs sm:text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none min-w-0"
            />

            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </form>

          {/* 5. CORE SERVICES CATALOG */}
          <div className="space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                  Engineering Services Catalog
                </h2>
              </div>
              <Link to="/request">
                <span className="text-xs sm:text-sm font-bold text-primary hover:underline flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            <div className="space-y-3">
              {SERVICES_CATALOG.slice(0, 2).map((service) => (
                <div
                  key={service.id}
                  className="p-4 rounded-2xl border border-border shadow-xs bg-card hover:border-primary/50 transition-all flex flex-col justify-between space-y-3 group"
                >
                  {/* Top: Icon + Title & Tagline + Badge */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        {iconMap[service.iconName] || <Compass className="w-5 h-5 text-primary stroke-[2.2]" />}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight truncate">
                          {service.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                          {service.tagline}
                        </p>
                      </div>
                    </div>
                    {service.badge && (
                      <Badge
                        variant={service.badge === 'Most Popular' ? 'success' : 'secondary'}
                        className="text-[10px] shrink-0 font-bold px-2 py-0.5"
                      >
                        {service.badge}
                      </Badge>
                    )}
                  </div>

                  {/* Bottom: Price on Left + Compact "Book Now →" on Right (Timeline removed) */}
                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">
                        From
                      </span>
                      <span className="text-base font-black text-slate-900 tracking-tight">
                        {formatCurrency(service.priceStartingAt)}
                      </span>
                    </div>

                    <Link to={`/request?service=${service.id}`}>
                      <button
                        type="button"
                        className="h-9 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-2xs hover:bg-primary-hover active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Book Now</span>
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. ON-SITE FIELD VIDEO & PHOTO GALLERY */}
          {renderMediaShowcase()}

          {/* 7. WHY HOMEOWNERS TRUST US (2x2 Mobile App Bento Grid) */}
          <div className="space-y-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                The Doucette Difference
              </span>
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                Why Homeowners Trust Us
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex flex-col justify-between space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-800 leading-snug">
                    48-Hr Fast Dispatch
                  </h3>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                    Hole observation & perc testing.
                  </p>
                </div>
              </div>

              <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex flex-col justify-between space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <Award className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-800 leading-snug">
                    100% Town BOH Approval
                  </h3>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                    Municipal Title 5 compliance.
                  </p>
                </div>
              </div>

              <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex flex-col justify-between space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-800 leading-snug">
                    Stamped Civil P.E.
                  </h3>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                    Official MA DEP licensed P.E. 
                  </p>
                </div>
              </div>

              <div className="bg-card p-3.5 rounded-2xl border border-border shadow-2xs flex flex-col justify-between space-y-2">
                <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
                  <Smartphone className="w-4 h-4 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-800 leading-snug">
                    Live Mobile Tracking
                  </h3>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-0.5">
                    Track permits & plans in real time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 7. EXPLORE CORE FEATURES (Interactive App Tiles with 1-Tap Direct Navigation) */}
          <div className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                Explore Features
              </h2>
            </div>

            <div className="space-y-4">
              {/* Tile 1: Instant Cost Estimator */}
              <Link
                to="/calculator"
                className="p-3.5 rounded-2xl bg-card border border-border shadow-2xs hover:border-primary/50 hover:shadow-xs active:scale-[0.98] transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Calculator className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-primary transition-colors">
                      Instant Septic Cost Estimator
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      Calculate design & construction costs in 30 seconds.
                    </p>
                  </div>
                </div>
                <div className="h-7 w-7 rounded-lg bg-slate-100 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-slate-500 shrink-0 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </Link>

              {/* Tile 2: Live Permit & CAD Milestone Tracker */}
              <Link
                to="/track"
                className="p-3.5 rounded-2xl bg-card border border-border shadow-2xs hover:border-primary/50 hover:shadow-xs active:scale-[0.98] transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Activity className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-primary transition-colors">
                      Live Permit & Milestone Tracker
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      Follow DigSafe, perc logs, and town hearing approvals.
                    </p>
                  </div>
                </div>
                <div className="h-7 w-7 rounded-lg bg-slate-100 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-slate-500 shrink-0 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </Link>

              {/* Tile 3: Massachusetts Title 5 Septic Guide */}
              <Link
                to="/guides"
                className="p-3.5 rounded-2xl bg-card border border-border shadow-2xs hover:border-primary/50 hover:shadow-xs active:scale-[0.98] transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-primary transition-colors">
                      Title 5 Homeowner Guide
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      Clear guidelines on inspections, setbacks, and deed rules.
                    </p>
                  </div>
                </div>
                <div className="h-7 w-7 rounded-lg bg-slate-100 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-slate-500 shrink-0 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </Link>

              {/* Tile 4: Priority Engineering Request */}
              <Link
                to="/request"
                className="p-3.5 rounded-2xl bg-card border border-border shadow-2xs hover:border-primary/50 hover:shadow-xs active:scale-[0.98] transition-all flex items-center justify-between gap-3 group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Shovel className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 text-xs sm:text-sm leading-snug group-hover:text-primary transition-colors">
                      Priority Engineering Request
                    </h3>
                    <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                      Book soil testing and full site designs with licensed P.E.
                    </p>
                  </div>
                </div>
                <div className="h-7 w-7 rounded-lg bg-slate-100 group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center text-slate-500 shrink-0 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
              </Link>
            </div>
          </div>

          {/* 8. HOW IT WORKS: 3 STEPS TO TOWN APPROVAL */}
          <div className="bg-card rounded-2xl p-4 sm:p-5 border border-border shadow-xs space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">
                Simple 3-Step Process
              </span>
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                From Request to Town Approval
              </h2>
            </div>

            <div className="space-y-3 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {/* Step 1 */}
              <div className="relative flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground font-black text-xs flex items-center justify-center shrink-0 z-10 shadow-xs ring-4 ring-card">
                  1
                </div>
                <div className="pt-0.5">
                  <h3 className="text-xs font-bold text-slate-800 leading-snug">
                    Book & DigSafe Clearance
                  </h3>
               
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground font-black text-xs flex items-center justify-center shrink-0 z-10 shadow-xs ring-4 ring-card">
                  2
                </div>
                <div className="pt-0.5">
                  <h3 className="text-xs font-bold text-slate-800 leading-snug">
                    Witnessed Perc & CAD Design
                  </h3>
                 
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-primary text-primary-foreground font-black text-xs flex items-center justify-center shrink-0 z-10 shadow-xs ring-4 ring-card">
                  3
                </div>
                <div className="pt-0.5">
                  <h3 className="text-xs font-bold text-slate-800 leading-snug">
                    Town Sign-Off & Form 11 Stamp
                  </h3>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUPPORT FOOTER CARD (FOR BOTH PERSONAS) */}
      <div className="bg-primary-light/60 rounded-2xl p-4 sm:p-5 border border-primary/25 shadow-2xs flex items-start gap-3.5">
        <div className="h-10 w-10 rounded-xl bg-card border border-primary/25 flex items-center justify-center shrink-0 shadow-2xs">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="font-bold text-foreground text-sm">
            {currentRole === 'contractor' ? 'Dedicated Pro Contractor Support' : 'Need help with your project?'}
          </h3>
          <div className="pt-1">
            <a
              href="tel:9783694200"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline cursor-pointer"
            >
              <span>{currentRole === 'contractor' ? 'Call Engineering Dispatch: (978) 369-4200' : 'Contact Support'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage
