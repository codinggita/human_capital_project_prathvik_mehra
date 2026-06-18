/**
 * Application-wide constants
 */

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const FREQUENCY_TYPES = {
  MONTHLY: 'M',
  ANNUAL: 'A',
};

export const REGIONS = {
  AMERICAS: 'Americas',
  EUROPE: 'Europe',
  APAC: 'Asia Pacific',
};

export const INDICATORS = {
  CPI: 'CPI',
  GDP: 'GDP',
  INFLATION: 'Inflation',
};

export const COUNTRIES = [
  { code: 'US', name: 'United States', region: 'Americas' },
  { code: 'GB', name: 'United Kingdom', region: 'Europe' },
  { code: 'DE', name: 'Germany', region: 'Europe' },
  { code: 'JP', name: 'Japan', region: 'Asia Pacific' },
  { code: 'IN', name: 'India', region: 'Asia Pacific' },
  { code: 'BR', name: 'Brazil', region: 'Americas' },
  { code: 'AU', name: 'Australia', region: 'Asia Pacific' },
  { code: 'FR', name: 'France', region: 'Europe' },
];

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
};
