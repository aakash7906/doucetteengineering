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
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { formatDate } from '@/lib/utils'

export const TrackListPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const { projects } = useProjects()
  
  const queryFromUrl = searchParams.get('query') || ''
  const [searchQuery, setSearchQuery] = useState(queryFromUrl)
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'permitting' | 'completed'>('all')
  const [roleFilter] = useState<'all' | 'homeowner' | 'contractor'>('all')
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
    <div className="max-w-lg mx-auto px-4 py-4 space-y-5 pb-32">
      
      {/* 1. APP HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-black text-foreground tracking-tight">
              My Requests
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              {projects.length} {projects.length === 1 ? 'request' : 'requests'} for quotes
            </p>
          </div>
        </div>

        {/* Square Green + Button */}
        <Link to="/request">
          <button
            type="button"
            className="h-11 w-11 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary-hover active:scale-95 transition-all shadow-xs cursor-pointer"
            title="Create New Request"
            aria-label="New Request"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </Link>
      </div>

      {/* 2. SEARCH & HORIZONTAL FILTER CHIPS */}
      <div className="space-y-3.5">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search requests..."
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

        {/* Horizontally Scrollable Filter Pills */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className={`h-8.5 px-3.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'bg-muted text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              All ({projects.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('active')}
              className={`h-8.5 px-3.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === 'active'
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'bg-muted text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              In Progress
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('permitting')}
              className={`h-8.5 px-3.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === 'permitting'
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'bg-muted text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              Town Review
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('completed')}
              className={`h-8.5 px-3.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                statusFilter === 'completed'
                  ? 'bg-primary text-primary-foreground shadow-2xs'
                  : 'bg-muted text-muted-foreground hover:text-foreground border border-border'
              }`}
            >
              Completed
            </button>
          </div>

          {/* List vs Grid icons (desktop only) */}
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
        </div>
      </div>

      {/* 3. REQUESTS LIST */}
      {filteredProjects.length === 0 ? (
        <div className="bg-card rounded-3xl p-10 sm:p-14 text-center border border-border shadow-2xs space-y-4 max-w-md mx-auto my-6">
          <div className="h-16 w-16 rounded-2xl bg-muted text-muted-foreground/50 flex items-center justify-center mx-auto">
            <ClipboardList className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="font-extrabold text-foreground text-lg">
              No Requests Found
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              You haven't created any service requests matching this query.
            </p>
          </div>
          <Link to="/request">
            <Button className="font-bold text-xs">
              Create Your First Request
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => (
            <Card 
              key={project.id} 
              className="rounded-3xl border border-border shadow-xs hover:border-primary/50 transition-all overflow-hidden flex flex-col justify-between p-6 sm:p-7 space-y-5 bg-card"
            >
              {/* Header: Status Pill */}
              <div>
                <span className={`inline-flex text-xs font-semibold px-3 py-1 rounded-full border ${
                  project.percentComplete === 100 
                    ? 'bg-primary-light text-primary border-primary/25' 
                    : project.urgency === 'emergency' 
                    ? 'bg-destructive/10 text-destructive border-destructive/20' 
                    : 'bg-primary-light text-primary border-primary/25'
                }`}>
                  {project.percentComplete === 100 ? 'Approved & Closed' : project.currentStatusLabel}
                </span>
              </div>

              {/* Title & Location (Extra breathing room between title and location) */}
              <div className="space-y-3">
                <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight leading-snug">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span className="truncate">{project.propertyAddress}, {project.city}, {project.state}</span>
                </div>
              </div>

              {/* Milestone Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Milestone Progress</span>
                  <span className="font-bold text-foreground">{project.percentComplete}%</span>
                </div>
                <Progress value={project.percentComplete} className="h-2 rounded-full" />
              </div>

              {/* Town Board of Health Inset Box (Spacious & uncluttered) */}
              <div className="p-4 rounded-2xl bg-muted/60 border border-border text-xs space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-foreground text-xs sm:text-sm">{project.boardOfHealth.townName}</span>
                  <span className="text-[11px] font-semibold text-primary bg-primary-light px-2.5 py-0.5 rounded-full border border-primary/20 shrink-0">
                    {project.boardOfHealth.status}
                  </span>
                </div>
                {project.boardOfHealth.hearingDate && (
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1.5 pt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Hearing: {project.boardOfHealth.hearingDate}</span>
                  </div>
                )}
              </div>

              {/* Card Footer with Generous Breathing Room */}
              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-muted-foreground text-xs">
                  Updated: <span className="font-semibold text-foreground">{formatDate(project.createdAt)}</span>
                </span>

                <Link to={`/project/${project.trackingNumber}`}>
                  <Button size="sm" className="font-bold text-xs px-4 h-10 rounded-xl shadow-xs gap-1.5 cursor-pointer">
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

    </div>
  )
}

export default TrackListPage
