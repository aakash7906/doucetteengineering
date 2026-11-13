import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, PhoneCall, Mail, MapPin, ExternalLink } from 'lucide-react'

const CURRENT_YEAR = new Date().getFullYear()

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground text-xs border-t border-border pb-20 md:pb-8 pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Company Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-mono font-bold text-sm">
                DE
              </div>
              <div>
                <div className="font-extrabold text-white text-sm tracking-tight">DOUCETTE ENGINEERING</div>
                <div className="text-[11px] text-muted-foreground font-medium">Civil, Environmental & Septic</div>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              Professional civil engineering, Title 5 soil evaluation, and septic design for homeowners, contractors, and developers across Massachusetts and New England.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-success bg-background/10 border border-success/30 p-2 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>MA PE License #41908 • Certified Title 5 Soil Evaluator</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Engineering Services
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/request?service=soil-perc-test" className="hover:text-white transition-colors">
                  Soil Percolation & Deep Hole Test
                </Link>
              </li>
              <li>
                <Link to="/request?service=septic-design" className="hover:text-white transition-colors">
                  Title 5 / Residential Septic Design
                </Link>
              </li>
              <li>
                <Link to="/request?service=site-development" className="hover:text-white transition-colors">
                  Site Grading & Stormwater Management
                </Link>
              </li>
              <li>
                <Link to="/request?service=septic-repair" className="hover:text-white transition-colors">
                  D-Box & Component Repair Engineering
                </Link>
              </li>
              <li>
                <Link to="/request?service=commercial-septic" className="hover:text-white transition-colors">
                  Commercial & Multi-Family Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Resources */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Portals & Tools
            </h4>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link to="/track" className="hover:text-white transition-colors flex items-center gap-1.5">
                  Live Project Progress Tracker
                  <span className="text-[9px] bg-primary/20 text-primary px-1.5 py-0.2 rounded font-bold">Live</span>
                </Link>
              </li>
              <li>
                <Link to="/contractor" className="hover:text-white transition-colors flex items-center gap-1.5">
                  Contractor & Builder Pro Hub
                  <span className="text-[9px] bg-warning/20 text-warning px-1.5 py-0.2 rounded font-bold">Trade</span>
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-white transition-colors">
                  Interactive Septic Cost Estimator
                </Link>
              </li>
              <li>
                <Link to="/guides" className="hover:text-white transition-colors">
                  Title 5 & Perc Testing 101 Guide
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.mass.gov/guides/buying-or-selling-a-home-with-a-septic-system" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors flex items-center gap-1 text-slate-300"
                >
                  MassDEP Title 5 Sanitary Code <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Dispatch */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
              Direct Engineering Dispatch
            </h4>
            <div className="space-y-2 text-slate-300">
              <a 
                href="tel:9783694200" 
                className="flex items-center gap-2 text-white hover:text-primary font-bold transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-primary" />
                (978) 369-4200
              </a>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>projects@doucetteengineering.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>Acton, MA 01720 • Serving Middlesex, Worcester & Essex</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom legal & copyright */}
        <div className="border-t border-slate-700/60 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div>
            © {CURRENT_YEAR} Doucette Engineering, LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <Link to="/guides" className="hover:text-white">Privacy & Terms</Link>
            <span>•</span>
            <Link to="/guides" className="hover:text-white">Standards</Link>
            <span>•</span>
            <span>UI inspired by ZipFixer</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
