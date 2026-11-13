import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Calculator, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/lib/utils'

export const CalculatorPage: React.FC = () => {
  const navigate = useNavigate()

  const [bedrooms, setBedrooms] = useState(4)
  const [percRate, setPercRate] = useState<'fast' | 'medium' | 'slow' | 'very_slow'>('medium')
  const [groundwaterDepth, setGroundwaterDepth] = useState<'deep' | 'moderate' | 'shallow'>('moderate')
  const [wetlandNearby, setWetlandNearby] = useState(false)
  const [requiresPump, setRequiresPump] = useState(false)
  const [nitrogenSensitive, setNitrogenSensitive] = useState(false)

  // Calculations
  const designFlowGPD = Math.max(330, bedrooms * 110)

  // Engineering Cost Calculation
  let baseEngineering = 2400
  if (bedrooms > 4) baseEngineering += (bedrooms - 4) * 200
  if (wetlandNearby) baseEngineering += 600
  if (requiresPump) baseEngineering += 300
  if (nitrogenSensitive) baseEngineering += 750

  const engineeringMin = Math.round(baseEngineering)
  const engineeringMax = Math.round(baseEngineering * 1.25)

  // Contractor Construction Installation Estimate
  let baseConstruction = 18000 + (bedrooms * 1600)
  if (percRate === 'slow') baseConstruction += 2500
  if (percRate === 'very_slow') baseConstruction += 4500
  if (groundwaterDepth === 'shallow') baseConstruction += 5000
  if (requiresPump) baseConstruction += 3500
  if (wetlandNearby) baseConstruction += 1500
  if (nitrogenSensitive) baseConstruction += 9000

  const constructionMin = Math.round(baseConstruction)
  const constructionMax = Math.round(baseConstruction * 1.25)

  // Leaching field area
  let loadingRateGPDPerSqFt = 0.74
  if (percRate === 'fast') loadingRateGPDPerSqFt = 0.90
  if (percRate === 'slow') loadingRateGPDPerSqFt = 0.55
  if (percRate === 'very_slow') loadingRateGPDPerSqFt = 0.40

  const requiredSASAreaSqFt = Math.round(designFlowGPD / loadingRateGPDPerSqFt)

  const handleStartRequestWithCalc = () => {
    const params = new URLSearchParams()
    params.set('service', 'septic-design')
    navigate(`/request?${params.toString()}`)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8 sm:space-y-12 pb-28">
      
      {/* App Header (Clean, concise, no paragraphs) */}
      <div className="text-center max-w-md mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-bold border border-primary/25 shadow-2xs">
          <Calculator className="w-3.5 h-3.5" />
          <span>Instant Cost Estimator</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
          Septic & Site Calculator
        </h1>
        <p className="text-xs text-muted-foreground font-medium">
          Select property parameters for immediate Title 5 cost breakdown
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Controls Card (7 cols) - Generous vertical rhythm & app controls */}
        <div className="lg:col-span-7 bg-card p-5 sm:p-7 rounded-3xl border border-border shadow-xs space-y-7">
          
          {/* Section 1: Bedrooms Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Home Bedrooms
              </label>
              <span className="font-bold text-primary text-sm sm:text-base bg-primary-light px-2.5 py-0.5 rounded-lg border border-primary/20">
                {bedrooms} Beds • {designFlowGPD} GPD
              </span>
            </div>
            
            <input
              type="range"
              min="2"
              max="7"
              value={bedrooms}
              onChange={(e) => setBedrooms(parseInt(e.target.value))}
              className="w-full h-2.5 bg-muted rounded-lg accent-primary cursor-pointer"
            />
            
            <div className="flex justify-between text-[11px] text-muted-foreground font-semibold px-0.5">
              <span>2 Beds</span>
              <span>3 Beds</span>
              <span className="text-primary font-bold">4 Beds</span>
              <span>5 Beds</span>
              <span>6+ Beds</span>
            </div>
          </div>

          {/* Section 2: Soil Percolation Rate */}
          <div className="space-y-3 pt-5 border-t border-border/80">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Soil Perc Rate
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'fast', label: 'Fast Sand', rate: '< 5 min/in' },
                { id: 'medium', label: 'Medium Sand', rate: '5 - 15 min/in' },
                { id: 'slow', label: 'Slow Silt', rate: '15 - 30 min/in' },
                { id: 'very_slow', label: 'Tight Hardpan', rate: '> 30 min/in' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPercRate(opt.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer min-h-[4rem] flex flex-col items-center justify-center ${
                    percRate === opt.id
                      ? 'border-primary bg-primary-light text-primary font-bold shadow-xs ring-1 ring-primary'
                      : 'border-border bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">{opt.rate}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Seasonal High Groundwater Depth */}
          <div className="space-y-3 pt-5 border-t border-border/80">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Groundwater Elevation
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'deep', label: 'Deep Table', desc: '> 6 ft depth' },
                { id: 'moderate', label: 'Moderate', desc: '4 - 6 ft' },
                { id: 'shallow', label: 'Shallow / High', desc: '< 4 ft (Mound)' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setGroundwaterDepth(opt.id as any)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer min-h-[4rem] flex flex-col items-center justify-center ${
                    groundwaterDepth === opt.id
                      ? 'border-primary bg-primary-light text-primary font-bold shadow-xs ring-1 ring-primary'
                      : 'border-border bg-card text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section 4: Site Constraints */}
          <div className="space-y-3 pt-5 border-t border-border/80">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Site Factors
            </label>
            
            <div className="space-y-2.5">
              <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-border hover:bg-muted/60 active:scale-[0.99] transition-all cursor-pointer">
                <input
                  type="checkbox"
                  checked={wetlandNearby}
                  onChange={(e) => setWetlandNearby(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary cursor-pointer shrink-0"
                />
                <div className="flex-1">
                  <span className="font-bold text-foreground text-xs block">Within 100-ft Wetland Buffer</span>
                  <span className="text-[11px] text-muted-foreground">Conservation Commission filing</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-border hover:bg-muted/60 active:scale-[0.99] transition-all cursor-pointer">
                <input
                  type="checkbox"
                  checked={requiresPump}
                  onChange={(e) => setRequiresPump(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary cursor-pointer shrink-0"
                />
                <div className="flex-1">
                  <span className="font-bold text-foreground text-xs block">Pump Chamber & Pressure Dosing</span>
                  <span className="text-[11px] text-muted-foreground">Uphill or basement grade elevation</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl border border-border hover:bg-muted/60 active:scale-[0.99] transition-all cursor-pointer">
                <input
                  type="checkbox"
                  checked={nitrogenSensitive}
                  onChange={(e) => setNitrogenSensitive(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary cursor-pointer shrink-0"
                />
                <div className="flex-1">
                  <span className="font-bold text-foreground text-xs block">Nitrogen Sensitive Aquifer Zone</span>
                  <span className="text-[11px] text-muted-foreground">Advanced denitrification treatment</span>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Dynamic Budget Summary Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-secondary text-secondary-foreground rounded-3xl p-6 sm:p-7 shadow-lg border border-border space-y-6">
            
            <div className="border-b border-slate-700/80 pb-4">
              <span className="text-[11px] uppercase font-extrabold text-primary tracking-wider block">
                Estimated Budget
              </span>
              <h2 className="text-xl font-black text-white mt-1">
                Project Cost Summary
              </h2>
            </div>

            {/* Engineering Fee */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-medium">Engineering & Title 5 Permit:</span>
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-md font-bold">
                  Fixed Fee
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-primary tracking-tight">
                {formatCurrency(engineeringMin)} - {formatCurrency(engineeringMax)}
              </div>
              <div className="text-[11px] text-slate-400">
                Perc test witnessing, survey & PE stamped plans
              </div>
            </div>

            {/* Contractor Construction Cost */}
            <div className="space-y-1.5 pt-4 border-t border-slate-700/80">
              <div className="text-xs text-slate-300 font-medium">
                Contractor Installation & Materials (Est):
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {formatCurrency(constructionMin)} - {formatCurrency(constructionMax)}
              </div>
              <div className="text-[11px] text-slate-400">
                Tank, D-box, stone, piping, sand & site excavation
              </div>
            </div>

            {/* Leaching Area metric */}
            <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Estimated Field Area:</span>
              <span className="font-bold text-white bg-slate-800 px-2.5 py-1 rounded-lg">
                ~{requiredSASAreaSqFt} sq. ft.
              </span>
            </div>

            <Button 
              size="lg" 
              onClick={handleStartRequestWithCalc}
              className="w-full font-bold text-xs sm:text-sm h-12 rounded-2xl shadow-md cursor-pointer mt-2"
            >
              <span>Lock In Quote & Request Service</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

          {/* Guarantee Pill */}
          <div className="bg-card rounded-2xl p-4 border border-border text-xs flex items-center gap-3 shadow-2xs">
            <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
            <div className="leading-snug">
              <span className="font-bold text-foreground block">100% Board of Health Approval</span>
              <span className="text-[11px] text-muted-foreground">Town revisions covered at no extra fee</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default CalculatorPage
