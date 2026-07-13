import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00529B', // LIC Blue
      light: '#3b82f6', // Modern blue
      dark: '#1e3a8a',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6366f1', // Indigo accent
      light: '#818cf8',
      dark: '#4f46e5',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc', // Very soft slate blue-grey background (modern minimalist)
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a', // Slate 900
      secondary: '#475569', // Slate 600
    },
    success: {
      main: '#10b981', // Emerald 500
    },
    warning: {
      main: '#f59e0b',
    },
    error: {
      main: '#ef4444', // Red 500
    },
  },
  typography: {
    fontFamily: '"Outfit", "Inter", sans-serif',
    h3: {
      fontWeight: 800,
      color: '#0f172a',
      letterSpacing: '-0.5px',
    },
    h4: {
      fontWeight: 800,
      color: '#0f172a',
      letterSpacing: '-0.5px',
    },
    h5: {
      fontWeight: 700,
      color: '#0f172a',
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 500,
      color: '#475569',
    },
    body1: {
      lineHeight: 1.6,
      color: '#334155',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '0.95rem',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30, // Pill shaped buttons like ACKO
          padding: '12px 28px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 82, 155, 0.12)',
            backgroundColor: '#004787',
          },
        },
        containedPrimary: {
          backgroundColor: '#00529B',
          color: '#ffffff',
        },
        outlinedPrimary: {
          borderColor: '#e2e8f0',
          color: '#00529B',
          borderWidth: '1.5px',
          '&:hover': {
            borderColor: '#00529B',
            borderWidth: '1.5px',
            backgroundColor: 'rgba(0, 82, 155, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 24, // Generous rounding for modern dashboard/card UI
          boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.02)',
          border: '1px solid #f1f5f9',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: 'medium',
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12, // Round inputs like ACKO
            backgroundColor: '#ffffff',
            '& fieldset': {
              borderColor: '#cbd5e1',
              borderWidth: '1px',
            },
            '&:hover fieldset': {
              borderColor: '#00529B',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00529B',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#cbd5e1',
            borderWidth: '1px',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#00529B',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#cbd5e1',
          '&.Mui-checked': {
            color: '#00529B',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#cbd5e1',
          '&.Mui-checked': {
            color: '#00529B',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#475569',
          fontWeight: 600,
          fontSize: '0.9rem',
          '&.Mui-focused': {
            color: '#00529B',
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '12px !important',
          border: '1px solid #e2e8f0',
          boxShadow: 'none',
          '&::before': {
            display: 'none',
          },
        },
      },
    },
  },
});

export default theme;
