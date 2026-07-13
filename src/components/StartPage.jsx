import React from 'react';
import { Box, Typography, Button, Paper, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TimerIcon from '@mui/icons-material/Timer';
import SecurityIcon from '@mui/icons-material/Security';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const StartPage = ({ onStart }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: '880px', mx: 'auto', px: 3, py: { xs: 4, md: 8 } }}>
      <Typography variant="h3" sx={{ fontWeight: 900, color: '#0f172a', mb: 2, letterSpacing: '-1px' }}>
        Apply for LIC life insurance
      </Typography>
      
      <Typography variant="subtitle1" sx={{ color: '#475569', fontSize: '1.1rem', mb: 4, maxWidth: '700px' }}>
        Use this service to complete your LIC life insurance proposal. 
        You are applying for the <strong>LIC New Endowment Plan</strong>.
      </Typography>

      <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: '#ffffff', mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0f172a', mb: 3 }}>
          Before you start
        </Typography>

        <List sx={{ mb: 2 }}>
          <ListItem disablePadding sx={{ mb: 2, alignItems: 'flex-start' }}>
            <ListItemIcon sx={{ mt: 0.5, minWidth: 40 }}>
              <TimerIcon sx={{ color: '#00529B' }} />
            </ListItemIcon>
            <ListItemText 
              primary="This takes around 15 minutes" 
              secondary="Your progress is saved automatically on this device. You can safely close this window and return later."
              primaryTypographyProps={{ fontWeight: 700, color: '#1e293b' }}
              secondaryTypographyProps={{ mt: 0.5 }}
            />
          </ListItem>
          
          <ListItem disablePadding sx={{ mb: 2, alignItems: 'flex-start' }}>
            <ListItemIcon sx={{ mt: 0.5, minWidth: 40 }}>
              <DocumentScannerIcon sx={{ color: '#00529B' }} />
            </ListItemIcon>
            <ListItemText 
              primary="Information you will need" 
              secondary="Have your PAN card, Aadhaar card, bank details, and any previous insurance policy numbers ready."
              primaryTypographyProps={{ fontWeight: 700, color: '#1e293b' }}
              secondaryTypographyProps={{ mt: 0.5 }}
            />
          </ListItem>

          <ListItem disablePadding sx={{ alignItems: 'flex-start' }}>
            <ListItemIcon sx={{ mt: 0.5, minWidth: 40 }}>
              <SecurityIcon sx={{ color: '#00529B' }} />
            </ListItemIcon>
            <ListItemText 
              primary="How we use your data" 
              secondary="We use your personal and medical information strictly to assess your insurance application. It is stored securely and never shared with unauthorized third parties."
              primaryTypographyProps={{ fontWeight: 700, color: '#1e293b' }}
              secondaryTypographyProps={{ mt: 0.5 }}
            />
          </ListItem>
        </List>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Button 
          variant="contained" 
          size="large"
          endIcon={<ArrowForwardIcon />}
          onClick={onStart}
          sx={{ 
            backgroundColor: '#00529B', 
            color: '#fff', 
            py: 1.5, 
            px: 4, 
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '1.1rem',
            textTransform: 'none',
            '&:hover': { backgroundColor: '#003D73' }
          }}
        >
          Start application
        </Button>
      </Box>

      <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid #e2e8f0' }}>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Need help? <a href="#" style={{ color: '#00529B', fontWeight: 600, textDecoration: 'none' }}>Contact LIC Support</a> or call 022-68276827.
        </Typography>
      </Box>
    </Box>
  );
};

export default StartPage;
