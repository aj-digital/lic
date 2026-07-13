import React from 'react';
import { Box, Typography, Paper, Button, Divider, Checkbox, FormControlLabel } from '@mui/material';

const ReviewPage = ({ formData, onNavigate }) => {
  const [accepted, setAccepted] = React.useState(false);

  const handleNext = () => {
    if (accepted) {
      onNavigate(formData, '#/confirmation');
    }
  };

  const SummaryRow = ({ label, value }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid #f1f5f9' }}>
      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600 }}>{label}</Typography>
      <Typography variant="body2" sx={{ color: '#0f172a', fontWeight: 800, textAlign: 'right' }}>{value || '-'}</Typography>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', maxWidth: '880px', mx: 'auto', px: 3, py: { xs: 4, md: 6 } }}>
      <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', mb: 4, letterSpacing: '-1px' }}>
        Check your answers
      </Typography>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#00529B' }}>Personal Details</Typography>
          <Button size="small" sx={{ fontWeight: 700 }} onClick={() => onNavigate(formData, '#/apply')}>Change</Button>
        </Box>
        <SummaryRow label="Name" value={`${formData.personalDetails.firstName} ${formData.personalDetails.lastName}`} />
        <SummaryRow label="Date of birth" value={`${formData.personalDetails.dob?.day || ''}/${formData.personalDetails.dob?.month || ''}/${formData.personalDetails.dob?.year || ''}`} />
        <SummaryRow label="Gender" value={formData.personalDetails.gender} />
        <SummaryRow label="Mobile" value={formData.personalDetails.mobileNumber} />

        <Divider sx={{ my: 4 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#00529B' }}>Health and Lifestyle</Typography>
          <Button size="small" sx={{ fontWeight: 700 }} onClick={() => onNavigate(formData, '#/apply')}>Change</Button>
        </Box>
        <SummaryRow label="Tobacco use" value={formData.healthAndLifestyle.habits.tobacco} />
        <SummaryRow label="Medical conditions" value={formData.healthAndLifestyle.medicalHistory.selectedConditions.join(', ') || 'None'} />

        <Divider sx={{ my: 4 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#00529B' }}>Proposed Plan</Typography>
          <Button size="small" sx={{ fontWeight: 700 }} onClick={() => onNavigate(formData, '#/apply')}>Change</Button>
        </Box>
        <SummaryRow label="Plan Name" value={formData.proposedPlan.planName} />
        <SummaryRow label="Sum Proposed" value={`₹${formData.proposedPlan.sumProposed}`} />
        <SummaryRow label="Settlement" value={formData.proposedPlan.settlementMaturity} />
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', mb: 2 }}>
        Declaration
      </Typography>
      <Paper elevation={0} sx={{ p: 4, backgroundColor: '#f8fafc', borderLeft: '4px solid #00529B', mb: 4 }}>
        <Typography variant="body2" sx={{ color: '#475569', mb: 2 }}>
          I hereby declare that the statements and answers given by me are true and complete in every respect. I agree that this proposal and any other statements made by me will form the basis of the contract of insurance between me and the Life Insurance Corporation of India.
        </Typography>
        <FormControlLabel
          control={<Checkbox checked={accepted} onChange={(e) => setAccepted(e.target.checked)} color="primary" />}
          label={<Typography sx={{ fontWeight: 700, color: '#0f172a' }}>I agree to the declaration</Typography>}
        />
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          size="large"
          disabled={!accepted}
          onClick={handleNext}
          sx={{ 
            backgroundColor: '#00529B', 
            color: '#fff', 
            py: 1.5, 
            px: 4, 
            borderRadius: '8px',
            fontWeight: 800,
            textTransform: 'none',
            '&:hover': { backgroundColor: '#003D73' }
          }}
        >
          Submit application
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewPage;
