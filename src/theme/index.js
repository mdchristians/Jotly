import { theme } from "@chakra-ui/core";

const breakpoints = ['360px', '768px', '1024px', '1440px'];

export default {
  ...theme,
  breakpoints,
  fonts: {
    body: "'avenir next', avenir, helvetica, arial, sans-serif",
    heading: "'avenir next', avenir, helvetica, arial, sans-serif",
  },
  colors: {
    ...theme.colors,
    grayDark: '#2d3748',
    text: '#2d3748',
    textDark: theme.colors.gray[900],
    background: '#F4F8FC',
    primary: '#2b6cb0',
    primaryHover: '#2c5282',
    secondary: '#718096',
    muted: '#e2e8f0',
    success: '#9ae6b4',
    info: '#63b3ed',
    warning: '#faf089',
    danger: '#feb2b2',
    light: '#f7fafc',
    dark: '#2d3748',
    textMuted: '#718096'
  },
  shadows: {
    ...theme.shadows,
    card: "0 26px 30px -14px rgba(0,0,0,0.08)"
  }
};
