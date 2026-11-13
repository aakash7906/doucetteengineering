import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  title,
  children
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Backdrop tap dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Bottom Sheet Modal Container */}
      <div className="relative w-full max-w-lg bg-card rounded-t-3xl border-t border-border shadow-2xl z-10 max-h-[85vh] flex flex-col animate-in slide-in-from-bottom duration-250 pb-safe">
        
        {/* Swipe / Drag Pill Handle */}
        <div className="pt-3 pb-2 flex justify-center cursor-grab active:cursor-grabbing">
          <div className="w-12 h-1.5 rounded-full bg-muted-foreground/30" />
        </div>

        {/* Header */}
        <div className="px-5 pb-3 flex items-center justify-between border-b border-border">
          <h3 className="font-bold text-foreground text-base tracking-tight">
            {title || 'Details'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto no-scrollbar space-y-4">
          {children}
        </div>
      </div>
    </div>
  )
}
