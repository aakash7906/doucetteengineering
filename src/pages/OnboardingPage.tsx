import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SLIDES = [
  {
    image: '/onboarding-1.svg',
    tag: 'Licensed P.E. Stamped',
    title: 'Certified Septic & Site Design',
    description: 'Direct Title 5 soil perc testing, deep hole observations, and stamped municipal Board of Health plans.'
  },
  {
    image: '/onboarding-2.svg',
    tag: 'Real-Time Tracking',
    title: 'Live Municipal Tracker',
    description: 'Monitor hearing dates, town sanitarian reviews, and CAD drafting progress in one mobile dashboard.'
  },
  {
    image: '/onboarding-3.svg',
    tag: 'Instant Quotes & Pro Portal',
    title: 'Builders, Contractors & Owners',
    description: '48-hour backhoe perc bookings, machine-control CAD surfaces, and instant Title 5 cost calculations.'
  }
]

export const OnboardingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1)
    } else {
      navigate('/login')
    }
  }

  const handleSkip = () => {
    navigate('/login')
  }

  const slide = SLIDES[currentSlide]

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-card text-foreground px-6 py-8 pb-10 select-none overflow-y-auto">
      
      {/* Top Skip button */}
      <div className="flex items-center justify-between pt-2">
        <div className="h-9 w-9 rounded-xl bg-primary text-primary-foreground font-mono font-black text-xs flex items-center justify-center shadow-xs">
          DE
        </div>
        <button
          type="button"
          onClick={handleSkip}
          className="text-xs font-bold text-muted-foreground hover:text-foreground active:scale-95 transition-all px-3 py-1.5 rounded-full hover:bg-muted cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Center Image / Illustration & Content */}
      <div className="flex-1 flex flex-col items-center justify-center my-6 space-y-6 max-w-sm mx-auto text-center">
        
        {/* Responsive Illustration Box */}
        <div className="w-full aspect-[4/3] rounded-3xl overflow-hidden border border-border/80 shadow-md bg-muted/40 p-2 flex items-center justify-center animate-in fade-in duration-300">
          <img 
            src={slide.image} 
            alt={slide.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text Information */}
        <div className="space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight pt-1">
            {slide.title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {slide.description}
          </p>
        </div>

        {/* Carousel Indicators */}
        <div className="flex items-center gap-1.5 pt-2">
          {SLIDES.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Bottom Action Button */}
      <div className="max-w-sm mx-auto w-full pt-2">
        <Button
          onClick={handleNext}
          className="w-full h-12 rounded-2xl font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>{currentSlide === SLIDES.length - 1 ? 'Get Started' : 'Next'}</span>
          {currentSlide === SLIDES.length - 1 ? (
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
