import json

content = """import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, Paper, Grid, TextField, FormControl, FormLabel,
  RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel, Checkbox,
  FormHelperText, InputAdornment, IconButton, Collapse, Alert, CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';

import { initialFormState } from '../initialState';

const FormConversational = () => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('lic_conversational_draft_v2');
    return saved ? JSON.parse(saved) : initialFormState;
  });
  
  const [activeQ, setActiveQ] = useState(() => {
    const saved = localStorage.getItem('lic_active_question_v2');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('lic_conversational_draft_v2', JSON.stringify(formData));
    localStorage.setItem('lic_active_question_v2', activeQ.toString());
  }, [formData, activeQ]);

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [section]: { ...prev[section], [field]: value } };
      // Special logic for female proponent
      if (section === 'personalDetails' && field === 'gender') {
        updated.personalDetails.isFemale = value === 'Female';
      }
      return updated;
    });
  };

  const handleAddressChange = (addressType, field, value) => {
    setFormData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [addressType]: { ...prev.personalDetails[addressType], [field]: value }
      }
    }));
  };

  const handleDeepChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: { ...prev[section][subsection], [field]: value }
      }
    }));
  };

  const validateQuestion = (index) => {
    const err = {};
    return err;
  };

  const handleContinue = () => {
    const errs = validateQuestion(activeQ);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    if (activeQ === logicalToActual.length - 1) {
      handleSubmit();
    } else {
      setActiveQ(prev => prev + 1);
    }
  };

  const handleJumpTo = (index) => {
    setErrors({});
    setActiveQ(index);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      localStorage.removeItem('lic_conversational_draft_v2');
      localStorage.removeItem('lic_active_question_v2');
    }, 2000);
  };

  const questions = [
    // Section 1: About you
    {
      id: 'gender',
      title: 'What is your gender?',
      summary: () => `Gender: ${formData.personalDetails.gender}`,
      render: () => (
        <RadioGroup row value={formData.personalDetails.gender} onChange={(e) => handleNestedChange('personalDetails', 'gender', e.target.value)}>
          {['Male', 'Female', 'Transgender'].map(g => (
            <FormControlLabel key={g} value={g} control={<Radio />} label={g} />
          ))}
        </RadioGroup>
      )
    },
    {
      id: 'dob',
      title: "What's your date of birth?",
      summary: () => `DOB: ${formData.personalDetails.dob}`,
      render: () => (
        <TextField type="date" fullWidth value={formData.personalDetails.dob} onChange={(e) => handleNestedChange('personalDetails', 'dob', e.target.value)} InputLabelProps={{ shrink: true }} />
      )
    },
    {
      id: 'marital',
      title: 'Marital Status',
      summary: () => `Marital status: ${formData.personalDetails.maritalStatus}`,
      render: () => (
        <RadioGroup row value={formData.personalDetails.maritalStatus} onChange={(e) => handleNestedChange('personalDetails', 'maritalStatus', e.target.value)}>
          {['Single', 'Married', 'Divorced', 'Widowed'].map(m => (
            <FormControlLabel key={m} value={m} control={<Radio />} label={m} />
          ))}
        </RadioGroup>
      )
    },
    {
      id: 'name',
      title: 'What is your full name?',
      summary: () => `Name: ${formData.personalDetails.firstName} ${formData.personalDetails.lastName}`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}><TextField label="First Name" fullWidth value={formData.personalDetails.firstName} onChange={(e) => handleNestedChange('personalDetails', 'firstName', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField label="Middle Name" fullWidth value={formData.personalDetails.middleName} onChange={(e) => handleNestedChange('personalDetails', 'middleName', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField label="Last Name" fullWidth value={formData.personalDetails.lastName} onChange={(e) => handleNestedChange('personalDetails', 'lastName', e.target.value)} /></Grid>
        </Grid>
      )
    },
    {
      id: 'parents',
      title: 'Parents Name',
      summary: () => `Parents provided`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField label="Father's First Name" fullWidth value={formData.personalDetails.fatherFirstName} onChange={(e) => handleNestedChange('personalDetails', 'fatherFirstName', e.target.value)} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Mother's First Name" fullWidth value={formData.personalDetails.motherFirstName} onChange={(e) => handleNestedChange('personalDetails', 'motherFirstName', e.target.value)} /></Grid>
        </Grid>
      )
    },
    {
      id: 'identity',
      title: 'Identity & IDs (Customer ID, C KYC, ABHA, Aadhar/PAN)',
      summary: () => `ID provided`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}><TextField label="Customer ID" fullWidth value={formData.personalDetails.customerId} onChange={(e) => handleNestedChange('personalDetails', 'customerId', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField label="C KYC Number" fullWidth value={formData.personalDetails.ckycNumber} onChange={(e) => handleNestedChange('personalDetails', 'ckycNumber', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField label="ABHA Number" fullWidth value={formData.personalDetails.abhaNumber} onChange={(e) => handleNestedChange('personalDetails', 'abhaNumber', e.target.value)} /></Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>ID Type</InputLabel>
              <Select value={formData.personalDetails.idType} onChange={(e) => handleNestedChange('personalDetails', 'idType', e.target.value)}>
                <MenuItem value="Aadhar">Aadhar</MenuItem>
                <MenuItem value="Passport">Passport</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}><TextField label="ID Number (Last 4 for Aadhar)" fullWidth value={formData.personalDetails.idNumber} onChange={(e) => handleNestedChange('personalDetails', 'idNumber', e.target.value)} /></Grid>
        </Grid>
      )
    },
    {
      id: 'address',
      title: 'Permanent Address',
      summary: () => `Address provided`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12}><TextField label="House / Street" fullWidth value={formData.personalDetails.permanentAddress.houseNo} onChange={(e) => handleAddressChange('permanentAddress', 'houseNo', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField label="City" fullWidth value={formData.personalDetails.permanentAddress.city} onChange={(e) => handleAddressChange('permanentAddress', 'city', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField label="State" fullWidth value={formData.personalDetails.permanentAddress.state} onChange={(e) => handleAddressChange('permanentAddress', 'state', e.target.value)} /></Grid>
          <Grid item xs={12} sm={4}><TextField label="PIN" fullWidth value={formData.personalDetails.permanentAddress.pinCode} onChange={(e) => handleAddressChange('permanentAddress', 'pinCode', e.target.value)} /></Grid>
        </Grid>
      )
    },
    {
      id: 'contact',
      title: 'Contact Details',
      summary: () => `${formData.personalDetails.mobileNumber}`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField label="Mobile Number" fullWidth value={formData.personalDetails.mobileNumber} onChange={(e) => handleNestedChange('personalDetails', 'mobileNumber', e.target.value)} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Email" fullWidth value={formData.personalDetails.emailId} onChange={(e) => handleNestedChange('personalDetails', 'emailId', e.target.value)} /></Grid>
        </Grid>
      )
    },

    // Section 2: Your lifestyle
    {
      id: 'tax_occ',
      title: 'Tax & Occupation (GST, Income Tax Assessee, Duties)',
      summary: () => `${formData.taxOccupation.presentOccupation}`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField label="Occupation" fullWidth value={formData.taxOccupation.presentOccupation} onChange={(e) => handleNestedChange('taxOccupation', 'presentOccupation', e.target.value)} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Annual Income" fullWidth value={formData.taxOccupation.annualIncome} onChange={(e) => handleNestedChange('taxOccupation', 'annualIncome', e.target.value)} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="GSTIN" fullWidth value={formData.taxOccupation.gstin} onChange={(e) => handleNestedChange('taxOccupation', 'gstin', e.target.value)} /></Grid>
          <Grid item xs={12} sm={6}>
            <FormControlLabel control={<Checkbox checked={formData.taxOccupation.isIncomeTaxAssessee === 'Yes'} onChange={e => handleNestedChange('taxOccupation', 'isIncomeTaxAssessee', e.target.checked ? 'Yes' : 'No')} />} label="Income Tax Assessee" />
          </Grid>
          <Grid item xs={12} sm={6}><TextField label="Exact Nature of Duties" fullWidth value={formData.taxOccupation.exactNatureOfDuties} onChange={(e) => handleNestedChange('taxOccupation', 'exactNatureOfDuties', e.target.value)} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Length of Service" fullWidth value={formData.taxOccupation.lengthOfService} onChange={(e) => handleNestedChange('taxOccupation', 'lengthOfService', e.target.value)} /></Grid>
        </Grid>
      )
    },
    {
      id: 'others',
      title: 'Hazards & Legal (PEP, Criminal, Hazardous activities)',
      summary: () => `Declarations answered`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.lifestyleOthers.hazardousActivities === 'Yes'} onChange={e => handleNestedChange('lifestyleOthers', 'hazardousActivities', e.target.checked ? 'Yes' : 'No')} />} label="Involved in Hazardous Activities?" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.lifestyleOthers.criminalCharges === 'Yes'} onChange={e => handleNestedChange('lifestyleOthers', 'criminalCharges', e.target.checked ? 'Yes' : 'No')} />} label="Any Criminal Charges?" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.lifestyleOthers.isPEP === 'Yes'} onChange={e => handleNestedChange('lifestyleOthers', 'isPEP', e.target.checked ? 'Yes' : 'No')} />} label="Are you a Politically Exposed Person (PEP)?" />
          </Grid>
        </Grid>
      )
    },
    {
      id: 'health',
      title: 'Health Measurements',
      summary: () => `Height ${formData.healthHabits.height}cm, Weight ${formData.healthHabits.weight}kg`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={6}><TextField label="Height (cm)" fullWidth value={formData.healthHabits.height} onChange={(e) => handleNestedChange('healthHabits', 'height', e.target.value)} /></Grid>
          <Grid item xs={6}><TextField label="Weight (kg)" fullWidth value={formData.healthHabits.weight} onChange={(e) => handleNestedChange('healthHabits', 'weight', e.target.value)} /></Grid>
        </Grid>
      )
    },
    {
      id: 'habits',
      title: 'Personal Habits',
      summary: () => `Habits answered`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.healthHabits.habits.tobacco === 'Yes'} onChange={e => handleDeepChange('healthHabits', 'habits', 'tobacco', e.target.checked ? 'Yes' : 'No')} />} label="Do you consume Tobacco?" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.healthHabits.habits.alcohol === 'Yes'} onChange={e => handleDeepChange('healthHabits', 'habits', 'alcohol', e.target.checked ? 'Yes' : 'No')} />} label="Do you consume Alcohol?" />
          </Grid>
        </Grid>
      )
    },
    {
      id: 'family',
      title: 'Family History',
      summary: () => `Family history provided`,
      render: () => (
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell>Living/Dead</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Health / Cause of Death</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.healthHabits.familyHistory.map((row, idx) => (
                <TableRow key={idx}>
                  <TableCell>{row.member}</TableCell>
                  <TableCell>
                    <Select size="small" value={row.living} onChange={e => {
                      const newFH = [...formData.healthHabits.familyHistory];
                      newFH[idx].living = e.target.value;
                      handleNestedChange('healthHabits', 'familyHistory', newFH);
                    }}>
                      <MenuItem value="Yes">Living</MenuItem>
                      <MenuItem value="No">Dead</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell><TextField size="small" value={row.age} onChange={e => {
                      const newFH = [...formData.healthHabits.familyHistory];
                      newFH[idx].age = e.target.value;
                      handleNestedChange('healthHabits', 'familyHistory', newFH);
                    }} /></TableCell>
                  <TableCell><TextField size="small" value={row.healthState} onChange={e => {
                      const newFH = [...formData.healthHabits.familyHistory];
                      newFH[idx].healthState = e.target.value;
                      handleNestedChange('healthHabits', 'familyHistory', newFH);
                    }} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )
    },
    ...(formData.personalDetails.isFemale ? [{
      id: 'female',
      title: 'Female Proponent Details',
      summary: () => `Female details provided`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.personalDetails.femaleDetails.isPregnant === 'Yes'} onChange={e => handleDeepChange('personalDetails', 'femaleDetails', 'isPregnant', e.target.checked ? 'Yes' : 'No')} />} label="Are you pregnant now?" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField type="date" label="Date of Last Delivery" fullWidth InputLabelProps={{shrink: true}} value={formData.personalDetails.femaleDetails.lastDeliveryDate} onChange={(e) => handleDeepChange('personalDetails', 'femaleDetails', 'lastDeliveryDate', e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Husband's Name" fullWidth value={formData.personalDetails.femaleDetails.husbandName} onChange={(e) => handleDeepChange('personalDetails', 'femaleDetails', 'husbandName', e.target.value)} />
          </Grid>
        </Grid>
      )
    }] : []),

    // Section 3: Your plan
    {
      id: 'existing',
      title: 'Existing Insurance Policies',
      summary: () => `${formData.existingInsurance.policies.length} previous policies`,
      render: () => {
        const policies = formData.existingInsurance.policies;
        return (
          <Box>
            {policies.map((p, idx) => (
              <Box key={idx} sx={{ p: 2, mb: 2, border: '1px solid #e2e8f0', borderRadius: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}><TextField size="small" label="Policy No" value={p.policyNo} onChange={e => {
                    const newP = [...policies]; newP[idx].policyNo = e.target.value; handleNestedChange('existingInsurance', 'policies', newP);
                  }} fullWidth/></Grid>
                  <Grid item xs={12} sm={4}><TextField size="small" label="Insurer" value={p.insurer} onChange={e => {
                    const newP = [...policies]; newP[idx].insurer = e.target.value; handleNestedChange('existingInsurance', 'policies', newP);
                  }} fullWidth/></Grid>
                  <Grid item xs={12} sm={4}><TextField size="small" label="Sum Assured" value={p.sumAssured} onChange={e => {
                    const newP = [...policies]; newP[idx].sumAssured = e.target.value; handleNestedChange('existingInsurance', 'policies', newP);
                  }} fullWidth/></Grid>
                </Grid>
              </Box>
            ))}
            <Button variant="outlined" onClick={() => handleNestedChange('existingInsurance', 'policies', [...policies, {policyNo: '', insurer: '', sumAssured: ''}])}>Add Policy</Button>
          </Box>
        );
      }
    },
    {
      id: 'nominees',
      title: 'Nominee Details',
      summary: () => `Nominees configured`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12}><TextField label="Nominee Name" fullWidth value={formData.existingInsurance.nominees[0].name} onChange={(e) => {
            const newN = [...formData.existingInsurance.nominees]; newN[0].name = e.target.value; handleNestedChange('existingInsurance', 'nominees', newN);
          }} /></Grid>
        </Grid>
      )
    },
    {
      id: 'plan_opts',
      title: 'Plan & Settlement Options',
      summary: () => `Plan configured`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}><TextField label="Plan Name" fullWidth value={formData.proposedPlan.planName} onChange={(e) => handleNestedChange('proposedPlan', 'planName', e.target.value)} /></Grid>
          <Grid item xs={12} sm={6}><TextField label="Sum Proposed" fullWidth value={formData.proposedPlan.sumProposed} onChange={(e) => handleNestedChange('proposedPlan', 'sumProposed', e.target.value)} /></Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.proposedPlan.settlementOptionMaturity === 'Yes'} onChange={e => handleNestedChange('proposedPlan', 'settlementOptionMaturity', e.target.checked ? 'Yes' : 'No')} />} label="Avail Settlement Option for Maturity Benefit?" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.proposedPlan.deathBenefitInstalments === 'Yes'} onChange={e => handleNestedChange('proposedPlan', 'deathBenefitInstalments', e.target.checked ? 'Yes' : 'No')} />} label="Take Death Benefit in Instalments?" />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.proposedPlan.simultaneousProposals === 'Yes'} onChange={e => handleNestedChange('proposedPlan', 'simultaneousProposals', e.target.checked ? 'Yes' : 'No')} />} label="Any Simultaneous Proposals on family?" />
          </Grid>
        </Grid>
      )
    },
    {
      id: 'declarations',
      title: 'Declarations & Signature',
      summary: () => `Declarations accepted`,
      render: () => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControlLabel control={<Checkbox checked={formData.declarations.acceptedTerms} onChange={e => handleNestedChange('declarations', 'acceptedTerms', e.target.checked)} />} label="I accept all terms and conditions." />
          </Grid>
        </Grid>
      )
    }
  ];

  const logicalToActual = questions.map((_, i) => i);
  
  const getSectionForStep = (step) => {
    const qId = questions[step]?.id;
    const s1 = ['gender', 'dob', 'marital', 'name', 'parents', 'identity', 'address', 'contact'];
    const s2 = ['tax_occ', 'others', 'health', 'habits', 'family', 'female'];
    if (s1.includes(qId)) return 0;
    if (s2.includes(qId)) return 1;
    return 2; 
  };

  const activeSection = getSectionForStep(activeQ);
  const activeQuestionItem = questions[activeQ];
  const sectionLabels = ['About you', 'Your lifestyle', 'Your plan'];

  if (submitted) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h4" gutterBottom>Proposal Submitted</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Box sx={{ flexGrow: 1, py: { xs: 4, md: 8 }, display: 'flex' }}>
        <Grid container spacing={4} sx={{ width: '100%', maxWidth: '1000px', mx: 'auto' }}>
          
          <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box sx={{ position: 'sticky', top: 100 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {sectionLabels.map((label, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <Box sx={{ 
                      width: 28, height: 28, borderRadius: '50%', 
                      backgroundColor: activeSection === idx ? '#10b981' : (activeSection > idx ? '#cbd5e1' : '#f1f5f9'),
                      color: activeSection === idx ? '#fff' : '#94a3b8',
                      display: 'flex', justifyContent: 'center', alignItems: 'center',
                      fontSize: '0.85rem', fontWeight: 700, zIndex: 2
                    }}>
                      {idx + 1}
                    </Box>
                    <Typography sx={{ ml: 2, fontWeight: activeSection === idx ? 800 : 600, color: activeSection === idx ? '#0f172a' : '#94a3b8', fontSize: '0.95rem' }}>
                      {label}
                    </Typography>
                    {activeSection === idx && (
                      <Box sx={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', width: 2, height: 32, backgroundColor: '#10b981' }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper 
              elevation={0}
              sx={{ 
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                p: { xs: 3, md: 6 },
                border: '1px solid #f1f5f9',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                minHeight: '400px'
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 4 }}>
                {sectionLabels[activeSection]}
              </Typography>

              <Box sx={{ mb: 3 }}>
                {logicalToActual.slice(0, activeQ).map((stepIdx) => {
                  if (getSectionForStep(stepIdx) !== activeSection) return null;
                  const q = questions[stepIdx];
                  const summaryParts = q.summary().split(': ');
                  const label = summaryParts[0];
                  const value = summaryParts.slice(1).join(': ');
                  
                  return (
                    <Box 
                      key={q.id} 
                      sx={{ 
                        borderBottom: '1px solid #f8fafc', 
                        py: 2.5, 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        '&:hover .change-btn': { opacity: 1 }
                      }}
                    >
                      <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, flex: 1 }}>
                        {label || q.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1, justifyContent: 'flex-end' }}>
                        <Typography variant="body2" sx={{ fontWeight: 800, color: '#0f172a', textAlign: 'right' }}>
                          {value || q.summary()}
                        </Typography>
                        <Button 
                          className="change-btn"
                          size="small" 
                          onClick={() => handleJumpTo(stepIdx)}
                          sx={{ opacity: 0, transition: 'opacity 0.2s', color: 'primary.main', minWidth: 'auto', p: 0.5 }}
                        >
                          <EditIcon sx={{ fontSize: 16 }} />
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {activeQuestionItem && (
                <Box sx={{ pt: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 3, color: '#0f172a' }}>
                    {activeQuestionItem.title}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {activeQuestionItem.render()}
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Box 
        sx={{ 
          position: 'sticky', 
          bottom: 0, 
          width: '100%', 
          backgroundColor: '#ffffff', 
          borderTop: '1px solid #e2e8f0',
          py: 2.5,
          zIndex: 100,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.02)'
        }}
      >
        <Box sx={{ maxWidth: '1000px', mx: 'auto', display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            onClick={handleContinue}
            disabled={isSubmitting}
            sx={{ 
              minWidth: 200, 
              borderRadius: '8px', 
              backgroundColor: '#0f172a', 
              color: '#fff',
              py: 1.2,
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#1e293b' }
            }}
          >
            {isSubmitting ? (
              <CircularProgress size={24} color="inherit" />
            ) : activeQ === logicalToActual.length - 1 ? (
              'Submit'
            ) : (
              'Continue'
            )}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FormConversational;
"""

with open('src/components/FormConversational.jsx', 'w') as f:
    f.write(content)
