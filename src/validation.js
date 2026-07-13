export const validatePAN = (pan) => {
  if (!pan) return true; // Let required validator handle empty
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan);
};

export const validateMobile = (mobile) => {
  if (!mobile) return true;
  const regex = /^[6-9]\d{9}$/;
  return regex.test(mobile);
};

export const validateIFSC = (ifsc) => {
  if (!ifsc) return true;
  const regex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  return regex.test(ifsc);
};

export const validatePIN = (pin) => {
  if (!pin) return true;
  const regex = /^[1-9][0-9]{5}$/;
  return regex.test(pin);
};

// Calculate age based on DOB
export const calculateAge = (dobString) => {
  if (!dobString) return null;
  const today = new Date();
  const birthDate = new Date(dobString);
  if (isNaN(birthDate)) return null;
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

// Validate that a diagnosis date is not in the future
export const validatePastDate = (dateString) => {
  if (!dateString) return true;
  const selectedDate = new Date(dateString);
  const today = new Date();
  return selectedDate <= today;
};

// Validate Nominee Share
export const validateNomineeTotal = (nominees) => {
  if (!nominees || nominees.length === 0) return true;
  const total = nominees.reduce((acc, curr) => acc + (parseFloat(curr.percentage) || 0), 0);
  return total === 100;
};
