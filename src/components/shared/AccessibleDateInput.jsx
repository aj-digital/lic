import React from 'react';
import { Box, Typography, TextField, FormLabel } from '@mui/material';

const AccessibleDateInput = ({ label, value, onChange, approximate = false }) => {
  const handleChange = (field, val) => {
    // Basic numeric filter
    const cleanVal = val.replace(/\D/g, '');
    onChange({ ...value, [field]: cleanVal });
  };

  return (
    <fieldset style={{ border: 'none', padding: 0, margin: '0 0 16px 0' }}>
      <legend style={{ padding: 0, marginBottom: '8px' }}>
        <Typography sx={{ fontWeight: 700, color: '#0f172a' }}>{label}</Typography>
      </legend>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {!approximate && (
          <TextField
            label="Day"
            placeholder="DD"
            value={value?.day || ''}
            onChange={(e) => handleChange('day', e.target.value)}
            inputProps={{ maxLength: 2 }}
            sx={{ width: '80px' }}
          />
        )}
        <TextField
          label="Month"
          placeholder="MM"
          value={value?.month || ''}
          onChange={(e) => handleChange('month', e.target.value)}
          inputProps={{ maxLength: 2 }}
          sx={{ width: '80px' }}
        />
        <TextField
          label="Year"
          placeholder="YYYY"
          value={value?.year || ''}
          onChange={(e) => handleChange('year', e.target.value)}
          inputProps={{ maxLength: 4 }}
          sx={{ width: '120px' }}
        />
      </Box>
    </fieldset>
  );
};

export default AccessibleDateInput;
