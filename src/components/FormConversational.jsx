import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Alert, AlertTitle, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Part1 from './steps/Part1';
import Part2 from './steps/Part2';
import Part3 from './steps/Part3';
import { stepsConfig } from '../stepsConfig';

const FormConversational = ({ formData, onNavigate }) => {
  const [data, setData] = useState(formData);
  const [activePart, setActivePart] = useState(1);
  const [activeStep, setActiveStep] = useState(1);
  const [errors, setErrors] = useState([]);
  const [saveStatus, setSaveStatus] = useState('Saved just now');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Highest completed step logic (to prevent skipping forward)
  const [highestPart, setHighestPart] = useState(1);
  const [highestStep, setHighestStep] = useState(1);

  useEffect(() => {
    setSaveStatus('Saving...');
    const timer = setTimeout(() => {
      localStorage.setItem('licProposalForm', JSON.stringify(data));
      setSaveStatus('Saved just now');
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  const updateData = (section, field, value) => {
    setData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const updateNestedData = (section, nested, field, value) => {
    setData(prev => ({
      ...prev,
      [section]: { ...prev[section], [nested]: { ...prev[section][nested], [field]: value } }
    }));
  };

  const handleNext = () => {
    window.scrollTo(0, 0);
    const totalStepsInPart = stepsConfig[activePart].substeps.length;
    
    if (activeStep < totalStepsInPart) {
      setActiveStep(curr => curr + 1);
      if (activePart === highestPart && activeStep >= highestStep) setHighestStep(curr => curr + 1);
    } else if (activePart < 3) {
      setActivePart(curr => curr + 1);
      setActiveStep(1);
      if (activePart >= highestPart) { setHighestPart(curr => curr + 1); setHighestStep(1); }
    } else {
      onNavigate(data, '#/review');
    }
  };

  const handleBack = () => {
    window.scrollTo(0, 0);
    if (activeStep > 1) {
      setActiveStep(curr => curr - 1);
    } else if (activePart > 1) {
      setActivePart(curr => curr - 1);
      setActiveStep(stepsConfig[activePart - 1].substeps.length);
    } else {
      window.location.hash = '#/overview';
    }
  };

  const handleNavClick = (partId, stepId) => {
    // Only allow clicking to past/completed steps or the current highest boundary
    if (partId < highestPart || (partId === highestPart && stepId <= highestStep)) {
      setActivePart(partId);
      setActiveStep(stepId);
      setMobileDrawerOpen(false);
      window.scrollTo(0, 0);
    }
  };

  const currentPartConfig = stepsConfig[activePart];
  const currentStepConfig = currentPartConfig.substeps.find(s => s.id === activeStep);

  const NavigationMenu = () => (
    <Box component="nav" sx={{ width: '100%' }}>
      {Object.entries(stepsConfig).map(([pId, config]) => {
        const partId = parseInt(pId);
        const isCurrentPart = partId === activePart;
        return (
          <Box key={partId} sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: isCurrentPart ? '#0f172a' : '#64748b', mb: 1, textTransform: 'uppercase' }}>
              Stage {partId}. {config.title}
            </Typography>
            {isCurrentPart && (
              <Box component="ol" sx={{ listStyle: 'none', p: 0, m: 0, borderLeft: '2px solid #e2e8f0', ml: 1 }}>
                {config.substeps.map(step => {
                  const isCurrentStep = step.id === activeStep;
                  const isCompleted = partId < highestPart || (partId === highestPart && step.id < highestStep);
                  const isClickable = isCompleted || isCurrentStep;

                  return (
                    <Box component="li" key={step.id} sx={{ position: 'relative', py: 1, pl: 3 }}>
                      <Box 
                        sx={{ 
                          position: 'absolute', left: '-6px', top: '50%', transform: 'translateY(-50%)',
                          width: '10px', height: '10px', borderRadius: '50%',
                          backgroundColor: isCurrentStep ? '#00529B' : (isCompleted ? '#16a34a' : '#e2e8f0'),
                          border: isCurrentStep ? '2px solid #fff' : 'none',
                          boxShadow: isCurrentStep ? '0 0 0 2px #00529B' : 'none'
                        }} 
                      />
                      <Typography 
                        onClick={() => isClickable && handleNavClick(partId, step.id)}
                        aria-current={isCurrentStep ? "step" : undefined}
                        sx={{ 
                          fontWeight: isCurrentStep ? 800 : 600, 
                          color: isCurrentStep ? '#00529B' : (isCompleted ? '#1e293b' : '#94a3b8'),
                          cursor: isClickable ? 'pointer' : 'default',
                          '&:hover': { color: isClickable ? '#00529B' : '#94a3b8' }
                        }}
                      >
                        {step.title}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, width: '100%', maxWidth: '880px', mx: 'auto', px: 3, display: 'flex', gap: { xs: 0, md: 6 } }}>
      
      {/* Desktop Sidebar */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, width: '280px', flexShrink: 0, py: 6 }}>
        <Typography variant="body2" sx={{ fontWeight: 800, mb: 4, color: '#0f172a' }}>Application progress</Typography>
        <NavigationMenu />
      </Box>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={mobileDrawerOpen} onClose={() => setMobileDrawerOpen(false)}>
        <Box sx={{ width: 300, p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 4 }}>Application progress</Typography>
          <NavigationMenu />
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, py: { xs: 4, md: 6 }, minWidth: 0 }}>
        
        {/* Mobile Progress Bar Header */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'space-between', mb: 3, pb: 2, borderBottom: '1px solid #e2e8f0' }}>
          <Box>
            <Typography variant="caption" sx={{ fontWeight: 800, color: '#00529B', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              STAGE {activePart} OF 4
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#0f172a' }}>
              {currentPartConfig.title}
            </Typography>
          </Box>
          <Button size="small" onClick={() => setMobileDrawerOpen(true)} startIcon={<MenuIcon />} sx={{ fontWeight: 700 }}>
            Progress
          </Button>
        </Box>

        {/* Page Headings */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#64748b', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            Stage {activePart} of 4 · {currentPartConfig.title}
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, mb: 1 }}>
            {activeStep} of {currentPartConfig.substeps.length} sections completed
          </Typography>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 900, color: '#0f172a' }}>
            {currentStepConfig.title}
          </Typography>
        </Box>

        {/* Dynamic Step Component */}
        <Box sx={{ mb: 6 }}>
          {activePart === 1 && <Part1 data={data} updateData={updateData} updateNestedData={updateNestedData} step={activeStep} />}
          {activePart === 2 && <Part2 data={data} updateData={updateData} updateNestedData={updateNestedData} step={activeStep} />}
          {activePart === 3 && <Part3 data={data} updateData={updateData} updateNestedData={updateNestedData} step={activeStep} />}
        </Box>

        {/* Navigation Actions */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              onClick={handleNext}
              sx={{ borderRadius: '8px', fontWeight: 800, px: 4, py: 1.5, backgroundColor: '#00529B', color: '#fff', '&:hover': { backgroundColor: '#003D73' }, textTransform: 'none' }}
            >
              {currentStepConfig.button}
            </Button>
          </Box>
          <Box>
            <Button 
              variant="text" 
              onClick={handleBack}
              sx={{ fontWeight: 700, color: '#475569', textTransform: 'none' }}
            >
              Back
            </Button>
          </Box>
        </Box>

        <Box sx={{ mt: 8, pt: 3, borderTop: '1px solid #e2e8f0' }}>
          <Typography 
            onClick={() => window.location.hash = '#/overview'} 
            sx={{ color: '#00529B', fontWeight: 700, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
          >
            Return to application overview
          </Typography>
        </Box>

      </Box>
    </Box>
  );
};

export default FormConversational;
