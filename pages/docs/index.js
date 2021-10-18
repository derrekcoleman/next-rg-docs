import { useState, useEffect } from 'react';
import { Sidebar } from '../../components/PageWrapper';
import { getSignature } from '../../lib/getSignature';
import { getPrivateData } from '../../lib/getPrivateData';
import { Center, Heading, Box, VStack, Grid } from '@chakra-ui/react'
import { ethers } from "ethers";
import Head from 'next/head';

export default function Page() {

	const [pageData, setPageData] = useState();
	const [privatePageData, setPrivatePageData] = useState();
	const [currentPageData, setCurrentPageData] = useState();
	const [currentPageContent, setCurrentPageContent] = useState();

	useEffect(async () => {
		const response = await fetch('/api/getPublicDocs');
		const resJson = await response.json();
		setPageData(resJson.data);
		if (!window?.sessionStorage.getItem('privateData') && true) {
			// get private data IFF it hasn't already been got and the user is allowed
			const privateResponse = await getPrivateData(await getSignature());
			const stringifiedPrivateData = JSON.stringify(privateResponse.data);
			window.sessionStorage.setItem('privateData', stringifiedPrivateData);
			setPrivatePageData(privateResponse.data);
		}
		if (window?.sessionStorage.getItem('privateData')) {
			const stringifiedPrivateData = window.sessionStorage.getItem('privateData');
			const privateData = JSON.parse(stringifiedPrivateData);
			setPrivatePageData(privateData);
		}
	}, []);

	// Set current page to the first item in the PageData array
	useEffect(() => {
		if (typeof pageData !== 'undefined') {
			const publicCategories = Object.keys(pageData);
			console.log(publicCategories);
		}
	}, [pageData, privatePageData]);

	return (
		<>
			{(typeof pageData !== 'undefined') &&
				<Box h="100vh" w="100vw" overflow="hidden" sx={{ position: `relative` }}>
					<Grid templateColumns="1fr 4fr">
						<Sidebar data={pageData} />
						<Center bg="brand.900" h="100%" w="100%" color="brand.500" sx={{ userSelect: 'none' }}>
							<VStack align="center" spacing="3rem" sx={{ zIndex: `2` }}>
								<Heading as="h2" size="xl" sx={{ textAlign: `center`, textShadow: `0px 4px black` }}>Hark! Adventurers!<br /> Observe a new tool for slaying Moloch: </Heading>
								<Heading as="h1" size="3xl" sx={{ textAlign: `center`, textShadow: `0px 4px black` }}>Web3 Powered Documentation</Heading>
								<Heading as="h2" size="xl" sx={{ textAlign: `center`, textShadow: `0px 4px black` }}>Smart-Contract Secured Arcana</Heading>
							</VStack>
						</Center>
					</Grid>
				</Box>
			}
		</>
	)
}