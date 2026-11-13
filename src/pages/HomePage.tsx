import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  HardHat, 
  Home, 
  Building2, 
  Trees, 
  Shovel, 
  Compass, 
  ChevronRight, 
  Layers, 
  Search, 
  Wrench,
  ClipboardList,
  Filter,
  ShieldCheck,
  FileText,
  Star,
  MessageSquare
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { SERVICES_CATALOG } from '@/data/services'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

export const HomePage: React.FC = () => {
  const { currentRole, setCurrentRole, projects } = useProjects()
  const navigate = useNavigate()
  
  const [addressInput, setAddressInput] = useState('')
  const [selectedService, setSelectedService] = useState('septic-design')
  const [urgencyLevel, setUrgencyLevel] = useState('standard')
  const [homeownerTrackInput, setHomeownerTrackInput] = useState('')

  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const queryParams = new URLSearchParams()
    if (addressInput) queryParams.set('location', addressInput)
    if (selectedService) queryParams.set('service', selectedService)
    if (urgencyLevel) queryParams.set('urgency', urgencyLevel)
    navigate(`/request?${queryParams.toString()}`)
  }

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (homeownerTrackInput.trim()) {
      navigate(`/track?query=${encodeURIComponent(homeownerTrackInput.trim())}`)
    } else {
      navigate('/track')
    }
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
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 max-w-7xl mx-auto pt-4 pb-20">
      
      {/* 1. ZIPFIXER DASHBOARD GREETING HEADER (Screenshot 3) */}
      <div className="space-y-0.5">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight text-foreground">
          Welcome back, {currentRole === 'contractor' ? 'Contractor Pro' : 'Aakash'} !
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Manage your home service requests, site development and septic projects
        </p>
      </div>

      {/* 2. ZIPFIXER 4 STAT CARDS WITH GREEN SQUIRCLE ICONS (Screenshot 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-card p-4 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground font-medium block">Total Requests</span>
            <span className="text-2xl font-black text-foreground font-mono">{projects.length}</span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">All time</span>
          </div>
          <div className="app-squircle-icon">
            <ClipboardList className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="bg-card p-4 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground font-medium block">Active Jobs</span>
            <span className="text-2xl font-black text-foreground font-mono">
              {projects.filter(p => p.percentComplete < 100).length}
            </span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">Currently ongoing</span>
          </div>
          <div className="app-squircle-icon">
            <Wrench className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="bg-card p-4 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground font-medium block">Completed Jobs</span>
            <span className="text-2xl font-black text-foreground font-mono">
              {projects.filter(p => p.percentComplete === 100).length}
            </span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">Successfully finished</span>
          </div>
          <div className="app-squircle-icon">
            <CheckCircle2 className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="bg-card p-4 rounded-2xl border border-border shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground font-medium block">BOH Approvals</span>
            <span className="text-2xl font-black text-primary font-mono">100%</span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">Town pass rate</span>
          </div>
          <div className="app-squircle-icon">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
        </div>
      </div>

      {/* 3. ZIPFIXER SEARCH + GREEN FILTER BUTTON ROW (Screenshots 1, 2, 4) */}
      <form onSubmit={handleTrackSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search requests or enter Zip..."
            value={homeownerTrackInput}
            onChange={(e) => setHomeownerTrackInput(e.target.value)}
            className="w-full h-10 pl-10 pr-3 rounded-xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
          />
        </div>
        <button
          type="submit"
          className="app-btn-filter cursor-pointer"
        >
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
      </form>

      {/* 4. QUICK INTAKE CARD - ZIPFIXER VIBRANT GREEN CTA */}
      <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="app-squircle-icon">
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-extrabold text-foreground text-base sm:text-lg">
                Request Engineering & Septic Design
              </h2>
              <p className="text-xs text-muted-foreground">
                Get instant quotes from licensed civil P.E. & Title 5 evaluators
              </p>
            </div>
          </div>

          {/* Persona Switch Segmented Control */}
          <div className="app-segmented-group shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setCurrentRole('homeowner')}
              className={`app-segmented-pill ${currentRole === 'homeowner' ? 'app-segmented-pill-active' : ''}`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>Homeowner</span>
            </button>
            <button
              type="button"
              onClick={() => setCurrentRole('contractor')}
              className={`app-segmented-pill ${currentRole === 'contractor' ? 'app-segmented-pill-pro' : ''}`}
            >
              <HardHat className="w-3.5 h-3.5" />
              <span>Contractor Pro</span>
            </button>
          </div>
        </div>

        {/* Quick Intake Form */}
        <form onSubmit={handleHeroSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
              Property Address or Zip Code
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-primary absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="e.g. 142 Highland Rd, Acton or 01720"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl border border-input bg-card text-xs sm:text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                Service Needed
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="septic-design">Title 5 Septic System Design</option>
                <option value="soil-perc-test">Soil Perc & Deep Hole Testing</option>
                <option value="site-development">Site Grading & Stormwater</option>
                <option value="septic-repair">D-Box / Component Repair</option>
                <option value="commercial-septic">Commercial Wastewater</option>
                <option value="wetland-conservation">Wetland & Conservation Filing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground uppercase tracking-wider mb-1">
                Timeline Urgency
              </label>
              <select
                value={urgencyLevel}
                onChange={(e) => setUrgencyLevel(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-input bg-card text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="standard">Standard (2 - 3 Weeks)</option>
                <option value="expedited">Expedited (1 - 2 Weeks)</option>
                <option value="emergency">Emergency / Closing Escrow</option>
              </select>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm shadow-sm hover:bg-primary-hover active:scale-[0.99] transition-all flex items-center justify-between px-4 cursor-pointer"
          >
            <span>Create Your Request & Get Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* 5. CORE SERVICES CATALOG */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
              Engineering Services Catalog
            </h2>
            <p className="text-xs text-muted-foreground">
              Official Title 5 plans, perc testing and municipal submissions
            </p>
          </div>
          <Link to="/request">
            <span className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES_CATALOG.map((service) => (
            <Card key={service.id} className="hover:border-primary/50 transition-all flex flex-col justify-between">
              <CardHeader className="space-y-2 pb-2">
                <div className="flex items-center justify-between">
                  <div className="app-squircle-icon">
                    {iconMap[service.iconName] || <Compass className="w-5 h-5 text-primary" />}
                  </div>
                  {service.badge && (
                    <Badge variant={service.badge === 'Most Popular' ? 'success' : 'secondary'} className="text-[10px]">
                      {service.badge}
                    </Badge>
                  )}
                </div>

                <div>
                  <CardTitle className="text-sm sm:text-base group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-0.5 text-xs">
                    {service.tagline}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-0">
                <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold">Starting At</span>
                    <span className="text-sm font-extrabold text-foreground font-mono">
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
                  <Button variant="secondary" size="sm" className="w-full text-xs font-bold hover:bg-primary hover:text-primary-foreground transition-all">
                    <span>Request Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 6. ZIPFIXER DASHBOARD QUICK ACTIONS (Attached Screenshot) */}
      <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-2xs space-y-4">
        <div className="space-y-0.5">
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            Quick Actions
          </h2>
          <p className="text-xs text-muted-foreground">
            What would you like to do?
          </p>
        </div>

        <div className="space-y-2.5">
          {/* Action 1: Find a Service (ZipFixer Vibrant Green) */}
          <Link
            to="/directory"
            className="w-full p-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary-hover active:scale-[0.99] transition-all flex items-center justify-between shadow-2xs group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-primary-foreground shrink-0 stroke-[2.2]" />
              <div className="text-left">
                <div className="font-bold text-sm text-primary-foreground leading-tight">
                  Find a Service
                </div>
                <div className="text-xs text-primary-foreground/80 font-normal mt-0.5">
                  Search for professionals
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-primary-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>

          {/* Action 2: View All Jobs (ZipFixer Dark Slate) */}
          <Link
            to="/contractor"
            className="w-full p-4 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 active:scale-[0.99] transition-all flex items-center justify-between shadow-2xs group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-secondary-foreground shrink-0 stroke-[2]" />
              <div className="text-left">
                <div className="font-bold text-sm text-secondary-foreground leading-tight">
                  View All Jobs
                </div>
                <div className="text-xs text-secondary-foreground/75 font-normal mt-0.5">
                  Check your job history
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-secondary-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
          </Link>

          {/* Action 3: Leave a Review (ZipFixer Dark Slate) */}
          <button
            type="button"
            onClick={() => alert('Thank you! Project review portal opens upon municipal permit completion.')}
            className="w-full p-4 rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/90 active:scale-[0.99] transition-all flex items-center justify-between shadow-2xs group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-secondary-foreground shrink-0 stroke-[2]" />
              <div className="text-left">
                <div className="font-bold text-sm text-secondary-foreground leading-tight">
                  Leave a Review
                </div>
                <div className="text-xs text-secondary-foreground/75 font-normal mt-0.5">
                  Share your experience
                </div>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-secondary-foreground group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        </div>
      </div>

      {/* 7. ZIPFIXER NEED HELP SUPPORT CARD (Attached Screenshot) */}
      <div className="bg-primary-light/60 rounded-2xl p-4 sm:p-5 border border-primary/25 shadow-2xs flex items-start gap-3.5">
        <div className="h-10 w-10 rounded-xl bg-card border border-primary/25 flex items-center justify-center shrink-0 shadow-2xs">
          <MessageSquare className="w-5 h-5 text-primary" />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-foreground text-sm sm:text-base">
            Need help?
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <div className="pt-1">
            <a
              href="tel:9783694200"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:underline cursor-pointer"
            >
              <span>Contact Support</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomePage
