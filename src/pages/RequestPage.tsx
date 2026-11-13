import React, { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  UploadCloud, 
  FileText, 
  Trash2, 
  Home, 
  HardHat, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Droplet,
  Compass,
  FileCheck2
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { SERVICES_CATALOG } from '@/data/services'
import type { ServiceCategory, UserRole, ProjectUrgency } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

interface UploadedFileItem {
  name: string
  size: string
  type: string
}

export const RequestPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const { currentRole, setCurrentRole, addProjectRequest, setActiveTrackingId } = useProjects()

  // Pre-fill from URL queries if available
  const initialLocation = searchParams.get('location') || ''
  const initialService = (searchParams.get('service') as ServiceCategory) || 'septic-design'
  const initialUrgency = (searchParams.get('urgency') as ProjectUrgency) || 'standard'
  const initialRole = (searchParams.get('role') as UserRole) || currentRole

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 6

  // Form State
  const [role, setRole] = useState<UserRole>(initialRole)
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>(initialService)
  const [urgency, setUrgency] = useState<ProjectUrgency>(initialUrgency)

  // Property details
  const [address, setAddress] = useState(initialLocation)
  const [city, setCity] = useState(initialLocation.includes(',') ? initialLocation.split(',')[1]?.trim() : 'Acton')
  const [state] = useState('MA')
  const [zipCode, setZipCode] = useState(initialLocation.match(/\d{5}/)?.[0] || '01720')
  const [parcelId, setParcelId] = useState('')
  const [lotSize, setLotSize] = useState('0.85')
  const [waterSource, setWaterSource] = useState<'well' | 'municipal'>('municipal')
  const [bedrooms, setBedrooms] = useState(4)

  // Project Situation & Constraints
  const [projectReason, setProjectReason] = useState('failed_system')
  const [constraints, setConstraints] = useState<string[]>(['high_water_table'])
  const [existingAge, setExistingAge] = useState('Over 25 years')

  // Uploaded Files simulation
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileItem[]>([
    { name: 'Town_Assessor_Plot_Plan.pdf', size: '1.4 MB', type: 'application/pdf' }
  ])

  // Contact Info
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [contractorLicense, setContractorLicense] = useState('')
  const [preferredVisitWindow, setPreferredVisitWindow] = useState('Morning (8 AM - 12 PM)')
  const [notes, setNotes] = useState('')

  // Completion State
  const [submittedProject, setSubmittedProject] = useState<{ id: string; trackingNumber: string } | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  const handleConstraintToggle = (constraintKey: string) => {
    setConstraints(prev =>
      prev.includes(constraintKey)
        ? prev.filter(c => c !== constraintKey)
        : [...prev, constraintKey]
    )
  }

  const handleAddSamplePhoto = () => {
    setUploadedFiles(prev => [
      ...prev,
      {
        name: `Backyard_Site_Condition_${Date.now().toString().slice(-4)}.jpg`,
        size: '2.1 MB',
        type: 'image/jpeg'
      }
    ])
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  // Cost calculation based on chosen parameters
  const calculateEstimate = () => {
    const selectedServiceData = SERVICES_CATALOG.find(s => s.id === serviceCategory)
    let baseEngineering = selectedServiceData ? selectedServiceData.priceStartingAt : 2400

    if (bedrooms > 4) {
      baseEngineering += (bedrooms - 4) * 250
    }
    if (constraints.includes('wetlands')) {
      baseEngineering += 500
    }
    if (urgency === 'expedited') {
      baseEngineering += 400
    } else if (urgency === 'emergency') {
      baseEngineering += 750
    }

    const engineeringMin = Math.round(baseEngineering)
    const engineeringMax = Math.round(baseEngineering * 1.25)
    
    // Approximate construction estimates (Title 5 systems typically $18k - $30k in MA)
    let constructionMin = 18000 + (bedrooms * 1500)
    if (constraints.includes('high_water_table')) constructionMin += 3500 // mounded or Presby
    const constructionMax = Math.round(constructionMin * 1.3)

    return {
      engineeringMin,
      engineeringMax,
      constructionMin,
      constructionMax
    }
  }

  const estimate = calculateEstimate()

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const selectedServiceData = SERVICES_CATALOG.find(s => s.id === serviceCategory)
    const serviceTitle = selectedServiceData?.title || 'Septic System Design'

    const projectData = {
      role,
      serviceCategory,
      serviceName: serviceTitle,
      title: `${bedrooms}-Bedroom ${serviceTitle} - ${address || 'Local Site'}`,
      propertyAddress: address || '104 Main Street',
      city: city || 'Acton',
      state: state || 'MA',
      zipCode: zipCode || '01720',
      parcelId: parcelId || 'MAP 12 - LOT 4',
      lotSizeAcres: parseFloat(lotSize) || 0.75,
      bedrooms,
      estimatedFlowGPD: bedrooms * 110,
      waterSource,
      urgency,
      estimatedCostRange: {
        engineeringMin: estimate.engineeringMin,
        engineeringMax: estimate.engineeringMax,
        constructionMin: estimate.constructionMin,
        constructionMax: estimate.constructionMax
      },
      contactName: contactName || (role === 'contractor' ? 'Alex Rivera (Builder)' : 'Sarah Jenkins'),
      contactEmail: contactEmail || 'client@example.com',
      contactPhone: contactPhone || '(978) 555-0144',
      contractorCompany: companyName,
      contractorLicense,
      targetCompletionDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
    }

    const created = addProjectRequest(projectData)
    setSubmittedProject({ id: created.id, trackingNumber: created.trackingNumber })
    setActiveTrackingId(created.trackingNumber)

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      })
    } catch {
      // safe fallback
    }
  }

  // SUCCESS SCREEN
  if (submittedProject) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-14 text-center space-y-5">
        <div className="h-16 w-16 rounded-full bg-primary-light text-primary flex items-center justify-center mx-auto shadow-xs">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        <div className="space-y-1.5">
          <Badge variant="success" className="text-xs px-3 py-1">
            Request Successfully Registered
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Your Project Request is Active!
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Our licensed civil engineering team has received your project details for <span className="font-semibold text-foreground">{address || 'your property'}</span>.
          </p>
        </div>

        {/* Tracking Number Card */}
        <div className="bg-card rounded-2xl p-6 border-2 border-primary/30 shadow-xs text-center space-y-2">
          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Your Official DE- Tracking Number
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-primary tracking-wider">
            {submittedProject.trackingNumber}
          </div>
          <div className="text-xs text-muted-foreground">
            Keep this number handy to check Board of Health review progress, perc test logs, and stamped CAD plans.
          </div>
        </div>

        {/* Instant Next Steps */}
        <div className="bg-muted rounded-2xl p-4 sm:p-5 text-left border border-border text-xs sm:text-sm space-y-2.5">
          <div className="font-bold text-foreground text-xs uppercase tracking-wider">
            What Happens Next?
          </div>
          <div className="space-y-2 text-muted-foreground text-xs">
            <div className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-primary-light text-primary font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
              <span>Our staff pulls your historical property card & wetland GIS maps from the Town Hall.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-primary-light text-primary font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
              <span>We contact you within 24 hours to confirm your site visit and excavation schedule.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="h-5 w-5 rounded-full bg-primary-light text-primary font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
              <span>You can track live milestones on your phone anytime.</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to={`/project/${submittedProject.trackingNumber}`} className="w-full sm:w-auto">
            <Button size="lg" className="w-full font-bold shadow-xs flex items-center justify-center gap-2">
              <FileCheck2 className="w-5 h-5" />
              <span>Track Live Project Now</span>
            </Button>
          </Link>
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full font-medium">
              Return to Homepage
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6 pb-24">
      
      {/* Wizard Header & Stepper */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <Link to="/" className="text-muted-foreground hover:text-primary flex items-center gap-1 font-semibold transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </Link>
          <span className="font-mono font-bold text-primary bg-primary-light px-2.5 py-1 rounded-md border border-primary/20">
            Step {currentStep} of {totalSteps}
          </span>
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
            {currentStep === 1 && "Select Service & Role"}
            {currentStep === 2 && "Property Location & Parcel Info"}
            {currentStep === 3 && "Site Conditions & System Sizing"}
            {currentStep === 4 && "Upload Existing Plans or Photos"}
            {currentStep === 5 && "Contact Info & Inspection Window"}
            {currentStep === 6 && "Review & Instant Engineering Estimate"}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {currentStep === 1 && "Tailored for Massachusetts Title 5 septic requirements and site engineering."}
            {currentStep === 2 && "We verify town municipal setback requirements and GIS wetland layers."}
            {currentStep === 3 && "Provide known constraints to receive accurate backhoe and engineering scopes."}
            {currentStep === 4 && "Help our engineers prepare ahead of the deep hole soil observation."}
            {currentStep === 5 && "Who should our lead professional engineer contact for site access?"}
            {currentStep === 6 && "Transparent pricing breakdown based on local municipal board standards."}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden border border-border">
          <div 
            className="bg-primary h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: Service & Role */}
      {currentStep === 1 && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          
          {/* Persona Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              I am submitting as a:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => { setRole('homeowner'); setCurrentRole('homeowner') }}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                  role === 'homeowner'
                    ? 'border-primary bg-primary-light/50 shadow-2xs ring-2 ring-primary/20'
                    : 'border-border bg-card hover:border-border/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                    <Home className="w-5 h-5" />
                  </div>
                  {role === 'homeowner' && <CheckCircle2 className="w-5 h-5 text-primary" />}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">Homeowner</div>
                  <div className="text-[11px] text-muted-foreground">For my residential property, failed septic, or addition</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { setRole('contractor'); setCurrentRole('contractor') }}
                className={`p-4 rounded-2xl border text-left flex flex-col justify-between space-y-2 transition-all cursor-pointer ${
                  role === 'contractor'
                    ? 'border-warning bg-warning/15 shadow-2xs ring-2 ring-warning/20'
                    : 'border-border bg-card hover:border-border/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-xl bg-warning/20 text-warning-foreground flex items-center justify-center">
                    <HardHat className="w-5 h-5" />
                  </div>
                  {role === 'contractor' && <CheckCircle2 className="w-5 h-5 text-warning" />}
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">Contractor / Builder</div>
                  <div className="text-[11px] text-muted-foreground">Trade accounts, multi-lot subdivisions, expedited CAD</div>
                </div>
              </button>
            </div>
          </div>

          {/* Service Category Picker */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Required Engineering Service:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES_CATALOG.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setServiceCategory(s.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                    serviceCategory === s.id
                      ? 'border-primary bg-primary-light/50 ring-2 ring-primary/20 shadow-2xs'
                      : 'border-border bg-card hover:border-border/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="font-bold text-foreground text-sm">{s.title}</span>
                    {serviceCategory === s.id && <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />}
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mb-3">
                    {s.tagline}
                  </p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-border text-muted-foreground">
                    <span className="font-mono font-bold text-foreground">
                      {formatCurrency(s.priceStartingAt)}+
                    </span>
                    <span className="text-[11px] text-muted-foreground">{s.typicalTimeline}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Project Timeline & Urgency:
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setUrgency('standard')}
                className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  urgency === 'standard'
                    ? 'border-primary bg-primary-light text-primary font-bold'
                    : 'border-border bg-card text-foreground hover:bg-muted'
                }`}
              >
                <div>Standard</div>
                <div className="text-[10px] text-muted-foreground font-normal">2 - 3 Weeks</div>
              </button>

              <button
                type="button"
                onClick={() => setUrgency('expedited')}
                className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  urgency === 'expedited'
                    ? 'border-primary bg-primary-light text-primary font-bold'
                    : 'border-border bg-card text-foreground hover:bg-muted'
                }`}
              >
                <div>Expedited</div>
                <div className="text-[10px] text-muted-foreground font-normal">1 - 2 Weeks</div>
              </button>

              <button
                type="button"
                onClick={() => setUrgency('emergency')}
                className={`py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                  urgency === 'emergency'
                    ? 'border-destructive bg-destructive/10 text-destructive font-bold'
                    : 'border-border bg-card text-foreground hover:bg-muted'
                }`}
              >
                <div>Emergency</div>
                <div className="text-[10px] text-muted-foreground font-normal">Closing Escrow</div>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* STEP 2: Property Location & Details */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider">
              Street Address *
            </label>
            <Input
              type="text"
              required
              placeholder="e.g. 104 Main Street"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                City / Town *
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. Acton"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                State
              </label>
              <Input
                type="text"
                disabled
                value={state}
                className="bg-muted text-muted-foreground"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Zip Code
              </label>
              <Input
                type="text"
                placeholder="01720"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Assessor Parcel ID / Lot # (optional)
              </label>
              <Input
                type="text"
                placeholder="e.g. Map 12, Lot 44"
                value={parcelId}
                onChange={(e) => setParcelId(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Approximate Lot Size (Acres)
              </label>
              <Input
                type="number"
                step="0.1"
                placeholder="0.75"
                value={lotSize}
                onChange={(e) => setLotSize(e.target.value)}
              />
            </div>
          </div>

        </div>
      )}

      {/* STEP 3: Site Conditions & System Sizing */}
      {currentStep === 3 && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          
          <div className="space-y-3 bg-card p-4 sm:p-5 rounded-2xl border border-border">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Drinking Water Source (Critical for 100-ft Well Setback):
              </label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setWaterSource('municipal')}
                  className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all cursor-pointer ${
                    waterSource === 'municipal'
                      ? 'border-primary bg-primary-light text-primary shadow-2xs'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Droplet className="w-4 h-4 text-primary" />
                  <span>Town / Municipal Water</span>
                </button>

                <button
                  type="button"
                  onClick={() => setWaterSource('well')}
                  className={`py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 font-semibold transition-all cursor-pointer ${
                    waterSource === 'well'
                      ? 'border-primary bg-primary-light text-primary shadow-2xs'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <Compass className="w-4 h-4 text-warning" />
                  <span>Private On-Site Well</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-foreground uppercase tracking-wider">
                  Bedroom Count (Design Flow = {bedrooms * 110} GPD)
                </label>
                <span className="font-bold text-primary font-mono text-sm">
                  {bedrooms} Bedrooms
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="8"
                step="1"
                value={bedrooms}
                onChange={(e) => setBedrooms(parseInt(e.target.value))}
                className="w-full accent-primary h-2 bg-muted rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>2 Beds (220 GPD)</span>
                <span>4 Beds (440 GPD)</span>
                <span>6 Beds (660 GPD)</span>
                <span>8+ Beds</span>
              </div>
            </div>
          </div>

          {/* Reason for project */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Primary Reason for Project:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              {[
                { id: 'failed_system', label: 'Failed Title 5 Inspection', desc: 'Need replacement design for compliance or sale' },
                { id: 'new_construction', label: 'New Construction / Addition', desc: 'Building new home or adding bedrooms' },
                { id: 'real_estate_sale', label: 'Pending Real Estate Sale', desc: 'Tight closing date requiring escrow letter' }
              ].map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setProjectReason(item.id)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    projectReason === item.id
                      ? 'border-primary bg-primary-light text-foreground font-medium'
                      : 'border-border bg-card text-muted-foreground hover:bg-muted'
                  }`}
                >
                  <div className="font-bold text-foreground">{item.label}</div>
                  <div className="text-[11px] text-muted-foreground">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Known Site Constraints Checkboxes */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider block">
              Known Site Conditions & Lot Features (Select all that apply):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                { id: 'high_water_table', label: 'High Seasonal Groundwater', desc: 'Requires shallow Presby or mounded system' },
                { id: 'wetlands', label: 'Within 100ft of Wetland / Stream', desc: 'Requires Conservation Commission filing' },
                { id: 'tight_lot', label: 'Small Lot / Strict Property Setbacks', desc: 'Tight boundaries or existing pool/patio' },
                { id: 'steep_slope', label: 'Steep Slopes / Difficult Access', desc: 'Terracing or retaining wall consideration' },
                { id: 'bedrock', label: 'Ledge / Shallow Bedrock', desc: 'May require special soil testing pits' }
              ].map(c => {
                const checked = constraints.includes(c.id)
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleConstraintToggle(c.id)}
                    className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                      checked
                        ? 'border-primary bg-primary-light/70 text-foreground'
                        : 'border-border bg-card text-muted-foreground hover:border-border/80'
                    }`}
                  >
                    <div className={`h-4 w-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                      checked ? 'bg-primary border-primary text-primary-foreground' : 'border-border bg-card'
                    }`}>
                      {checked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-foreground">{c.label}</div>
                      <div className="text-[11px] text-muted-foreground">{c.desc}</div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider">
              Existing Septic System Age (if known):
            </label>
            <Input
              type="text"
              placeholder="e.g. Installed in 1985 (approx 40 years)"
              value={existingAge}
              onChange={(e) => setExistingAge(e.target.value)}
            />
          </div>

        </div>
      )}

      {/* STEP 4: Document & Photo Upload */}
      {currentStep === 4 && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          
          <div className="border-2 border-dashed border-border rounded-2xl p-6 sm:p-8 text-center bg-card hover:bg-primary-light/20 hover:border-primary/40 transition-colors">
            <UploadCloud className="w-10 h-10 text-primary mx-auto mb-2" />
            <h3 className="font-bold text-foreground text-sm sm:text-base">
              Upload Site Documents & Photos
            </h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1 mb-4">
              Attach plot plans, architectural drawings, existing septic inspection reports, or backyard photos.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddSamplePhoto}
                className="text-xs font-semibold"
              >
                + Add Sample Backyard Photo
              </Button>
            </div>
            <div className="text-[11px] text-muted-foreground mt-3">
              Accepted: PDF, PNG, JPG, DWG (Max 50MB per file)
            </div>
          </div>

          {/* Uploaded Files List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-foreground uppercase tracking-wider">
              <span>Attached Documents ({uploadedFiles.length})</span>
            </div>

            {uploadedFiles.length === 0 ? (
              <div className="p-4 rounded-xl bg-card border border-border text-center text-xs text-muted-foreground">
                No documents uploaded yet. You can also provide files after submittal.
              </div>
            ) : (
              <div className="space-y-2">
                {uploadedFiles.map((file, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center justify-between p-3 rounded-xl bg-card border border-border shadow-2xs text-xs"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="h-8 w-8 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-semibold text-foreground truncate">{file.name}</div>
                        <div className="text-[10px] text-muted-foreground font-mono">{file.size}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemoveFile(idx)}
                      className="p-1.5 text-muted-foreground hover:text-destructive rounded-lg hover:bg-muted transition-colors cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* STEP 5: Contact Info & Scheduling */}
      {currentStep === 5 && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Full Contact Name *
              </label>
              <Input
                type="text"
                required
                placeholder="e.g. David Henderson"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                Phone Number *
              </label>
              <Input
                type="tel"
                required
                placeholder="(978) 555-0199"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider">
              Email Address *
            </label>
            <Input
              type="email"
              required
              placeholder="d.henderson@example.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
            />
          </div>

          {role === 'contractor' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                  Company / Builder Name
                </label>
                <Input
                  type="text"
                  placeholder="e.g. Middlesex Builders LLC"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                  MA CSL / HIC License #
                </label>
                <Input
                  type="text"
                  placeholder="CSL-109288"
                  value={contractorLicense}
                  onChange={(e) => setContractorLicense(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-1 pt-2">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider">
              Preferred Site Inspection Window
            </label>
            <select
              value={preferredVisitWindow}
              onChange={(e) => setPreferredVisitWindow(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl border border-input bg-card text-xs sm:text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
            >
              <option value="Morning (8 AM - 12 PM)">Morning (8 AM - 12 PM)</option>
              <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
              <option value="First Available BOH Slot">First Available Board of Health Witness Slot</option>
              <option value="Weekends Only">Saturday Site Meeting</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-foreground uppercase tracking-wider">
              Special Notes / Gate Codes / Dog on Premises
            </label>
            <Textarea
              placeholder="e.g. Side gate is unlocked. The existing septic tank is located approximately 15 feet off the back deck."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

        </div>
      )}

      {/* STEP 6: Review & Transparent Instant Estimate */}
      {currentStep === 6 && (
        <form onSubmit={handleFinalSubmit} className="space-y-5 animate-in fade-in-50 duration-200">
          
          {/* Summary Banner */}
          <div className="bg-secondary text-secondary-foreground rounded-2xl p-5 space-y-3 shadow-sm">
            <div className="flex items-center justify-between border-b border-border/20 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                  Scope of Work
                </span>
                <h3 className="text-base sm:text-lg font-bold text-secondary-foreground">
                  {SERVICES_CATALOG.find(s => s.id === serviceCategory)?.title}
                </h3>
              </div>
              <Badge variant="primary" className="text-xs capitalize">
                {urgency} Priority
              </Badge>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div>
                <span className="text-secondary-foreground/70 block text-[10px]">Property</span>
                <span className="font-semibold text-secondary-foreground">{city || 'Acton'}, MA</span>
              </div>
              <div>
                <span className="text-secondary-foreground/70 block text-[10px]">Bedrooms</span>
                <span className="font-semibold text-secondary-foreground">{bedrooms} ({bedrooms * 110} GPD)</span>
              </div>
              <div>
                <span className="text-secondary-foreground/70 block text-[10px]">Water Source</span>
                <span className="font-semibold text-secondary-foreground capitalize">{waterSource}</span>
              </div>
              <div>
                <span className="text-secondary-foreground/70 block text-[10px]">Applicant</span>
                <span className="font-semibold text-secondary-foreground">{contactName || 'David Henderson'}</span>
              </div>
            </div>
          </div>

          {/* Itemized Estimate Card */}
          <Card className="border-border bg-card shadow-2xs">
            <CardContent className="p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-primary uppercase tracking-wider">
                    Engineering & Permitting Estimate
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">
                    {formatCurrency(estimate.engineeringMin)} - {formatCurrency(estimate.engineeringMax)}
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="success" className="text-xs">
                    Fixed Engineering Fee
                  </Badge>
                  <div className="text-[11px] text-muted-foreground mt-1">Includes Town Hearing</div>
                </div>
              </div>

              {/* Line items */}
              <div className="space-y-2 pt-3 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>• Deep Hole Soil Evaluation & BOH Witness</span>
                  <span className="font-mono font-medium text-foreground">$950 - $1,250</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• Topographic Survey & Existing Conditions</span>
                  <span className="font-mono font-medium text-foreground">$600 - $800</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>• PE-Stamped CAD Disposal System Plans & Sizing</span>
                  <span className="font-mono font-medium text-foreground">$1,250 - $1,550</span>
                </div>
                {constraints.includes('wetlands') && (
                  <div className="flex items-center justify-between text-primary font-medium">
                    <span>• Wetland Buffer Zone Conservation Filing</span>
                    <span className="font-mono font-medium">+$500</span>
                  </div>
                )}
              </div>

              {/* Approximate Installation Construction range */}
              <div className="mt-4 p-3.5 rounded-xl bg-muted border border-border text-xs">
                <div className="flex items-center justify-between font-semibold text-foreground">
                  <span>Estimated Contractor Installation Cost:</span>
                  <span className="font-mono text-foreground font-bold">
                    {formatCurrency(estimate.constructionMin)} - {formatCurrency(estimate.constructionMax)}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">
                  *Installation is performed by licensed Title 5 excavation contractors. Doucette Engineering provides competitive bidding packages to verified local installers upon plan approval.
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Terms info */}
          <div className="p-3.5 rounded-xl bg-primary-light/60 border border-primary/25 text-xs text-foreground flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              By submitting, you request Doucette Engineering to initiate municipal records research and contact you for field scheduling. No fees are charged until the written engineering contract is authorized.
            </div>
          </div>

          {/* Final Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-12 text-sm sm:text-base font-extrabold shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-5 h-5" />
            <span>Submit Project Details & Generate Tracking ID</span>
          </Button>

        </form>
      )}

      {/* Navigation Buttons (Back & Next) */}
      {currentStep < 6 && (
        <div className="flex items-center justify-between pt-5 border-t border-border mt-6">
          <Button
            type="button"
            variant="outline"
            disabled={currentStep === 1}
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            className="text-xs font-semibold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Previous
          </Button>

          <Button
            type="button"
            onClick={() => {
              if (currentStep === 2 && !address.trim()) {
                alert('Please enter a street address to continue.')
                return
              }
              setCurrentStep(prev => Math.min(totalSteps, prev + 1))
            }}
            className="text-xs font-bold cursor-pointer"
          >
            Continue to Step {currentStep + 1}
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
      )}

    </div>
  )
}

export default RequestPage
