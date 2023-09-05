import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
  breakpoints: {
    xs: '576px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '1408px',
  },
  fontFamily: 'Overpass, sans-serif',
  colors: {
    brand: [
      '#D1C899',
      '#D0C485',
      '#D2C270',
      '#D7C259',
      '#E0C53F',
      '#EDCB21',
      '#FFD500', //Main yellow shade
      '#DEBC12',
      '#C2A71F',
      '#AB9629',
    ],
  },
  components: {
    Button: {
      defaultProps: {
        size: 'md',
        color: 'brand',
        radius: 'md',
        mt: 'md',
      },
    },
  },
};

export default theme;
