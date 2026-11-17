import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  MapPin,
  Clock,
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
  ShieldCheck
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { SERVICES_CATALOG } from '@/data/services'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
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

export const HomePage: React.FC = () => {
  const { currentRole, projects, userProfile } = useProjects()
  const navigate = useNavigate()

  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [addressInput, setAddressInput] = useState('')
  const [selectedService, setSelectedService] = useState('septic-design')
  const [urgencyLevel, setUrgencyLevel] = useState('standard')

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide(prev => (prev + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [])

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams()
    if (addressInput) queryParams.set('location', addressInput)
    if (selectedService) queryParams.set('service', selectedService)
    if (urgencyLevel) queryParams.set('urgency', urgencyLevel)
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

          {/* 2. CONTRACTOR 4 KPI CARDS (2x2 Responsive Grid) */}
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

          {/* 3. CONTRACTOR ACTION TILES */}
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

          {/* 4. RECENT ACTIVE CONTRACTOR JOBS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800">
                Active Construction Sites
              </h2>
              <Link to="/contractor" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                View All ({projects.length}) <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
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
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                  idx === activeHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
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
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === activeHeroSlide
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

          {/* 4. QUICK INTAKE CARD */}
          <div className="bg-card rounded-2xl p-5 border border-border shadow-xs space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-border/60">
              <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-slate-800 text-base">
                  Request Engineering & Septic Design
                </h2>
              </div>
            </div>

            {/* Quick Intake Form */}
            <form onSubmit={handleHeroSubmit} className="space-y-4 sm:space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                  Property Address or Zip Code
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-primary absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    placeholder="e.g. 142 Highland Rd, Acton or 01720"
                    value={addressInput}
                    onChange={(e) => setAddressInput(e.target.value)}
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-input bg-card text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
                  />
                </div>
              </div>

              <div className="space-y-3.5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                    Service Needed
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-input bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="septic-design">Title 5 Septic System Design</option>
                    <option value="soil-perc-test">Soil Perc & Deep Hole Testing</option>
                    <option value="site-development">Site Grading & Stormwater</option>
                    <option value="septic-repair">D-Box / Component Repair</option>
                    <option value="commercial-septic">Commercial Wastewater</option>
                    <option value="wetland-conservation">Wetland & Conservation Filing</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-foreground uppercase tracking-wider">
                    Timeline Urgency
                  </label>
                  <select
                    value={urgencyLevel}
                    onChange={(e) => setUrgencyLevel(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-input bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="standard">Standard (2 - 3 Weeks)</option>
                    <option value="expedited">Expedited (1 - 2 Weeks)</option>
                    <option value="emergency">Emergency / Closing Escrow</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-sm hover:bg-primary-hover active:scale-[0.99] transition-all flex items-center justify-between px-5 cursor-pointer mt-2"
              >
                <span>Create Your Request & Get Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

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

            <div className="space-y-3.5">
              {SERVICES_CATALOG.slice(0, 2).map((service) => (
                <Card key={service.id} className="hover:border-primary/50 transition-all flex flex-col justify-between p-4 rounded-2xl border border-border shadow-xs bg-card space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                        {iconMap[service.iconName] || <Compass className="w-5 h-5 text-primary" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                          {service.tagline}
                        </p>
                      </div>
                    </div>
                    {service.badge && (
                      <Badge variant={service.badge === 'Most Popular' ? 'success' : 'secondary'} className="text-[10px] shrink-0">
                        {service.badge}
                      </Badge>
                    )}
                  </div>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-muted-foreground block text-[10px] uppercase font-bold">Starting At</span>
                      <span className="text-base font-black text-foreground">
                        {formatCurrency(service.priceStartingAt)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground block text-[10px] uppercase font-bold">Timeline</span>
                      <span className="font-semibold text-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3 text-muted-foreground" /> {service.typicalTimeline}
                      </span>
                    </div>
                  </div>

                  <Link to={`/request?service=${service.id}`} className="block">
                    <Button variant="secondary" size="sm" className="w-full h-10 text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all">
                      <span>Request Details</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </Card>
              ))}
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
          <p className="text-xs text-muted-foreground leading-relaxed">
            {currentRole === 'contractor'
              ? 'Direct line to our licensed Massachusetts Civil & Septic Engineers.'
              : 'Our engineering support team is here to assist with any Title 5 questions.'}
          </p>
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
