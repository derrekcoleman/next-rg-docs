import { useState, useEffect } from 'react';
import { PageWrapper } from '../../components/PageWrapper';
import { getSignature } from '../../lib/getSignature';
import { getPrivateData } from '../../lib/getPrivateData';
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
				<>
					<Head>
						<title>Docs Overview</title>
					</Head>
					<PageWrapper sidebarData={pageData} privatePageData={privatePageData}>
						<h2>Docs Overview</h2>

					</PageWrapper>
				</>
			}
		</>
	)
}