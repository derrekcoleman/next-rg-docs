import { Text, Code, Image } from '@chakra-ui/react';

// Style Markdown components here
export const components = {
  p: (props) => {
    const { children } = props;
    return (
      <Text
        sx={{
          fontSize: `1rem`,
          maxWidth: `85ch`,
        }}
      >
        {children}
      </Text>
    );
  },
  code: (props) => {
    const { children } = props;
    return (
      <Code
        sx={{
          backgroundColor: 'white',
          color: 'brand.900',
          fontSize: `1rem`,
        }}
      >
        {children}
      </Code>
    );
  },
};
