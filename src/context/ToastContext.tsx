import React, { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
  id: string
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts(prev => [...prev, { id, message, type }])
    
    // Haptic feedback trigger on mobile devices if supported
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(type === 'error' ? [30, 50, 30] : 20)
      } catch {
        // Ignored on unsupported browsers
      }
    }

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3500)
  }, [])

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Mobile Floating Toasts Container (Fixed at top under notch) */}
      <div 
        className="fixed top-3 left-0 right-0 z-50 flex flex-col items-center gap-2 px-4 pointer-events-none"
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-lg border text-xs sm:text-sm font-semibold max-w-sm w-full transition-all animate-in fade-in slide-in-from-top-3 ${
              toast.type === 'success'
                ? 'bg-card text-foreground border-primary/30'
                : toast.type === 'error'
                ? 'bg-destructive text-destructive-foreground border-destructive'
                : 'bg-card text-foreground border-border'
            }`}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-white shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-primary shrink-0" />}
            <span className="flex-1">{toast.message}</span>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
