import React, { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { 
  Search, 
  MapPin, 
  ClipboardList, 
  ArrowRight, 
  Calendar, 
  Plus,
  Filter,
  List,
  LayoutGrid
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatDate } from '@/lib/utils'

export const TrackListPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const { projects } = useProjects()
  
  const queryFromUrl = searchParams.get('query') || ''
  const [searchQuery, setSearchQuery] = useState(queryFromUrl)
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'permitting' | 'completed'>('all')
  const [roleFilter, _setRoleFilter] = useState<'all' | 'homeowner' | 'contractor'>('all')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('grid')

  // Filter projects
  const filteredProjects = projects.filter(p => {
    const matchesSearch = 
      p.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.contactName.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === 'all' || p.role === roleFilter

    let matchesStatus = true
    if (statusFilter === 'active') {
      matchesStatus = p.percentComplete < 100
    } else if (statusFilter === 'permitting') {
      matchesStatus = p.currentStatusStage === 'town_permitting'
    } else if (statusFilter === 'completed') {
      matchesStatus = p.percentComplete === 100
    }

    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 pb-24">
      
      {/* 1. ZIPFIXER TOP TITLE ROW (Screenshot 1 & 2) */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="app-squircle-icon">
            <ClipboardList className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">
              My Requests
            </h1>
            <p className="text-xs text-muted-foreground">
              {projects.length} {projects.length === 1 ? 'request' : 'requests'} for quotes
            </p>
          </div>
        </div>

        {/* Square Green + Button (ZipFixer exact style) */}
        <Link to="/request">
          <button
            type="button"
            className="h-10 w-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-hover active:scale-95 transition-all shadow-2xs cursor-pointer"
            title="Create New Request"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </Link>
      </div>

      {/* 2. SEARCH + GREEN FILTER BUTTON + LAYOUT TOGGLE (Screenshot 1 & 2) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search requests..."
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

          {/* Green Filter Button (ZipFixer style) */}
          <button
            type="button"
            className="app-btn-filter cursor-pointer"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        {/* Status Filters & View Toggle */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'all'
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              All ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('active')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'active'
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              In Progress
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('permitting')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'permitting'
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Town Review
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('completed')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                statusFilter === 'completed'
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Completed
            </button>
          </div>

          {/* List vs Grid icons */}
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
        </div>
      </div>

      {/* 3. EMPTY STATE OR REQUESTS LIST (Screenshot 1 & 2) */}
      {filteredProjects.length === 0 ? (
        <div className="bg-card rounded-2xl p-10 sm:p-14 text-center border border-border shadow-2xs space-y-4 max-w-lg mx-auto my-6">
          <div className="h-16 w-16 rounded-2xl bg-muted text-muted-foreground/50 flex items-center justify-center mx-auto">
            <ClipboardList className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="font-extrabold text-foreground text-lg">
              No Requests Found
            </h2>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
              You haven't created any service requests yet. Create your first request to get quotes from professionals.
            </p>
          </div>
          <Link to="/request">
            <button
              type="button"
              className="px-6 h-11 rounded-xl bg-primary text-primary-foreground font-bold text-xs sm:text-sm hover:bg-primary-hover active:scale-95 transition-all shadow-2xs cursor-pointer"
            >
              Create Your First Request
            </button>
          </Link>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-3" : "space-y-3"}>
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="hover:border-primary/50 transition-all flex flex-col justify-between overflow-hidden shadow-2xs"
            >
              <CardHeader className="space-y-2 pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-md border border-primary/20">
                      {project.trackingNumber}
                    </span>
                    <Badge 
                      variant={
                        project.role === 'contractor' ? 'warning' : 'secondary'
                      }
                      className="text-[10px] uppercase font-semibold"
                    >
                      {project.role === 'contractor' ? 'Pro' : 'Owner'}
                    </Badge>
                  </div>

                  <Badge
                    variant={
                      project.percentComplete === 100 
                        ? 'success' 
                        : project.urgency === 'emergency' 
                          ? 'destructive' 
                          : 'primary'
                    }
                    className="text-[10px]"
                  >
                    {project.percentComplete === 100 ? 'Approved & Closed' : project.currentStatusLabel}
                  </Badge>
                </div>

                <div>
                  <CardTitle className="text-sm sm:text-base">
                    {project.title}
                  </CardTitle>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                    <MapPin className="w-3 h-3 text-primary shrink-0" />
                    <span>{project.propertyAddress}, {project.city}, {project.state}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3 pt-1">
                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">Milestone Progress</span>
                    <span className="font-mono font-bold text-foreground">{project.percentComplete}%</span>
                  </div>
                  <Progress value={project.percentComplete} className="h-1.5" />
                </div>

                {/* Town BOH Status */}
                <div className="p-2.5 rounded-lg bg-muted border border-border text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">{project.boardOfHealth.townName}</span>
                    <span className="text-[10px] font-semibold text-primary bg-primary/10 px-1.5 py-0.2 rounded">
                      {project.boardOfHealth.status}
                    </span>
                  </div>
                  {project.boardOfHealth.hearingDate && (
                    <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      <span>Hearing: {project.boardOfHealth.hearingDate}</span>
                    </div>
                  )}
                </div>

                {/* Footer info: dates & action link */}
                <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                  <div className="text-muted-foreground text-[10px]">
                    Updated: <span className="font-medium text-foreground">{formatDate(project.createdAt)}</span>
                  </div>

                  <Link to={`/project/${project.trackingNumber}`}>
                    <Button size="sm" variant="default" className="text-xs font-bold h-8 px-2.5 flex items-center gap-1">
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

    </div>
  )
}

export default TrackListPage
