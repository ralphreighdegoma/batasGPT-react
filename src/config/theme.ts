export type ThemeColors = {
  primary: string;
  secondary: string;
  accent: string;
  background: {
    main: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverted: string;
  };
  border: {
    main: string;
    light: string;
  };
  action: {
    active: string;
    hover: string;
    disabled: string;
  };
  status: {
    success: string;
    error: string;
    warning: string;
    info: string;
  };
};

export const lightTheme: ThemeColors = {
  primary: '#4B6CB7', // A deep blue instead of Mastodon's purple
  secondary: '#182848', // Darker blue for contrast
  accent: '#00B4D8', // Bright blue for highlights
  background: {
    main: '#FFFFFF',
    secondary: '#F7F9FC',
    tertiary: '#EEF2F7',
  },
  text: {
    primary: '#1A1B1F',
    secondary: '#4A5056',
    muted: '#6E7683',
    inverted: '#FFFFFF',
  },
  border: {
    main: '#D1D5DB',
    light: '#E5E7EB',
  },
  action: {
    active: '#4B6CB7',
    hover: '#3B5998',
    disabled: '#A0AEC0',
  },
  status: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
};

export const darkTheme: ThemeColors = {
  primary: '#4B6CB7',
  secondary: '#182848',
  accent: '#00B4D8',
  background: {
    main: '#1A1B1F',
    secondary: '#2A2B2F',
    tertiary: '#3A3B3F',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#E5E7EB',
    muted: '#9CA3AF',
    inverted: '#1A1B1F',
  },
  border: {
    main: '#4A5056',
    light: '#374151',
  },
  action: {
    active: '#4B6CB7',
    hover: '#3B5998',
    disabled: '#4A5056',
  },
  status: {
    success: '#059669',
    error: '#DC2626',
    warning: '#D97706',
    info: '#2563EB',
  },
};

// Custom breakpoints
export const breakpoints = {
  xs: '320px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Typography scale
export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Spacing scale
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
};

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
};

// Border radius
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  full: '9999px',
};

const theme = {
  colors: {
    light: lightTheme,
    dark: darkTheme,
  },
  breakpoints,
  typography,
  spacing,
  shadows,
  borderRadius,
};

export default theme; 