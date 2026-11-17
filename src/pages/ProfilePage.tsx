import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  Phone,
  Lock,
  Camera,
  Check,
  Home,
  HardHat,
  ChevronDown
} from 'lucide-react'
import { useProjects } from '@/context/ProjectContext'
import { useToast } from '@/context/ToastContext'
import { Badge } from '@/components/ui/badge'

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { userProfile, updateUserProfile, currentRole, setCurrentRole } = useProjects()
  const { showToast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: userProfile.name || 'Aakash',
    email: userProfile.email || 'aakash@gmail.com',
    phone: userProfile.phone || '+1 (555) 000-0000',
    role: currentRole,
    propertyType: userProfile.propertyType || 'Single Family Residential',
    companyName: userProfile.companyName || 'Apex Site Contracting & Civil LLC',

    streetAddress: userProfile.streetAddress || '142 Highland Rd',
    city: userProfile.city || 'Acton',
    postalCode: userProfile.postalCode || '01720',
    bohJurisdiction: userProfile.bohJurisdiction || 'Acton Board of Health (Middlesex County)',
    avatarUrl: userProfile.avatarUrl || ''
  })

  const [isSaved, setIsSaved] = useState(false)

  // Handle image upload from device
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size should be under 5MB', 'error')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setFormData(prev => ({ ...prev, avatarUrl: result }))
        showToast('Profile photo updated', 'success')
      }
      reader.readAsDataURL(file)
    }
  }

  // Save changes handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateUserProfile({
      name: formData.name,
      phone: formData.phone,
      role: formData.role,
      propertyType: formData.propertyType,
      companyName: formData.companyName,
      // licenseNumber: formData.licenseNumber,
      streetAddress: formData.streetAddress,
      city: formData.city,
      postalCode: formData.postalCode,
      bohJurisdiction: formData.bohJurisdiction,
      avatarUrl: formData.avatarUrl
    })

    if (formData.role !== currentRole) {
      setCurrentRole(formData.role)
    }

    setIsSaved(true)
    showToast('Profile changes saved successfully!', 'success')
    setTimeout(() => {
      navigate(-1)
    }, 500)
  }

  return (
    <div className="min-h-full pb-8 sm:pb-10 pt-3 px-4 max-w-lg mx-auto space-y-6">
      
      {/* 1. AVATAR WITH CAMERA BADGE */}
      <div className="flex flex-col items-center justify-center pt-2">
        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-card shadow-md bg-primary-light flex items-center justify-center transition-transform group-hover:scale-105">
            {formData.avatarUrl ? (
              <img
                src={formData.avatarUrl}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary/15 text-primary font-black text-3xl">
                {formData.name.charAt(0).toUpperCase() || 'A'}
              </div>
            )}
          </div>

          {/* Camera edit badge */}
          <button
            type="button"
            aria-label="Upload profile photo"
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary hover:bg-primary-hover text-white flex items-center justify-center shadow-md ring-3 ring-card transition-transform active:scale-90 cursor-pointer"
          >
            <Camera className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />

        <div className="mt-2.5 text-center">
          <h2 className="text-base font-bold text-slate-800 tracking-tight">
            {formData.name || 'User Profile'}
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-0.5">
            <Badge variant="success" className="text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider">
              {currentRole === 'contractor' ? 'Contractor' : 'Homeowner'}
            </Badge>
            <span className="text-slate-400 text-xs">•</span>
            <span className="text-slate-500 text-xs font-medium">
              {formData.city || 'Acton'}, MA
            </span>
          </div>
        </div>
      </div>

      {/* ROLE / INTERFACE MODE SWITCHER (INDUSTRY STANDARD DUAL MODE) */}
      <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider block">
              Interface Mode
            </span>
            <span className="text-xs font-semibold text-slate-800">
              Active Experience
            </span>
          </div>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
            currentRole === 'contractor' 
              ? 'bg-primary-light text-primary border border-primary/25' 
              : 'bg-primary-light text-primary border border-primary/25'
          }`}>
            {currentRole === 'contractor' ? 'Contractor' : 'Homeowner'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => {
              setCurrentRole('homeowner')
              setFormData(prev => ({ ...prev, role: 'homeowner' }))
              showToast('Switched to Homeowner', 'success')
            }}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentRole === 'homeowner'
                ? 'bg-white text-emerald-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Homeowner</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setCurrentRole('contractor')
              setFormData(prev => ({ ...prev, role: 'contractor' }))
              showToast('Switched to Contractor', 'success')
            }}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              currentRole === 'contractor'
                ? 'bg-white text-sky-600 shadow-xs scale-[1.02]'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HardHat className="w-4 h-4" />
            <span>Contractor</span>
          </button>
        </div>
      </div>

      <form id="profile-form" onSubmit={handleSubmit} className="space-y-6">
        
        {/* 2. SECTION: PERSONAL INFORMATION */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold pb-1 text-muted-foreground uppercase tracking-wider">
              Personal Information
            </span>
            <span className="text-[11px] font-semibold text-primary flex items-center gap-1">
              Account Verified
            </span>
          </div>

          <div className="bg-card border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xs space-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs pb-1 font-bold text-slate-700 block">
                Full Name
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter full name"
                  required
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Email Address (Not Editable) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs pb-1 font-bold text-slate-700">
                  Email Address
                </label>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-200/70 px-2 py-0.5 rounded-md">
                  <Lock className="w-2.5 h-2.5 text-slate-400" />
                  Not Editable
                </span>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  readOnly
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-100/80 border border-slate-200/80 text-sm font-medium text-slate-500 cursor-not-allowed select-none"
                />
                <div className="absolute right-3.5 text-slate-400 pointer-events-none">
                  <Lock className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-1.5">
              <label className="text-xs pb-1 font-bold text-slate-700 block">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Role & Specific Profile Details */}
            <div className="space-y-1.5 pt-1  border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs pb-1 font-bold text-slate-700">
                  {formData.role === 'contractor' ? 'Trade Specialization & License' : 'Primary Property Type'}
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const nextRole = formData.role === 'homeowner' ? 'contractor' : 'homeowner'
                    setFormData({ ...formData, role: nextRole })
                  }}
                  className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                >
                  Switch to {formData.role === 'homeowner' ? 'Contractor' : 'Homeowner'}
                </button>
              </div>

              {formData.role === 'homeowner' ? (
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                    <Home className="w-4 h-4" />
                  </div>
                  <select
                    value={formData.propertyType}
                    onChange={e => setFormData({ ...formData, propertyType: e.target.value })}
                    className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 border border-slate-200/90 text-sm font-semibold text-slate-800 appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all cursor-pointer"
                  >
                    <option value="Single Family Residential">Single Family Residential (Title 5 Septic)</option>
                    <option value="Multi-Family Residential">Multi-Family Residential (2-4 Units)</option>
                    <option value="Subdivision Lot / New Construction">Subdivision Lot / New Construction</option>
                    <option value="Commercial / Mixed-Use Facility">Commercial / Mixed-Use Facility</option>
                    <option value="Wetland / Conservation Parcel">Wetland Buffer / Conservation Parcel</option>
                  </select>
                  <div className="absolute right-3.5 text-slate-400 pointer-events-none">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                      <HardHat className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="Company / Trade Name"
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-slate-50 border border-slate-200/90 text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 3. FOOTER ACTION BUTTONS */}
        <div className="pt-2 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 h-12 rounded-2xl border border-slate-200 bg-slate-100/90 hover:bg-slate-200 active:scale-[0.98] text-slate-700 font-bold text-sm transition-all cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSaved}
            className="flex-1 h-12 rounded-2xl bg-primary hover:bg-primary-hover active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>{isSaved ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>

      </form>
    </div>
  )
}

export default ProfilePage
