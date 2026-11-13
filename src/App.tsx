import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ProjectProvider } from '@/context/ProjectContext'
import { ToastProvider } from '@/context/ToastContext'
import { Header } from '@/components/layout/Header'
import { BottomNav } from '@/components/layout/BottomNav'
import { DesktopDeviceFrame } from '@/components/layout/DesktopDeviceFrame'
import { SplashScreen } from '@/pages/SplashScreen'
import { OnboardingPage } from '@/pages/OnboardingPage'
import { LoginPage } from '@/pages/LoginPage'
import { SignupPage } from '@/pages/SignupPage'
import { HomePage } from '@/pages/HomePage'
import { RequestPage } from '@/pages/RequestPage'
import { TrackListPage } from '@/pages/TrackListPage'
import { ProjectDetailPage } from '@/pages/ProjectDetailPage'
import { ContractorPortalPage } from '@/pages/ContractorPortalPage'
import { CalculatorPage } from '@/pages/CalculatorPage'
import { GuidesPage } from '@/pages/GuidesPage'
import { DirectoryPage } from '@/pages/DirectoryPage'

// Main Content Layout that hides Header & BottomNav during Splash/Onboarding/Auth flow
const AppLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [hasStartedSplash, setHasStartedSplash] = useState(false)

  // Force splash screen on every browser refresh / initial load
  useEffect(() => {
    if (!hasStartedSplash) {
      setHasStartedSplash(true)
      if (location.pathname !== '/splash') {
        navigate('/splash', { replace: true })
      }
    }
  }, [hasStartedSplash, location.pathname, navigate])

  const isAuthOrSplashFlow = 
    location.pathname === '/splash' || 
    location.pathname === '/onboarding' || 
    location.pathname === '/login' || 
    location.pathname === '/signup'

  return (
    <div className="min-h-screen md:min-h-full flex flex-col bg-background font-sans text-foreground selection:bg-primary selection:text-primary-foreground">
      {!isAuthOrSplashFlow && <Header />}
      <main className={`flex-1 ${!isAuthOrSplashFlow ? 'app-content-bottom-space' : ''}`}>
        <Routes>
          {/* Mobile App Initial Flow: /splash -> /onboarding -> /login -> /home */}
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* App Core Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/track" element={<TrackListPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/contractor" element={<ContractorPortalPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/guides" element={<GuidesPage />} />
          <Route path="/directory" element={<DirectoryPage />} />

          {/* Default redirect to splash screen */}
          <Route path="*" element={<Navigate to="/splash" replace />} />
        </Routes>
      </main>
      {!isAuthOrSplashFlow && <BottomNav />}
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <ProjectProvider>
      <ToastProvider>
        <BrowserRouter>
          <DesktopDeviceFrame>
            <AppLayout />
          </DesktopDeviceFrame>
        </BrowserRouter>
      </ToastProvider>
    </ProjectProvider>
  )
}

export default App
