// Import fonts declared in theme from fontsource here (before importing theme)
import "@fontsource/texturina/500.css" // you can import multiple weights
import "@fontsource/open-sans/500.css"
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../themes/Default'
import '../styles/globals.css'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
	return (
		<>
		<Head>
			<link rel="shortcut icon" href="/rg-icon.png" />
		</Head>
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
		</>
	)
}

export default MyApp
