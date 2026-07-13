import React, { useState, useEffect } from 'react';
import { Box, Typography, AppBar, Toolbar, Button } from '@mui/material';
import ShieldIcon from '@mui/icons-material/Shield';
import HelpIcon from '@mui/icons-material/Help';

import StartPage from './components/StartPage';
import OverviewPage from './components/OverviewPage';
import FormConversational from './components/FormConversational';
import ReviewPage from './components/ReviewPage';
import ConfirmationPage from './components/ConfirmationPage';

import { initialFormState } from './initialState';

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('licProposalForm');
    return saved ? JSON.parse(saved) : initialFormState;
  });

  useEffect(() => {
    const handleHashChange = () => setCurrentRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);

    // Auto redirect returning users
    if ((!window.location.hash || window.location.hash === '#/') && localStorage.getItem('licProposalForm')) {
      window.location.hash = '#/overview';
    }

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const saveAndNavigate = (data, path) => {
    setFormData(data);
    localStorage.setItem('licProposalForm', JSON.stringify(data));
    window.location.hash = path;
    window.scrollTo(0, 0);
  };

  const clearData = () => {
    localStorage.removeItem('licProposalForm');
    setFormData(initialFormState);
    window.location.hash = '#/';
  };

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '#/overview':
        return <OverviewPage formData={formData} onNavigate={saveAndNavigate} />;
      case '#/apply':
        return <FormConversational formData={formData} onNavigate={saveAndNavigate} />;
      case '#/review':
        return <ReviewPage formData={formData} onNavigate={saveAndNavigate} />;
      case '#/confirmation':
        return <ConfirmationPage formData={formData} onClear={clearData} />;
      case '#/':
      default:
        return <StartPage onStart={() => window.location.hash = '#/overview'} />;
    }
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" sx={{ backgroundColor: '#f8fafc' }}>
      {/* Sleek Modern White Header */}
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
        <Box sx={{ width: '100%', maxWidth: '880px', mx: 'auto', px: 3 }}>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: 82 }}>
            {/* Logo Group */}
            <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }} onClick={() => window.location.hash = '#/'}>
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
                  textTransform: 'none',
                  fontWeight: 600,
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

      {/* Main Content Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {renderCurrentPage()}
      </Box>
    </Box>
  );
}

export default App;
