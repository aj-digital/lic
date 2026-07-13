export const calculateAge = (dobString) => {
  if (!dobString) return '';
  const today = new Date();
  const birthDate = new Date(dobString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 0 ? age : 0;
};

export const validateEmail = (email) => {
  if (!email) return true;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePan = (pan) => {
  if (!pan) return true;
  const re = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return re.test(pan.toUpperCase());
};

export const validateMobile = (mobile) => {
  if (!mobile) return false;
  const re = /^[0-9]{10}$/;
  return re.test(mobile);
};

export const validateIfsc = (ifsc) => {
  if (!ifsc) return false;
  const re = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return re.test(ifsc.toUpperCase());
};

export const validateStep = (stepIndex, state) => {
  const errors = {};

  switch (stepIndex) {
    case 0: // Personal Details
      if (!state.personalDetails.firstName?.trim()) errors.firstName = 'First Name is required';
      if (!state.personalDetails.lastName?.trim()) errors.lastName = 'Last Name is required';
      
      const pDob = state.personalDetails.dob;
      if (!pDob) {
        errors.dob = 'Date of Birth is required';
      } else {
        const calculated = calculateAge(pDob);
        if (calculated < 18) {
          errors.dob = 'Life to be assured must be at least 18 years old (Not be accepted for minors)';
        }
      }

      if (!state.personalDetails.fatherFirstName?.trim()) errors.fatherFirstName = "Father's First Name is required";
      if (!state.personalDetails.fatherLastName?.trim()) errors.fatherLastName = "Father's Last Name is required";
      if (!state.personalDetails.motherFirstName?.trim()) errors.motherFirstName = "Mother's First Name is required";
      if (!state.personalDetails.motherLastName?.trim()) errors.motherLastName = "Mother's Last Name is required";

      // Permanent Address
      const perm = state.personalDetails.permanentAddress;
      if (!perm.houseNo?.trim()) errors.permHouseNo = 'House/Building is required';
      if (!perm.street?.trim()) errors.permStreet = 'Street name is required';
      if (!perm.city?.trim()) errors.permCity = 'City is required';
      if (!perm.state?.trim()) errors.permState = 'State is required';
      if (!perm.pinCode?.trim()) {
        errors.permPinCode = 'PIN Code is required';
      } else if (!/^[0-9]{6}$/.test(perm.pinCode)) {
        errors.permPinCode = 'PIN Code must be a 6-digit number';
      }

      // Correspondence Address if not same
      if (!state.personalDetails.correspondenceAddressSame) {
        const corr = state.personalDetails.correspondenceAddress;
        if (!corr.houseNo?.trim()) errors.corrHouseNo = 'House/Building is required';
        if (!corr.street?.trim()) errors.corrStreet = 'Street name is required';
        if (!corr.city?.trim()) errors.corrCity = 'City is required';
        if (!corr.state?.trim()) errors.corrState = 'State is required';
        if (!corr.pinCode?.trim()) {
          errors.corrPinCode = 'PIN Code is required';
        } else if (!/^[0-9]{6}$/.test(corr.pinCode)) {
          errors.corrPinCode = 'PIN Code must be a 6-digit number';
        }
      }

      // Contact Info
      if (!state.personalDetails.mobileNumber) {
        errors.mobileNumber = 'Mobile Number is required';
      } else if (!validateMobile(state.personalDetails.mobileNumber)) {
        errors.mobileNumber = 'Enter a valid 10-digit mobile number';
      }

      if (state.personalDetails.whatsappNumber && !validateMobile(state.personalDetails.whatsappNumber)) {
        errors.whatsappNumber = 'Enter a valid 10-digit WhatsApp number';
      }

      if (state.personalDetails.emailId && !validateEmail(state.personalDetails.emailId)) {
        errors.emailId = 'Enter a valid email address';
      }

      if (!state.personalDetails.ageProof) errors.ageProof = 'Age proof document selection is required';
      if (!state.personalDetails.idNumber?.trim()) errors.idNumber = 'Identity proof number is required';
      break;

    case 1: // Tax & Occupation Details
      if (!state.taxOccupation.educationalQualification) errors.educationalQualification = 'Educational qualification is required';
      if (!state.taxOccupation.presentOccupation) errors.presentOccupation = 'Present occupation is required';
      if (!state.taxOccupation.annualIncome) {
        errors.annualIncome = 'Annual income is required';
      } else if (isNaN(state.taxOccupation.annualIncome) || Number(state.taxOccupation.annualIncome) <= 0) {
        errors.annualIncome = 'Annual income must be a positive number';
      }

      if (state.taxOccupation.taxResidencyOutsideIndia === 'Yes') {
        if (!state.taxOccupation.taxResidencyCountry?.trim()) errors.taxResidencyCountry = 'Residency Country is required';
        if (!state.taxOccupation.taxIdNumber?.trim()) errors.taxIdNumber = 'Tax Identification Number is required';
      }

      if (state.taxOccupation.pan && !validatePan(state.taxOccupation.pan)) {
        errors.pan = 'Enter a valid 10-character PAN (e.g. ABCDE1234F)';
      }
      break;

    case 2: // Existing Insurance & Nominees
      // Nominees
      const nominees = state.existingInsurance.nominees;
      if (!nominees || nominees.length === 0) {
        errors.nominees = 'At least one nominee is required';
      } else {
        let totalShare = 0;
        const nomineeErrors = [];

        nominees.forEach((nom, index) => {
          const nomErr = {};
          if (!nom.name?.trim()) nomErr.name = 'Nominee Name is required';
          if (!nom.relationship?.trim()) nomErr.relationship = 'Relationship is required';
          if (!nom.share) {
            nomErr.share = 'Share % is required';
          } else {
            const shareNum = Number(nom.share);
            if (isNaN(shareNum) || shareNum <= 0 || shareNum > 100) {
              nomErr.share = 'Share must be 1-100%';
            } else {
              totalShare += shareNum;
            }
          }
          if (!nom.dob) {
            nomErr.dob = 'DOB is required';
          }

          if (Object.keys(nomErr).length > 0) {
            nomineeErrors[index] = nomErr;
          }
        });

        if (nomineeErrors.length > 0) {
          errors.nomineesList = nomineeErrors;
        }

        if (totalShare !== 100) {
          errors.totalShare = `Total share must equal 100% (currently ${totalShare}%)`;
        }

        // Check if any nominee is a minor (under 18)
        const hasMinorNominee = nominees.some(nom => nom.dob && calculateAge(nom.dob) < 18);
        if (hasMinorNominee) {
          const appointee = state.existingInsurance.appointee;
          if (!appointee.name?.trim()) errors.appointeeName = 'Appointee Name is required for minor nominee';
          if (!appointee.relationship?.trim()) errors.appointeeRelationship = 'Relationship to nominee is required';
          if (!appointee.dob) {
            errors.appointeeDob = 'Appointee DOB is required';
          } else if (calculateAge(appointee.dob) < 18) {
            errors.appointeeDob = 'Appointee must be an adult (18+)';
          }
        }
      }

      // Bank Details
      const bank = state.existingInsurance.bankDetails;
      if (!bank.accountNo?.trim()) errors.bankAccountNo = 'Bank Account Number is required';
      if (!bank.bankName?.trim()) errors.bankName = 'Bank Name is required';
      if (!bank.ifscCode) {
        errors.bankIfsc = 'IFSC Code is required';
      } else if (!validateIfsc(bank.ifscCode)) {
        errors.bankIfsc = 'Enter a valid IFSC code (e.g. SBIN0001234)';
      }
      break;

    case 3: // Plan Details
      if (!state.proposedPlan.planName?.trim()) errors.planName = 'Plan Name/No is required';
      if (!state.proposedPlan.term) {
        errors.term = 'Term (years) is required';
      } else if (isNaN(state.proposedPlan.term) || Number(state.proposedPlan.term) <= 0) {
        errors.term = 'Must be a positive number';
      }

      if (!state.proposedPlan.premiumTerm) {
        errors.premiumTerm = 'Premium Paying Term is required';
      } else if (isNaN(state.proposedPlan.premiumTerm) || Number(state.proposedPlan.premiumTerm) <= 0) {
        errors.premiumTerm = 'Must be a positive number';
      }

      if (!state.proposedPlan.sumProposed) {
        errors.sumProposed = 'Proposed Sum Assured is required';
      } else if (isNaN(state.proposedPlan.sumProposed) || Number(state.proposedPlan.sumProposed) <= 0) {
        errors.sumProposed = 'Must be a positive number';
      }

      if (state.proposedPlan.backDatingRequired === 'Yes' && !state.proposedPlan.backDating) {
        errors.backDating = 'Backdating date is required';
      }

      if (state.proposedPlan.maturityInstalments === 'Yes') {
        if (state.proposedPlan.maturityShare === 'Part' && !state.proposedPlan.maturityPercentage) {
          errors.maturityPercentage = 'Maturity installment percentage is required';
        }
      }

      if (state.proposedPlan.deathInstalments === 'Yes') {
        if (state.proposedPlan.deathShare === 'Part' && !state.proposedPlan.deathPercentage) {
          errors.deathPercentage = 'Death installment percentage is required';
        }
      }
      break;

    case 4: // Health & Habits
      if (!state.healthHabits.height) {
        errors.height = 'Height is required';
      } else if (isNaN(state.healthHabits.height) || Number(state.healthHabits.height) <= 0) {
        errors.height = 'Enter a valid height';
      }

      if (!state.healthHabits.weight) {
        errors.weight = 'Weight is required';
      } else if (isNaN(state.healthHabits.weight) || Number(state.healthHabits.weight) <= 0) {
        errors.weight = 'Enter a valid weight';
      }

      // Family History check
      if (!state.healthHabits.familyHistory.father.age && state.healthHabits.familyHistory.father.status === 'Living') {
        errors.fatherAge = 'Father age is required if living';
      }
      if (!state.healthHabits.familyHistory.mother.age && state.healthHabits.familyHistory.mother.status === 'Living') {
        errors.motherAge = 'Mother age is required if living';
      }

      // If female, check pregnancy details
      if (state.personalDetails.gender === 'Female') {
        if (state.healthHabits.femaleDetails.pregnant === 'Yes' && !state.healthHabits.femaleDetails.deliveryDate) {
          errors.deliveryDate = 'Expected Delivery Date is required';
        }
      }
      break;

    case 5: // Declarations
      if (!state.declarations.acceptedTerms) {
        errors.acceptedTerms = 'You must accept the declaration statements';
      }
      if (!state.declarations.signatureName?.trim()) {
        errors.signatureName = 'Proposer signature is required (type your full name)';
      }
      if (!state.declarations.witnessName?.trim()) {
        errors.witnessName = 'Witness Name is required';
      }
      if (!state.declarations.witnessAddress?.trim()) {
        errors.witnessAddress = 'Witness Address is required';
      }
      break;

    default:
      break;
  }

  return errors;
};
