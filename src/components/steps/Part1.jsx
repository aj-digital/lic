import React from 'react';
import { Box, Typography, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Grid } from '@mui/material';
import AccessibleDateInput from '../shared/AccessibleDateInput';

const Part1 = ({ data, updateData, updateNestedData, step }) => {
  const { personalDetails, nomineeDetails } = data;

  const handlePersonal = (e) => updateData('personalDetails', e.target.name, e.target.value);
  const handleAddress = (e) => updateNestedData('personalDetails', 'permanentAddress', e.target.name, e.target.value);

  // Dynamic Appointee Check (Very basic DOB check for minor)
  const isMinor = (dob) => {
    if (!dob || !dob.year) return false;
    const age = new Date().getFullYear() - parseInt(dob.year);
    return age < 18;
  };
  const needsAppointee = isMinor(nomineeDetails.nominees[0].dob);

  if (step === 1) return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Name and identity</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="First name" name="firstName" value={personalDetails.firstName} onChange={handlePersonal} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Surname" name="lastName" value={personalDetails.lastName} onChange={handlePersonal} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="PAN Number (optional)" name="panNumber" value={personalDetails.panNumber} onChange={handlePersonal} />
        </Grid>
      </Grid>
    </Box>
  );

  if (step === 2) return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Date of birth</Typography>
      <AccessibleDateInput 
        label="Date of birth" 
        value={personalDetails.dob} 
        onChange={(val) => updateData('personalDetails', 'dob', val)} 
      />
    </Box>
  );

  if (step === 3) return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Gender & Marital Status</Typography>
      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 24px 0' }}>
        <legend style={{ padding: 0, marginBottom: '8px' }}><Typography sx={{ fontWeight: 700, color: '#0f172a' }}>Gender recorded on identity document</Typography></legend>
        <RadioGroup row name="gender" value={personalDetails.gender} onChange={handlePersonal}>
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Transgender" control={<Radio />} label="Transgender" />
        </RadioGroup>
      </fieldset>
      <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
        <legend style={{ padding: 0, marginBottom: '8px' }}><Typography sx={{ fontWeight: 700, color: '#0f172a' }}>Marital status</Typography></legend>
        <RadioGroup row name="maritalStatus" value={personalDetails.maritalStatus} onChange={handlePersonal}>
          <FormControlLabel value="Single" control={<Radio />} label="Single" />
          <FormControlLabel value="Married" control={<Radio />} label="Married" />
          <FormControlLabel value="Widowed" control={<Radio />} label="Widowed" />
          <FormControlLabel value="Divorced" control={<Radio />} label="Divorced" />
        </RadioGroup>
      </fieldset>
    </Box>
  );

  if (step === 4) return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Contact details</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Indian mobile number" name="mobileNumber" value={personalDetails.mobileNumber} onChange={handlePersonal} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth type="email" label="Email address" name="emailId" value={personalDetails.emailId} onChange={handlePersonal} />
        </Grid>
      </Grid>
    </Box>
  );

  if (step === 5) return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Permanent address</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField fullWidth label="House, flat or building" name="houseNo" value={personalDetails.permanentAddress.houseNo} onChange={handleAddress} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Street or locality" name="street" value={personalDetails.permanentAddress.street} onChange={handleAddress} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Village, town or city" name="city" value={personalDetails.permanentAddress.city} onChange={handleAddress} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="State or union territory" name="state" value={personalDetails.permanentAddress.state} onChange={handleAddress} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="PIN code" name="pinCode" value={personalDetails.permanentAddress.pinCode} onChange={handleAddress} />
        </Grid>
      </Grid>
    </Box>
  );

  if (step === 6) return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Nominee</Typography>
      <Typography variant="body2" sx={{ color: '#475569', mb: 3 }}>The person who will receive the policy benefits in the event of your death.</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <TextField fullWidth label="Nominee's full name" value={nomineeDetails.nominees[0].name} onChange={(e) => {
            const newNominees = [...nomineeDetails.nominees];
            newNominees[0].name = e.target.value;
            updateData('nomineeDetails', 'nominees', newNominees);
          }} />
        </Grid>
        <Grid item xs={12}>
          <AccessibleDateInput 
            label="Nominee's date of birth" 
            value={nomineeDetails.nominees[0].dob} 
            onChange={(val) => {
              const newNominees = [...nomineeDetails.nominees];
              newNominees[0].dob = val;
              updateData('nomineeDetails', 'nominees', newNominees);
            }} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="Relationship to you" value={nomineeDetails.nominees[0].relationship} onChange={(e) => {
            const newNominees = [...nomineeDetails.nominees];
            newNominees[0].relationship = e.target.value;
            updateData('nomineeDetails', 'nominees', newNominees);
          }} />
        </Grid>
      </Grid>

      {needsAppointee && (
        <Box sx={{ backgroundColor: '#f8fafc', p: 3, borderRadius: '8px', borderLeft: '4px solid #00529B', mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, color: '#00529B' }}>Appointee required</Typography>
          <Typography variant="body2" sx={{ mb: 3, color: '#475569' }}>Because the nominee is under 18, you must appoint an adult to receive the money on their behalf.</Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Appointee's full name" value={nomineeDetails.appointeeName} onChange={(e) => updateData('nomineeDetails', 'appointeeName', e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              <AccessibleDateInput 
                label="Appointee's date of birth" 
                value={nomineeDetails.appointeeDob} 
                onChange={(val) => updateData('nomineeDetails', 'appointeeDob', val)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Relationship to nominee" value={nomineeDetails.appointeeRelationship} onChange={(e) => updateData('nomineeDetails', 'appointeeRelationship', e.target.value)} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );

  return null;
};

export default Part1;
