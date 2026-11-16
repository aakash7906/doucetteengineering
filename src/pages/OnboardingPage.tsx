import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ONBOARDING_IMAGES = [
  '/onboarding/vertical_mobile_onboarding_screen_photography_4k_realistic_friendly_smiling.png',
  '/onboarding/vertical_mobile_onboarding_screen_photography_4k_realistic_close_up_hands_of_a.png',
  '/onboarding/vertical_mobile_onboarding_screen_photography_4k_realistic_a_compact_mini.png'
]

export const OnboardingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()
  const touchStartX = useRef<number | null>(null)

  const handleNext = () => {
    if (currentSlide < ONBOARDING_IMAGES.length - 1) {
      setCurrentSlide(prev => prev + 1)
    } else {
      navigate('/login')
    }
  }

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1)
    }
  }

  const handleSkip = () => {
    navigate('/login')
  }

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 50) {
      handleNext()
    } else if (diff < -50) {
      handlePrev()
    }
    touchStartX.current = null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between select-none overflow-hidden bg-black"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Full screen images */}
      <div className="absolute inset-0 w-full h-full">
        {ONBOARDING_IMAGES.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt={`Onboarding slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out pointer-events-none ${
              idx === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Subtle gradient vignette at top and bottom for button visibility */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </div>

      {/* Top Skip button (positioned where it currently was) */}
      <div className="relative z-10 flex items-center justify-end px-6 pt-6">
        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-semibold text-slate-800 dark:text-slate-100 bg-white/80 dark:bg-black/40 hover:bg-white active:scale-95 transition-all px-3.5 py-1.5 rounded-full shadow-sm backdrop-blur-md cursor-pointer border border-white/20"
        >
          Skip
        </button>
      </div>

      {/* Center content is completely removed */}
      <div className="flex-1" />

      {/* Bottom Area: Circular dots indicator + Next button */}
      <div className="relative z-10 w-full max-w-sm mx-auto px-6 pb-8 flex flex-col items-center gap-4">
        {/* Circular Dots for image count */}
        <div className="flex items-center justify-center gap-2">
          {ONBOARDING_IMAGES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer border-none outline-none ${
                idx === currentSlide
                  ? 'w-7 h-2.5 bg-primary shadow-xs'
                  : 'w-2.5 h-2.5 bg-slate-300/90 hover:bg-white shadow-xs'
              }`}
            />
          ))}
        </div>

        {/* Next / Get Started Action Button */}
        <Button
          onClick={handleNext}
          className="w-full h-12 rounded-2xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.99] transition-all"
        >
          <span>{currentSlide === ONBOARDING_IMAGES.length - 1 ? 'Get Started' : 'Next'}</span>
          {currentSlide === ONBOARDING_IMAGES.length - 1 ? (
            <ArrowRight className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  )
}

export default OnboardingPage
