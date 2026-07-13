export const stepsConfig = {
  1: {
    title: 'About you',
    substeps: [
      { id: 1, title: 'Personal details', button: 'Continue to contact details' },
      { id: 2, title: 'Contact details', button: 'Continue to address and residency' },
      { id: 3, title: 'Address and residency', button: 'Continue to nominee' },
      { id: 4, title: 'Nominee', button: 'Continue to health and lifestyle' }
    ]
  },
  2: {
    title: 'Health and lifestyle',
    substeps: [
      { id: 1, title: 'Height, weight and general health', button: 'Continue to medical conditions' },
      { id: 2, title: 'Medical conditions', button: 'Continue to condition details' },
      { id: 3, title: 'Details about selected conditions', button: 'Continue to tobacco and nicotine' },
      { id: 4, title: 'Tobacco and nicotine', button: 'Continue to alcohol and substances' },
      { id: 5, title: 'Alcohol and other substances', button: 'Continue to family history' },
      { id: 6, title: 'Family medical history', button: 'Continue to your plan' }
    ]
  },
  3: {
    title: 'Your plan',
    substeps: [
      { id: 1, title: 'Plan details and riders', button: 'Continue to settlement options' },
      { id: 2, title: 'Settlement options', button: 'Review your answers' }
    ]
  }
};
