import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Shovel, 
  Compass, 
  ShieldCheck 
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const GuidesPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const faqs = [
    {
      q: "What is Title 5 in Massachusetts and who enforces it?",
      a: "Title 5 (310 CMR 15.000) is the Massachusetts environmental sanitary code that governs the siting, construction, upgrade, and maintenance of on-site sewage disposal systems. It is enforced locally by municipal Boards of Health and the Massachusetts Department of Environmental Protection (MassDEP)."
    },
    {
      q: "What happens during a deep hole observation pit and percolation test?",
      a: "A licensed Title 5 soil evaluator excavates two or more test pits with a backhoe (typically 8 to 12 feet deep) to log the soil layers (horizons), identify seasonal high groundwater markers (soil mottling), and observe bedrock ledge. A standardized percolation test hole is then dug to measure how rapidly water drains into the subsoil (measured in minutes per inch)."
    },
    {
      q: "My home failed a Title 5 inspection. Can I still sell my house?",
      a: "Yes! Massachusetts allows property sales to proceed even with a failed septic system if the buyer or seller escrows 1.5x the estimated replacement cost with the closing attorney, or if an approved PE-stamped engineering plan is already on file with the local Board of Health. Doucette Engineering provides fast-track emergency plans and escrow letters for closing attorneys."
    },
    {
      q: "What are the required setback distances for a septic system?",
      a: "Title 5 requires strict minimum separation distances: 10 feet from property boundary lines, 10 feet from building foundations (20 feet if with a basement), 50 feet from water mains, 100 feet from private drinking water wells, and 100 feet from wetland resource areas, streams, and lakes."
    },
    {
      q: "What is an alternative septic system (like Presby Enviro-Septic or FAST)?",
      a: "Alternative systems are state-approved advanced wastewater technologies. For example, Presby Enviro-Septic uses specialized corrugated pipe with bacterial geo-textile fabric that allows a 2-foot reduction in separation to high groundwater. This avoids giant, unsightly sand mounds in your yard on lots with high water tables."
    },
    {
      q: "How long is a Board of Health approved septic design plan valid for?",
      a: "In Massachusetts, an approved septic disposal system construction permit is typically valid for 3 years from the date of issuance, and may often be extended for an additional year upon written request to the Board of Health."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-10 pb-28">
      
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold border border-primary/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Homeowner & Contractor Knowledge Base</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Septic Design & Title 5 Guides
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Clear, jargon-free explanations of soil testing, health department permits, setbacks, and cost saving strategies.
        </p>
      </div>

      {/* Guide Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-2xs space-y-2">
          <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
            <Shovel className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Perc Testing 101</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            What town inspectors look for in deep test pits and how seasonal water table depth impacts your design.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-2xs space-y-2">
          <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Escrow & Real Estate Closings</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            How to satisfy bank mortgage requirements and close on time even if your system has failed.
          </p>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-2xs space-y-2">
          <div className="h-10 w-10 rounded-xl bg-warning/15 text-warning flex items-center justify-center">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-foreground text-sm">Presby vs Conventional</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Why shallow innovative systems save up to $8,000 in trucked-in sand fill on tight lots.
          </p>
        </div>
      </div>

      {/* FAQ Accordion Section */}
      <div className="bg-card rounded-2xl p-5 sm:p-7 border border-border shadow-2xs space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-muted-foreground">
            Click on any question to view the engineering answer.
          </p>
        </div>

        <div className="space-y-2.5 pt-1">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div 
                key={idx} 
                className="border border-border rounded-xl overflow-hidden transition-all bg-card"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-3.5 sm:p-4 text-left flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-foreground hover:bg-muted transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-primary shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-3.5 sm:px-4 pb-4 pt-1 text-xs text-muted-foreground leading-relaxed border-t border-border bg-muted/30">
                    {faq.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Direct Contact Banner */}
      <div className="bg-secondary text-secondary-foreground rounded-2xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-base sm:text-lg">Have a specific property question?</h3>
          <p className="text-xs text-secondary-foreground/80">
            Speak directly with Licensed Professional Civil Engineer Robert Doucette.
          </p>
        </div>
        <Link to="/request">
          <Button variant="default" className="font-bold text-xs shadow-xs">
            Request Consultation
          </Button>
        </Link>
      </div>

    </div>
  )
}

export default GuidesPage
