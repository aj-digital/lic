import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  Box,
  Collapse
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShieldIcon from '@mui/icons-material/Shield';
import HelpIcon from '@mui/icons-material/Help';

const ProposedPlan = ({ formData, setFormData, errors }) => {
  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleRiderChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      proposedPlan: {
        ...prev.proposedPlan,
        riders: {
          ...prev.proposedPlan.riders,
          [field]: value
        }
      }
    }));
  };

  const handleSimultaneousChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      proposedPlan: {
        ...prev.proposedPlan,
        simultaneousProposals: {
          ...prev.proposedPlan.simultaneousProposals,
          [field]: value
        }
      }
    }));
  };

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 4 }}>
        {/* Core Plan Details */}
        <Box display="flex" alignItems="center" mb={2}>
          <AssignmentIcon color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
          <div>
            <Typography variant="h5" component="h2" gutterBottom sx={{ m: 0 }}>
              Section II: Proposed Plan Details
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Select the insurance objective, scheme type, specific policy plan details, term, and premium payment frequency.
            </Typography>
          </div>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Objective of Insurance</InputLabel>
              <Select
                value={formData.proposedPlan.objective}
                label="Objective of Insurance"
                onChange={(e) => handleNestedChange('proposedPlan', 'objective', e.target.value)}
              >
                <MenuItem value="Saving">Saving</MenuItem>
                <MenuItem value="Risk Cover">Risk Cover</MenuItem>
                <MenuItem value="Saving and Risk Cover">Saving and Risk Cover</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Proposal Under Scheme</InputLabel>
              <Select
                value={formData.proposedPlan.scheme}
                label="Proposal Under Scheme"
                onChange={(e) => handleNestedChange('proposedPlan', 'scheme', e.target.value)}
              >
                <MenuItem value="Individual life">Individual Life</MenuItem>
                <MenuItem value="Employer-Employee Scheme">Employer-Employee Scheme</MenuItem>
                <MenuItem value="HUF">HUF (Hindu Undivided Family)</MenuItem>
                <MenuItem value="MWP">MWP (Married Women's Property Act)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              label="Plan Name / No."
              required
              fullWidth
              value={formData.proposedPlan.planName}
              onChange={(e) => handleNestedChange('proposedPlan', 'planName', e.target.value)}
              error={!!errors.planName}
              helperText={errors.planName || "E.g., Jeevan Labh (936)"}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Term (Years)"
              required
              fullWidth
              value={formData.proposedPlan.term}
              onChange={(e) => handleNestedChange('proposedPlan', 'term', e.target.value)}
              error={!!errors.term}
              helperText={errors.term}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Premium Paying Term"
              required
              fullWidth
              value={formData.proposedPlan.premiumTerm}
              onChange={(e) => handleNestedChange('proposedPlan', 'premiumTerm', e.target.value)}
              error={!!errors.premiumTerm}
              helperText={errors.premiumTerm}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              label="Basic Sum Assured (Rs.)"
              required
              fullWidth
              value={formData.proposedPlan.sumProposed}
              onChange={(e) => handleNestedChange('proposedPlan', 'sumProposed', e.target.value)}
              error={!!errors.sumProposed}
              helperText={errors.sumProposed}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Premium Mode</InputLabel>
              <Select
                value={formData.proposedPlan.premiumMode}
                label="Premium Mode"
                onChange={(e) => handleNestedChange('proposedPlan', 'premiumMode', e.target.value)}
              >
                <MenuItem value="Yearly">Yearly</MenuItem>
                <MenuItem value="Half-Yearly">Half-Yearly</MenuItem>
                <MenuItem value="Quarterly">Quarterly</MenuItem>
                <MenuItem value="SSS">SSS (Salary Savings Scheme)</MenuItem>
                <MenuItem value="NACH">NACH (Auto-Debit)</MenuItem>
                <MenuItem value="Single">Single Premium</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Backdating Policy Required?</FormLabel>
              <RadioGroup
                row
                value={formData.proposedPlan.backDatingRequired}
                onChange={(e) => handleNestedChange('proposedPlan', 'backDatingRequired', e.target.value)}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Collapse in={formData.proposedPlan.backDatingRequired === 'Yes'}>
              <TextField
                label="Policy Date Backed To"
                type="date"
                required={formData.proposedPlan.backDatingRequired === 'Yes'}
                fullWidth
                value={formData.proposedPlan.backDating}
                onChange={(e) => handleNestedChange('proposedPlan', 'backDating', e.target.value)}
                InputLabelProps={{ shrink: true }}
                error={!!errors.backDating}
                helperText={errors.backDating}
              />
            </Collapse>
          </Grid>

          {/* Riders Section */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <ShieldIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, m: 0 }}>
                Riders Opted (Subject to Availability)
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Choose additional rider benefits to customize your insurance plan.
            </Typography>
          </Grid>

          {/* Rider Checklist with Collapsible Sum Assureds */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {/* Term Assurance */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" flexDirection="column" p={2} border="1px solid #e0e0e0" borderRadius="8px" height="100%">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.proposedPlan.riders.newTermAssurance}
                        onChange={(e) => handleRiderChange('newTermAssurance', e.target.checked)}
                      />
                    }
                    label="LIC's New Term Assurance Rider"
                  />
                  <Collapse in={formData.proposedPlan.riders.newTermAssurance}>
                    <TextField
                      label="Term Rider Sum Assured (Rs.)"
                      size="small"
                      fullWidth
                      sx={{ mt: 1 }}
                      value={formData.proposedPlan.riders.newTermAssuranceSum}
                      onChange={(e) => handleRiderChange('newTermAssuranceSum', e.target.value)}
                    />
                  </Collapse>
                </Box>
              </Grid>

              {/* Critical Illness */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" flexDirection="column" p={2} border="1px solid #e0e0e0" borderRadius="8px" height="100%">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.proposedPlan.riders.criticalIllness}
                        onChange={(e) => handleRiderChange('criticalIllness', e.target.checked)}
                      />
                    }
                    label="LIC's Critical Illness Health Rider"
                  />
                  <Collapse in={formData.proposedPlan.riders.criticalIllness}>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      <Grid item xs={12}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Option Selection</InputLabel>
                          <Select
                            value={formData.proposedPlan.riders.criticalIllnessOption}
                            label="Option Selection"
                            onChange={(e) => handleRiderChange('criticalIllnessOption', e.target.value)}
                          >
                            <MenuItem value="Option 1">Option 1: 15 Major Critical Illnesses</MenuItem>
                            <MenuItem value="Option 2">Option 2: 40 Major Critical Illnesses (with ALB)</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Critical Illness Rider Sum Assured (Rs.)"
                          size="small"
                          fullWidth
                          value={formData.proposedPlan.riders.criticalIllnessSum}
                          onChange={(e) => handleRiderChange('criticalIllnessSum', e.target.value)}
                        />
                      </Grid>
                    </Grid>
                  </Collapse>
                </Box>
              </Grid>

              {/* Premium Waiver */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" flexDirection="column" p={2} border="1px solid #e0e0e0" borderRadius="8px" height="100%">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.proposedPlan.riders.premiumWaiver}
                        onChange={(e) => handleRiderChange('premiumWaiver', e.target.checked)}
                      />
                    }
                    label="LIC's Premium Waiver Benefit Rider"
                  />
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>
                    Waives future premiums in case of proposer death (only for insurance on minor lives).
                  </Typography>
                </Box>
              </Grid>

              {/* Accident Benefit / Disability */}
              <Grid item xs={12} sm={6}>
                <Box display="flex" flexDirection="column" p={2} border="1px solid #e0e0e0" borderRadius="8px" height="100%">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.proposedPlan.riders.accidentBenefit || formData.proposedPlan.riders.accidentalDeathDisability}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          if (!checked) {
                            handleRiderChange('accidentBenefit', false);
                            handleRiderChange('accidentalDeathDisability', false);
                          } else {
                            handleRiderChange('accidentalDeathDisability', true); // Default to comprehensive
                          }
                        }}
                      />
                    }
                    label="Accident Benefit / Disability Rider"
                  />
                  <Collapse in={formData.proposedPlan.riders.accidentBenefit || formData.proposedPlan.riders.accidentalDeathDisability}>
                    <Grid container spacing={1} sx={{ mt: 1 }}>
                      <Grid item xs={12}>
                        <FormControl fullWidth size="small">
                          <InputLabel>Select Accidental Cover Type</InputLabel>
                          <Select
                            value={formData.proposedPlan.riders.accidentalDeathDisability ? "disability" : "benefit"}
                            label="Select Accidental Cover Type"
                            onChange={(e) => {
                              const val = e.target.value;
                              if (val === "disability") {
                                handleRiderChange('accidentalDeathDisability', true);
                                handleRiderChange('accidentBenefit', false);
                              } else {
                                handleRiderChange('accidentalDeathDisability', false);
                                handleRiderChange('accidentBenefit', true);
                              }
                            }}
                          >
                            <MenuItem value="disability">Accidental Death and Disability Benefit Rider</MenuItem>
                            <MenuItem value="benefit">Accident Benefit Rider</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label="Accidental Rider Sum Assured (Rs.)"
                          size="small"
                          fullWidth
                          value={formData.proposedPlan.riders.accidentalDeathDisability ? formData.proposedPlan.riders.accidentalDeathDisabilitySum : formData.proposedPlan.riders.accidentBenefitSum}
                          onChange={(e) => {
                            if (formData.proposedPlan.riders.accidentalDeathDisability) {
                              handleRiderChange('accidentalDeathDisabilitySum', e.target.value);
                            } else {
                              handleRiderChange('accidentBenefitSum', e.target.value);
                            }
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Collapse>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          {/* Settlement / Instalment Options */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <HelpIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, m: 0 }}>
                Installment Options (Maturity & Death Benefit)
              </Typography>
            </Box>
          </Grid>

          {/* Maturity Benefits */}
          <Grid item xs={12} sm={6}>
            <Box p={2.5} border="1px solid #e0e0e0" borderRadius="8px" height="100%">
              <FormControl component="fieldset">
                <FormLabel component="legend">Option to take Maturity Benefit in Instalments?</FormLabel>
                <RadioGroup
                  row
                  value={formData.proposedPlan.maturityInstalments}
                  onChange={(e) => handleNestedChange('proposedPlan', 'maturityInstalments', e.target.value)}
                >
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </FormControl>
              <Collapse in={formData.proposedPlan.maturityInstalments === 'Yes'}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Period (Years)</InputLabel>
                      <Select
                        value={formData.proposedPlan.maturityTerm}
                        label="Period (Years)"
                        onChange={(e) => handleNestedChange('proposedPlan', 'maturityTerm', e.target.value)}
                      >
                        <MenuItem value="5">5 Years</MenuItem>
                        <MenuItem value="10">10 Years</MenuItem>
                        <MenuItem value="15">15 Years</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Share Type</InputLabel>
                      <Select
                        value={formData.proposedPlan.maturityShare}
                        label="Share Type"
                        onChange={(e) => handleNestedChange('proposedPlan', 'maturityShare', e.target.value)}
                      >
                        <MenuItem value="Full">Full proceeds</MenuItem>
                        <MenuItem value="Part">Part proceeds</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {formData.proposedPlan.maturityShare === 'Part' && (
                    <Grid item xs={12}>
                      <TextField
                        label="Maturity Proceeds Share Percentage (%)"
                        size="small"
                        required
                        fullWidth
                        value={formData.proposedPlan.maturityPercentage}
                        onChange={(e) => handleNestedChange('proposedPlan', 'maturityPercentage', e.target.value)}
                        error={!!errors.maturityPercentage}
                        helperText={errors.maturityPercentage}
                      />
                    </Grid>
                  )}
                </Grid>
              </Collapse>
            </Box>
          </Grid>

          {/* Death Benefits */}
          <Grid item xs={12} sm={6}>
            <Box p={2.5} border="1px solid #e0e0e0" borderRadius="8px" height="100%">
              <FormControl component="fieldset">
                <FormLabel component="legend">Option to take Death Benefit in Instalments?</FormLabel>
                <RadioGroup
                  row
                  value={formData.proposedPlan.deathInstalments}
                  onChange={(e) => handleNestedChange('proposedPlan', 'deathInstalments', e.target.value)}
                >
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </FormControl>
              <Collapse in={formData.proposedPlan.deathInstalments === 'Yes'}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Period (Years)</InputLabel>
                      <Select
                        value={formData.proposedPlan.deathTerm}
                        label="Period (Years)"
                        onChange={(e) => handleNestedChange('proposedPlan', 'deathTerm', e.target.value)}
                      >
                        <MenuItem value="5">5 Years</MenuItem>
                        <MenuItem value="10">10 Years</MenuItem>
                        <MenuItem value="15">15 Years</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Share Type</InputLabel>
                      <Select
                        value={formData.proposedPlan.deathShare}
                        label="Share Type"
                        onChange={(e) => handleNestedChange('proposedPlan', 'deathShare', e.target.value)}
                      >
                        <MenuItem value="Full">Full proceeds</MenuItem>
                        <MenuItem value="Part">Part proceeds</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {formData.proposedPlan.deathShare === 'Part' && (
                    <Grid item xs={12}>
                      <TextField
                        label="Death Proceeds Share Percentage (%)"
                        size="small"
                        required
                        fullWidth
                        value={formData.proposedPlan.deathPercentage}
                        onChange={(e) => handleNestedChange('proposedPlan', 'deathPercentage', e.target.value)}
                        error={!!errors.deathPercentage}
                        helperText={errors.deathPercentage}
                      />
                    </Grid>
                  )}
                </Grid>
              </Collapse>
            </Box>
          </Grid>

          {/* Simultaneous Proposals & Policy Delivery */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }} gutterBottom>
              Simultaneous Proposals & Other Details
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box p={2} border="1px solid #e0e0e0" borderRadius="8px">
              <FormControl component="fieldset">
                <FormLabel component="legend">Are you simultaneously proposing for another life assurance?</FormLabel>
                <RadioGroup
                  row
                  value={formData.proposedPlan.simultaneousProposals.active}
                  onChange={(e) => handleSimultaneousChange('active', e.target.value)}
                >
                  <FormControlLabel value="No" control={<Radio />} label="No" />
                  <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                </RadioGroup>
              </FormControl>
              <Collapse in={formData.proposedPlan.simultaneousProposals.active === 'Yes'}>
                <TextField
                  label="Proposal No. / Policy details"
                  size="small"
                  fullWidth
                  sx={{ mt: 1.5 }}
                  value={formData.proposedPlan.simultaneousProposals.proposalNo}
                  onChange={(e) => handleSimultaneousChange('proposalNo', e.target.value)}
                />
              </Collapse>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box p={2} border="1px solid #e0e0e0" borderRadius="8px" height="100%">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">Receive Physical Policy Document?</FormLabel>
                    <RadioGroup
                      row
                      value={formData.proposedPlan.physicalPolicy}
                      onChange={(e) => handleNestedChange('proposedPlan', 'physicalPolicy', e.target.value)}
                    >
                      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="EIA No. (e-Insurance Account)"
                    size="small"
                    fullWidth
                    value={formData.proposedPlan.eiaNumber}
                    onChange={(e) => handleNestedChange('proposedPlan', 'eiaNumber', e.target.value)}
                    placeholder="Enter EIA Number"
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProposedPlan;
