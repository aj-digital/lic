import React from 'react';
import { Box, Typography, TextField, FormControlLabel, RadioGroup, Radio, Checkbox, FormGroup, Grid } from '@mui/material';
import AccessibleDateInput from '../shared/AccessibleDateInput';

const medicalCategories = [
  'Heart or circulation conditions',
  'High or low blood pressure',
  'Diabetes, thyroid or hormonal conditions',
  'Lung or breathing conditions',
  'Digestive, liver or pancreatic conditions',
  'Kidney, prostate or urinary conditions',
  'Cancer, tumours or blood disorders',
  'Brain, neurological or mental-health conditions',
  'Bone, joint or physical disability conditions',
  'Eye, ear, nose or throat conditions',
  'HIV or another serious infectious condition',
  'Another condition',
  'None of these'
];

const Part2 = ({ data, updateData, updateNestedData, step }) => {
  const { healthAndLifestyle } = data;
  const { habits, medicalHistory } = healthAndLifestyle;

  if (step === 1) return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Height, weight and recent treatment</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Height (cm)" type="number" value={healthAndLifestyle.heightCm} onChange={(e) => updateData('healthAndLifestyle', 'heightCm', e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField fullWidth label="Weight (kg)" type="number" value={healthAndLifestyle.weightKg} onChange={(e) => updateData('healthAndLifestyle', 'weightKg', e.target.value)} />
        </Grid>
      </Grid>
    </Box>
  );

  if (step === 2) {
    const handleToggle = (cond) => {
      let newConds = [...medicalHistory.selectedConditions];
      if (cond === 'None of these') {
        newConds = ['None of these'];
      } else {
        newConds = newConds.filter(c => c !== 'None of these');
        if (newConds.includes(cond)) {
          newConds = newConds.filter(c => c !== cond);
        } else {
          newConds.push(cond);
        }
      }
      updateNestedData('healthAndLifestyle', 'medicalHistory', 'selectedConditions', newConds);
    };

    return (
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 1 }}>Medical conditions</Typography>
        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend style={{ padding: 0, marginBottom: '16px' }}>
            <Typography variant="body1" sx={{ color: '#475569' }}>Have you ever been diagnosed with, investigated for, or received treatment for any of these conditions?</Typography>
            <Typography variant="caption" sx={{ color: '#64748b' }}>Select all that apply.</Typography>
          </legend>
          <FormGroup>
            {medicalCategories.map(cond => (
              <FormControlLabel 
                key={cond}
                control={<Checkbox checked={medicalHistory.selectedConditions.includes(cond)} onChange={() => handleToggle(cond)} />}
                label={cond}
                sx={{ mb: 1 }}
              />
            ))}
          </FormGroup>
        </fieldset>
      </Box>
    );
  }

  if (step === 3) {
    const conditions = medicalHistory.selectedConditions.filter(c => c !== 'None of these');
    if (conditions.length === 0) {
      return (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Details about selected conditions</Typography>
          <Typography sx={{ color: '#64748b' }}>No conditions selected. Please continue.</Typography>
        </Box>
      );
    }

    const updateCondition = (cond, field, value) => {
      const details = { ...medicalHistory.conditionDetails };
      if (!details[cond]) details[cond] = {};
      details[cond][field] = value;
      updateNestedData('healthAndLifestyle', 'medicalHistory', 'conditionDetails', details);
    };

    return (
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Details about selected conditions</Typography>
        {conditions.map(cond => {
          const detail = medicalHistory.conditionDetails[cond] || {};
          return (
            <Box key={cond} sx={{ backgroundColor: '#ffffff', p: 3, borderRadius: '8px', border: '1px solid #cbd5e1', borderTop: '4px solid #00529B', mb: 4 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 3, color: '#0f172a' }}>{cond}</Typography>
              
              <TextField fullWidth label="What was the diagnosis or condition?" value={detail.diagnosis || ''} onChange={(e) => updateCondition(cond, 'diagnosis', e.target.value)} sx={{ mb: 3 }} />
              <Box sx={{ mb: 3 }}>
                <AccessibleDateInput approximate label="Approximate diagnosis date" value={detail.date || { month: '', year: '' }} onChange={(val) => updateCondition(cond, 'date', val)} />
              </Box>
              <TextField fullWidth label="Tell us about any medication or treatment" multiline rows={2} value={detail.treatment || ''} onChange={(e) => updateCondition(cond, 'treatment', e.target.value)} sx={{ mb: 3 }} />
              <TextField fullWidth label="Have you experienced any complications?" multiline rows={2} value={detail.complications || ''} onChange={(e) => updateCondition(cond, 'complications', e.target.value)} sx={{ mb: 3 }} />
              
              <fieldset style={{ border: 'none', padding: 0, margin: '0 0 24px 0' }}>
                <legend style={{ padding: 0, marginBottom: '8px' }}><Typography sx={{ fontWeight: 700, color: '#0f172a' }}>What is the current status of the condition?</Typography></legend>
                <RadioGroup name={`${cond}-status`} value={detail.status || ''} onChange={(e) => updateCondition(cond, 'status', e.target.value)}>
                  <FormControlLabel value="No longer receiving treatment" control={<Radio />} label="No longer receiving treatment" />
                  <FormControlLabel value="Controlled with treatment" control={<Radio />} label="Controlled with treatment" />
                  <FormControlLabel value="Still under investigation" control={<Radio />} label="Still under investigation" />
                  <FormControlLabel value="Currently receiving treatment" control={<Radio />} label="Currently receiving treatment" />
                  <FormControlLabel value="Condition or symptoms are ongoing" control={<Radio />} label="Condition or symptoms are ongoing" />
                </RadioGroup>
              </fieldset>

              <TextField fullWidth label="Doctor or hospital details (optional)" multiline rows={2} value={detail.doctor || ''} onChange={(e) => updateCondition(cond, 'doctor', e.target.value)} />
            </Box>
          );
        })}
      </Box>
    );
  }

  if (step === 4) return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Tobacco and nicotine</Typography>
      <fieldset style={{ border: 'none', padding: 0, margin: '0 0 24px 0' }}>
        <legend style={{ padding: 0, marginBottom: '16px' }}>
          <Typography variant="body1" sx={{ color: '#0f172a', fontWeight: 700 }}>Do you use, or have you previously used, tobacco or nicotine products?</Typography>
          <Typography variant="caption" sx={{ color: '#64748b' }}>Examples include cigarettes, beedis, cigars, vaping products, chewing tobacco, gutkha and tobacco-containing paan masala.</Typography>
        </legend>
        <RadioGroup name="tobacco" value={habits.tobacco} onChange={(e) => updateNestedData('healthAndLifestyle', 'habits', 'tobacco', e.target.value)}>
          <FormControlLabel value="I currently use them" control={<Radio />} label="I currently use them" />
          <FormControlLabel value="I previously used them" control={<Radio />} label="I previously used them" />
          <FormControlLabel value="I have never used them" control={<Radio />} label="I have never used them" />
        </RadioGroup>
      </fieldset>

      {(habits.tobacco === 'I currently use them' || habits.tobacco === 'I previously used them') && (
        <Box sx={{ backgroundColor: '#f8fafc', p: 3, borderRadius: '8px', borderLeft: '4px solid #00529B', mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField fullWidth label="Product used" value={habits.tobaccoProduct} onChange={(e) => updateNestedData('healthAndLifestyle', 'habits', 'tobaccoProduct', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Average quantity" value={habits.tobaccoQuantity} onChange={(e) => updateNestedData('healthAndLifestyle', 'habits', 'tobaccoQuantity', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Frequency" placeholder="e.g. per day" value={habits.tobaccoFrequency} onChange={(e) => updateNestedData('healthAndLifestyle', 'habits', 'tobaccoFrequency', e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Approximate duration" placeholder="e.g. 5 years" value={habits.tobaccoStart} onChange={(e) => updateNestedData('healthAndLifestyle', 'habits', 'tobaccoStart', e.target.value)} />
            </Grid>
            {habits.tobacco === 'I previously used them' && (
              <Grid item xs={12} sm={6}>
                <AccessibleDateInput approximate label="Stop date" value={habits.tobaccoStop || { month: '', year: '' }} onChange={(val) => updateNestedData('healthAndLifestyle', 'habits', 'tobaccoStop', val)} />
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );

  if (step === 5) return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Alcohol and other substances</Typography>
      <Typography sx={{ color: '#64748b' }}>We will use similar progressive logic here for alcohol.</Typography>
    </Box>
  );

  if (step === 6) return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Family medical history</Typography>
      <Typography sx={{ color: '#64748b' }}>Add relatives who have had hereditary diseases.</Typography>
    </Box>
  );

  return null;
};

export default Part2;
