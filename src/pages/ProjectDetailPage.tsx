import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { 
  ArrowLeft, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Download, 
  Send, 
  Clock, 
  Check, 
  AlertCircle, 
  Building, 
  Phone, 
  Mail, 
  Copy, 
  Eye, 
  MessageSquare
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { useToast } from '@/context/ToastContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import { formatDate } from '@/lib/utils'

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { getProjectByTrackingNumber, getProjectById, addMessageToProject } = useProjects()
  const { showToast } = useToast()

  const project = id ? (getProjectByTrackingNumber(id) || getProjectById(id)) : undefined

  const [activeTab, setActiveTab] = useState<'timeline' | 'documents' | 'messages' | 'team'>('timeline')
  const [copied, setCopied] = useState(false)
  const [newMessageText, setNewMessageText] = useState('')
  const [previewDocTitle, setPreviewDocTitle] = useState<string | null>(null)
  const [requestExpediteOpen, setRequestExpediteOpen] = useState(false)

  if (!project) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="h-16 w-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Project Not Found</h2>
        <p className="text-xs sm:text-sm text-muted-foreground">
          We could not find an engineering project matching <span className="font-mono font-bold text-foreground">"{id}"</span>.
        </p>
        <div className="pt-2">
          <Link to="/track">
            <Button size="sm">Return to Tracking Portal</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleCopyTracking = () => {
    navigator.clipboard.writeText(project.trackingNumber)
    setCopied(true)
    showToast(`Copied ${project.trackingNumber} to clipboard!`)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessageText.trim()) return

    addMessageToProject(project.id, {
      sender: 'client',
      senderName: project.contactName || 'Property Owner',
      roleTitle: project.role === 'contractor' ? 'Contractor Pro' : 'Homeowner',
      content: newMessageText.trim()
    })

    setNewMessageText('')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 pb-24">
      
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <Link to="/track" className="text-muted-foreground hover:text-primary flex items-center gap-1 font-semibold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to All Projects
        </Link>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setRequestExpediteOpen(true)}
            className="text-xs font-semibold"
          >
            Request Expedited Action
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => setActiveTab('messages')}
            className="text-xs font-semibold flex items-center gap-1"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask Engineer</span>
          </Button>
        </div>
      </div>

      {/* Hero Project Banner */}
      <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyTracking}
                className="font-mono font-bold text-xs sm:text-sm text-primary bg-primary-light px-3 py-1 rounded-xl border border-primary/25 flex items-center gap-1.5 hover:bg-primary-light/80 transition-colors cursor-pointer"
                title="Click to copy tracking ID"
              >
                <span>{project.trackingNumber}</span>
                {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5 text-primary" />}
              </button>
              
              <Badge 
                variant={project.role === 'contractor' ? 'warning' : 'secondary'} 
                className="text-xs font-semibold capitalize"
              >
                {project.role === 'contractor' ? 'Contractor Pro Account' : 'Homeowner Account'}
              </Badge>

              <Badge 
                variant={
                  project.percentComplete === 100 
                    ? 'success' 
                    : project.urgency === 'emergency' 
                    ? 'destructive' 
                    : 'primary'
                } 
                className="text-xs"
              >
                {project.percentComplete === 100 ? 'Approved & Certified' : project.currentStatusLabel}
              </Badge>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight leading-snug">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 font-medium text-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                {project.propertyAddress}, {project.city}, {project.state} {project.zipCode}
              </span>
              {project.bedrooms && (
                <span>• {project.bedrooms} Beds ({project.estimatedFlowGPD} GPD)</span>
              )}
              {project.waterSource && (
                <span className="capitalize">• {project.waterSource} Water</span>
              )}
            </div>

          </div>

          {/* Quick Town BOH pill */}
          <div className="bg-muted rounded-xl p-3.5 border border-border text-xs shrink-0 max-w-xs space-y-1">
            <div className="text-[10px] uppercase font-bold text-muted-foreground">
              Municipal Jurisdiction
            </div>
            <div className="font-bold text-foreground">
              {project.boardOfHealth.townName}
            </div>
            <div className="text-primary font-semibold flex items-center gap-1 text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Status: {project.boardOfHealth.status}
            </div>
            {project.boardOfHealth.hearingDate && (
              <div className="text-[10px] text-muted-foreground pt-0.5">
                Hearing: {project.boardOfHealth.hearingDate}
              </div>
            )}
          </div>
        </div>

        {/* Overall Completion Progress */}
        <div className="space-y-1.5 pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-foreground">Engineering Completion</span>
            <span className="font-mono font-extrabold text-primary text-sm">{project.percentComplete}% Complete</span>
          </div>
          <Progress value={project.percentComplete} className="h-2.5 rounded-full" />
        </div>

      </div>

      {/* Navigation Tabs (ZipFixer styled) */}
      <div className="flex items-center border border-border bg-card rounded-xl p-1 shadow-2xs overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab('timeline')}
          className={`flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'timeline'
              ? 'bg-primary text-primary-foreground shadow-2xs'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Milestones ({project.milestones.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('documents')}
          className={`flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'documents'
              ? 'bg-primary text-primary-foreground shadow-2xs'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Documents ({project.documents.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('messages')}
          className={`flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'messages'
              ? 'bg-primary text-primary-foreground shadow-2xs'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Messages ({project.messages.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('team')}
          className={`flex-1 min-w-[110px] py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'team'
              ? 'bg-primary text-primary-foreground shadow-2xs'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Town & Engineer</span>
        </button>
      </div>

      {/* TAB CONTENT: TIMELINE / MILESTONES */}
      {activeTab === 'timeline' && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-2xs space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-foreground text-base sm:text-lg">
                  Engineering & Approval Milestones
                </h3>
                <p className="text-xs text-muted-foreground">
                  Step-by-step progress through Massachusetts Title 5 design and Board of Health permits.
                </p>
              </div>
              <Badge variant="primary" className="text-xs font-mono font-bold">
                Stage {project.milestones.findIndex(m => m.status === 'in_progress') + 1 || project.milestones.length} of {project.milestones.length}
              </Badge>
            </div>

            {/* Stepper list */}
            <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-border ml-3 sm:ml-4">
              {project.milestones.map((m, idx) => {
                const isCompleted = m.status === 'completed'
                const isInProgress = m.status === 'in_progress'

                return (
                  <div key={m.id} className="relative group">
                    {/* Circle icon on timeline line */}
                    <div 
                      className={`absolute -left-[31px] sm:-left-[39px] top-0 h-7 w-7 sm:h-8 sm:w-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        isCompleted
                          ? 'bg-primary border-primary text-primary-foreground shadow-2xs'
                          : isInProgress
                          ? 'bg-primary border-primary text-primary-foreground ring-4 ring-primary-light shadow-2xs'
                          : 'bg-card border-border text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[3]" />
                      ) : (
                        <span className="font-mono text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>

                    {/* Milestone Card */}
                    <div className={`p-4 rounded-xl border transition-all ${
                      isInProgress 
                        ? 'border-primary/40 bg-primary-light/40 ring-1 ring-primary/20' 
                        : isCompleted
                        ? 'border-border bg-card'
                        : 'border-border bg-muted/40 opacity-80'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                        <h4 className="font-bold text-foreground text-sm">
                          {m.title}
                        </h4>
                        
                        <div className="flex items-center gap-2">
                          {isCompleted && (
                            <Badge variant="success" className="text-[10px]">
                              Completed {m.completedDate && formatDate(m.completedDate)}
                            </Badge>
                          )}
                          {isInProgress && (
                            <Badge variant="primary" className="text-[10px]">
                              Currently In Progress
                            </Badge>
                          )}
                          {!isCompleted && !isInProgress && (
                            <Badge variant="secondary" className="text-[10px]">
                              Estimated: {m.estimatedDate && formatDate(m.estimatedDate)}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {m.description}
                      </p>
                    </div>

                  </div>
                )
              })}
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT: DOCUMENTS */}
      {activeTab === 'documents' && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-foreground text-base sm:text-lg">
                  Stamped Deliverables & Engineering Drawings
                </h3>
                <p className="text-xs text-muted-foreground">
                  Official Massachusetts PE-stamped plans, perc test reports, and CAD files.
                </p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {project.documents.length} Files
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {project.documents.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-4 rounded-xl border border-border bg-card hover:border-primary/40 hover:shadow-2xs transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-primary-light text-primary flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-foreground text-xs sm:text-sm line-clamp-2">
                        {doc.title}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mt-1">
                        <span className="uppercase font-mono font-semibold">{doc.type}</span>
                        <span>•</span>
                        <span>{doc.fileSize}</span>
                        <span>•</span>
                        <span>{formatDate(doc.uploadedAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setPreviewDocTitle(doc.title)}
                      className="flex-1 text-xs font-semibold flex items-center justify-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Preview</span>
                    </Button>

                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => {
                        showToast(`Downloading stamped vector PDF for "${doc.title}"`, 'success')
                      }}
                      className="text-xs font-semibold flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MESSAGES & DIRECT CHAT */}
      {activeTab === 'messages' && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="bg-card rounded-2xl p-4 sm:p-6 border border-border shadow-2xs space-y-4">
            <div>
              <h3 className="font-extrabold text-foreground text-base sm:text-lg">
                Project Communications Feed
              </h3>
              <p className="text-xs text-muted-foreground">
                Direct channel with Lead Engineer Robert Doucette, P.E. and municipal sanitarians.
              </p>
            </div>

            {/* Messages Stream */}
            <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1">
              {project.messages.map((msg) => {
                const isEngineer = msg.sender === 'engineer'
                const isTown = msg.sender === 'town_official'

                return (
                  <div
                    key={msg.id}
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-1.5 ${
                      isEngineer
                        ? 'bg-primary-light/60 border-primary/25 text-foreground'
                        : isTown
                        ? 'bg-warning/15 border-warning/30 text-foreground'
                        : 'bg-card border-border text-foreground ml-4 sm:ml-8'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground">{msg.senderName}</span>
                        <Badge 
                          variant={isEngineer ? 'primary' : isTown ? 'warning' : 'secondary'} 
                          className="text-[9px] py-0 px-1.5"
                        >
                          {msg.roleTitle}
                        </Badge>
                      </div>
                      <span className="text-muted-foreground font-mono text-[10px]">{msg.timestamp}</span>
                    </div>
                    <p className="text-foreground/90 whitespace-pre-wrap">{msg.content}</p>
                  </div>
                )
              })}
            </div>

            {/* Post Message Input Form */}
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-border flex gap-2">
              <input
                type="text"
                required
                placeholder="Ask your lead engineer a question or request a site visit..."
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                className="flex-1 h-10 px-3.5 rounded-xl border border-input bg-card text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button type="submit" size="default" className="font-bold text-xs px-4">
                <Send className="w-3.5 h-3.5 mr-1" />
                <span>Send</span>
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* TAB CONTENT: TEAM & TOWN CONTACT */}
      {activeTab === 'team' && (
        <div className="space-y-4 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Engineer Profile Card */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-bold text-base font-mono">
                    PE
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {project.assignedEngineer.name}
                    </CardTitle>
                    <div className="text-xs text-primary font-semibold">
                      {project.assignedEngineer.title}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="p-2 rounded-lg bg-muted border border-border font-mono text-[11px] text-foreground">
                  {project.assignedEngineer.licenseNumber}
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <a href={`tel:${project.assignedEngineer.phone}`} className="flex items-center gap-2 hover:text-primary font-medium">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>{project.assignedEngineer.phone}</span>
                  </a>
                  <a href={`mailto:${project.assignedEngineer.email}`} className="flex items-center gap-2 hover:text-primary font-medium">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span>{project.assignedEngineer.email}</span>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Town Board of Health Card */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-base">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">
                      {project.boardOfHealth.townName}
                    </CardTitle>
                    <div className="text-xs text-muted-foreground">
                      Municipal Health Department
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="p-2 rounded-lg bg-muted border border-border text-[11px] text-foreground">
                  Sanitarian: <span className="font-semibold">{project.boardOfHealth.agentName}</span>
                </div>
                <div className="space-y-2 text-muted-foreground">
                  <a href={`tel:${project.boardOfHealth.phone}`} className="flex items-center gap-2 hover:text-primary font-medium">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>{project.boardOfHealth.phone}</span>
                  </a>
                  <div className="flex items-center gap-2 font-medium">
                    <Building className="w-3.5 h-3.5 text-muted-foreground" />
                    <span>Town Hall, {project.city}, MA</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      )}

      {/* Blueprint Preview BottomSheet */}
      <BottomSheet 
        isOpen={!!previewDocTitle} 
        onClose={() => setPreviewDocTitle(null)}
        title={previewDocTitle || 'Plan Viewer'}
      >
        <div className="space-y-4">
          <div className="aspect-video bg-muted border border-border rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="text-center p-6 space-y-2">
              <FileText className="w-12 h-12 text-primary mx-auto" />
              <div className="font-mono text-xs text-foreground font-bold">
                MASSACHUSETTS TITLE 5 DISPOSAL SYSTEM DESIGN
              </div>
              <div className="text-[11px] text-muted-foreground">
                Scale: 1" = 20' • Datum: NAVD 88 • PE License #48921-CIVIL
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1 min-h-[2.75rem]" onClick={() => setPreviewDocTitle(null)}>
              Close
            </Button>
            <Button 
              className="flex-1 min-h-[2.75rem]"
              onClick={() => {
                showToast(`Downloaded vector CAD PDF for "${previewDocTitle}"`, 'success')
                setPreviewDocTitle(null)
              }}
            >
              Download PDF
            </Button>
          </div>
        </div>
      </BottomSheet>

      {/* Expedite Request BottomSheet */}
      <BottomSheet 
        isOpen={requestExpediteOpen} 
        onClose={() => setRequestExpediteOpen(false)}
        title="Request Expedited Action"
      >
        <div className="space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Our engineering team can prioritize review and backhoe soil testing scheduling for Project <span className="font-mono font-bold text-foreground">{project.trackingNumber}</span>.
          </p>
          <textarea
            className="w-full h-24 p-3 rounded-xl border border-input bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="State your deadline date and reason (e.g. Bank mortgage commitment requires septic permit by Nov 25)..."
          />
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="flex-1 min-h-[2.75rem]" onClick={() => setRequestExpediteOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="flex-1 min-h-[2.75rem]"
              onClick={() => {
                showToast('Expedited request received. Engineer will contact you shortly.', 'success')
                setRequestExpediteOpen(false)
              }}
            >
              Submit Request
            </Button>
          </div>
        </div>
      </BottomSheet>

    </div>
  )
}

export default ProjectDetailPage
