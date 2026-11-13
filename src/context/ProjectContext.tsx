import React, { createContext, useContext, useState, useEffect } from 'react'
import type { ProjectItem, UserRole, ProjectMessage } from '@/types'
import { INITIAL_PROJECTS } from '@/data/mockProjects'

interface ProjectContextType {
  projects: ProjectItem[]
  currentRole: UserRole
  setCurrentRole: (role: UserRole) => void
  getProjectByTrackingNumber: (trackingNumber: string) => ProjectItem | undefined
  getProjectById: (id: string) => ProjectItem | undefined
  addProjectRequest: (newProject: Omit<ProjectItem, 'id' | 'trackingNumber' | 'createdAt' | 'milestones' | 'documents' | 'messages' | 'percentComplete' | 'currentStatusStage' | 'currentStatusLabel' | 'assignedEngineer' | 'boardOfHealth'>) => ProjectItem
  addMessageToProject: (projectId: string, message: Omit<ProjectMessage, 'id' | 'timestamp'>) => void
  activeTrackingId: string | null
  setActiveTrackingId: (id: string | null) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

const STORAGE_KEY = 'doucette_projects_v1'
const ROLE_KEY = 'doucette_user_role'

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return INITIAL_PROJECTS
      }
    }
    return INITIAL_PROJECTS
  })

  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem(ROLE_KEY)
    return (savedRole === 'contractor' ? 'contractor' : 'homeowner') as UserRole
  })

  const [activeTrackingId, setActiveTrackingId] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects))
  }, [projects])

  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role)
    localStorage.setItem(ROLE_KEY, role)
  }

  const getProjectByTrackingNumber = (trackingNumber: string) => {
    const cleaned = trackingNumber.trim().toUpperCase()
    return projects.find(
      p => p.trackingNumber.toUpperCase() === cleaned || 
           p.trackingNumber.replace(/[^A-Z0-9]/g, '') === cleaned.replace(/[^A-Z0-9]/g, '') ||
           p.id.toUpperCase() === cleaned
    )
  }

  const getProjectById = (id: string) => {
    return projects.find(p => p.id === id || p.trackingNumber.toLowerCase() === id.toLowerCase())
  }

  const addProjectRequest = (
    data: Omit<ProjectItem, 'id' | 'trackingNumber' | 'createdAt' | 'milestones' | 'documents' | 'messages' | 'percentComplete' | 'currentStatusStage' | 'currentStatusLabel' | 'assignedEngineer' | 'boardOfHealth'>
  ): ProjectItem => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const year = new Date().getFullYear()
    const trackingNumber = `DE-${year}-${randomSuffix}`
    const id = `proj-${randomSuffix}`

    const newProject: ProjectItem = {
      ...data,
      id,
      trackingNumber,
      createdAt: new Date().toISOString(),
      currentStatusStage: 'intake_review',
      currentStatusLabel: 'Intake Review & Records Check',
      percentComplete: 15,
      assignedEngineer: {
        name: 'Robert Doucette, P.E.',
        title: 'Principal Civil Engineer',
        licenseNumber: 'MA PE #41908 | Title 5 SE #1102',
        phone: '(978) 369-4200',
        email: 'robert@doucetteengineering.com'
      },
      boardOfHealth: {
        townName: `${data.city} Board of Health`,
        agentName: 'Municipal Health Agent',
        status: 'Under Review'
      },
      milestones: [
        {
          id: `m-intake-${Date.now()}`,
          stageKey: 'intake_review',
          title: 'Project Submission & Municipal Records Pull',
          description: `Engineering team received request for ${data.propertyAddress}. Pulling town GIS files, Title 5 history, and abutter records.`,
          status: 'in_progress',
          engineerNotes: 'Application registered. Preliminary review started.',
          estimatedDate: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
        },
        {
          id: `m-perc-${Date.now()}`,
          stageKey: 'soil_perc_test',
          title: 'Deep Hole Soil Evaluation & Perc Testing',
          description: 'Scheduling backhoe excavation and municipal Board of Health witness.',
          status: 'pending',
          estimatedDate: new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0]
        },
        {
          id: `m-survey-${Date.now()}`,
          stageKey: 'field_survey',
          title: 'Field Topographic & Boundary Survey',
          description: 'Instrument total station field survey capturing house corners, setbacks, and elevation grades.',
          status: 'pending',
          estimatedDate: new Date(Date.now() + 16 * 86400000).toISOString().split('T')[0]
        },
        {
          id: `m-cad-${Date.now()}`,
          stageKey: 'cad_design',
          title: 'Engineering CAD Plan & Calculations',
          description: 'Full PE-stamped site disposal design plans conforming to sanitary code.',
          status: 'pending',
          estimatedDate: new Date(Date.now() + 24 * 86400000).toISOString().split('T')[0]
        },
        {
          id: `m-permit-${Date.now()}`,
          stageKey: 'town_permitting',
          title: 'Board of Health Permitting Submittal',
          description: 'Formal submittal to municipal Health Department for approval to construct.',
          status: 'pending',
          estimatedDate: new Date(Date.now() + 32 * 86400000).toISOString().split('T')[0]
        },
        {
          id: `m-asbuilt-${Date.now()}`,
          stageKey: 'as_built_approval',
          title: 'Installation Inspection & Final Certificate',
          description: 'Final engineer inspection of disposal area and As-Built plan certification.',
          status: 'pending',
          estimatedDate: new Date(Date.now() + 45 * 86400000).toISOString().split('T')[0]
        }
      ],
      documents: [
        {
          id: `doc-init-${Date.now()}`,
          title: 'Project Intake Confirmation & Scope Letter',
          type: 'pdf',
          fileSize: '420 KB',
          uploadedAt: new Date().toISOString().split('T')[0],
          isStamped: false
        }
      ],
      messages: [
        {
          id: `msg-init-${Date.now()}`,
          sender: 'engineer',
          senderName: 'Robert Doucette, P.E.',
          roleTitle: 'Principal Civil Engineer',
          content: `Welcome to Doucette Engineering! We have received your project details for ${data.propertyAddress}. Our team is reviewing the initial municipal records and will contact you within 24 business hours to schedule any necessary field testing.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today'
        }
      ]
    }

    setProjects(prev => [newProject, ...prev])
    return newProject
  }

  const addMessageToProject = (projectId: string, messageData: Omit<ProjectMessage, 'id' | 'timestamp'>) => {
    const newMessage: ProjectMessage = {
      ...messageData,
      id: `msg-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today'
    }

    setProjects(prev =>
      prev.map(p => {
        if (p.id === projectId || p.trackingNumber === projectId) {
          return {
            ...p,
            messages: [...p.messages, newMessage]
          }
        }
        return p
      })
    )
  }

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentRole,
        setCurrentRole,
        getProjectByTrackingNumber,
        getProjectById,
        addProjectRequest,
        addMessageToProject,
        activeTrackingId,
        setActiveTrackingId
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjects = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider')
  }
  return context
}
