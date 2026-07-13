import React from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const OverviewPage = ({ formData, onNavigate }) => {
  // Basic logic to determine if a stage is completed
  // In a real app, this would be highly robust based on validation rules
  const getStatus = (stage) => {
    if (stage === 1 && formData.personalDetails.firstName) return 'Completed';
    if (stage === 2 && formData.healthAndLifestyle.heightCm) return 'In progress';
    if (stage === 3 && formData.proposedPlan.sumProposed) return 'Not started';
    if (stage === 4) return 'Not started';
    return 'Not started';
  };

  const StatusIcon = ({ status }) => {
    if (status === 'Completed') return <CheckCircleIcon sx={{ color: '#16a34a' }} />;
    return <RadioButtonUncheckedIcon sx={{ color: '#94a3b8' }} />;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '880px', mx: 'auto', px: 3, py: { xs: 4, md: 8 } }}>
      <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', mb: 2, letterSpacing: '-1px' }}>
        Application overview
      </Typography>
      <Typography variant="subtitle1" sx={{ color: '#475569', fontSize: '1.1rem', mb: 4, maxWidth: '700px' }}>
        Review the stages of your application. You can save your progress and return at any time.
      </Typography>

      <Paper elevation={0} sx={{ p: 0, borderRadius: '12px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', mb: 4 }}>
        {[
          { num: 1, title: 'About you', status: getStatus(1) },
          { num: 2, title: 'Health and lifestyle', status: getStatus(2) },
          { num: 3, title: 'Your plan', status: getStatus(3) },
          { num: 4, title: 'Review and submit', status: getStatus(4) }
        ].map((stage, index) => (
          <React.Fragment key={stage.num}>
            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <StatusIcon status={stage.status} />
                <Box>
                  <Typography variant="subtitle2" sx={{ color: '#64748b', fontWeight: 700 }}>Stage {stage.num} of 4</Typography>
                  <Typography variant="h6" sx={{ color: '#0f172a', fontWeight: 800 }}>{stage.title}</Typography>
                </Box>
              </Box>
              <Typography variant="body2" sx={{ 
                fontWeight: 700, 
                color: stage.status === 'Completed' ? '#16a34a' : (stage.status === 'In progress' ? '#00529B' : '#64748b'),
                backgroundColor: stage.status === 'Completed' ? '#dcfce7' : (stage.status === 'In progress' ? '#e0f2fe' : '#f1f5f9'),
                px: 1.5, py: 0.5, borderRadius: '4px'
              }}>
                {stage.status}
              </Typography>
            </Box>
            {index < 3 && <Divider />}
          </React.Fragment>
        ))}
      </Paper>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant="contained" 
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={() => onNavigate(formData, '#/apply')}
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
          Continue application
        </Button>
      </Box>
    </Box>
  );
};

export default OverviewPage;
