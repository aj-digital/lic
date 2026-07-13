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
  Checkbox,
  Box,
  Collapse,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  InputAdornment,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import GroupIcon from '@mui/icons-material/Group';
import WomanIcon from '@mui/icons-material/Woman';

const HealthHabits = ({ formData, setFormData, errors }) => {
  const isFemale = formData.personalDetails.gender === 'Female';

  const handleNestedChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleIllnessCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      healthHabits: {
        ...prev.healthHabits,
        illnesses: {
          ...prev.healthHabits.illnesses,
          [field]: checked
        }
      }
    }));
  };

  // Illness details handlers
  const handleAddIllnessDetail = () => {
    setFormData(prev => ({
      ...prev,
      healthHabits: {
        ...prev.healthHabits,
        illnessDetails: [
          ...prev.healthHabits.illnessDetails,
          {
            natureOfIllness: '',
            dateOfDiagnosis: '',
            fullyRecovered: 'Yes',
            stillOnTreatment: 'No',
            treatmentDetails: '',
            doctorHospital: ''
          }
        ]
      }
    }));
  };

  const handleRemoveIllnessDetail = (index) => {
    setFormData(prev => {
      const updated = [...prev.healthHabits.illnessDetails];
      updated.splice(index, 1);
      return {
        ...prev,
        healthHabits: {
          ...prev.healthHabits,
          illnessDetails: updated
        }
      };
    });
  };

  const handleIllnessDetailChange = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.healthHabits.illnessDetails];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        healthHabits: {
          ...prev.healthHabits,
          illnessDetails: updated
        }
      };
    });
  };

  // Habits handlers
  const handleHabitChange = (habitType, field, value) => {
    setFormData(prev => ({
      ...prev,
      healthHabits: {
        ...prev.healthHabits,
        habits: {
          ...prev.healthHabits.habits,
          [habitType]: {
            ...prev.healthHabits.habits[habitType],
            [field]: value
          }
        }
      }
    }));
  };

  // Family history handlers
  const handleFamilyMemberChange = (member, field, value) => {
    setFormData(prev => ({
      ...prev,
      healthHabits: {
        ...prev.healthHabits,
        familyHistory: {
          ...prev.healthHabits.familyHistory,
          [member]: {
            ...prev.healthHabits.familyHistory[member],
            [field]: value
          }
        }
      }
    }));
  };

  const handleFemaleDetailsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      healthHabits: {
        ...prev.healthHabits,
        femaleDetails: {
          ...prev.healthHabits.femaleDetails,
          [field]: value
        }
      }
    }));
  };

  // Check if any disease checkbox is ticked
  const illnessesObj = formData.healthHabits.illnesses || {};
  const hasDeclaredIllness = Object.values(illnessesObj).some(val => val === true);

  return (
    <Card variant="outlined">
      <CardContent sx={{ p: 4 }}>
        {/* Section III-I: Personal Health */}
        <Box display="flex" alignItems="center" mb={2}>
          <FavoriteIcon color="primary" sx={{ fontSize: 32, mr: 1.5 }} />
          <div>
            <Typography variant="h5" component="h2" gutterBottom sx={{ m: 0 }}>
              Section III: Personal Health Parameters & History
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Enter your physical measurements, medical history, and check any conditions you have been diagnosed with.
            </Typography>
          </div>
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Height (in cms)"
              required
              fullWidth
              value={formData.healthHabits.height}
              onChange={(e) => handleNestedChange('healthHabits', 'height', e.target.value)}
              error={!!errors.height}
              helperText={errors.height}
              InputProps={{
                endAdornment: <InputAdornment position="end">cm</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Weight (in Kgs)"
              required
              fullWidth
              value={formData.healthHabits.weight}
              onChange={(e) => handleNestedChange('healthHabits', 'weight', e.target.value)}
              error={!!errors.weight}
              helperText={errors.weight}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
            />
          </Grid>

          {/* Quick disclosures */}
          <Grid item xs={12} sm={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Consulted doctor in last 5 years for &gt; 1 week treatment?</FormLabel>
              <RadioGroup
                row
                value={formData.healthHabits.consultedDoctor5Yrs}
                onChange={(e) => handleNestedChange('healthHabits', 'consultedDoctor5Yrs', e.target.value)}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <Collapse in={formData.healthHabits.consultedDoctor5Yrs === 'Yes'}>
              <TextField
                label="Medical consultation details"
                fullWidth
                multiline
                rows={2}
                sx={{ mt: 1 }}
                value={formData.healthHabits.consultedDoctorDetails}
                onChange={(e) => handleNestedChange('healthHabits', 'consultedDoctorDetails', e.target.value)}
              />
            </Collapse>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Admitted to hospital for checkup, operation, or injury?</FormLabel>
              <RadioGroup
                row
                value={formData.healthHabits.admittedHospital}
                onChange={(e) => handleNestedChange('healthHabits', 'admittedHospital', e.target.value)}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <Collapse in={formData.healthHabits.admittedHospital === 'Yes'}>
              <TextField
                label="Hospitalization details"
                fullWidth
                multiline
                rows={2}
                sx={{ mt: 1 }}
                value={formData.healthHabits.admittedHospitalDetails}
                onChange={(e) => handleNestedChange('healthHabits', 'admittedHospitalDetails', e.target.value)}
              />
            </Collapse>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Remained absent from work on grounds of health in last 5 years?</FormLabel>
              <RadioGroup
                row
                value={formData.healthHabits.absentFromWork}
                onChange={(e) => handleNestedChange('healthHabits', 'absentFromWork', e.target.value)}
              >
                <FormControlLabel value="No" control={<Radio />} label="No" />
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              </RadioGroup>
            </FormControl>
            <Collapse in={formData.healthHabits.absentFromWork === 'Yes'}>
              <TextField
                label="Absence details & duration"
                fullWidth
                multiline
                rows={2}
                sx={{ mt: 1 }}
                value={formData.healthHabits.absentFromWorkDetails}
                onChange={(e) => handleNestedChange('healthHabits', 'absentFromWorkDetails', e.target.value)}
              />
            </Collapse>
          </Grid>

          {/* Disease Checkboxes */}
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600 }} gutterBottom>
              Have you ever suffered from or undergone investigation for the following:
            </Typography>
            <Grid container spacing={1}>
              {[
                { key: 'lungs', label: '1. Lungs/Respiratory Disease (Asthma, TB, Bronchitis, Covid, etc.)' },
                { key: 'digestive', label: '2. Digestive System (Peptic ulcer, Hepatitis, Jaundice, etc.)' },
                { key: 'heart', label: '3. Heart/Circulatory System (Hypertension, chest pain, stroke, etc.)' },
                { key: 'endocrine', label: '4. Endocrine/Metabolic System (Diabetes, Thyroid, Goitre, etc.)' },
                { key: 'kidney', label: '5. Kidney, Prostate or Urinary system disease' },
                { key: 'jointSpine', label: '6. Bone/Joint/Spine Disease (Arthritis, disc issues, defect)' },
                { key: 'ent', label: '7. Defective Sight, Hearing, ENT disorders or eye discharge' },
                { key: 'cancer', label: '8. Cancer, Tumor, Cyst, Leukemia, Lymphoma or Blood disorders' },
                { key: 'neurological', label: '9. Neurological System (Epilepsy, Paralysis, Insanity, Depression, Anxiety)' },
                { key: 'infections', label: '10. Chronic Infections (HIV/AIDS, Gonorrhoea, Syphilis, Skin, etc.)' },
                { key: 'hernia', label: '11. Hernia, Hydrocele, Varicocele, Fistula' },
                { key: 'other', label: '12. Any other disease or medical condition not listed' },
              ].map((item) => (
                <Grid item xs={12} sm={6} key={item.key}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.healthHabits.illnesses[item.key] || false}
                        onChange={(e) => handleIllnessCheckboxChange(item.key, e.target.checked)}
                      />
                    }
                    label={item.label}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Dynamic Table for Illness details if any checked */}
          <Grid item xs={12}>
            <Collapse in={hasDeclaredIllness || formData.healthHabits.illnessDetails.length > 0}>
              <Box mt={2}>
                <Typography variant="subtitle2" color="error" gutterBottom sx={{ fontWeight: 600 }}>
                  Medical Treatment & Diagnosis Details (Required since health conditions were selected)
                </Typography>
                <TableContainer component={Paper} variant="outlined" sx={{ mb: 2 }}>
                  <Table size="small">
                    <TableHead sx={{ backgroundColor: '#fff5f5' }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Nature of Illness</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Diagnosis Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Fully Recovered?</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Still Treating?</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Treatment Details</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Doctor/Hospital</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formData.healthHabits.illnessDetails.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                            Click "Add Illness Detail Row" to specify treatment details.
                          </TableCell>
                        </TableRow>
                      ) : (
                        formData.healthHabits.illnessDetails.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell>
                              <TextField
                                size="small"
                                fullWidth
                                value={item.natureOfIllness}
                                onChange={(e) => handleIllnessDetailChange(idx, 'natureOfIllness', e.target.value)}
                                placeholder="E.g. Diabetes, Asthma"
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                type="date"
                                fullWidth
                                value={item.dateOfDiagnosis}
                                onChange={(e) => handleIllnessDetailChange(idx, 'dateOfDiagnosis', e.target.value)}
                                InputLabelProps={{ shrink: true }}
                              />
                            </TableCell>
                            <TableCell>
                              <Select
                                size="small"
                                fullWidth
                                value={item.fullyRecovered}
                                onChange={(e) => handleIllnessDetailChange(idx, 'fullyRecovered', e.target.value)}
                              >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Select
                                size="small"
                                fullWidth
                                value={item.stillOnTreatment}
                                onChange={(e) => handleIllnessDetailChange(idx, 'stillOnTreatment', e.target.value)}
                              >
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                fullWidth
                                value={item.treatmentDetails}
                                onChange={(e) => handleIllnessDetailChange(idx, 'treatmentDetails', e.target.value)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                size="small"
                                fullWidth
                                value={item.doctorHospital}
                                onChange={(e) => handleIllnessDetailChange(idx, 'doctorHospital', e.target.value)}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <IconButton color="error" size="small" onClick={() => handleRemoveIllnessDetail(idx)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button startIcon={<AddIcon />} variant="outlined" color="error" onClick={handleAddIllnessDetail}>
                  Add Illness Detail Row
                </Button>
              </Box>
            </Collapse>
          </Grid>

          {/* Section III-II: Personal Habits */}
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <SmokingRoomsIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, m: 0 }}>
                Personal Habits
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Declare if you consume or have ever consumed alcoholic drinks, narcotics, tobacco products or drugs.
            </Typography>
          </Grid>

          {['alcohol', 'tobacco', 'narcotics', 'otherDrugs'].map((habit) => (
            <Grid item xs={12} sm={6} key={habit}>
              <Box p={2} border="1px solid #e0e0e0" borderRadius="8px" height="100%">
                <FormControl component="fieldset">
                  <FormLabel component="legend" style={{ textTransform: 'capitalize' }}>
                    Consume {habit === 'otherDrugs' ? 'other drugs' : habit}?
                  </FormLabel>
                  <RadioGroup
                    row
                    value={formData.healthHabits.habits[habit].active}
                    onChange={(e) => handleHabitChange(habit, 'active', e.target.value)}
                  >
                    <FormControlLabel value="No" control={<Radio />} label="No" />
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                  </RadioGroup>
                </FormControl>
                <Collapse in={formData.healthHabits.habits[habit].active === 'Yes'}>
                  <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}>
                      <TextField
                        label="Daily Quantity / Details"
                        size="small"
                        fullWidth
                        value={formData.healthHabits.habits[habit].quantity}
                        onChange={(e) => handleHabitChange(habit, 'quantity', e.target.value)}
                        placeholder="e.g. 2 pegs, 5 sticks"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="If stopped, since how long?"
                        size="small"
                        fullWidth
                        value={formData.healthHabits.habits[habit].stoppedSince}
                        onChange={(e) => handleHabitChange(habit, 'stoppedSince', e.target.value)}
                        placeholder="e.g. 6 months, 2 years"
                      />
                    </Grid>
                  </Grid>
                </Collapse>
              </Box>
            </Grid>
          ))}

          {/* Section III-III: Family History */}
          <Grid item xs={12} sx={{ mt: 3 }}>
            <Box display="flex" alignItems="center" mb={1}>
              <GroupIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 600, m: 0 }}>
                Family History
              </Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              State of health and age of family members (or details if deceased).
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper} variant="outlined">
              <Table size="small">
                <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600 }}>Relation</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Age (Years)</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>State of Health / Cause of Death</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { key: 'father', label: 'Father' },
                    { key: 'mother', label: 'Mother' },
                    { key: 'spouse', label: 'Spouse' }
                  ].map((member) => (
                    <TableRow key={member.key}>
                      <TableCell sx={{ fontWeight: 500 }}>{member.label}</TableCell>
                      <TableCell sx={{ width: '20%' }}>
                        <Select
                          size="small"
                          fullWidth
                          value={formData.healthHabits.familyHistory[member.key].status}
                          onChange={(e) => handleFamilyMemberChange(member.key, 'status', e.target.value)}
                        >
                          <MenuItem value="Living">Living</MenuItem>
                          <MenuItem value="Deceased">Deceased</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell sx={{ width: '20%' }}>
                        <TextField
                          size="small"
                          fullWidth
                          value={formData.healthHabits.familyHistory[member.key].age}
                          onChange={(e) => handleFamilyMemberChange(member.key, 'age', e.target.value)}
                          placeholder="Age"
                          error={member.key === 'father' ? !!errors.fatherAge : member.key === 'mother' ? !!errors.motherAge : false}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          size="small"
                          fullWidth
                          value={formData.healthHabits.familyHistory[member.key].details}
                          onChange={(e) => handleFamilyMemberChange(member.key, 'details', e.target.value)}
                          placeholder={
                            formData.healthHabits.familyHistory[member.key].status === 'Living'
                              ? 'e.g. Good health, Diabetic (controlled)'
                              : 'e.g. Heart attack in 2021, Cancer'
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>

          {/* Section III-IV: Female Proponents (Conditional) */}
          {isFemale && (
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Card variant="outlined" sx={{ borderColor: '#e91e63', backgroundColor: '#fffdfd' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <WomanIcon color="secondary" sx={{ fontSize: 32, mr: 1, color: '#e91e63' }} />
                    <Typography variant="h6" sx={{ color: '#e91e63', fontWeight: 600, m: 0 }}>
                      For Female Proponents Only
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 3 }} />

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Are you pregnant now?</FormLabel>
                        <RadioGroup
                          row
                          value={formData.healthHabits.femaleDetails.pregnant}
                          onChange={(e) => handleFemaleDetailsChange('pregnant', e.target.value)}
                        >
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        </RadioGroup>
                      </FormControl>
                      <Collapse in={formData.healthHabits.femaleDetails.pregnant === 'Yes'}>
                        <TextField
                          label="Expected Delivery Date"
                          type="date"
                          required={formData.healthHabits.femaleDetails.pregnant === 'Yes'}
                          size="small"
                          fullWidth
                          sx={{ mt: 1 }}
                          value={formData.healthHabits.femaleDetails.deliveryDate}
                          onChange={(e) => handleFemaleDetailsChange('deliveryDate', e.target.value)}
                          InputLabelProps={{ shrink: true }}
                          error={!!errors.deliveryDate}
                          helperText={errors.deliveryDate}
                        />
                      </Collapse>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Had abortion / miscarriage / Caesarean?</FormLabel>
                        <RadioGroup
                          row
                          value={formData.healthHabits.femaleDetails.abortion}
                          onChange={(e) => handleFemaleDetailsChange('abortion', e.target.value)}
                        >
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Consulted gynaecologist for gynaec ailment?</FormLabel>
                        <RadioGroup
                          row
                          value={formData.healthHabits.femaleDetails.gynaecConsult}
                          onChange={(e) => handleFemaleDetailsChange('gynaecConsult', e.target.value)}
                        >
                          <FormControlLabel value="No" control={<Radio />} label="No" />
                          <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mt: 1 }}>
                        Husband's Details
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Husband's Full Name"
                        size="small"
                        fullWidth
                        value={formData.healthHabits.femaleDetails.husbandName}
                        onChange={(e) => handleFemaleDetailsChange('husbandName', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Husband's Occupation"
                        size="small"
                        fullWidth
                        value={formData.healthHabits.femaleDetails.husbandOccupation}
                        onChange={(e) => handleFemaleDetailsChange('husbandOccupation', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Husband's Annual Income (Rs.)"
                        size="small"
                        fullWidth
                        value={formData.healthHabits.femaleDetails.husbandIncome}
                        onChange={(e) => handleFemaleDetailsChange('husbandIncome', e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Details of Husband's LIC/Other Insurance Policies (if any)"
                        size="small"
                        fullWidth
                        value={formData.healthHabits.femaleDetails.husbandInsurance}
                        onChange={(e) => handleFemaleDetailsChange('husbandInsurance', e.target.value)}
                        placeholder="Policy number, Sum Assured, Status"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HealthHabits;
