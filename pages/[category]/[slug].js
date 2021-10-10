import { useEffect, useState } from 'react';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';
import remarkRehype from 'remark-rehype';
import remarkHtml from 'remark-html';
import matter from "gray-matter";
import { Sidebar } from '../../components/PageWrapper';
import { getSignature } from '../../lib/getSignature';
import { getPrivateData } from '../../lib/getPrivateData';
import { Center, Heading, Box, VStack, Grid } from '@chakra-ui/react'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'

export default function Home(props) {

	const [pageData, setPageData] = useState();
	const [privatePageData, setPrivatePageData] = useState();
	const [currentPageData, setCurrentPageData] = useState();
	const [currentPageContent, setCurrentPageContent] = useState();
	const [currentSlug, setCurrentSlug] = useState();
	const [slugParameters, setSlugParameters] = useState();

	useEffect(async () => {
		setCurrentSlug(window.location.pathname);
		if (!window?.sessionStorage.getItem('publicData')) {
			const response = await fetch('/api/getPublicDocs');
			const resJson = await response.json();
			const stringifiedPublicData = JSON.stringify(resJson.data);
			window.sessionStorage.setItem('publicData', stringifiedPublicData);
			setPageData(resJson.data);
		}
		if (window?.sessionStorage.getItem('publicData')) {
			const stringifiedPublicData = window.sessionStorage.getItem('publicData');
			const publicData = JSON.parse(stringifiedPublicData);
			setPageData(publicData);
		}
		if (!window?.sessionStorage.getItem('privateData')) {
			// get private data IFF it hasn't already been got and the user is allowed
			const privateResponse = await getPrivateData(await getSignature());
			const stringifiedPrivateData = JSON.stringify(privateResponse);
			window.sessionStorage.setItem('privateData', stringifiedPrivateData);
			setPrivatePageData(privateResponse.data);
		}
		if (window?.sessionStorage.getItem('privateData')) {
			const stringifiedPrivateData = window.sessionStorage.getItem('privateData');
			const privateData = JSON.parse(stringifiedPrivateData);
			setPrivatePageData(privateData);
		}
	}, []);

	useEffect(() => {
		setSlugParameters();
		if (typeof currentSlug !== 'undefined') {
			let slugParams = currentSlug?.split("/");
			slugParams.splice(0, 1);
			setSlugParameters(slugParams);
		}
	}, [currentSlug]);

	useEffect(() => {
		if (typeof slugParameters !== 'undefined' && typeof pageData !== 'undefined') {
			pageData[slugParameters[0]]?.forEach((post) => {
				if (slugParameters[1] === post.slug) {
					const { data, content } = matter(post.fileContent);
					setCurrentPageData(data);
					setCurrentPageContent(content);
				}
			});
			if (typeof privatePageData !== 'undefined') {
				console.log(privatePageData);
				privatePageData[slugParameters[0]]?.forEach((post) => {
					// updates current page if private data is available only
					if (slugParameters[1] === post.slug) {
						const { data, content } = matter(post.fileContent);
						setCurrentPageData(data);
						setCurrentPageContent(content);
					}
				});
			}
		}

	}, [pageData, slugParameters, privatePageData])


	return (
		<>
			{(typeof currentPageData !== 'undefined' && typeof currentPageContent !== 'undefined') &&
				<>
					<Head>
						<title>{currentPageData.title}</title>
					</Head>



					<Box h="100vh" w="100vw" sx={{ position: `relative` }}>
						<Grid templateColumns="1fr 4fr" >
							<Sidebar data={pageData} />
							<Box sx={{
								backgroundColor: `brand.900`,
								padding: `2rem`,
								color: 'brand.500',
								overflowY: `scroll`,
								maxHeight: `100vh`
							}}>

								<ReactMarkdown
									components={ChakraUIRenderer()}
									children={currentPageContent}
									remarkPlugins={[remarkHtml, remarkRehype, remarkGfm, remarkImages,]}
									escapeHtml={false}
								/>
							</Box>
						</Grid>
					</Box>
				</>
			}
		</>
	)
}
