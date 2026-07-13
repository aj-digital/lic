import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Link
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import PrintIcon from '@mui/icons-material/Print';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

// Import Steps
import PersonalDetails from './steps/PersonalDetails';
import OccupationDetails from './steps/OccupationDetails';
import InsuranceNomineeDetails from './steps/InsuranceNomineeDetails';
import ProposedPlan from './steps/ProposedPlan';
import HealthHabits from './steps/HealthHabits';
import Declarations from './steps/Declarations';

// Import Validation and State
import { validateStep } from '../validation';
import { initialFormState } from '../initialState';

const steps = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'occupation', label: 'Occupation & Tax' },
  { id: 'nominees', label: 'Nominee & Bank' },
  { id: 'plan', label: 'Proposed Plan' },
  { id: 'health', label: 'Health & Habits' },
  { id: 'declarations', label: 'Declarations & Review' }
];

const FormStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [maxStepReached, setMaxStepReached] = useState(() => {
    const savedStep = localStorage.getItem('lic_max_step_reached');
    return savedStep ? parseInt(savedStep, 10) : 0;
  });
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('lic_proposal_draft');
    return saved ? JSON.parse(saved) : initialFormState;
  });
  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('lic_completed_steps');
    return saved ? JSON.parse(saved) : {};
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync draft data & max step to localStorage
  useEffect(() => {
    localStorage.setItem('lic_proposal_draft', JSON.stringify(formData));
    localStorage.setItem('lic_max_step_reached', maxStepReached.toString());
    localStorage.setItem('lic_completed_steps', JSON.stringify(completedSteps));
  }, [formData, maxStepReached, completedSteps]);

  const handleNext = () => {
    const stepErrors = validateStep(activeStep, formData);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setCompletedSteps(prev => ({ ...prev, [activeStep]: 'error' }));
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setCompletedSteps(prev => ({ ...prev, [activeStep]: 'success' }));
    setErrors({});
    
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      setMaxStepReached(prev => Math.max(prev, nextStep));
      window.scrollTo({ top: 150, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setErrors({});
    window.scrollTo({ top: 150, behavior: 'smooth' });
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear the form and start over?")) {
      setFormData(initialFormState);
      setActiveStep(0);
      setMaxStepReached(0);
      setErrors({});
      setCompletedSteps({});
      setSubmitted(false);
      localStorage.removeItem('lic_proposal_draft');
      localStorage.removeItem('lic_max_step_reached');
      localStorage.removeItem('lic_completed_steps');
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Mock API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      localStorage.removeItem('lic_proposal_draft');
      localStorage.removeItem('lic_max_step_reached');
      localStorage.removeItem('lic_completed_steps');
    }, 2000);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalDetails formData={formData} setFormData={setFormData} errors={errors} />;
      case 1:
        return <OccupationDetails formData={formData} setFormData={setFormData} errors={errors} />;
      case 2:
        return <InsuranceNomineeDetails formData={formData} setFormData={setFormData} errors={errors} />;
      case 3:
        return <ProposedPlan formData={formData} setFormData={setFormData} errors={errors} />;
      case 4:
        return <HealthHabits formData={formData} setFormData={setFormData} errors={errors} />;
      case 5:
        return <Declarations formData={formData} setFormData={setFormData} errors={errors} />;
      default:
        return 'Unknown step';
    }
  };

  if (submitted) {
    return (
      <Card variant="outlined" sx={{ py: 6, px: 4, textAlign: 'center', maxWidth: 800, mx: 'auto', mt: 4, border: '1px solid #e2e8f0', borderRadius: '24px', boxShadow: '0px 10px 45px rgba(0, 0, 0, 0.05)' }}>
        <CardContent>
          <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 3 }} />
          <Typography variant="h4" gutterBottom color="primary" sx={{ fontWeight: 800 }}>
            Proposal Submitted Successfully
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            Thank you, <strong>{formData.personalDetails.firstName} {formData.personalDetails.lastName}</strong>. 
            Your Digital Life Insurance Proposal has been successfully submitted. LIC will verify the details against the uploaded documents.
          </Typography>

          <Box sx={{ border: '1px solid #e2e8f0', p: 3, mb: 4, textAlign: 'left', maxWidth: 550, mx: 'auto', backgroundColor: '#f8fafc', borderRadius: '16px' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, borderBottom: '1px solid #e2e8f0', pb: 1, color: '#0f172a' }}>
              Proposal Reference Details
            </Typography>
            <Typography variant="body2" component="div" sx={{ lineHeight: 1.8, color: '#334155' }}>
              • <strong>Proposer Name:</strong> {formData.personalDetails.prefix} {formData.personalDetails.firstName} {formData.personalDetails.lastName}<br />
              • <strong>Plan Selected:</strong> {formData.proposedPlan.planName} (Term: {formData.proposedPlan.term} Years)<br />
              • <strong>Sum Assured Proposed:</strong> Rs. {formData.proposedPlan.sumProposed}<br />
              • <strong>Registered Mobile:</strong> +91 {formData.personalDetails.mobileNumber}<br />
              • <strong>Submission Reference ID:</strong> LIC-300-{(100000 + Math.random() * 900000).toFixed(0)}<br />
              • <strong>Timestamp:</strong> {new Date().toLocaleString('en-IN')}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<PrintIcon />}
              onClick={() => window.print()}
            >
              Print Proposal Form
            </Button>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<RestartAltIcon />}
              onClick={() => {
                setFormData(initialFormState);
                setActiveStep(0);
                setMaxStepReached(0);
                setCompletedSteps({});
                setSubmitted(false);
              }}
            >
              Submit New Proposal
            </Button>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Sleek Top Progress Bar Indicator (ACKO Inspired) */}
      <Box sx={{ mb: 4, mt: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1.5}>
          <Typography variant="body2" sx={{ fontWeight: 800, color: 'primary.main', textTransform: 'uppercase', letterSpacing: '0.75px', fontSize: '0.82rem' }}>
            Section {activeStep + 1}: {steps[activeStep].label}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.82rem' }}>
            Step {activeStep + 1} of {steps.length}
          </Typography>
        </Box>
        <Box sx={{ width: '100%', height: '5px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
          <Box 
            sx={{ 
              width: `${((activeStep + 1) / steps.length) * 100}%`, 
              height: '100%', 
              backgroundColor: 'primary.main', 
              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)' 
            }} 
          />
        </Box>
      </Box>

      {/* Modern Error Summary Warning Block */}
      {Object.keys(errors).length > 0 && (
        <Box 
          sx={{ 
            borderLeft: '4px solid #ef4444', 
            p: 2.5, 
            mb: 4, 
            backgroundColor: '#fef2f2',
            borderRadius: '12px',
            textAlign: 'left'
          }}
        >
          <Typography variant="subtitle2" color="#b91c1c" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center' }}>
            <ErrorIcon sx={{ mr: 1, fontSize: 20 }} /> Please fix the following errors to proceed:
          </Typography>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#b91c1c', fontSize: '0.88rem', lineHeight: 1.6 }}>
            {Object.entries(errors).map(([key, msg]) => {
              if (key === 'nomineesList') return null;
              return (
                <li key={key} style={{ fontWeight: 600, marginBottom: 4 }}>
                  <Link 
                    href={`#${key}`} 
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(key);
                      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                    style={{ color: '#b91c1c', textDecoration: 'underline' }}
                  >
                    {msg}
                  </Link>
                </li>
              );
            })}
            {errors.nomineesList && (
              <li style={{ fontWeight: 600, marginBottom: 4 }}>
                Nominee splits fail validation: Check nominee names and verify their share percentages split sum up to exactly 100%.
              </li>
            )}
          </ul>
        </Box>
      )}

      {/* Active Form Component Content */}
      <Box sx={{ mb: 5 }}>
        {getStepContent(activeStep)}
      </Box>

      {/* Action Buttons Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ pt: 2, borderTop: '1px solid #f1f5f9' }}>
        <Button
          variant="text"
          color="inherit"
          onClick={handleReset}
          disabled={activeStep === 0 && JSON.stringify(formData) === JSON.stringify(initialFormState)}
          startIcon={<RestartAltIcon />}
          sx={{ color: '#64748b', fontWeight: 600, borderRadius: '8px' }}
        >
          Reset Form
        </Button>

        <Box display="flex" gap={2}>
          {activeStep > 0 && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleBack}
              disabled={isSubmitting}
              sx={{ borderRadius: '30px' }}
            >
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={isSubmitting}
            sx={{ minWidth: 140, borderRadius: '30px' }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : activeStep === steps.length - 1 ? (
              'Submit Proposal'
            ) : (
              'Save & Next'
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormStepper;
