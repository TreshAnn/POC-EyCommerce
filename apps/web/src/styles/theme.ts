import { MantineThemeOverride } from '@mantine/core';

const theme: MantineThemeOverride = {
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
        color: 'yellow',
        radius: 'md',
        mt: 'md',
      },
    },
  },
};

export default theme;
