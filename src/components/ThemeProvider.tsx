'use client';

import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import StyledComponentsRegistry from './registry';
import theme from '../config/theme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <StyledComponentsRegistry>
      <StyledThemeProvider theme={theme}>
        {children}
      </StyledThemeProvider>
    </StyledComponentsRegistry>
  );
}; 