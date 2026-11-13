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
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export const ContractorPortalPage: React.FC = () => {
  const { projects } = useProjects()
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 pb-24">
      
      {/* 1. ZIPFIXER "MY JOBS" HEADER (Screenshot 4) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="app-squircle-icon">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              My Jobs
            </h1>
            <p className="text-xs text-muted-foreground">
              {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} found
            </p>
          </div>
        </div>

        {/* Right Action Buttons: Refresh + Square Green + Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="h-10 w-10 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground flex items-center justify-center hover:bg-muted transition-colors shadow-2xs cursor-pointer"
            title="Refresh jobs"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <Link to="/request">
            <button
              type="button"
              className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-hover active:scale-95 transition-all shadow-2xs cursor-pointer"
              title="Book New Service"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>
          </Link>
        </div>
      </div>

      {/* Mode Switcher: My Jobs vs Pro Builder Tools */}
      <div className="flex items-center justify-between pt-1">
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
          <div className="hidden sm:flex items-center border border-border rounded-lg p-0.5 bg-card shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${viewMode === 'list' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-muted text-foreground' : 'text-muted-foreground'}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {activeTab === 'jobs' && (
        <div key={refreshKey} className="space-y-4">
          {/* 2. SEARCH + GREEN FILTER BUTTON (Screenshot 4) */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-10 pr-3 rounded-xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-muted-foreground hover:text-foreground font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              type="button"
              className="app-btn-filter cursor-pointer"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>

          {/* 3. EMPTY STATE OR JOBS LIST (Screenshot 4) */}
          {jobs.length === 0 ? (
            <div className="bg-card rounded-2xl p-10 sm:p-14 text-center border border-border shadow-2xs space-y-4 max-w-lg mx-auto my-6">
              <div className="h-16 w-16 rounded-2xl bg-muted text-muted-foreground/50 flex items-center justify-center mx-auto">
                <Briefcase className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h2 className="font-extrabold text-foreground text-lg">
                  No Jobs found
                </h2>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  You don't have any jobs yet.
                </p>
              </div>
              <Link to="/request">
                <button
                  type="button"
                  className="px-6 h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:bg-primary-hover active:scale-95 transition-all shadow-2xs cursor-pointer"
                >
                  Book Your First Service
                </button>
              </Link>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-3" : "space-y-3"}>
              {jobs.map((job) => (
                <Card 
                  key={job.id} 
                  className="hover:border-primary/50 transition-all flex flex-col justify-between overflow-hidden shadow-2xs"
                >
                  <CardHeader className="space-y-2 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono font-bold text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                          {job.trackingNumber}
                        </span>
                        <Badge 
                          variant={job.role === 'contractor' ? 'warning' : 'secondary'}
                          className="text-[10px] uppercase font-semibold"
                        >
                          {job.role === 'contractor' ? 'Pro' : 'Owner'}
                        </Badge>
                      </div>

                      <Badge
                        variant={
                          job.percentComplete === 100 
                            ? 'success' 
                            : job.urgency === 'emergency' 
                              ? 'destructive' 
                              : 'primary'
                        }
                        className="text-[10px]"
                      >
                        {job.percentComplete === 100 ? 'Completed' : job.currentStatusLabel}
                      </Badge>
                    </div>

                    <div>
                      <CardTitle className="text-sm sm:text-base">
                        {job.title}
                      </CardTitle>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                        <MapPin className="w-3 h-3 text-primary shrink-0" />
                        <span>{job.propertyAddress}, {job.city}, {job.state}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 pt-1">
                    <div className="p-2.5 rounded-xl bg-muted border border-border text-xs flex items-center justify-between">
                      <span className="text-muted-foreground">Milestones:</span>
                      <span className="font-mono font-bold text-foreground">
                        {job.milestones.filter(m => m.status === 'completed').length} / {job.milestones.length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-border">
                      <span className="text-xs font-mono font-extrabold text-primary">
                        {job.percentComplete}% Complete
                      </span>
                      <Link to={`/project/${job.trackingNumber}`}>
                        <Button size="sm" variant="default" className="text-xs font-bold gap-1">
                          <span>View Job</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TRADE PRO TOOLS TAB */}
      {activeTab === 'tools' && (
        <div className="space-y-6 pt-2">
          {/* Pro Banner */}
          <div className="bg-secondary text-secondary-foreground rounded-2xl p-6 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning/20 text-warning-foreground text-xs font-bold border border-warning/30">
              <HardHat className="w-4 h-4" />
              <span>Contractor & Builder Pro Portal</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Expedited Civil Engineering & Septic Plans for Builders
            </h2>

            <p className="text-xs sm:text-sm text-secondary-foreground/80 leading-relaxed max-w-2xl">
              Eliminate project delays with 48-hour soil perc booking, direct Civil 3D CAD downloads, cut-and-fill takeoffs, and dedicated PE representation before town planning boards.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link to="/request?role=contractor">
                <Button size="default" className="font-bold text-xs shadow-xs">
                  + Submit New Builder Request
                </Button>
              </Link>
              <a 
                href="tel:9783694200" 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card/10 hover:bg-card/20 text-xs font-semibold text-secondary-foreground transition-colors border border-border/20"
              >
                <PhoneCall className="w-4 h-4 text-warning" />
                <span>Direct Pro Dispatch Hotline</span>
              </a>
            </div>
          </div>

          {/* Pro Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Card className="border-border">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-xl bg-warning/15 text-warning flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm sm:text-base">Civil 3D & HydroCAD Files</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  Direct export of stamped 24x36 PDFs, Civil 3D surfaces, and hydro stormwater runoff models ready for your machine control GPS grading equipment.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm sm:text-base">Subdivision & Batch Parcels</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  Submit an entire cul-de-sac or 10-lot residential layout at once. We coordinate backhoe testing schedules to minimize machine rental mobilization costs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="space-y-2">
                <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <CardTitle className="text-sm sm:text-base">As-Built Sign-Offs in 48h</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  Once your excavation crew installs the pipe and stone, we complete field invert elevation inspections and deliver stamped As-Builts for fast Certificate of Occupancy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

    </div>
  )
}

export default ContractorPortalPage
