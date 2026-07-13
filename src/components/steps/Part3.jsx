import React from 'react';
import { Box, Typography } from '@mui/material';

const Part3 = ({ data, updateData, updateNestedData, step }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, color: '#1e293b', mb: 3 }}>Your Plan</Typography>
      <Typography sx={{ color: '#64748b' }}>Plan details will be configured here.</Typography>
    </Box>
  );
};

export default Part3;
