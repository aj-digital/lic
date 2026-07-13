import React from 'react';
import { Container, Box, Typography, Paper, AppBar, Toolbar, Button, Link } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import HelpIcon from '@mui/icons-material/Help';
import FormConversational from './components/FormConversational';

function App() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" sx={{ backgroundColor: '#f8fafc' }}>
      {/* Sleek Modern White Header (ACKO Inspired) */}
      <AppBar 
        position="sticky" 
        elevation={0} 
        sx={{ 
          backgroundColor: '#ffffff', 
          borderBottom: '1px solid #f1f5f9',
          top: 0,
          zIndex: 1100
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1000px', mx: 'auto', px: 2 }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 64 }}>
            {/* Logo Group */}
            <Box display="flex" alignItems="center">
              <ShieldIcon sx={{ fontSize: 28, mr: 1, color: '#00529B' }} />
              <Box display="flex" flexDirection="column">
                <Typography variant="h6" component="div" sx={{ fontWeight: 800, color: '#00529B', m: 0, lineHeight: 1.1, fontSize: '1.15rem' }}>
                  LIC Digital
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, fontSize: '0.65rem', letterSpacing: '0.2px' }}>
                  LIFE INSURANCE CORPORATION OF INDIA
                </Typography>
              </Box>
            </Box>

            {/* Support Pill Button */}
            <Box>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<HelpIcon />}
                component="a" 
                href="https://www.licindia.in" 
                target="_blank"
                sx={{ 
                  borderRadius: '20px', 
                  fontSize: '0.8rem', 
                  py: 0.5, 
                  px: 2, 
                  borderColor: '#cbd5e1', 
                  color: '#475569',
                  '&:hover': {
                    borderColor: '#00529B',
                    color: '#00529B',
                    backgroundColor: 'rgba(0, 82, 155, 0.04)'
                  }
                }}
              >
                Help
              </Button>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      {/* Main Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <FormConversational />
      </Box>
    </Box>
  );
}

export default App;
