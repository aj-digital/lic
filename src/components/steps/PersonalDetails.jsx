import React, { useEffect } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  FormHelperText,
  Box
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import HomeIcon from '@mui/icons-material/Home';
import { calculateAge } from '../../validation';

const PersonalDetails = ({ formData, setFormData, errors }) => {
  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAddressChange = (addressType, field, value) => {
    setFormData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [addressType]: {
          ...prev.personalDetails[addressType],
          [field]: value
        }
      }
    }));
  };

  // Auto-calculate age when DOB changes
  useEffect(() => {
    if (formData.personalDetails.dob) {
      const calculatedAge = calculateAge(formData.personalDetails.dob);
      handleNestedChange('personalDetails', 'age', calculatedAge.toString());
    }
  }, [formData.personalDetails.dob]);

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <PersonIcon color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
          <div>
            <Typography variant="h5" component="h2" gutterBottom sx={{ m: 0 }}>
              Section I: Personal Details
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Enter the information of the Life to be Assured. All names should match official ID documents.
            </Typography>
          </div>
        </Box>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {/* Identity Numbers */}
          <Grid item xs={12} sm={4}>
            <TextField
              label="Customer ID (Optional)"
              fullWidth
              value={formData.personalDetails.customerId}
              onChange={(e) => handleNestedChange('personalDetails', 'customerId', e.target.value)}
              placeholder="Enter Customer ID"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="C KYC Number (Optional)"
              fullWidth
              value={formData.personalDetails.ckycNumber}
              onChange={(e) => handleNestedChange('personalDetails', 'ckycNumber', e.target.value)}
              placeholder="14-digit CKYC Number"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="ABHA Number (Optional)"
              fullWidth
              value={formData.personalDetails.abhaNumber}
              onChange={(e) => handleNestedChange('personalDetails', 'abhaNumber', e.target.value)}
              placeholder="E.g., 14-digit ABHA ID"
            />
          </Grid>

          {/* Full Name */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }} gutterBottom>
              Proposer's Full Name
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth>
              <InputLabel>Prefix</InputLabel>
              <Select
                value={formData.personalDetails.prefix}
                label="Prefix"
                onChange={(e) => handleNestedChange('personalDetails', 'prefix', e.target.value)}
              >
                <MenuItem value="Mr.">Mr.</MenuItem>
                <MenuItem value="Mrs.">Mrs.</MenuItem>
                <MenuItem value="Ms.">Ms.</MenuItem>
                <MenuItem value="Dr.">Dr.</MenuItem>
                <MenuItem value="Prof.">Prof.</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="First Name"
              required
              fullWidth
              value={formData.personalDetails.firstName}
              onChange={(e) => handleNestedChange('personalDetails', 'firstName', e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Middle Name"
              fullWidth
              value={formData.personalDetails.middleName}
              onChange={(e) => handleNestedChange('personalDetails', 'middleName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name"
              required
              fullWidth
              value={formData.personalDetails.lastName}
              onChange={(e) => handleNestedChange('personalDetails', 'lastName', e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>

          {/* Father's Full Name */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }} gutterBottom>
              Father's Full Name
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="First Name"
              required
              fullWidth
              value={formData.personalDetails.fatherFirstName}
              onChange={(e) => handleNestedChange('personalDetails', 'fatherFirstName', e.target.value)}
              error={!!errors.fatherFirstName}
              helperText={errors.fatherFirstName}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Middle Name"
              fullWidth
              value={formData.personalDetails.fatherMiddleName}
              onChange={(e) => handleNestedChange('personalDetails', 'fatherMiddleName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name"
              required
              fullWidth
              value={formData.personalDetails.fatherLastName}
              onChange={(e) => handleNestedChange('personalDetails', 'fatherLastName', e.target.value)}
              error={!!errors.fatherLastName}
              helperText={errors.fatherLastName}
            />
          </Grid>

          {/* Mother's Full Name */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }} gutterBottom>
              Mother's Full Name
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="First Name"
              required
              fullWidth
              value={formData.personalDetails.motherFirstName}
              onChange={(e) => handleNestedChange('personalDetails', 'motherFirstName', e.target.value)}
              error={!!errors.motherFirstName}
              helperText={errors.motherFirstName}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Middle Name"
              fullWidth
              value={formData.personalDetails.motherMiddleName}
              onChange={(e) => handleNestedChange('personalDetails', 'motherMiddleName', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Last Name"
              required
              fullWidth
              value={formData.personalDetails.motherLastName}
              onChange={(e) => handleNestedChange('personalDetails', 'motherLastName', e.target.value)}
              error={!!errors.motherLastName}
              helperText={errors.motherLastName}
            />
          </Grid>

          {/* Demographics */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }} gutterBottom>
              Demographics & Identity Verification
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                value={formData.personalDetails.gender}
                onChange={(e) => handleNestedChange('personalDetails', 'gender', e.target.value)}
              >
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Transgender" control={<Radio />} label="Transgender" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={7}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Marital Status</FormLabel>
              <RadioGroup
                row
                value={formData.personalDetails.maritalStatus}
                onChange={(e) => handleNestedChange('personalDetails', 'maritalStatus', e.target.value)}
              >
                <FormControlLabel value="Single" control={<Radio />} label="Single" />
                <FormControlLabel value="Married" control={<Radio />} label="Married" />
                <FormControlLabel value="Divorced" control={<Radio />} label="Divorced" />
                <FormControlLabel value="Widowed" control={<Radio />} label="Widowed" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              label="Date of Birth"
              type="date"
              required
              fullWidth
              value={formData.personalDetails.dob}
              onChange={(e) => handleNestedChange('personalDetails', 'dob', e.target.value)}
              InputLabelProps={{ shrink: true }}
              error={!!errors.dob}
              helperText={errors.dob || `Calculated Age: ${formData.personalDetails.age || '0'} Years`}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <FormControl fullWidth error={!!errors.ageProof}>
              <InputLabel>Age Proof Submitted</InputLabel>
              <Select
                value={formData.personalDetails.ageProof}
                label="Age Proof Submitted"
                onChange={(e) => handleNestedChange('personalDetails', 'ageProof', e.target.value)}
              >
                <MenuItem value="School Certificate">School Leaving Certificate</MenuItem>
                <MenuItem value="Birth Certificate">Birth Certificate</MenuItem>
                <MenuItem value="Passport">Passport</MenuItem>
                <MenuItem value="PAN Card">PAN Card</MenuItem>
                <MenuItem value="Aadhar Card">Aadhar Card (with full DOB)</MenuItem>
              </Select>
              {errors.ageProof && <FormHelperText>{errors.ageProof}</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Proof of Identity</InputLabel>
              <Select
                value={formData.personalDetails.idType}
                label="Proof of Identity"
                onChange={(e) => handleNestedChange('personalDetails', 'idType', e.target.value)}
              >
                <MenuItem value="Aadhar">Aadhar Card</MenuItem>
                <MenuItem value="Driving License">Driving License</MenuItem>
                <MenuItem value="Voter Id">Voter ID Card</MenuItem>
                <MenuItem value="Passport">Passport</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              label="ID Number"
              required
              fullWidth
              value={formData.personalDetails.idNumber}
              onChange={(e) => handleNestedChange('personalDetails', 'idNumber', e.target.value)}
              error={!!errors.idNumber}
              helperText={errors.idNumber || (formData.personalDetails.idType === 'Aadhar' ? "Only enter last 4 digits of Aadhar" : "Enter complete document number")}
            />
          </Grid>

          {/* Permanent Address */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <HomeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, m: 0 }}>
                Permanent Address (As per ID Proof)
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="House No. / Building Name / Street"
              required
              fullWidth
              value={formData.personalDetails.permanentAddress.houseNo}
              onChange={(e) => handleAddressChange('permanentAddress', 'houseNo', e.target.value)}
              error={!!errors.permHouseNo}
              helperText={errors.permHouseNo}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Town / Village / Taluka"
              fullWidth
              value={formData.personalDetails.permanentAddress.street}
              onChange={(e) => handleAddressChange('permanentAddress', 'street', e.target.value)}
              error={!!errors.permStreet}
              helperText={errors.permStreet}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="City / District"
              required
              fullWidth
              value={formData.personalDetails.permanentAddress.city}
              onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)}
              error={!!errors.permCity}
              helperText={errors.permCity}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="State"
              required
              fullWidth
              value={formData.personalDetails.permanentAddress.state}
              onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)}
              error={!!errors.permState}
              helperText={errors.permState}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Country"
              required
              fullWidth
              value={formData.personalDetails.permanentAddress.country}
              onChange={(e) => handleAddressChange('permanentAddress', 'country', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              label="PIN Code"
              required
              fullWidth
              value={formData.personalDetails.permanentAddress.pinCode}
              onChange={(e) => handleAddressChange('permanentAddress', 'pinCode', e.target.value)}
              error={!!errors.permPinCode}
              helperText={errors.permPinCode}
              inputProps={{ maxLength: 6 }}
            />
          </Grid>

          {/* Correspondence Address Toggle */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.personalDetails.correspondenceAddressSame}
                  onChange={(e) => handleNestedChange('personalDetails', 'correspondenceAddressSame', e.target.checked)}
                  color="primary"
                />
              }
              label="Correspondence / Current Address is same as Permanent Address"
            />
          </Grid>

          {/* Correspondence Address details (only shown if correspondenceAddressSame is false) */}
          {!formData.personalDetails.correspondenceAddressSame && (
            <>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" mb={1}>
                  <HomeIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, m: 0 }}>
                    Correspondence / Current Address
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="House No. / Building Name / Street"
                  required
                  fullWidth
                  value={formData.personalDetails.correspondenceAddress.houseNo}
                  onChange={(e) => handleAddressChange('correspondenceAddress', 'houseNo', e.target.value)}
                  error={!!errors.corrHouseNo}
                  helperText={errors.corrHouseNo}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Town / Village / Taluka"
                  fullWidth
                  value={formData.personalDetails.correspondenceAddress.street}
                  onChange={(e) => handleAddressChange('correspondenceAddress', 'street', e.target.value)}
                  error={!!errors.corrStreet}
                  helperText={errors.corrStreet}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="City / District"
                  required
                  fullWidth
                  value={formData.personalDetails.correspondenceAddress.city}
                  onChange={(e) => handleAddressChange('correspondenceAddress', 'city', e.target.value)}
                  error={!!errors.corrCity}
                  helperText={errors.corrCity}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="State"
                  required
                  fullWidth
                  value={formData.personalDetails.correspondenceAddress.state}
                  onChange={(e) => handleAddressChange('correspondenceAddress', 'state', e.target.value)}
                  error={!!errors.corrState}
                  helperText={errors.corrState}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Country"
                  required
                  fullWidth
                  value={formData.personalDetails.correspondenceAddress.country}
                  onChange={(e) => handleAddressChange('correspondenceAddress', 'country', e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  label="PIN Code"
                  required
                  fullWidth
                  value={formData.personalDetails.correspondenceAddress.pinCode}
                  onChange={(e) => handleAddressChange('correspondenceAddress', 'pinCode', e.target.value)}
                  error={!!errors.corrPinCode}
                  helperText={errors.corrPinCode}
                  inputProps={{ maxLength: 6 }}
                />
              </Grid>
            </>
          )}

          {/* Contact Details */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <ContactsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, m: 0 }}>
                Contact & Resident Details
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Mobile Number"
              required
              fullWidth
              value={formData.personalDetails.mobileNumber}
              onChange={(e) => handleNestedChange('personalDetails', 'mobileNumber', e.target.value)}
              error={!!errors.mobileNumber}
              helperText={errors.mobileNumber || "10-digit number"}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="WhatsApp Mobile No. (Optional)"
              fullWidth
              value={formData.personalDetails.whatsappNumber}
              onChange={(e) => handleNestedChange('personalDetails', 'whatsappNumber', e.target.value)}
              error={!!errors.whatsappNumber}
              helperText={errors.whatsappNumber || "10-digit number"}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email ID"
              fullWidth
              value={formData.personalDetails.emailId}
              onChange={(e) => handleNestedChange('personalDetails', 'emailId', e.target.value)}
              error={!!errors.emailId}
              helperText={errors.emailId || "E.g., name@example.com"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nationality"
              required
              fullWidth
              value={formData.personalDetails.nationality}
              onChange={(e) => handleNestedChange('personalDetails', 'nationality', e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Residential Status</InputLabel>
              <Select
                value={formData.personalDetails.residentialStatus}
                label="Residential Status"
                onChange={(e) => handleNestedChange('personalDetails', 'residentialStatus', e.target.value)}
              >
                <MenuItem value="Resident Indian">Resident Indian</MenuItem>
                <MenuItem value="Non Resident Indian">Non Resident Indian (NRI)*</MenuItem>
                <MenuItem value="Foreign National of Indian Origin">Foreign National of Indian Origin*</MenuItem>
              </Select>
              <FormHelperText>*NRI / Foreign National questionnaire will be required on approval.</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalDetails;
