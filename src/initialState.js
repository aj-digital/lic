export const initialFormState = {
  personalDetails: {
    customerId: '',
    ckycNumber: '',
    abhaNumber: '',
    prefix: 'Mr.',
    firstName: '',
    middleName: '',
    lastName: '',
    fatherFirstName: '',
    fatherMiddleName: '',
    fatherLastName: '',
    motherFirstName: '',
    motherMiddleName: '',
    motherLastName: '',
    gender: '',
    maritalStatus: '',
    dob: '',
    age: '',
    ageProof: '',
    idType: '',
    idNumber: '',
    permanentAddress: {
      houseNo: '',
      street: '',
      city: '',
      state: '',
      pinCode: ''
    },
    correspondenceAddressSame: true,
    correspondenceAddress: {
      houseNo: '',
      street: '',
      city: '',
      state: '',
      pinCode: ''
    },
    mobileNumber: '',
    whatsappNumber: '',
    emailId: '',
    nationality: 'Indian',
    residentialStatus: 'Resident Indian',
    isFemale: false, // Computed based on gender
    femaleDetails: {
      isPregnant: 'No',
      lastDeliveryDate: '',
      hadAbortion: 'No',
      abortionDetails: '',
      gynaecConsultation: 'No',
      gynaecDetails: '',
      husbandName: '',
      husbandOccupation: '',
      husbandIncome: '',
      husbandInsurance: {
        policyNo: '',
        insurerName: '',
        sumAssured: '',
        planTerm: '',
        status: ''
      }
    }
  },
  taxOccupation: {
    taxResidencyOutsideIndia: 'No',
    taxResidencyCountry: '',
    taxIdNumber: '',
    isIncomeTaxAssessee: 'No',
    pan: '',
    gstin: '',
    educationalQualification: '',
    presentOccupation: '',
    employerName: '',
    exactNatureOfDuties: '',
    lengthOfService: '',
    annualIncome: '',
    armedForces: 'No'
  },
  lifestyleOthers: {
    hazardousActivities: 'No',
    hazardousDetails: '',
    criminalCharges: 'No',
    criminalDetails: '',
    isPEP: 'No',
    pepDetails: ''
  },
  healthHabits: {
    height: '',
    weight: '',
    consultedDoctor: 'No',
    doctorDetails: '',
    hospitalAdmitted: 'No',
    hospitalDetails: '',
    absentFromWork: 'No',
    absentDetails: '',
    illnesses: {
      lungs: false,
      heart: false,
      endocrine: false,
      kidney: false,
      cancer: false,
      neurological: false,
      hernia: false,
      stomach: false,
      bone: false,
      chronic: false
    },
    illnessDetails: [],
    habits: {
      alcohol: 'No',
      alcoholQuantity: '',
      alcoholDuration: '',
      narcotics: 'No',
      narcoticsQuantity: '',
      narcoticsDuration: '',
      tobacco: 'No',
      tobaccoQuantity: '',
      tobaccoDuration: ''
    },
    familyHistory: [
      { member: 'Father', living: 'Yes', age: '', healthState: '', ageAtDeath: '', causeOfDeath: '' },
      { member: 'Mother', living: 'Yes', age: '', healthState: '', ageAtDeath: '', causeOfDeath: '' },
      { member: 'Brother 1', living: 'Yes', age: '', healthState: '', ageAtDeath: '', causeOfDeath: '' },
      { member: 'Sister 1', living: 'Yes', age: '', healthState: '', ageAtDeath: '', causeOfDeath: '' }
    ]
  },
  existingInsurance: {
    policies: [
      // { policyNo: '', insurer: '', planTerm: '', sumAssured: '', termRiderSum: '', ciRiderSum: '', abRiderSum: '', commencementDate: '', ordinaryRate: 'Yes', inforce: 'Yes' }
    ],
    nominees: [
      { name: '', share: '', dob: '', relationship: '', address: '' }
    ],
    appointee: {
      name: '',
      dob: '',
      age: '',
      relationship: '',
      mobile: '',
      email: '',
      address: ''
    },
    bankDetails: {
      type: 'Savings',
      bankName: '',
      accountNo: '',
      ifscCode: ''
    }
  },
  proposedPlan: {
    objective: 'Saving and Risk Cover',
    isIndividualLife: 'Individual life',
    planName: '',
    term: '',
    premiumTerm: '',
    sumProposed: '',
    premiumMode: '',
    backDatingRequired: 'No',
    backDating: '',
    riders: {
      newTermAssurance: false,
      criticalIllness: false,
      premiumWaiver: false,
      accidentBenefit: false
    },
    sssBadgeNo: '',
    settlementOptionMaturity: 'No',
    settlementPeriod: '5',
    settlementPercentage: '100',
    settlementMode: 'Yearly',
    deathBenefitInstalments: 'No',
    deathBenefitPeriod: '5',
    deathBenefitPercentage: '100',
    deathBenefitMode: 'Yearly',
    simultaneousProposals: 'No',
    simultaneousDetails: '',
    availPhysicalPolicy: 'Yes',
    eiaNumber: ''
  },
  declarations: {
    acceptedTerms: false,
    signatureName: '',
    witnessName: '',
    witnessAddress: ''
  }
};
