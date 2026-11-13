import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Calculator, 
  ArrowRight, 
  ShieldCheck
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
  if (groundwaterDepth === 'shallow') baseConstruction += 5000 // Raised sand mound or Presby
  if (requiresPump) baseConstruction += 3500 // Pump chamber, electrical float controls
  if (wetlandNearby) baseConstruction += 1500 // Erosion control siltation barriers & fencing
  if (nitrogenSensitive) baseConstruction += 9000 // MicroFAST or Waterloo Biofilter unit

  const constructionMin = Math.round(baseConstruction)
  const constructionMax = Math.round(baseConstruction * 1.25)

  // Leaching field square footage rough estimate
  let loadingRateGPDPerSqFt = 0.74 // for medium perc
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 pb-24">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold border border-primary/20">
          <Calculator className="w-3.5 h-3.5" />
          <span>Interactive Septic Cost Estimator</span>
        </div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-foreground tracking-tight">
          Septic Design & Construction Calculator
        </h1>
        <p className="text-xs text-muted-foreground">
          Estimate civil engineering fees, municipal permitting requirements, and contractor installation costs under Massachusetts Title 5 standards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-5 bg-card p-5 sm:p-6 rounded-2xl border border-border shadow-2xs">
          
          {/* Bedrooms Slider */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-foreground uppercase tracking-wider">
                Home Bedroom Count
              </label>
              <span className="font-mono font-extrabold text-primary text-sm sm:text-base">
                {bedrooms} Bedrooms ({designFlowGPD} GPD)
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="7"
              value={bedrooms}
              onChange={(e) => setBedrooms(parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
              <span>2 Beds</span>
              <span>3 Beds</span>
              <span>4 Beds (Avg)</span>
              <span>5 Beds</span>
              <span>6+ Beds</span>
            </div>
          </div>

          {/* Soil Percolation Rate */}
          <div className="space-y-2 pt-2 border-t border-border">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Estimated Soil Percolation Rate
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
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
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    percRate === opt.id
                      ? 'border-primary bg-primary/10 text-primary font-bold shadow-2xs'
                      : 'border-border text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className="text-[10px] text-muted-foreground">{opt.rate}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Seasonal High Groundwater Depth */}
          <div className="space-y-2 pt-2 border-t border-border">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Seasonal High Groundwater Elevation
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'deep', label: 'Deep Table', desc: '> 6 ft (Standard)' },
                { id: 'moderate', label: 'Moderate Table', desc: '4 - 6 ft' },
                { id: 'shallow', label: 'Shallow / High', desc: '< 4 ft (Mounded)' }
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setGroundwaterDepth(opt.id as any)}
                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                    groundwaterDepth === opt.id
                      ? 'border-primary bg-primary/10 text-primary font-bold shadow-2xs'
                      : 'border-border text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="font-bold text-xs">{opt.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Features Toggle */}
          <div className="space-y-2 pt-2 border-t border-border">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Site Constraints & Environmental Factors
            </label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={wetlandNearby}
                  onChange={(e) => setWetlandNearby(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary cursor-pointer"
                />
                <div>
                  <span className="font-bold text-foreground block">Within 100-ft Wetland Buffer Zone</span>
                  <span className="text-[11px] text-muted-foreground">Requires Conservation Commission approval and erosion barriers</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={requiresPump}
                  onChange={(e) => setRequiresPump(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary cursor-pointer"
                />
                <div>
                  <span className="font-bold text-foreground block">Pump Chamber & Pressure Dosing Required</span>
                  <span className="text-[11px] text-muted-foreground">Needed when leaching area is uphill or higher than the house basement</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted cursor-pointer">
                <input
                  type="checkbox"
                  checked={nitrogenSensitive}
                  onChange={(e) => setNitrogenSensitive(e.target.checked)}
                  className="h-4 w-4 rounded accent-primary cursor-pointer"
                />
                <div>
                  <span className="font-bold text-foreground block">Nitrogen Sensitive Watershed / Aquifer Zone</span>
                  <span className="text-[11px] text-muted-foreground">Cape Cod, coastal embayments or public wellhead protection</span>
                </div>
              </label>
            </div>
          </div>

        </div>

        {/* Dynamic Cost Summary Column (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          
          <div className="bg-secondary text-secondary-foreground rounded-2xl p-5 sm:p-6 shadow-sm border border-border space-y-5">
            
            <div className="border-b border-slate-700/80 pb-3">
              <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                Estimated Project Budget
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                Full Engineering & Installation Breakdown
              </h3>
            </div>

            {/* Engineering Fee */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span>Civil Engineering & Permitting:</span>
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold">
                  Fixed Rate
                </span>
              </div>
              <div className="text-2xl font-extrabold text-primary font-mono">
                {formatCurrency(engineeringMin)} - {formatCurrency(engineeringMax)}
              </div>
              <div className="text-[11px] text-slate-400">
                Includes BOH witnessed soil perc test, field topographic survey, and stamped CAD plans.
              </div>
            </div>

            {/* Contractor Construction Cost */}
            <div className="space-y-1 pt-3 border-t border-slate-700/80">
              <div className="text-xs text-slate-300">
                Contractor Construction & Materials (Est):
              </div>
              <div className="text-2xl font-extrabold text-white font-mono">
                {formatCurrency(constructionMin)} - {formatCurrency(constructionMax)}
              </div>
              <div className="text-[11px] text-slate-400">
                1,500-gal tank, D-box, excavation, crushed stone, pipe, sand & backfill.
              </div>
            </div>

            {/* Sizing metric */}
            <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-xs">
              <span className="text-slate-400">Calculated Leaching Area:</span>
              <span className="font-mono font-bold text-white">~{requiredSASAreaSqFt} sq. ft.</span>
            </div>

            <Button 
              size="lg" 
              onClick={handleStartRequestWithCalc}
              className="w-full font-bold text-xs h-10 shadow-xs cursor-pointer"
            >
              <span>Lock In Quote & Request Service</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

          {/* Reassurance Card */}
          <div className="bg-card rounded-xl p-3.5 border border-border text-xs text-muted-foreground space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-foreground text-xs">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>100% Board of Health Approval Guarantee</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              If a town health inspector requests design revisions to comply with local bylaws, all modifications are completed by our licensed P.E. with zero additional engineering drafting fees.
            </p>
          </div>

        </div>

      </div>

    </div>
  )
}

export default CalculatorPage
