import type { ProjectItem } from '@/types'

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-8841',
    trackingNumber: 'DE-2026-8841',
    role: 'homeowner',
    serviceCategory: 'septic-design',
    serviceName: 'Title 5 / Residential Septic Design',
    title: '4-Bedroom Septic System Replacement & Soil Perc Test',
    propertyAddress: '142 Highland Road',
    city: 'Acton',
    state: 'MA',
    zipCode: '01720',
    parcelId: 'MAP 42 - LOT 18',
    lotSizeAcres: 0.92,
    bedrooms: 4,
    estimatedFlowGPD: 440,
    waterSource: 'municipal',
    urgency: 'expedited',
    currentStatusStage: 'town_permitting',
    currentStatusLabel: 'Town Board of Health Permitting',
    percentComplete: 72,
    estimatedCostRange: {
      engineeringMin: 2800,
      engineeringMax: 3400,
      constructionMin: 22000,
      constructionMax: 26500
    },
    contactName: 'David & Sarah Henderson',
    contactEmail: 'david.henderson@example.com',
    contactPhone: '(978) 555-0192',
    createdAt: '2026-10-18T09:30:00Z',
    targetCompletionDate: '2026-11-28',
    assignedEngineer: {
      name: 'Robert Doucette, P.E.',
      title: 'Principal Civil & Environmental Engineer',
      licenseNumber: 'MA PE #41908 | Title 5 SE #1102',
      phone: '(978) 369-4200 ext 12',
      email: 'robert@doucetteengineering.com'
    },
    boardOfHealth: {
      townName: 'Acton Board of Health',
      agentName: 'Kimberly A. Vance, Health Inspector',
      status: 'Under Review',
      hearingDate: 'Nov 18, 2026 - 6:30 PM'
    },
    milestones: [
      {
        id: 'm1',
        stageKey: 'intake_review',
        title: 'Municipal Records & GIS Research',
        description: 'Pulled original 1974 septic records from Town Hall, reviewed MassGIS wetland layers, and verified abutters well setbacks.',
        status: 'completed',
        completedDate: '2026-10-21',
        engineerNotes: 'Existing 1,000-gal tank is failing due to root infiltration. No nearby private drinking wells identified within 100ft.',
        inspector: 'R. Doucette, P.E.'
      },
      {
        id: 'm2',
        stageKey: 'soil_perc_test',
        title: 'Deep Hole Soil Log & Perc Testing',
        description: 'Conducted 2 deep observation holes with excavator to 10 feet. Witnessed by Acton BOH Health Agent.',
        status: 'completed',
        completedDate: '2026-10-27',
        engineerNotes: 'Soil texture: Loamy fine sand overlying stratified sand/gravel. Perc rate passed at 8.5 min/inch. Estimated seasonal high groundwater observed at 68 inches.',
        inspector: 'Kimberly Vance (Acton BOH)'
      },
      {
        id: 'm3',
        stageKey: 'field_survey',
        title: 'Topographic & Existing Conditions Survey',
        description: 'Instrument total station field survey capturing house corners, finish floor elevation, trees, driveway, and 1-foot contours.',
        status: 'completed',
        completedDate: '2026-11-03',
        engineerNotes: 'Benchmarked from street monument. Surveyed elevation: 214.80 NAVD88.',
        inspector: 'Field Crew Alpha'
      },
      {
        id: 'm4',
        stageKey: 'cad_design',
        title: 'CAD Engineering Plans & Hydraulic Specs',
        description: 'Engineered 1,500-gallon two-compartment concrete septic tank with effluent filter and Presby Enviro-Septic advanced leaching field.',
        status: 'completed',
        completedDate: '2026-11-09',
        engineerNotes: 'Plans finalized, stamped by Robert Doucette, P.E. Designed for 4 bedrooms (440 GPD design flow). Complies fully with 310 CMR 15.000.',
        inspector: 'R. Doucette, P.E.'
      },
      {
        id: 'm5',
        stageKey: 'town_permitting',
        title: 'Town Board of Health Filing & Hearing',
        description: 'Formal submittal to Acton Health Department. Notice to abutters sent and formal hearing scheduled.',
        status: 'in_progress',
        estimatedDate: '2026-11-18',
        engineerNotes: 'Application submitted with 3 full plan sets. No local variance required.',
        inspector: 'Acton Health Dept.'
      },
      {
        id: 'm6',
        stageKey: 'contractor_bidding',
        title: 'Contractor Bidding & Permitting to Construct',
        description: 'Bid package release to licensed Title 5 disposal system installers.',
        status: 'pending',
        estimatedDate: '2026-11-22'
      },
      {
        id: 'm7',
        stageKey: 'as_built_approval',
        title: 'Installation Inspection & Certificate of Compliance',
        description: 'Engineer field inspection of stone, pipes, invert elevations, and submission of final As-Built record drawing to the Town.',
        status: 'pending',
        estimatedDate: '2026-12-05'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        title: 'PE-Stamped Septic Design Plan (Sheet C-1) - Full Size',
        type: 'pdf',
        fileSize: '4.8 MB',
        uploadedAt: '2026-11-09',
        isStamped: true
      },
      {
        id: 'doc-2',
        title: 'Town of Acton Form 11 Deep Hole Soil Test Report',
        type: 'report',
        fileSize: '1.2 MB',
        uploadedAt: '2026-10-28',
        isStamped: true
      },
      {
        id: 'doc-3',
        title: 'Hydraulic Calculations & System Sizing Memo',
        type: 'pdf',
        fileSize: '840 KB',
        uploadedAt: '2026-11-08',
        isStamped: false
      },
      {
        id: 'doc-4',
        title: 'Topographic Boundary CAD Drawing (.DWG)',
        type: 'dwg',
        fileSize: '6.2 MB',
        uploadedAt: '2026-11-04',
        isStamped: false
      }
    ],
    messages: [
      {
        id: 'msg-1',
        sender: 'engineer',
        senderName: 'Robert Doucette, P.E.',
        roleTitle: 'Lead Civil Engineer',
        content: 'Hi David and Sarah, your soil test in the backyard passed with flying colors! Perc rate is 8.5 min/inch, which is excellent sand. We are finalizing the CAD drawing and sending it to Acton Board of Health.',
        timestamp: '2026-10-28 11:15 AM'
      },
      {
        id: 'msg-2',
        sender: 'client',
        senderName: 'David Henderson',
        roleTitle: 'Homeowner',
        content: 'Thanks Robert! Do we need to be present at the Board of Health meeting on Nov 18, or will you be representing us?',
        timestamp: '2026-10-28 01:45 PM'
      },
      {
        id: 'msg-3',
        sender: 'engineer',
        senderName: 'Robert Doucette, P.E.',
        roleTitle: 'Lead Civil Engineer',
        content: 'I will be there in person to present the engineering plans. Since our design does not require any variances, it is on the consent agenda and you do not need to attend.',
        timestamp: '2026-10-28 02:10 PM'
      },
      {
        id: 'msg-4',
        sender: 'town_official',
        senderName: 'Kimberly Vance',
        roleTitle: 'Acton Health Inspector',
        content: 'Engineering submission received and placed on the Nov 18 agenda. Preliminary review looks clean with all Title 5 setbacks met.',
        timestamp: '2026-11-10 10:04 AM'
      }
    ]
  },
  {
    id: 'proj-8910',
    trackingNumber: 'DE-2026-8910',
    role: 'contractor',
    serviceCategory: 'site-development',
    serviceName: 'Site Development & Civil Engineering',
    title: 'Whispering Pines 8-Lot Residential Subdivision',
    propertyAddress: 'Lot 1-8 Whispering Pines Way',
    city: 'Sudbury',
    state: 'MA',
    zipCode: '01776',
    parcelId: 'MAP 19 - LOTS 10A-10H',
    lotSizeAcres: 14.5,
    waterSource: 'well',
    urgency: 'standard',
    currentStatusStage: 'cad_design',
    currentStatusLabel: 'CAD Design & Stormwater Modeling',
    percentComplete: 55,
    estimatedCostRange: {
      engineeringMin: 18500,
      engineeringMax: 24000,
      constructionMin: 320000,
      constructionMax: 410000
    },
    contactName: 'Mark Kowalski',
    contactEmail: 'mkowalski@apexbuildersne.com',
    contactPhone: '(617) 555-8319',
    contractorCompany: 'Apex Premier Builders LLC',
    contractorLicense: 'MA CSL #109482',
    createdAt: '2026-09-15T14:00:00Z',
    targetCompletionDate: '2027-01-15',
    assignedEngineer: {
      name: 'Robert Doucette, P.E.',
      title: 'Principal Civil & Environmental Engineer',
      licenseNumber: 'MA PE #41908',
      phone: '(978) 369-4200 ext 12',
      email: 'robert@doucetteengineering.com'
    },
    boardOfHealth: {
      townName: 'Sudbury Planning Board & BOH',
      agentName: 'Marcus Bell, Town Planner',
      status: 'Submitted',
      hearingDate: 'Dec 03, 2026'
    },
    milestones: [
      {
        id: 'm1',
        stageKey: 'intake_review',
        title: 'Subdivision Boundary & Environmental Review',
        description: 'Complete parcel deed research and MassDEP stormwater requirements assessment.',
        status: 'completed',
        completedDate: '2026-09-22'
      },
      {
        id: 'm2',
        stageKey: 'soil_perc_test',
        title: '16 Deep Hole Observation Pits & Perc Matrix',
        description: 'Conducted 16 test pits across 8 proposed house lots. Logged groundwater and gravel layers with town agent.',
        status: 'completed',
        completedDate: '2026-10-12'
      },
      {
        id: 'm3',
        stageKey: 'field_survey',
        title: 'Full Drone LIDAR & Robotic Total Station Topo',
        description: '14.5-acre boundary and topographic elevation grid with 1-foot contour mapping.',
        status: 'completed',
        completedDate: '2026-10-29'
      },
      {
        id: 'm4',
        stageKey: 'cad_design',
        title: 'Roadway Profile, Drainage Basin & Septic Reserve Areas',
        description: 'Roadway horizontal/vertical curves, stormwater retention basin with HydroCAD model, and individual septic reserve envelopes for all 8 lots.',
        status: 'in_progress',
        estimatedDate: '2026-11-25'
      },
      {
        id: 'm5',
        stageKey: 'town_permitting',
        title: 'Sudbury Planning Board Definitive Subdivision Hearing',
        description: 'Public hearings and Conservation Commission Notice of Intent submittal.',
        status: 'pending',
        estimatedDate: '2026-12-03'
      },
      {
        id: 'm6',
        stageKey: 'contractor_bidding',
        title: 'Infrastructure Bidding & Earthwork Quantities',
        description: 'Detailed cut/fill volumes and utility trenching takeoff specs for earthwork contractors.',
        status: 'pending',
        estimatedDate: '2026-12-20'
      },
      {
        id: 'm7',
        stageKey: 'as_built_approval',
        title: 'Roadway & Drainage Final Stamped As-Built Certifications',
        description: 'Final bond release and town acceptance submission.',
        status: 'pending',
        estimatedDate: '2027-04-30'
      }
    ],
    documents: [
      {
        id: 'doc-s1',
        title: 'Sudbury Definitive Subdivision Layout (Sheet 1-6)',
        type: 'pdf',
        fileSize: '18.4 MB',
        uploadedAt: '2026-11-02',
        isStamped: true
      },
      {
        id: 'doc-s2',
        title: 'HydroCAD Stormwater Drainage & Runoff Report (74 pages)',
        type: 'report',
        fileSize: '9.2 MB',
        uploadedAt: '2026-11-05',
        isStamped: true
      },
      {
        id: 'doc-s3',
        title: 'Civil3D Surface & Alignment Files (.DWG)',
        type: 'dwg',
        fileSize: '34.1 MB',
        uploadedAt: '2026-10-31',
        isStamped: false
      }
    ],
    messages: [
      {
        id: 'msg-s1',
        sender: 'client',
        senderName: 'Mark Kowalski',
        roleTitle: 'General Contractor / Developer',
        content: 'Bob, we want to start clearing the cul-de-sac before winter freeze. Can we submit the erosion control plan ahead of the full stormwater permit?',
        timestamp: '2026-11-08 08:30 AM'
      },
      {
        id: 'msg-s2',
        sender: 'engineer',
        senderName: 'Robert Doucette, P.E.',
        roleTitle: 'Lead Civil Engineer',
        content: 'Hi Mark, yes! We can pull a preliminary earth disturbance permit under Sudbury Bylaw Section 5. I will have the standalone silt fence and stabilized construction entrance detail ready for you tomorrow morning.',
        timestamp: '2026-11-08 10:15 AM'
      }
    ]
  },
  {
    id: 'proj-8799',
    trackingNumber: 'DE-2026-8799',
    role: 'homeowner',
    serviceCategory: 'soil-perc-test',
    serviceName: 'Soil Percolation & Deep Hole Testing',
    title: 'Emergency Real Estate Transfer Perc Test & Evaluation',
    propertyAddress: '78 Harwood Avenue',
    city: 'Littleton',
    state: 'MA',
    zipCode: '01460',
    bedrooms: 3,
    waterSource: 'well',
    urgency: 'emergency',
    currentStatusStage: 'as_built_approval',
    currentStatusLabel: 'Completed & Board of Health Certified',
    percentComplete: 100,
    estimatedCostRange: {
      engineeringMin: 1450,
      engineeringMax: 1650
    },
    contactName: 'Elena Rostova',
    contactEmail: 'elena.rostova@example.com',
    contactPhone: '(978) 555-7721',
    createdAt: '2026-10-02T11:00:00Z',
    targetCompletionDate: '2026-10-15',
    assignedEngineer: {
      name: 'Robert Doucette, P.E.',
      title: 'Principal Civil & Environmental Engineer',
      licenseNumber: 'MA PE #41908',
      phone: '(978) 369-4200',
      email: 'robert@doucetteengineering.com'
    },
    boardOfHealth: {
      townName: 'Littleton Board of Health',
      agentName: 'James Gallagher, Health Agent',
      status: 'Approved',
      hearingDate: 'Oct 14, 2026'
    },
    milestones: [
      {
        id: 'm1',
        stageKey: 'intake_review',
        title: 'Fast-Track File Pull & Utility Dig Safe Clearance',
        description: 'Cleared DigSafe ticket #202641098 and secured town records within 24 hours.',
        status: 'completed',
        completedDate: '2026-10-03'
      },
      {
        id: 'm2',
        stageKey: 'soil_perc_test',
        title: 'Deep Hole Excavation & Perc Test Witnessing',
        description: 'Excavated 2 test pits. BOH witnessed perc test at 4.2 min/inch (coarse gravelly sand).',
        status: 'completed',
        completedDate: '2026-10-07'
      },
      {
        id: 'm3',
        stageKey: 'as_built_approval',
        title: 'Official Certification & Form 11 Delivery to Closing Attorney',
        description: 'Official signed Form 11 and suitability certification delivered directly to closing attorney.',
        status: 'completed',
        completedDate: '2026-10-12'
      }
    ],
    documents: [
      {
        id: 'doc-l1',
        title: 'Official Littleton Form 11 Signed Soil Suitability Certificate',
        type: 'report',
        fileSize: '1.5 MB',
        uploadedAt: '2026-10-12',
        isStamped: true
      },
      {
        id: 'doc-l2',
        title: 'Closing Attorney Escrow Compliance Letter',
        type: 'pdf',
        fileSize: '320 KB',
        uploadedAt: '2026-10-13',
        isStamped: true
      }
    ],
    messages: [
      {
        id: 'msg-l1',
        sender: 'engineer',
        senderName: 'Robert Doucette, P.E.',
        roleTitle: 'Principal Engineer',
        content: 'Elena, the Littleton BOH has formally signed off your soil evaluation. Both certificates have been sent to your closing attorney. You are cleared for closing!',
        timestamp: '2026-10-12 04:30 PM'
      },
      {
        id: 'msg-l2',
        sender: 'client',
        senderName: 'Elena Rostova',
        roleTitle: 'Homeowner',
        content: 'Thank you so much Robert! You saved our house sale. The buyer is thrilled!',
        timestamp: '2026-10-12 05:00 PM'
      }
    ]
  },
  {
    id: 'proj-9022',
    trackingNumber: 'DE-2026-9022',
    role: 'homeowner',
    serviceCategory: 'septic-repair',
    serviceName: 'Septic Repair & Component Engineering',
    title: 'High Water Table Presby System Upgrade & D-Box Replacement',
    propertyAddress: '23 Proctor Road',
    city: 'Chelmsford',
    state: 'MA',
    zipCode: '01824',
    bedrooms: 3,
    waterSource: 'municipal',
    urgency: 'standard',
    currentStatusStage: 'soil_perc_test',
    currentStatusLabel: 'Soil Testing Scheduled',
    percentComplete: 28,
    estimatedCostRange: {
      engineeringMin: 2200,
      engineeringMax: 2700,
      constructionMin: 18000,
      constructionMax: 23000
    },
    contactName: 'Brian Gallagher',
    contactEmail: 'bgallagher@comcast.net',
    contactPhone: '(978) 555-3490',
    createdAt: '2026-11-04T16:20:00Z',
    targetCompletionDate: '2026-12-18',
    assignedEngineer: {
      name: 'Robert Doucette, P.E.',
      title: 'Principal Civil & Environmental Engineer',
      licenseNumber: 'MA PE #41908',
      phone: '(978) 369-4200',
      email: 'robert@doucetteengineering.com'
    },
    boardOfHealth: {
      townName: 'Chelmsford Board of Health',
      agentName: 'Amanda Ross, Sanitarian',
      status: 'Scheduled',
      hearingDate: 'Nov 19, 2026 - 10:00 AM'
    },
    milestones: [
      {
        id: 'm1',
        stageKey: 'intake_review',
        title: 'Site Plan Pull & Initial Assessment',
        description: 'Reviewed town records and identified severe seasonal high water table at 32 inches.',
        status: 'completed',
        completedDate: '2026-11-06'
      },
      {
        id: 'm2',
        stageKey: 'soil_perc_test',
        title: 'Deep Hole Excavation & Perc Confirmation',
        description: 'Excavator booked with Chelmsford BOH witness on site.',
        status: 'in_progress',
        estimatedDate: '2026-11-19'
      },
      {
        id: 'm3',
        stageKey: 'cad_design',
        title: 'Mounded Presby System Design',
        description: 'Engineered shallow placement alternative to reduce mounding and preserve yard aesthetics.',
        status: 'pending',
        estimatedDate: '2026-12-02'
      }
    ],
    documents: [
      {
        id: 'doc-c1',
        title: 'Preliminary Site Evaluation & Water Table Advisory',
        type: 'pdf',
        fileSize: '1.1 MB',
        uploadedAt: '2026-11-07',
        isStamped: false
      }
    ],
    messages: [
      {
        id: 'msg-c1',
        sender: 'engineer',
        senderName: 'Robert Doucette, P.E.',
        roleTitle: 'Principal Engineer',
        content: 'Hi Brian, we have Chelmsford BOH confirmed for Tuesday Nov 19 at 10 AM. We also lined up the mini-excavator contractor. Please make sure the side gate is unlocked.',
        timestamp: '2026-11-09 09:12 AM'
      }
    ]
  }
]
