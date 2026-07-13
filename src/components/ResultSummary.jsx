import React from 'react';
import { Box, Typography, Paper, Grid, Divider, Button, Container } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrintIcon from '@mui/icons-material/Print';

const ResultSummary = ({ formData }) => {
  const { personalDetails, taxOccupation, lifestyleOthers, healthHabits, existingInsurance, proposedPlan } = formData;

  const renderSection = (title, data) => {
    // Only render section if it has at least one valid value
    if (!data.some(item => item.value)) return null;

    return (
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 2, pb: 1, borderBottom: '2px solid #e2e8f0' }}>
          {title}
        </Typography>
        <Grid container spacing={3}>
          {data.map((item, index) => (
            item.value && (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {item.label}
                </Typography>
                <Typography variant="body1" sx={{ color: '#1e293b', fontWeight: 600, mt: 0.5, wordBreak: 'break-word' }}>
                  {item.value}
                </Typography>
              </Grid>
            )
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 64, mb: 2 }} />
        <Typography variant="h4" sx={{ fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>
          Application Completed
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mt: 1 }}>
          Here is a summary of the information you provided.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', mb: 4 }}>
        {renderSection('Personal Details', [
          { label: 'Name', value: `${personalDetails.prefix} ${personalDetails.firstName} ${personalDetails.lastName}`.trim() },
          { label: 'Gender', value: personalDetails.gender },
          { label: 'Date of Birth', value: personalDetails.dob },
          { label: 'Marital Status', value: personalDetails.maritalStatus },
          { label: 'Mobile', value: personalDetails.mobileNumber },
          { label: 'Email', value: personalDetails.emailId },
          { label: 'Customer ID', value: personalDetails.customerId },
          { label: 'ID Number', value: personalDetails.idNumber },
        ])}

        {renderSection('Address', [
          { label: 'House/Street', value: personalDetails.permanentAddress.houseNo },
          { label: 'City', value: personalDetails.permanentAddress.city },
          { label: 'State', value: personalDetails.permanentAddress.state },
          { label: 'PIN', value: personalDetails.permanentAddress.pinCode },
        ])}

        {renderSection('Occupation & Tax', [
          { label: 'Occupation', value: taxOccupation.presentOccupation },
          { label: 'Annual Income', value: taxOccupation.annualIncome },
          { label: 'GSTIN', value: taxOccupation.gstin },
          { label: 'Income Tax Assessee', value: taxOccupation.isIncomeTaxAssessee },
        ])}

        {renderSection('Health & Habits', [
          { label: 'Height (cm)', value: healthHabits.height },
          { label: 'Weight (kg)', value: healthHabits.weight },
          { label: 'Tobacco', value: healthHabits.habits.tobacco },
          { label: 'Alcohol', value: healthHabits.habits.alcohol },
        ])}

        {renderSection('Proposed Plan', [
          { label: 'Plan Name', value: proposedPlan.planName },
          { label: 'Sum Proposed', value: proposedPlan.sumProposed },
          { label: 'Settlement Option', value: proposedPlan.settlementOptionMaturity },
        ])}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button 
          variant="outlined" 
          startIcon={<PrintIcon />} 
          onClick={() => window.print()}
          sx={{ borderRadius: '8px', fontWeight: 700, px: 4, py: 1.5, borderColor: '#cbd5e1', color: '#475569' }}
        >
          Print Summary
        </Button>
        <Button 
          variant="contained" 
          onClick={() => window.location.reload()}
          sx={{ borderRadius: '8px', fontWeight: 700, px: 4, py: 1.5, backgroundColor: '#00529B', color: '#fff', '&:hover': { backgroundColor: '#003D73' } }}
        >
          Start New Application
        </Button>
      </Box>
    </Container>
  );
};

export default ResultSummary;
