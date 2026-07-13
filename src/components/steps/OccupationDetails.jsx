import React from 'react';
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
  Box,
  Collapse
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const OccupationDetails = ({ formData, setFormData, errors }) => {
  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 4 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <WorkIcon color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
          <div>
            <Typography variant="h5" component="h2" gutterBottom sx={{ m: 0 }}>
              Section I: Occupation, Income & Disclosures
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Provide information about your educational qualification, occupation details, tax residency and general legal disclosures.
            </Typography>
          </div>
        </Box>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {/* Tax Residency & Financial Identifiers */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={1}>
              <RequestQuoteIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, m: 0 }}>
                Tax Residency & Identifiers
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Is your country of Tax Residency outside India?</FormLabel>
              <RadioGroup
                row
                value={formData.taxOccupation.taxResidencyOutsideIndia}
                onChange={(e) => handleNestedChange('taxOccupation', 'taxResidencyOutsideIndia', e.target.value)}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Are you an Income Tax Assessee?</FormLabel>
              <RadioGroup
                row
                value={formData.taxOccupation.incomeTaxAssessee}
                onChange={(e) => handleNestedChange('taxOccupation', 'incomeTaxAssessee', e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Conditional Tax Country and Tax ID */}
          <Grid item xs={12} style={{ padding: 0 }}>
            <Collapse in={formData.taxOccupation.taxResidencyOutsideIndia === 'Yes'}>
              <Grid container spacing={3} sx={{ pl: 3, pr: 3, pt: 1, pb: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Country of Tax Residency"
                    required={formData.taxOccupation.taxResidencyOutsideIndia === 'Yes'}
                    fullWidth
                    value={formData.taxOccupation.taxResidencyCountry}
                    onChange={(e) => handleNestedChange('taxOccupation', 'taxResidencyCountry', e.target.value)}
                    error={!!errors.taxResidencyCountry}
                    helperText={errors.taxResidencyCountry}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Tax Identification Number (TIN)"
                    required={formData.taxOccupation.taxResidencyOutsideIndia === 'Yes'}
                    fullWidth
                    value={formData.taxOccupation.taxIdNumber}
                    onChange={(e) => handleNestedChange('taxOccupation', 'taxIdNumber', e.target.value)}
                    error={!!errors.taxIdNumber}
                    helperText={errors.taxIdNumber}
                  />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Permanent Account Number (PAN)"
              fullWidth
              value={formData.taxOccupation.pan}
              onChange={(e) => handleNestedChange('taxOccupation', 'pan', e.target.value.toUpperCase())}
              error={!!errors.pan}
              helperText={errors.pan || "Format: ABCDE1234F"}
              inputProps={{ maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GSTIN (If Registered under GST, Optional)"
              fullWidth
              value={formData.taxOccupation.gstin}
              onChange={(e) => handleNestedChange('taxOccupation', 'gstin', e.target.value.toUpperCase())}
              placeholder="15-character GSTIN"
              inputProps={{ maxLength: 15 }}
            />
          </Grid>

          {/* Educational & Occupation Details */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }} gutterBottom>
              Educational & Occupation Details
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Educational Qualification"
              required
              fullWidth
              value={formData.taxOccupation.educationalQualification}
              onChange={(e) => handleNestedChange('taxOccupation', 'educationalQualification', e.target.value)}
              error={!!errors.educationalQualification}
              helperText={errors.educationalQualification || "E.g., Graduate, Postgraduate, Secondary"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Present Occupation / Source of Income"
              required
              fullWidth
              value={formData.taxOccupation.presentOccupation}
              onChange={(e) => handleNestedChange('taxOccupation', 'presentOccupation', e.target.value)}
              error={!!errors.presentOccupation}
              helperText={errors.presentOccupation || "E.g., Salaried, Business Owner, Professional"}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name of Present Employer"
              fullWidth
              value={formData.taxOccupation.employerName}
              onChange={(e) => handleNestedChange('taxOccupation', 'employerName', e.target.value)}
              placeholder="Enter Company / Employer Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Exact Nature of Duties"
              fullWidth
              value={formData.taxOccupation.natureOfDuties}
              onChange={(e) => handleNestedChange('taxOccupation', 'natureOfDuties', e.target.value)}
              placeholder="Specify if engaged in Police, Aviation, Mining etc."
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Length of Service (Years)"
              fullWidth
              value={formData.taxOccupation.lengthOfService}
              onChange={(e) => handleNestedChange('taxOccupation', 'lengthOfService', e.target.value)}
              placeholder="E.g., 5"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Annual Income (Rs.)"
              required
              fullWidth
              value={formData.taxOccupation.annualIncome}
              onChange={(e) => handleNestedChange('taxOccupation', 'annualIncome', e.target.value)}
              error={!!errors.annualIncome}
              helperText={errors.annualIncome || "Enter numeric amount (Rs.)"}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Employed in Armed Forces?</FormLabel>
              <RadioGroup
                row
                value={formData.taxOccupation.armedForces}
                onChange={(e) => handleNestedChange('taxOccupation', 'armedForces', e.target.value)}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Legal and Hazard disclosures */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <WarningAmberIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, m: 0 }}>
                Safety & Legal Disclosures
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ mb: 1 }}>
                1. Is your occupation associated with any specific hazard or dangerous hobbies (e.g. pilot, diving, racing)?
              </FormLabel>
              <RadioGroup
                row
                value={formData.taxOccupation.hazardOccupation}
                onChange={(e) => handleNestedChange('taxOccupation', 'hazardOccupation', e.target.value)}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <Collapse in={formData.taxOccupation.hazardOccupation === 'Yes'}>
              <TextField
                label="Please describe the hazard/activity details"
                fullWidth
                multiline
                rows={2}
                value={formData.taxOccupation.hazardDetails}
                onChange={(e) => handleNestedChange('taxOccupation', 'hazardDetails', e.target.value)}
                sx={{ mt: 1.5 }}
              />
            </Collapse>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ mb: 1 }}>
                2. Have you ever been investigated, prosecuted, or convicted of criminal or civil offences?
              </FormLabel>
              <RadioGroup
                row
                value={formData.taxOccupation.investigatedOrConvicted}
                onChange={(e) => handleNestedChange('taxOccupation', 'investigatedOrConvicted', e.target.value)}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <Collapse in={formData.taxOccupation.investigatedOrConvicted === 'Yes'}>
              <TextField
                label="Please provide case numbers, court and charge details"
                fullWidth
                multiline
                rows={2}
                value={formData.taxOccupation.investigatedDetails}
                onChange={(e) => handleNestedChange('taxOccupation', 'investigatedDetails', e.target.value)}
                sx={{ mt: 1.5 }}
              />
            </Collapse>
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ mb: 1 }}>
                3. Are you a Politically Exposed Person (PEP) or close relative of a PEP? (As per RBI guidelines)
              </FormLabel>
              <RadioGroup
                row
                value={formData.taxOccupation.politicallyExposed}
                onChange={(e) => handleNestedChange('taxOccupation', 'politicallyExposed', e.target.value)}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OccupationDetails;
