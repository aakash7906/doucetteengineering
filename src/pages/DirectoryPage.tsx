import React from 'react'
import { Link } from 'react-router-dom'
import { 
  ShieldCheck, 
  PhoneCall, 
  Mail, 
  MapPin, 
  ExternalLink,
  Shovel,
  Compass,
  Layers,
  Wrench,
  Building2,
  Clock,
  HardHat,
  Calculator,
  BookOpen,
  ArrowRight,
  ChevronRight
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const CURRENT_YEAR = new Date().getFullYear()

export const DirectoryPage: React.FC = () => {
  const engineeringServices = [
    {
      id: 'soil-perc-test',
      title: 'Soil Percolation & Deep Hole Test',
      description: 'Town sanitarian-witnessed deep test pits, soil horizon analysis, and perc rate timing for Title 5 compliance.',
      icon: <Shovel className="w-5 h-5 text-primary" />,
      link: '/request?service=soil-perc-test',
      tag: '48-Hr Witness'
    },
    {
      id: 'septic-design',
      title: 'Title 5 / Residential Septic Design',
      description: 'Custom PE-stamped plans, conventional leaching trenches, Presby Enviro-Septic, and high water-table solutions.',
      icon: <Layers className="w-5 h-5 text-primary" />,
      link: '/request?service=septic-design',
      tag: 'BOH Approved'
    },
    {
      id: 'site-development',
      title: 'Site Grading & Stormwater Management',
      description: 'Erosion control, drainage basin sizing, cut-and-fill grading plans, and municipal Conservation filings.',
      icon: <Compass className="w-5 h-5 text-primary" />,
      link: '/request?service=site-development',
      tag: 'Civil 3D'
    },
    {
      id: 'septic-repair',
      title: 'D-Box & Component Repair Engineering',
      description: 'Distribution box replacements, tight tank retrofits, baffle repairs, and localized system component upgrades.',
      icon: <Wrench className="w-5 h-5 text-primary" />,
      link: '/request?service=septic-repair',
      tag: 'Fast Repair'
    },
    {
      id: 'commercial-septic',
      title: 'Commercial & Multi-Family Systems',
      description: 'Wastewater design for restaurants, subdivisions, retail plazas, and multi-unit residential developments >1,000 GPD.',
      icon: <Building2 className="w-5 h-5 text-primary" />,
      link: '/request?service=commercial-septic',
      tag: 'Commercial'
    }
  ]

  const portalsAndTools = [
    {
      title: 'Live Project Progress Tracker',
      description: 'Track municipal Board of Health approvals, perc logs, and CAD plans in real time.',
      icon: <Clock className="w-5 h-5 text-primary" />,
      link: '/track',
      badge: 'Live',
      badgeVariant: 'primary' as const
    },
    {
      title: 'Contractor & Builder Pro Hub',
      description: 'Trade volume rates, expedited 48-hr soil perc testing, and direct Civil 3D CAD downloads.',
      icon: <HardHat className="w-5 h-5 text-warning" />,
      link: '/contractor',
      badge: 'Trade',
      badgeVariant: 'warning' as const
    },
    {
      title: 'Interactive Septic Cost Estimator',
      description: 'Instant cost calculations for engineering, permitting fees, and contractor installation.',
      icon: <Calculator className="w-5 h-5 text-primary" />,
      link: '/calculator',
      badge: 'Calculator',
      badgeVariant: 'secondary' as const
    },
    {
      title: 'Title 5 & Perc Testing 101 Guide',
      description: 'Comprehensive FAQ, municipal setback guides, and escrow closing instructions.',
      icon: <BookOpen className="w-5 h-5 text-primary" />,
      link: '/guides',
      badge: 'Knowledge',
      badgeVariant: 'secondary' as const
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-10 pb-28">
      
      {/* 1. COMPANY CREDENTIALS HERO CARD */}
      <div className="bg-card rounded-2xl p-5 sm:p-7 border border-border shadow-2xs space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-mono font-black text-lg shadow-2xs">
            DE
          </div>
          <div>
            <h1 className="font-extrabold text-foreground text-lg sm:text-xl tracking-tight">
              DOUCETTE ENGINEERING
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Civil, Environmental & Septic System Design
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
          Professional civil engineering, Title 5 soil evaluation, and septic design for homeowners, contractors, and developers across Massachusetts and New England.
        </p>

        {/* PE Stamped License Pill */}
        <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary-light border border-primary/25 p-2.5 rounded-xl">
          <ShieldCheck className="w-4 h-4 shrink-0 text-primary" />
          <span>MA PE License #41908 • Certified Title 5 Soil Evaluator</span>
        </div>
      </div>

      {/* 2. ENGINEERING SERVICES DIRECTORY */}
      <div className="space-y-3">
        <div className="px-1 flex items-center justify-between">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            Engineering Services
          </h2>
          <span className="text-[11px] text-muted-foreground font-medium">
            {engineeringServices.length} Specializations
          </span>
        </div>

        <div className="space-y-2.5">
          {engineeringServices.map((service) => (
            <Link
              key={service.id}
              to={service.link}
              className="bg-card rounded-2xl p-4 border border-border shadow-2xs hover:border-primary/40 hover:shadow-xs transition-all flex items-start justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className="app-squircle-icon">
                  {service.icon}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <Badge variant="primary" className="text-[10px] py-0 px-1.5">
                      {service.tag}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-2" />
            </Link>
          ))}
        </div>
      </div>

      {/* 3. PORTALS & TOOLS */}
      <div className="space-y-3 pt-2">
        <div className="px-1">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            Portals & Tools
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {portalsAndTools.map((portal, idx) => (
            <Link
              key={idx}
              to={portal.link}
              className="bg-card rounded-2xl p-4 border border-border shadow-2xs hover:border-primary/40 hover:shadow-xs transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="app-squircle-icon">
                  {portal.icon}
                </div>
                <Badge variant={portal.badgeVariant} className="text-[10px]">
                  {portal.badge}
                </Badge>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors flex items-center justify-between">
                  <span>{portal.title}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {portal.description}
                </p>
              </div>
            </Link>
          ))}

          {/* MassDEP Title 5 Sanitary Code Official Link */}
          <a
            href="https://www.mass.gov/guides/buying-or-selling-a-home-with-a-septic-system"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card rounded-2xl p-4 border border-border shadow-2xs hover:border-primary/40 hover:shadow-xs transition-all flex flex-col justify-between space-y-3 group sm:col-span-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="app-squircle-icon">
                <ExternalLink className="w-5 h-5 text-primary" />
              </div>
              <Badge variant="secondary" className="text-[10px]">
                Mass.gov Official
              </Badge>
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-foreground text-sm group-hover:text-primary transition-colors flex items-center justify-between">
                <span>MassDEP Title 5 Sanitary Code (310 CMR 15.000)</span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-all shrink-0" />
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Official Commonwealth of Massachusetts statutory regulations for private septic installation, soil evaluator witnessing, and property transfer requirements.
              </p>
            </div>
          </a>
        </div>
      </div>

      {/* 4. DIRECT ENGINEERING DISPATCH */}
      <div className="bg-card rounded-2xl p-5 sm:p-6 border border-border shadow-2xs space-y-4">
        <div>
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">
            Direct Engineering Dispatch
          </h2>
          <h3 className="font-bold text-foreground text-base mt-0.5">
            Get in touch with Robert Doucette, P.E.
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <a
            href="tel:9783694200"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-primary-light text-primary hover:bg-primary-light/80 border border-primary/20 transition-all font-bold text-sm"
          >
            <PhoneCall className="w-5 h-5 text-primary shrink-0" />
            <div>
              <div className="text-[10px] uppercase font-bold text-primary/80">Call Direct Dispatch</div>
              <div className="text-sm font-extrabold text-primary">(978) 369-4200</div>
            </div>
          </a>

          <a
            href="mailto:projects@doucetteengineering.com"
            className="flex items-center gap-3 p-3.5 rounded-xl bg-muted text-foreground hover:bg-muted/80 border border-border transition-all text-sm font-medium"
          >
            <Mail className="w-5 h-5 text-primary shrink-0" />
            <div className="truncate">
              <div className="text-[10px] uppercase font-bold text-muted-foreground">Engineering Inquiries</div>
              <div className="text-xs font-semibold text-foreground truncate">projects@doucetteengineering.com</div>
            </div>
          </a>
        </div>

        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-muted border border-border text-xs text-muted-foreground">
          <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>
            <strong className="text-foreground">Regional Headquarters:</strong> Acton, Massachusetts 01720 • Fully licensed for Board of Health practice throughout Middlesex, Worcester, and Essex Counties.
          </span>
        </div>

        <div className="pt-2">
          <Link to="/request">
            <Button size="lg" className="w-full font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-1.5">
              <span>Start New Service Request</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* 5. LEGAL & LICENSING FOOTNOTE */}
      <div className="text-center text-[11px] text-muted-foreground space-y-1 pt-2">
        <div>
          © {CURRENT_YEAR} Doucette Engineering, LLC • All rights reserved.
        </div>
        <div>
          Commonwealth of Massachusetts Professional Engineering License #41908 • Title 5 Sanitary Code 310 CMR 15.000
        </div>
      </div>

    </div>
  )
}

export default DirectoryPage
