import type { ServiceDetail } from '@/types'

export const SERVICES_CATALOG: ServiceDetail[] = [
  {
    id: 'soil-perc-test',
    title: 'Soil Percolation & Deep Hole Testing',
    tagline: '',
    description: 'Complete soil testing including backhoe test pit excavation, soil horizon logging, seasonal high groundwater elevation determination, and official perc rate percolation testing witnessed by the local Board of Health agent.',
    priceStartingAt: 1250,
    typicalTimeline: '3 - 7 Business Days',
    iconName: 'Shovel',
    badge: 'Fast Booking',
    deliverables: [
      'Official Title 5 Form 11 / Form 12 Soil Logs',
      'Seasonal High Groundwater determination',
      'Percolation Rate Certification (min/inch)',
      'Town Board of Health Agent coordination',
      'Excavator operator scheduling assistance'
    ],
    whoNeedsThis: [
      'Homeowners selling property with failed system',
      'Builders evaluating vacant land viability',
      'Architects planning home additions / bedroom count increase',
      'Property owners converting cesspools'
    ]
  },
  {
    id: 'septic-design',
    title: 'Title 5 / Residential Septic Design',
    tagline: '',
    description: 'Comprehensive civil engineering design of modern on-site subsurface disposal systems. Tailored for difficult lots, small reserve areas, steep grades, and high water tables using state-of-the-art gravity, pressure-dosed, or alternative technology systems.',
    priceStartingAt: 2400,
    typicalTimeline: '2 - 3 Weeks',
    iconName: 'Compass',
    badge: 'Most Popular',
    deliverables: [
      'PE-Stamped CAD Site Plan & Cross-Section Profiles',
      'Hydraulic loading and pipe sizing calculations',
      'Detailed construction specifications for installers',
      'Submittal package to Town Board of Health',
      'Assistance through local Board of Health hearing'
    ],
    whoNeedsThis: [
      'Homeowners replacing an aging or failed septic system',
      'Custom home builders constructing new single-family homes',
      'Properties with tight lot boundaries or high groundwater',
      'Homeowners adding accessory dwelling units (ADU)'
    ]
  },
  {
    id: 'site-development',
    title: 'Site Development & Civil Engineering',
    tagline: '',
    description: 'Turn raw land into build-ready parcels. We provide complete site civil engineering, including existing conditions mapping, cut-and-fill grading plans, utility tie-in coordination, driveway curb cuts, and DEP stormwater compliance.',
    priceStartingAt: 3200,
    typicalTimeline: '3 - 4 Weeks',
    iconName: 'DraftingCompass',
    badge: 'Contractor Preferred',
    deliverables: [
      'Comprehensive Site Grading & Drainage CAD Plan',
      'Stormwater Management Report & Runoff Calculations',
      'Erosion & Sedimentation Control Plan',
      'Municipal planning board presentation assistance',
      'Driveway sight-distance & profile plans'
    ],
    whoNeedsThis: [
      'General contractors & commercial land developers',
      'Subdivision developers planning residential cul-de-sacs',
      'Property owners leveling steep grades for construction',
      'Commercial property expansions and parking additions'
    ]
  },
  {
    id: 'septic-repair',
    title: 'Septic Repair & Component Engineering',
    tagline: '',
    description: 'When the whole system does not need full replacement, we engineer component repairs, distribution box replacements, pump chamber retrofits, and tight-tank conversions that comply with municipal requirements without needless expense.',
    priceStartingAt: 950,
    typicalTimeline: '1 - 2 Weeks',
    iconName: 'Wrench',
    deliverables: [
      'Component repair engineering letter & sketch',
      'Local Board of Health emergency repair filing',
      'Pump chamber sizing & float switch electrical schedule',
      'Pre- and post-repair inspection sign-off'
    ],
    whoNeedsThis: [
      'Homeowners with crushed distribution boxes or cracked tanks',
      'Failed Title 5 inspection conditional pass fixes',
      'Properties needing effluent filtration retrofits',
      'Properties with root intrusion in transport pipes'
    ]
  },
  {
    id: 'commercial-septic',
    title: 'Commercial & Multi-Family Wastewater',
    tagline: '',
    description: 'Specialized wastewater engineering for flows exceeding 2,000 to 10,000+ GPD. Designed for restaurants, residential subdivisions, veterinary clinics, office parks, and multi-family developments requiring advanced nitrogen reduction.',
    priceStartingAt: 4800,
    typicalTimeline: '4 - 6 Weeks',
    iconName: 'Building2',
    badge: 'High Capacity',
    deliverables: [
      'Full DEP Groundwater Discharge or Title 5 commercial plan',
      'Grease trap and pre-treatment sizing calculations',
      'Advanced secondary treatment specifications (FAST / Presby)',
      'O&M (Operation & Maintenance) regulatory manual'
    ],
    whoNeedsThis: [
      'Commercial property managers & real estate investors',
      'Restaurateurs & brewery operators',
      'Condominium associations and multi-unit developers',
      'Auto repair & industrial shops needing oil-water separators'
    ]
  },
  {
    id: 'wetland-conservation',
    title: 'Wetland Buffer & Conservation Permitting',
    tagline: '',
    description: 'Ensure your septic or site construction complies with state and local Wetlands Protection Acts. We prepare Wetland Resource Area buffer zone plans, Request for Determination of Applicability (RDA), and Notice of Intent (NOI) packages.',
    priceStartingAt: 1800,
    typicalTimeline: '2 - 4 Weeks',
    iconName: 'Trees',
    deliverables: [
      '100-ft buffer zone and 200-ft riverfront overlay plans',
      'Conservation Commission filing application & exhibits',
      'Public hearing representation before local commission',
      'Order of Conditions compliance monitoring'
    ],
    whoNeedsThis: [
      'Properties located near lakes, streams, vernal pools, or bogs',
      'Lakefront cottage septic replacements',
      'Site developments requiring flood zone elevation certificates'
    ]
  }
]
