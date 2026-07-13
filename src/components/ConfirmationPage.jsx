import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ConfirmationPage = ({ formData, onClear }) => {
  const proposalNumber = 'PRP-' + Math.floor(100000 + Math.random() * 900000);
  const date = new Date().toLocaleString('en-IN');

  return (
    <Box sx={{ width: '100%', maxWidth: '880px', mx: 'auto', px: 3, py: { xs: 6, md: 10 }, textAlign: 'center' }}>
      <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 3 }} />
      <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', mb: 2, letterSpacing: '-1px' }}>
        Application submitted
      </Typography>
      
      <Typography variant="subtitle1" sx={{ color: '#475569', fontSize: '1.2rem', mb: 4 }}>
        Your application for the <strong>{formData.proposedPlan.planName}</strong> has been received securely.
      </Typography>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', mb: 6, maxWidth: '500px', mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 600 }}>Proposal Number:</Typography>
          <Typography variant="body1" sx={{ color: '#0f172a', fontWeight: 800 }}>{proposalNumber}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1" sx={{ color: '#64748b', fontWeight: 600 }}>Date & Time:</Typography>
          <Typography variant="body1" sx={{ color: '#0f172a', fontWeight: 800 }}>{date}</Typography>
        </Box>
      </Paper>

      <Typography variant="h5" sx={{ fontWeight: 900, color: '#0f172a', mb: 3 }}>
        What happens next?
      </Typography>
      <Box sx={{ textAlign: 'left', maxWidth: '600px', mx: 'auto', mb: 6 }}>
        <Typography variant="body1" sx={{ color: '#475569', mb: 2 }}>
          1. We have sent a confirmation to <strong>{formData.personalDetails.emailId || 'your email'}</strong>.
        </Typography>
        <Typography variant="body1" sx={{ color: '#475569', mb: 2 }}>
          2. Based on your health and lifestyle answers, you <strong>may not</strong> require a medical examination. Our team will contact you within 2 working days if further tests are needed.
        </Typography>
        <Typography variant="body1" sx={{ color: '#475569', mb: 2 }}>
          3. Once approved, you will receive a payment link to complete the first premium.
        </Typography>
      </Box>

      <Button 
        variant="outlined" 
        size="large"
        onClick={onClear}
        sx={{ 
          color: '#00529B', 
          borderColor: '#cbd5e1',
          py: 1.5, 
          px: 4, 
          borderRadius: '8px',
          fontWeight: 800,
          textTransform: 'none',
          '&:hover': { borderColor: '#00529B', backgroundColor: 'rgba(0, 82, 155, 0.04)' }
        }}
      >
        Return to home
      </Button>
    </Box>
  );
};

export default ConfirmationPage;
