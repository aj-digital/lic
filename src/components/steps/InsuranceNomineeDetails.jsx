import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { calculateAge } from '../../validation';

const InsuranceNomineeDetails = ({ formData, setFormData, errors }) => {
  
  // Handlers for Existing Policies
  const handleAddPolicy = () => {
    setFormData(prev => ({
      ...prev,
      existingInsurance: {
        ...prev.existingInsurance,
        policies: [
          ...prev.existingInsurance.policies,
          {
            policyNumber: '',
            insurerName: 'LIC',
            planTerm: '',
            sumAssured: '',
            riderSum: '',
            dateCommence: '',
            inforce: 'Yes'
          }
        ]
      }
    }));
  };

  const handleRemovePolicy = (index) => {
    setFormData(prev => {
      const updated = [...prev.existingInsurance.policies];
      updated.splice(index, 1);
      return {
        ...prev,
        existingInsurance: {
          ...prev.existingInsurance,
          policies: updated
        }
      };
    });
  };

  const handlePolicyChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.existingInsurance.policies];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        existingInsurance: {
          ...prev.existingInsurance,
          policies: updated
        }
      };
    });
  };

  // Handlers for Nominees
  const handleAddNominee = () => {
    setFormData(prev => ({
      ...prev,
      existingInsurance: {
        ...prev.existingInsurance,
        nominees: [
          ...prev.existingInsurance.nominees,
          {
            name: '',
            share: '',
            dob: '',
            age: '',
            relationship: '',
            mobile: '',
            email: '',
            address: '',
          }
        ]
      }
    }));
  };

  const handleRemoveNominee = (index) => {
    setFormData(prev => {
      const updated = [...prev.existingInsurance.nominees];
      updated.splice(index, 1);
      return {
        ...prev,
        existingInsurance: {
          ...prev.existingInsurance,
          nominees: updated
        }
      };
    });
  };

  const handleNomineeChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.existingInsurance.nominees];
      const nominee = { ...updated[index], [field]: value };
      
      // Auto-calculate age for nominee if DOB is changed
      if (field === 'dob' && value) {
        nominee.age = calculateAge(value).toString();
      }

      updated[index] = nominee;
      return {
        ...prev,
        existingInsurance: {
          ...prev.existingInsurance,
          nominees: updated
        }
      };
    });
  };

  // Check if there is any minor nominee
  const nominees = formData.existingInsurance.nominees || [];
  const hasMinorNominee = nominees.some(nom => {
    if (!nom.dob) return false;
    const age = calculateAge(nom.dob);
    return age < 18;
  });

  const handleAppointeeChange = (field, value) => {
    setFormData(prev => {
      const app = { ...prev.existingInsurance.appointee, [field]: value };
      if (field === 'dob' && value) {
        app.age = calculateAge(value).toString();
      }
      return {
        ...prev,
        existingInsurance: {
          ...prev.existingInsurance,
          appointee: app
        }
      };
    });
  };

  const handleNomineeBankChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      existingInsurance: {
        ...prev.existingInsurance,
        nomineeBank: {
          ...prev.existingInsurance.nomineeBank,
          [field]: value
        }
      }
    }));
  };

  const handleBankChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      existingInsurance: {
        ...prev.existingInsurance,
        bankDetails: {
          ...prev.existingInsurance.bankDetails,
          [field]: value
        }
      }
    }));
  };

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 4 }}>
        {/* SECTION 1: Existing Insurance */}
        <Box display="flex" alignItems="center" mb={2}>
          <SecurityIcon color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
          <div>
            <Typography variant="h5" component="h2" gutterBottom sx={{ m: 0 }}>
              Section I: Existing Insurance Details
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Details of previous insurance policies taken from LIC or other insurers in the last 3 years.
            </Typography>
          </div>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Box mb={4}>
          <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
            <Table size="small">
              <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Policy No.</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Insurer Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Plan & Term</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Sum Assured (Rs.)</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Riders Sum</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Commencement</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Inforce?</TableCell>
                  <TableCell sx={{ fontWeight: 600 }} align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formData.existingInsurance.policies.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                      No existing policies declared. Click "Add Policy" to declare previous insurance.
                    </TableCell>
                  </TableRow>
                ) : (
                  formData.existingInsurance.policies.map((policy, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        <TextField
                          size="small"
                          fullWidth
                          value={policy.policyNumber}
                          onChange={(e) => handlePolicyChange(idx, 'policyNumber', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          fullWidth
                          value={policy.insurerName}
                          onChange={(e) => handlePolicyChange(idx, 'insurerName', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          fullWidth
                          value={policy.planTerm}
                          onChange={(e) => handlePolicyChange(idx, 'planTerm', e.target.value)}
                          placeholder="e.g. 914-20"
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          fullWidth
                          value={policy.sumAssured}
                          onChange={(e) => handlePolicyChange(idx, 'sumAssured', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          fullWidth
                          value={policy.riderSum}
                          onChange={(e) => handlePolicyChange(idx, 'riderSum', e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          type="date"
                          fullWidth
                          value={policy.dateCommence}
                          onChange={(e) => handlePolicyChange(idx, 'dateCommence', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          size="small"
                          fullWidth
                          value={policy.inforce}
                          onChange={(e) => handlePolicyChange(idx, 'inforce', e.target.value)}
                        >
                          <MenuItem value="Yes">Yes</MenuItem>
                          <MenuItem value="No">No</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="error" onClick={() => handleRemovePolicy(idx)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Button startIcon={<AddIcon />} variant="outlined" color="primary" onClick={handleAddPolicy}>
            Add Policy
          </Button>
        </Box>

        {/* SECTION 2: Nominee Details */}
        <Box display="flex" alignItems="center" mb={2} mt={5}>
          <PeopleIcon color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
          <div>
            <Typography variant="h5" component="h2" gutterBottom sx={{ m: 0 }}>
              Section V: Nominee Details & Appointee
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Nominate single or multiple persons to receive maturity/death benefits. Sum of shares must equal 100%.
            </Typography>
          </div>
        </Box>
        <Divider sx={{ mb: 3 }} />

        {errors.totalShare && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.totalShare}
          </Alert>
        )}

        <Box mb={4}>
          {nominees.map((nominee, idx) => (
            <Card key={idx} variant="outlined" sx={{ mb: 3, backgroundColor: '#fafafa' }}>
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Nominee #{idx + 1}
                  </Typography>
                  {nominees.length > 1 && (
                    <IconButton size="small" color="error" onClick={() => handleRemoveNominee(idx)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Nominee Name"
                      required
                      fullWidth
                      value={nominee.name}
                      onChange={(e) => handleNomineeChange(idx, 'name', e.target.value)}
                      error={!!(errors.nomineesList && errors.nomineesList[idx]?.name)}
                      helperText={errors.nomineesList && errors.nomineesList[idx]?.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      label="Share (%)"
                      required
                      fullWidth
                      value={nominee.share}
                      onChange={(e) => handleNomineeChange(idx, 'share', e.target.value)}
                      error={!!(errors.nomineesList && errors.nomineesList[idx]?.share)}
                      helperText={errors.nomineesList && errors.nomineesList[idx]?.share}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Date of Birth"
                      type="date"
                      required
                      fullWidth
                      value={nominee.dob}
                      onChange={(e) => handleNomineeChange(idx, 'dob', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      error={!!(errors.nomineesList && errors.nomineesList[idx]?.dob)}
                      helperText={(errors.nomineesList && errors.nomineesList[idx]?.dob) || `Age: ${nominee.age || '0'} Yrs`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Relationship"
                      required
                      fullWidth
                      value={nominee.relationship}
                      onChange={(e) => handleNomineeChange(idx, 'relationship', e.target.value)}
                      error={!!(errors.nomineesList && errors.nomineesList[idx]?.relationship)}
                      helperText={errors.nomineesList && errors.nomineesList[idx]?.relationship}
                      placeholder="e.g. Spouse, Son, Mother"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Mobile No."
                      fullWidth
                      value={nominee.mobile}
                      onChange={(e) => handleNomineeChange(idx, 'mobile', e.target.value)}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Email ID"
                      fullWidth
                      value={nominee.email}
                      onChange={(e) => handleNomineeChange(idx, 'email', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Address"
                      fullWidth
                      value={nominee.address}
                      onChange={(e) => handleNomineeChange(idx, 'address', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
          <Button startIcon={<AddIcon />} variant="outlined" color="primary" onClick={handleAddNominee}>
            Add Multiple Nominee
          </Button>
        </Box>

        {/* SECTION 2A: Appointee Details (Conditional if Nominee is Minor) */}
        <Collapse in={hasMinorNominee}>
          <Box mb={4} mt={3}>
            <Alert severity="warning" sx={{ mb: 2 }}>
              <strong>Minor Nominee Identified:</strong> Appointee details are mandatory if a nominee's age is under 18.
            </Alert>
            <Card variant="outlined" sx={{ borderColor: '#f59e0b', backgroundColor: '#fffdf9' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" color="warning.dark" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  Appointee Details (In case of Minor Nominee)
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Appointee Name"
                      required={hasMinorNominee}
                      fullWidth
                      value={formData.existingInsurance.appointee.name}
                      onChange={(e) => handleAppointeeChange('name', e.target.value)}
                      error={!!errors.appointeeName}
                      helperText={errors.appointeeName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Date of Birth"
                      type="date"
                      required={hasMinorNominee}
                      fullWidth
                      value={formData.existingInsurance.appointee.dob}
                      onChange={(e) => handleAppointeeChange('dob', e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      error={!!errors.appointeeDob}
                      helperText={errors.appointeeDob || `Appointee Age: ${formData.existingInsurance.appointee.age || '0'} Yrs`}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Relationship to Nominee"
                      required={hasMinorNominee}
                      fullWidth
                      value={formData.existingInsurance.appointee.relationship}
                      onChange={(e) => handleAppointeeChange('relationship', e.target.value)}
                      error={!!errors.appointeeRelationship}
                      helperText={errors.appointeeRelationship}
                      placeholder="e.g. Uncle, Grandfather"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Mobile No."
                      fullWidth
                      value={formData.existingInsurance.appointee.mobile}
                      onChange={(e) => handleAppointeeChange('mobile', e.target.value)}
                      inputProps={{ maxLength: 10 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Address"
                      fullWidth
                      value={formData.existingInsurance.appointee.address}
                      onChange={(e) => handleAppointeeChange('address', e.target.value)}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Collapse>

        {/* SECTION 2B: Nominee Bank Details */}
        <Box mb={4} mt={3}>
          <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }} gutterBottom>
            Nominee's Bank Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Bank Name"
                fullWidth
                value={formData.existingInsurance.nomineeBank.bankName}
                onChange={(e) => handleNomineeBankChange('bankName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Account Number"
                fullWidth
                value={formData.existingInsurance.nomineeBank.accountNo}
                onChange={(e) => handleNomineeBankChange('accountNo', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="IFSC Code"
                fullWidth
                value={formData.existingInsurance.nomineeBank.ifscCode}
                onChange={(e) => handleNomineeBankChange('ifscCode', e.target.value.toUpperCase())}
                placeholder="e.g. SBIN0001234"
                inputProps={{ maxLength: 11 }}
              />
            </Grid>
          </Grid>
        </Box>

        {/* SECTION 3: Proposer Bank Details */}
        <Box display="flex" alignItems="center" mb={2} mt={5}>
          <AccountBalanceIcon color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
          <div>
            <Typography variant="h5" component="h2" gutterBottom sx={{ m: 0 }}>
              Section VI: Bank Details (Life to be Assured)
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Your bank details for receiving premiums payouts, survival benefits, or claim payouts.
            </Typography>
          </div>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Account Type</FormLabel>
                <RadioGroup
                  row
                  value={formData.existingInsurance.bankDetails.accountType}
                  onChange={(e) => handleBankChange('accountType', e.target.value)}
                >
                  <FormControlLabel value="Savings" control={<Radio />} label="Savings" />
                  <FormControlLabel value="Current" control={<Radio />} label="Current" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Bank Name"
                required
                fullWidth
                value={formData.existingInsurance.bankDetails.bankName}
                onChange={(e) => handleBankChange('bankName', e.target.value)}
                error={!!errors.bankName}
                helperText={errors.bankName}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Account Number"
                required
                fullWidth
                value={formData.existingInsurance.bankDetails.accountNo}
                onChange={(e) => handleBankChange('accountNo', e.target.value)}
                error={!!errors.bankAccountNo}
                helperText={errors.bankAccountNo}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="IFSC Code"
                required
                fullWidth
                value={formData.existingInsurance.bankDetails.ifscCode}
                onChange={(e) => handleBankChange('ifscCode', e.target.value.toUpperCase())}
                error={!!errors.bankIfsc}
                helperText={errors.bankIfsc || "E.g. HDFC0000001"}
                placeholder="11 characters"
                inputProps={{ maxLength: 11 }}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default InsuranceNomineeDetails;
