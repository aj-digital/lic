import re

with open('src/components/FormConversational.jsx', 'r') as f:
    content = f.read()

# We need to reorder the questions and the validate cases.
# Current question order (0-indexed):
# 0: Gender
# 1: DOB
# 2: Marital Status
# 3: Name
# 4: Parents Name
# 5: Identity
# 6: Permanent Address
# 7: Current Address
# 8: Contact Info
# 9: Tax
# 10: Education & Occ
# 11: Nominees
# 12: Bank
# 13: Plan
# 14: Health
# 15: Medical
# 16: Declarations

# New order:
# 0-8: (Same) -> Section 0 (About you)
# 9: Tax (old 9)
# 10: Education & Occ (old 10)
# 11: Health (old 14)
# 12: Medical (old 15)
#   -> Section 1 (Your lifestyle)
# 13: Nominees (old 11)
# 14: Bank (old 12)
# 15: Plan (old 13)
# 16: Declarations (old 16)
#   -> Section 2 (Your plan)

# Since doing this via AST in python is hard, we can just map the `activeQ` visually 
# and in the UI without actually changing the array indices, EXCEPT that the flow 
# of `activeQ` goes from 0 to 16. If we don't reorder the array, the user will 
# jump from Section 1 -> Section 2 -> Section 3 -> Section 2 -> Section 3.
# Let's just write a mapping for the logical step index to the actual array index.
# Logical Step (0 to 16) -> Actual Question Index
logical_to_actual = [
    0, 1, 2, 3, 4, 5, 6, 7, 8,  # About you
    9, 10, 14, 15,              # Your lifestyle
    11, 12, 13, 16              # Your plan
]

# We can modify FormConversational to use a logical step index instead of activeQ directly indexing the array.
# Or better, just rewrite the component to map `activeStep` (0-16) to `questions[logical_to_actual[activeStep]]`.

# Let's replace the validateQuestion logic to use `actualIndex`.
# Wait, `validateQuestion` already uses `index`. We can just call `validateQuestion(logical_to_actual[activeStep])`.

# Let's patch `FormConversational.jsx` directly.
# 1. Replace activeQ with activeStep everywhere it's used for flow.

new_content = content

# Replace render function
render_start = new_content.find('  return (')
render_end = new_content.rfind('};')

replacement_render = """
  // Section mapping
  const logicalToActual = [
    0, 1, 2, 3, 4, 5, 6, 7, 8,  // About you
    9, 10, 14, 15,              // Your lifestyle
    11, 12, 13, 16              // Your plan
  ];
  
  const getSectionForStep = (step) => {
    if (step <= 8) return 0;
    if (step <= 12) return 1;
    return 2;
  };
  
  const activeSection = getSectionForStep(activeQ);
  const actualQIndex = logicalToActual[activeQ];
  const activeQuestionItem = questions[actualQIndex];
  
  const sectionLabels = ['About you', 'Your lifestyle', 'Your plan'];

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: { xs: 4, md: 8 }, display: 'flex' }}>
        <Grid container spacing={4} sx={{ width: '100%' }}>
          
          {/* Left Sidebar */}
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
                    
                    {/* Active Indicator Line on the far right */}
                    {activeSection === idx && (
                      <Box sx={{ position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)', width: 2, height: 32, backgroundColor: '#10b981' }} />
                    )}
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Main Card Area */}
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
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0f172a', mb: 4 }}>
                {sectionLabels[activeSection]}
              </Typography>

              {/* Summaries for current section only */}
              <Box sx={{ mb: 3 }}>
                {logicalToActual.slice(0, activeQ).map((qIdx, stepIdx) => {
                  if (getSectionForStep(stepIdx) !== activeSection) return null;
                  const q = questions[qIdx];
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
                        {q.title}
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

              {/* Active Question */}
              <Box sx={{ pt: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 2, color: '#0f172a' }}>
                  {activeQuestionItem.title}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  {activeQuestionItem.render()}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Sticky Bottom Bar */}
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
        <Container maxWidth="lg">
          <Box display="flex" justifyContent="center">
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
        </Container>
      </Box>
    </Box>
  );
"""

new_content = new_content[:render_start] + replacement_render + "\n};\n"

# Also need to fix handleContinue where it validates `activeQ`. It should validate `logicalToActual[activeQ]`.
# Find handleContinue
hc_start = new_content.find('  const handleContinue = () => {')
hc_end = new_content.find('  };', hc_start) + 4

hc_replacement = """  const handleContinue = () => {
    const logicalToActual = [
      0, 1, 2, 3, 4, 5, 6, 7, 8,
      9, 10, 14, 15,
      11, 12, 13, 16
    ];
    const actualQIndex = logicalToActual[activeQ];
    
    const errs = validateQuestion(actualQIndex);
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
  };"""

new_content = new_content[:hc_start] + hc_replacement + new_content[hc_end:]

with open('src/components/FormConversational.jsx', 'w') as f:
    f.write(new_content)
