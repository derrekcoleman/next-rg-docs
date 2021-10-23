// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc.
const colors = {
  // the "Brand" object makes colours available by numbers
  brand: {
    900: 'rgb(7,9,10)', // RaidGuild Black (slightly Purple)
    800: 'rgb(67,69,90)', // RaidGuild Dark Gray
    500: 'rgb(255,56,100)', // RaidGuild Red
    200: 'rgb(167, 169, 190)', // RaidGuild Gray (slightly Purple)
    100: 'rgb(247, 249, 250)', // RaidGuild White (slightly Purple)
  },
};

// add Google Fonts using @fontsource
const fonts = {
  heading: 'Texturina',
  body: 'Open Sans',
};

// export the theme to provide to ChakraProvider in pages/_app
export const theme = extendTheme({ colors, fonts });
