export const initialFormState = {
  personalDetails: {
    prefix: 'Mr',
    firstName: '',
    lastName: '',
    dob: { day: '', month: '', year: '' },
    gender: '',
    maritalStatus: '',
    nationality: 'Indian',
    residentialStatus: 'Resident Indian',
    emailId: '',
    mobileNumber: '',
    panNumber: '',
    aadhaarNumber: '',
    
    permanentAddress: {
      houseNo: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pinCode: '',
      country: 'India'
    },
    sameAsPermanent: true,
    currentAddress: {
      houseNo: '',
      street: '',
      city: '',
      district: '',
      state: '',
      pinCode: '',
      country: 'India'
    },
  },

  nomineeDetails: {
    nominees: [
      { name: '', percentage: '100', relationship: '', dob: { day: '', month: '', year: '' } }
    ],
    appointeeName: '',
    appointeeRelationship: '',
    appointeeDob: { day: '', month: '', year: '' }
  },

  healthAndLifestyle: {
    heightCm: '',
    weightKg: '',
    recentTreatment: 'No',
    
    medicalHistory: {
      selectedConditions: [], // e.g. ['Diabetes', 'Heart condition']
      conditionDetails: {} // Keyed by condition string
    },

    habits: {
      tobacco: 'I have never used them', // 'I currently use them', 'I previously used them'
      tobaccoProduct: '',
      tobaccoQuantity: '',
      tobaccoFrequency: '',
      tobaccoStart: '',
      tobaccoStop: '',
      
      alcohol: 'I have never used them',
      alcoholProduct: '',
      alcoholQuantity: '',
      alcoholFrequency: '',
      alcoholStart: '',
      alcoholStop: ''
    },
    familyHistory: []
  },

  proposedPlan: {
    planName: 'LIC New Endowment Plan (914)',
    sumProposed: '',
    settlementMaturity: 'Lump sum'
  }
};
