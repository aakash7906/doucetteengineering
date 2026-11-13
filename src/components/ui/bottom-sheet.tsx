import React, { useEffect, useState, useRef, useCallback } from 'react'
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
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startYRef = useRef<number | null>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setDragOffsetY(0)
    } else {
      document.body.style.overflow = ''
      setDragOffsetY(0)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Drag Gesture Handlers (Supports both Touch and Mouse dragging)
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    startYRef.current = clientY
    setIsDragging(true)
  }

  const handleTouchMove = useCallback((e: TouchEvent | MouseEvent) => {
    if (startYRef.current === null) return
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const deltaY = clientY - startYRef.current

    // Only allow downward drag
    if (deltaY > 0) {
      setDragOffsetY(deltaY)
    } else {
      setDragOffsetY(0)
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    if (startYRef.current === null) return

    // If dragged down by more than 80px, dismiss the sheet
    if (dragOffsetY > 80) {
      onClose()
    } else {
      // Snap back to open position
      setDragOffsetY(0)
    }

    startYRef.current = null
    setIsDragging(false)
  }, [dragOffsetY, onClose])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleTouchMove)
      window.addEventListener('mouseup', handleTouchEnd)
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
      window.addEventListener('touchend', handleTouchEnd)
    } else {
      window.removeEventListener('mousemove', handleTouchMove)
      window.removeEventListener('mouseup', handleTouchEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }

    return () => {
      window.removeEventListener('mousemove', handleTouchMove)
      window.removeEventListener('mouseup', handleTouchEnd)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, handleTouchMove, handleTouchEnd])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Backdrop tap dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Bottom Sheet Modal Container */}
      <div 
        ref={sheetRef}
        style={{
          transform: `translateY(${dragOffsetY}px)`,
          transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative w-full max-w-lg bg-card rounded-t-3xl border-t border-border shadow-2xl z-10 max-h-[85vh] flex flex-col pb-safe select-none"
      >
        
        {/* Swipe / Drag Area Handle */}
        <div 
          onMouseDown={handleTouchStart}
          onTouchStart={handleTouchStart}
          className="pt-3 pb-2.5 flex justify-center cursor-grab active:cursor-grabbing w-full touch-none"
        >
          <div className="w-14 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400 transition-colors" />
        </div>

        {/* Header */}
        <div className="px-5 pb-3 flex items-center justify-between border-b border-border">
          <h3 className="font-extrabold text-foreground text-base tracking-tight">
            {title || 'Details'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground active:scale-90 transition-all cursor-pointer"
            aria-label="Close sheet"
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
