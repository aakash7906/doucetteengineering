import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Briefcase, 
  RotateCcw, 
  Plus, 
  Search, 
  Filter, 
  List, 
  LayoutGrid, 
  HardHat, 
  Layers, 
  ShieldCheck, 
  PhoneCall, 
  Zap,
  MapPin,
  ArrowRight
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export const ContractorPortalPage: React.FC = () => {
  const { projects } = useProjects()
  const { showToast } = useToast()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'jobs' | 'tools'>('jobs')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')
  const [refreshKey, setRefreshKey] = useState(0)

  // Filter jobs based on search query
  const jobs = projects.filter(p => {
    const matchesSearch = 
      p.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-32">
      
      {/* 1. APP HEADER ROW */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-foreground tracking-tight">
              My Jobs
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
            </p>
          </div>
        </div>

        {/* Action Buttons: Refresh + Plus */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setRefreshKey(prev => prev + 1)
              showToast('Jobs refreshed', 'info')
            }}
            className="h-11 w-11 rounded-2xl border border-border bg-card text-muted-foreground hover:text-foreground flex items-center justify-center hover:bg-muted active:scale-95 transition-all shadow-2xs cursor-pointer"
            title="Refresh jobs"
            aria-label="Refresh"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <Link to="/request">
            <button
              type="button"
              className="h-11 w-11 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-hover active:scale-95 transition-all shadow-xs cursor-pointer"
              title="Book New Service"
              aria-label="New Service"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>
          </Link>
        </div>
      </div>

      {/* Segmented Mode Switcher */}
      <div className="flex items-center justify-between">
        <div className="app-segmented-group">
          <button
            type="button"
            onClick={() => setActiveTab('jobs')}
            className={`app-segmented-pill ${activeTab === 'jobs' ? 'app-segmented-pill-active' : ''}`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Jobs ({jobs.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('tools')}
            className={`app-segmented-pill ${activeTab === 'tools' ? 'app-segmented-pill-pro' : ''}`}
          >
            <HardHat className="w-3.5 h-3.5" />
            <span>Trade Pro Tools</span>
          </button>
        </div>

        {activeTab === 'jobs' && (
          <div className="hidden sm:flex items-center border border-border rounded-xl p-1 bg-card shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
              aria-label="Grid view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {activeTab === 'jobs' && (
        <div key={refreshKey} className="space-y-6">
          {/* SEARCH + FILTER ROW */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-11 pr-14 rounded-2xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-xs text-muted-foreground hover:text-foreground font-bold cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="button"
              className="app-btn-filter cursor-pointer shrink-0"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* EMPTY STATE OR JOBS LIST */}
          {jobs.length === 0 ? (
            <div className="bg-card rounded-3xl p-10 sm:p-14 text-center border border-border shadow-2xs space-y-4 max-w-md mx-auto my-6">
              <div className="h-16 w-16 rounded-2xl bg-muted text-muted-foreground/60 flex items-center justify-center mx-auto">
                <Briefcase className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h2 className="font-extrabold text-foreground text-lg">
                  No Jobs Found
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  You don't have any jobs matching this query.
                </p>
              </div>
              <Link to="/request">
                <Button className="font-bold text-xs">
                  Book Your First Service
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <Card 
                  key={job.id} 
                  className="rounded-3xl border border-border shadow-xs hover:border-primary/50 transition-all overflow-hidden flex flex-col justify-between p-5 sm:p-6 space-y-4"
                >
                  {/* Top Badges Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* Tracking ID Badge */}
                      <span className="font-bold text-xs text-primary bg-primary-light px-3 py-1 rounded-xl border border-primary/25">
                        {job.trackingNumber}
                      </span>
                      {/* Role Pill */}
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
                        {job.role === 'contractor' ? 'PRO' : 'OWNER'}
                      </span>
                    </div>

                    {/* Status Pill (Clean, rounded, non-overlapping) */}
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                      job.percentComplete === 100 
                        ? 'bg-primary-light text-primary border-primary/25' 
                        : job.urgency === 'emergency' 
                        ? 'bg-destructive/10 text-destructive border-destructive/20' 
                        : 'bg-primary-light text-primary border-primary/25'
                    }`}>
                      {job.percentComplete === 100 ? 'Completed' : job.currentStatusLabel}
                    </span>
                  </div>

                  {/* Title & Location */}
                  <div className="space-y-1.5">
                    <h3 className="font-extrabold text-base sm:text-lg text-foreground tracking-tight leading-snug">
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span className="truncate">{job.propertyAddress}, {job.city}, {job.state}</span>
                    </div>
                  </div>

                  {/* Milestone Inset Card */}
                  <div className="p-3.5 rounded-2xl bg-muted/70 border border-border flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">Milestones:</span>
                    <span className="font-bold text-foreground">
                      {job.milestones.filter(m => m.status === 'completed').length} / {job.milestones.length}
                    </span>
                  </div>

                  {/* Bottom Completion & CTA Row */}
                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-border">
                    <span className="text-sm font-black text-primary">
                      {job.percentComplete}% Complete
                    </span>
                    <Link to={`/project/${job.trackingNumber}`}>
                      <Button size="sm" className="font-bold text-xs px-4 h-9 rounded-xl shadow-xs gap-1.5">
                        <span>View Job</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TRADE PRO TOOLS TAB (Concise, App-like) */}
      {activeTab === 'tools' && (
        <div className="space-y-6 sm:space-y-8 pt-2">
          {/* Pro Banner */}
          <div className="bg-secondary text-secondary-foreground rounded-3xl p-6 sm:p-8 shadow-sm space-y-4 border border-border">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning/20 text-warning-foreground text-xs font-bold border border-warning/30">
              <HardHat className="w-4 h-4" />
              <span>Trade Pro Hub</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Expedited Engineering for Builders
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Fast-track 48-hr perc booking, direct Civil 3D CAD models, and dedicated PE sign-offs.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link to="/request?role=contractor">
                <Button size="default" className="font-bold text-xs h-11 px-5 rounded-xl shadow-xs">
                  <span>+ New Builder Request</span>
                </Button>
              </Link>
              <a 
                href="tel:9783694200" 
                className="inline-flex items-center gap-2 px-4 h-11 rounded-xl bg-card/10 hover:bg-card/20 text-xs font-bold text-white transition-colors border border-border/20"
              >
                <PhoneCall className="w-4 h-4 text-warning" />
                <span>Pro Dispatch Hotline</span>
              </a>
            </div>
          </div>

          {/* Pro Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border shadow-xs space-y-3">
              <div className="h-11 w-11 rounded-2xl bg-warning/15 text-warning flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground text-sm sm:text-base">Civil 3D & HydroCAD</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Direct export of stamped 24x36 PDFs and machine-control surfaces.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border shadow-xs space-y-3">
              <div className="h-11 w-11 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground text-sm sm:text-base">Batch Subdivision Testing</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Multi-lot excavation scheduling to reduce backhoe rental mobilization.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-3xl bg-card border border-border shadow-xs space-y-3">
              <div className="h-11 w-11 rounded-2xl bg-primary-light text-primary flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground text-sm sm:text-base">48-Hr As-Built Sign-Off</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Field invert checks and stamped As-Builts for immediate Certificate of Occupancy.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default ContractorPortalPage
