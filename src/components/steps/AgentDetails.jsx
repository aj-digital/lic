import React from 'react';
import { Grid, TextField, Typography, Card, CardContent, Divider } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import BadgeIcon from '@mui/icons-material/Badge';

const AgentDetails = ({ formData, setFormData, errors }) => {
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      agentDetails: {
        ...prev.agentDetails,
        [field]: value
      }
    }));
  };

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <BusinessIcon color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
          <div>
            <Typography variant="h5" component="h2" gutterBottom sx={{ m: 0 }}>
              Office & Agent Details
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Enter branch details and agent/intermediary information as mentioned in the physical proposal form.
            </Typography>
          </div>
        </div>
        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {/* Office Details */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="primary" gutterBottom sx={{ fontWeight: 600 }}>
              Division & Branch Information
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="LIC Division"
              required
              fullWidth
              value={formData.agentDetails.division}
              onChange={(e) => handleChange('division', e.target.value)}
              error={!!errors.division}
              helperText={errors.division || "E.g., Mumbai, Delhi, Bengaluru"}
              placeholder="Enter Division Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Branch Office"
              required
              fullWidth
              value={formData.agentDetails.branchOffice}
              onChange={(e) => handleChange('branchOffice', e.target.value)}
              error={!!errors.branchOffice}
              helperText={errors.branchOffice || "Enter Branch Office Name or Code"}
              placeholder="Enter Branch Name"
            />
          </Grid>

          {/* Agent/Intermediary Details */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
              <BadgeIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, m: 0 }}>
                Intermediary / Agent Details
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Agent / Specified Person / DSA / Sup Agent Name"
              fullWidth
              value={formData.agentDetails.agentName}
              onChange={(e) => handleChange('agentName', e.target.value)}
              placeholder="Enter Full Name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Agent Code / Intermediary Agency Code"
              fullWidth
              value={formData.agentDetails.agentCode}
              onChange={(e) => handleChange('agentCode', e.target.value)}
              placeholder="Enter Agent Code"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Licence No. / Registration No."
              fullWidth
              value={formData.agentDetails.licenceNo}
              onChange={(e) => handleChange('licenceNo', e.target.value)}
              placeholder="Enter Licence Number"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Licence Expiry Date"
              type="date"
              fullWidth
              value={formData.agentDetails.licenceExpiry}
              onChange={(e) => handleChange('licenceExpiry', e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AgentDetails;
