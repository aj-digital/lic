import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  FormControlLabel,
  Checkbox,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

const Declarations = ({ formData, setFormData, errors }) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleDeclarationChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      declarations: {
        ...prev.declarations,
        [field]: value
      }
    }));
  };

  // Helper to format values for summary
  const renderValue = (value) => {
    if (value === undefined || value === null || value === '') return <span style={{ color: '#aaa', fontStyle: 'italic' }}>Not provided</span>;
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return value.toString();
  };

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 4 }}>
        {/* Header */}
        <Box display="flex" alignItems="center" mb={2}>
          <AssignmentTurnedInIcon color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
          <div>
            <Typography variant="h5" component="h2" gutterBottom sx={{ m: 0 }}>
              Section IV: Review & Declaration
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Review all entered proposal data, read the official declaration statements, and sign to submit.
            </Typography>
          </div>
        </Box>
        <Divider sx={{ mb: 4 }} />

        {/* SUMMARY REVIEW SECTION */}
        <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
          1. Review Proposal Form Summary
        </Typography>

        <Box mb={4}>
          {/* Step 2 Summary */}
          <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')} variant="outlined" sx={{ mt: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 600 }}>Personal Details</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Name, Address, DOB & Contact info</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" color="textSecondary">Proposer Full Name</Typography>
                  <Typography variant="body2">
                    {formData.personalDetails.prefix} {formData.personalDetails.firstName} {formData.personalDetails.middleName} {formData.personalDetails.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Gender / Marital Status</Typography>
                  <Typography variant="body2">
                    {formData.personalDetails.gender} / {formData.personalDetails.maritalStatus}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Date of Birth (Age)</Typography>
                  <Typography variant="body2">
                    {formData.personalDetails.dob} ({formData.personalDetails.age} Yrs)
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" color="textSecondary">Father's Name</Typography>
                  <Typography variant="body2">
                    {formData.personalDetails.fatherFirstName} {formData.personalDetails.fatherMiddleName} {formData.personalDetails.fatherLastName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant="caption" color="textSecondary">Mother's Name</Typography>
                  <Typography variant="body2">
                    {formData.personalDetails.motherFirstName} {formData.personalDetails.motherMiddleName} {formData.personalDetails.motherLastName}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Mobile / WhatsApp</Typography>
                  <Typography variant="body2">
                    {formData.personalDetails.mobileNumber} / {renderValue(formData.personalDetails.whatsappNumber)}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="textSecondary">Permanent Address</Typography>
                  <Typography variant="body2">
                    {formData.personalDetails.permanentAddress.houseNo}, {formData.personalDetails.permanentAddress.street},{' '}
                    {formData.personalDetails.permanentAddress.city}, {formData.personalDetails.permanentAddress.state},{' '}
                    {formData.personalDetails.permanentAddress.country} - {formData.personalDetails.permanentAddress.pinCode}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="textSecondary">Correspondence Address</Typography>
                  <Typography variant="body2">
                    {formData.personalDetails.correspondenceAddressSame
                      ? 'Same as Permanent Address'
                      : `${formData.personalDetails.correspondenceAddress.houseNo}, ${formData.personalDetails.correspondenceAddress.street}, ${formData.personalDetails.correspondenceAddress.city}, ${formData.personalDetails.correspondenceAddress.state}, ${formData.personalDetails.correspondenceAddress.country} - ${formData.personalDetails.correspondenceAddress.pinCode}`}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Step 3 Summary */}
          <Accordion expanded={expanded === 'panel3'} onChange={handleAccordionChange('panel3')} variant="outlined" sx={{ mt: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 600 }}>Occupation & Tax details</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Job, Income, PAN, Disclosures</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Educational Qualification</Typography>
                  <Typography variant="body2">{renderValue(formData.taxOccupation.educationalQualification)}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Present Occupation</Typography>
                  <Typography variant="body2">{renderValue(formData.taxOccupation.presentOccupation)}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Employer Name</Typography>
                  <Typography variant="body2">{renderValue(formData.taxOccupation.employerName)}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Annual Income (Rs.)</Typography>
                  <Typography variant="body2">Rs. {renderValue(formData.taxOccupation.annualIncome)}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">PAN</Typography>
                  <Typography variant="body2">{renderValue(formData.taxOccupation.pan)}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Armed Forces Employed?</Typography>
                  <Typography variant="body2">{formData.taxOccupation.armedForces}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary">Tax Residency Outside India?</Typography>
                  <Typography variant="body2">
                    {formData.taxOccupation.taxResidencyOutsideIndia === 'Yes'
                      ? `Yes (${formData.taxOccupation.taxResidencyCountry}, TIN: ${formData.taxOccupation.taxIdNumber})`
                      : 'No'}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Step 4 Summary */}
          <Accordion expanded={expanded === 'panel4'} onChange={handleAccordionChange('panel4')} variant="outlined" sx={{ mt: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 600 }}>Existing Insurance & Nominees</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Insurance count, Nominee list & Bank</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Nominees declared</Typography>
                  {formData.existingInsurance.nominees.map((nom, i) => (
                    <Typography key={i} variant="body2" sx={{ mb: 0.5 }}>
                      - {nom.name || 'Unnamed'} ({nom.relationship || 'No relation'}, Share: {nom.share}%, Age: {nom.age || '0'} Yrs)
                    </Typography>
                  ))}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Proposer Bank Account</Typography>
                  <Typography variant="body2">
                    {formData.existingInsurance.bankDetails.bankName} - A/C: {formData.existingInsurance.bankDetails.accountNo} (IFSC:{' '}
                    {formData.existingInsurance.bankDetails.ifscCode})
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Declared Previous Policies</Typography>
                  <Typography variant="body2">
                    {formData.existingInsurance.policies.length === 0
                      ? 'No existing policies declared'
                      : `${formData.existingInsurance.policies.length} policy/policies declared`}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Step 5 Summary */}
          <Accordion expanded={expanded === 'panel5'} onChange={handleAccordionChange('panel5')} variant="outlined" sx={{ mt: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 600 }}>Proposed Plan & Riders</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Plan No., Sum Assured, Riders list</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Plan Name / Term</Typography>
                  <Typography variant="body2">
                    {formData.proposedPlan.planName} (Term: {formData.proposedPlan.term} Yrs)
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Sum Assured</Typography>
                  <Typography variant="body2">Rs. {renderValue(formData.proposedPlan.sumProposed)}</Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Premium Payment Mode</Typography>
                  <Typography variant="body2">{formData.proposedPlan.premiumMode}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Opted Riders</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mt={0.5}>
                    {formData.proposedPlan.riders.newTermAssurance && (
                      <Alert severity="info" sx={{ py: 0, px: 1, fontSize: '0.8rem' }}>Term Assurance (Rs. {formData.proposedPlan.riders.newTermAssuranceSum})</Alert>
                    )}
                    {formData.proposedPlan.riders.criticalIllness && (
                      <Alert severity="info" sx={{ py: 0, px: 1, fontSize: '0.8rem' }}>Critical Illness ({formData.proposedPlan.riders.criticalIllnessOption}, Rs. {formData.proposedPlan.riders.criticalIllnessSum})</Alert>
                    )}
                    {formData.proposedPlan.riders.premiumWaiver && (
                      <Alert severity="info" sx={{ py: 0, px: 1, fontSize: '0.8rem' }}>Premium Waiver Benefit</Alert>
                    )}
                    {formData.proposedPlan.riders.accidentalDeathDisability && (
                      <Alert severity="info" sx={{ py: 0, px: 1, fontSize: '0.8rem' }}>Accident Death & Disability (Rs. {formData.proposedPlan.riders.accidentalDeathDisabilitySum})</Alert>
                    )}
                    {formData.proposedPlan.riders.accidentBenefit && (
                      <Alert severity="info" sx={{ py: 0, px: 1, fontSize: '0.8rem' }}>Accident Benefit (Rs. {formData.proposedPlan.riders.accidentBenefitSum})</Alert>
                    )}
                    {!formData.proposedPlan.riders.newTermAssurance &&
                     !formData.proposedPlan.riders.criticalIllness &&
                     !formData.proposedPlan.riders.premiumWaiver &&
                     !formData.proposedPlan.riders.accidentalDeathDisability &&
                     !formData.proposedPlan.riders.accidentBenefit && (
                       <Typography variant="body2" color="textSecondary">No riders opted</Typography>
                     )}
                  </Box>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>

          {/* Step 6 Summary */}
          <Accordion expanded={expanded === 'panel6'} onChange={handleAccordionChange('panel6')} variant="outlined" sx={{ mt: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ width: '33%', flexShrink: 0, fontWeight: 600 }}>Health & Habits</Typography>
              <Typography sx={{ color: 'text.secondary' }}>Height/Weight, Medical disclosures & Habits</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Height / Weight</Typography>
                  <Typography variant="body2">
                    {formData.healthHabits.height} cm / {formData.healthHabits.weight} kg
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Typography variant="caption" color="textSecondary">Medical Consultation / Hospitalization</Typography>
                  <Typography variant="body2">
                    Consult: {formData.healthHabits.consultedDoctor5Yrs} / Admit: {formData.healthHabits.admittedHospital}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600 }}>Habits Summary</Typography>
                  <Typography variant="body2">
                    Alcohol: {formData.healthHabits.habits.alcohol.active === 'Yes' ? `Yes (${formData.healthHabits.habits.alcohol.quantity})` : 'No'}, 
                    Tobacco: {formData.healthHabits.habits.tobacco.active === 'Yes' ? `Yes (${formData.healthHabits.habits.tobacco.quantity})` : 'No'}, 
                    Narcotics: {formData.healthHabits.habits.narcotics.active === 'Yes' ? `Yes (${formData.healthHabits.habits.narcotics.quantity})` : 'No'}
                  </Typography>
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* DECLARATION TEXT */}
        <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mb: 1 }}>
          2. Read LIC Declaration Statement
        </Typography>

        <Box
          sx={{
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            p: 3,
            maxHeight: '220px',
            overflowY: 'scroll',
            backgroundColor: '#fafafa',
            mb: 4,
            fontSize: '0.85rem',
            lineHeight: 1.6,
            color: 'text.secondary'
          }}
        >
          <Typography variant="body2" component="p" gutterBottom sx={{ fontWeight: 600, color: 'text.primary' }}>
            DECLARATION BY THE LIFE TO BE ASSURED
          </Typography>
          <p>
            I, the person whose life is herein being proposed to be assured, do hereby declare that the foregoing statements and
            answers have been given by me after fully understanding the questions and the same are true and complete in every
            particular and that I have not withheld any information and I do hereby agree and declare that these statements and this
            declaration shall be the basis of the contract of assurance between me and the Life Insurance Corporation of India and
            that if any untrue averment be contained therein the said contract shall be dealt with as per provisions of Section 45 of
            the Insurance Act, 1938 as amended from time to time.
          </p>
          <p>
            Not-withstanding the provision of any law, usage, custom or convention for the time being in force prohibiting any
            doctor, hospital, diagnostic center and/or employer, reinsurer/ credit bureau from divulging any knowledge or information
            about me concerning my health or employment, occupation, insurance, financial etc. on the grounds of privacy, I, my heirs,
            executors, administrators and assignees or any other person or persons, having interest of any kind whatsoever in the
            policy contract issued to me, hereby agree that such authority, having such knowledge or information, shall at any time be
            at liberty to divulge any such knowledge or information to the Corporation, and the Corporation to divulge the same to any
            Authorised Organisation / Institution / Agency / and Governmental / Regulatory Authority for the sole purpose of
            underwriting / investigation / risk mitigation / fraud control and/or claim settlement.
          </p>
          <p>
            And I further agree that if after the date of submission of the proposal but before the issue of First Premium Receipt (i)
            any change in my occupation or any adverse circumstances connected with my financial position or the general health of
            myself or that of any members of my family occurs or (ii) if a proposal for assurance or an application for revival of a
            policy on my life made to any office of the Corporation is withdrawn or dropped, deferred or accepted at an increased
            premium or on terms other than as proposed, I shall forthwith intimate the same to the Corporation in writing to reconsider
            the terms of acceptance of assurance. Any omission on my part to do so shall render this contract to be dealt with as per
            provisions of Section 45 of the Insurance Act, 1938 as amended from time to time.
          </p>
          <p>
            I am aware that if the information on my Tax Residency is found to be false or untrue or misleading or misrepresenting, I
            may be held liable for it. I also undertake to inform the Corporation of any change in my Tax Residency status.
          </p>
        </Box>

        {/* SIGNATURE FIELDS */}
        <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, mb: 2 }}>
          3. Proposer Signature & Witness Sign-Off
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.declarations.acceptedTerms}
                  onChange={(e) => handleDeclarationChange('acceptedTerms', e.target.checked)}
                  color="primary"
                  sx={{ mr: 1 }}
                />
              }
              label={
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  I confirm that I have read, understood and agree to the above LIC Declaration.
                </Typography>
              }
            />
            {errors.acceptedTerms && (
              <Alert severity="error" sx={{ py: 0.5, px: 1, mt: 1, fontSize: '0.8rem' }}>
                {errors.acceptedTerms}
              </Alert>
            )}
          </Grid>

          {/* Typed Signature */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Proposer Full Name (Digital Signature)"
              required
              fullWidth
              value={formData.declarations.signatureName}
              onChange={(e) => handleDeclarationChange('signatureName', e.target.value)}
              error={!!errors.signatureName}
              helperText={errors.signatureName}
              placeholder="Type your full name to sign"
            />
            {formData.declarations.signatureName && (
              <Box sx={{ mt: 1.5, p: 1.5, border: '1px dashed #ccc', borderRadius: '4px', textAlign: 'center', backgroundColor: '#fcfcfc' }}>
                <Typography variant="caption" color="textSecondary" display="block">Signature Preview:</Typography>
                <span style={{ fontFamily: '"Georgia", cursive, serif', fontSize: '1.8rem', fontStyle: 'italic', color: '#00529B' }}>
                  {formData.declarations.signatureName}
                </span>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Signature Date"
              type="date"
              fullWidth
              disabled
              value={formData.declarations.signatureDate}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Witness Details */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Witness Name"
              required
              fullWidth
              value={formData.declarations.witnessName}
              onChange={(e) => handleDeclarationChange('witnessName', e.target.value)}
              error={!!errors.witnessName}
              helperText={errors.witnessName}
              placeholder="Enter Witness's Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Witness Address & Occupation"
              required
              fullWidth
              value={formData.declarations.witnessAddress}
              onChange={(e) => handleDeclarationChange('witnessAddress', e.target.value)}
              error={!!errors.witnessAddress}
              helperText={errors.witnessAddress}
              placeholder="E.g., Bangalore, Software Engineer"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Declarations;
