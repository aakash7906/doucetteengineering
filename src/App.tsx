import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProjectProvider } from '@/context/ProjectContext'
import { ToastProvider } from '@/context/ToastContext'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { HomePage } from '@/pages/HomePage'
import { RequestPage } from '@/pages/RequestPage'
import { TrackListPage } from '@/pages/TrackListPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ContractorPortalPage } from '@/pages/ContractorPortalPage'
import { CalculatorPage } from '@/pages/CalculatorPage'
import { GuidesPage } from '@/pages/GuidesPage'
import { DirectoryPage } from '@/pages/DirectoryPage'

export const App: React.FC = () => {
  return (
    <ProjectProvider>
      <ToastProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
            <Header />
            <main className="flex-1 app-content-bottom-space">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/request" element={<RequestPage />} />
                <Route path="/track" element={<TrackListPage />} />
                <Route path="/project/:id" element={<ProjectDetailPage />} />
                <Route path="/contractor" element={<ContractorPortalPage />} />
                <Route path="/calculator" element={<CalculatorPage />} />
                <Route path="/guides" element={<GuidesPage />} />
                <Route path="/directory" element={<DirectoryPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <BottomNav />
          </div>
        </BrowserRouter>
      </ToastProvider>
    </ProjectProvider>
  )
}

export default App
