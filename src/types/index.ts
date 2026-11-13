export type UserRole = 'homeowner' | 'contractor'

export type ServiceCategory = 
  | 'soil-perc-test'
  | 'septic-design'
  | 'site-development'
  | 'septic-repair'
  | 'commercial-septic'
  | 'wetland-conservation'

export type ProjectUrgency = 'standard' | 'expedited' | 'emergency'

export type ProjectStatus = 
  | 'intake_review'
  | 'soil_perc_test'
  | 'field_survey'
  | 'cad_design'
  | 'town_permitting'
  | 'contractor_bidding'
  | 'as_built_approval'

export interface ProjectMilestone {
  id: string
  stageKey: ProjectStatus
  title: string
  description: string
  status: 'completed' | 'in_progress' | 'pending'
  completedDate?: string
  estimatedDate?: string
  engineerNotes?: string
  inspector?: string
}

export interface ProjectDocument {
  id: string
  title: string
  type: 'pdf' | 'dwg' | 'image' | 'report'
  fileSize: string
  uploadedAt: string
  downloadUrl?: string
  isStamped?: boolean
}

export interface ProjectMessage {
  id: string
  sender: 'engineer' | 'client' | 'town_official'
  senderName: string
  roleTitle: string
  content: string
  timestamp: string
  attachments?: string[]
}

export interface ProjectItem {
  id: string
  trackingNumber: string // e.g. DE-2026-8841
  role: UserRole
  serviceCategory: ServiceCategory
  serviceName: string
  title: string
  propertyAddress: string
  city: string
  state: string
  zipCode: string
  parcelId?: string
  lotSizeAcres?: number
  bedrooms?: number
  estimatedFlowGPD?: number
  waterSource: 'well' | 'municipal'
  urgency: ProjectUrgency
  currentStatusStage: ProjectStatus
  currentStatusLabel: string
  percentComplete: number
  estimatedCostRange: {
    engineeringMin: number
    engineeringMax: number
    constructionMin?: number
    constructionMax?: number
  }
  contactName: string
  contactEmail: string
  contactPhone: string
  contractorCompany?: string
  contractorLicense?: string
  createdAt: string
  targetCompletionDate: string
  assignedEngineer: {
    name: string
    title: string
    licenseNumber: string
    phone: string
    email: string
  }
  boardOfHealth: {
    townName: string
    agentName: string
    status: 'Scheduled' | 'Submitted' | 'Under Review' | 'Approved' | 'Conditional'
    hearingDate?: string
    phone?: string
  }
  milestones: ProjectMilestone[]
  documents: ProjectDocument[]
  messages: ProjectMessage[]
}

export interface ServiceDetail {
  id: ServiceCategory
  title: string
  tagline: string
  description: string
  priceStartingAt: number
  typicalTimeline: string
  iconName: string
  deliverables: string[]
  whoNeedsThis: string[]
  badge?: string
}

export const TYPES_VERSION = '1.0.0'

