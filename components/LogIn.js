import { Box } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { getSignature } from '../lib/getSignature';
import { getPrivateData } from '../lib/getPrivateData';
import { ethers } from "ethers";

export default function LogInButton(props) {

	const [buttonText, setButtonText] = useState('Log In');
	const [address, setAddress] = useState();

	useEffect(() => {
		async function getAddress() {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const signer = provider.getSigner()
			const signerAddress = await signer.getAddress()
			setAddress(signerAddress)
		}
		getAddress()

		if (window?.sessionStorage.getItem('miniAddress')) {
			setButtonText(window.sessionStorage.getItem('miniAddress'));
		}
		if (window?.sessionStorage.getItem('privateData')) {
			if (address) {
				let first4 = address.substring(0, 4);
				let last4 = address.substring(address.length - 4, address.length);
				setButtonText(`${first4}...${last4}`);
				window.sessionStorage.setItem('miniAddress', `${first4}...${last4}`);
			}
		}
	}, [])

	const revealData = async () => {
		if (!window?.sessionStorage.getItem('privateData')) {
			// get private data IFF it hasn't already been got and the user is allowed
			const privateResponse = await getPrivateData(await getSignature());
			const stringifiedPrivateData = JSON.stringify(privateResponse.data);
			window.sessionStorage.setItem('privateData', stringifiedPrivateData);
			props.setDataFunction(privateResponse.data);
			if (address) {
				let first4 = address.substring(0, 4);
				let last4 = address.substring(address.length - 4, address.length);
				setButtonText(`${first4}...${last4}`);
				window.sessionStorage.setItem('miniAddress', `${first4}...${last4}`);
			}
		}
		if (window?.sessionStorage.getItem('privateData')) {
			const stringifiedPrivateData = window.sessionStorage.getItem('privateData');
			const privateData = JSON.parse(stringifiedPrivateData);
			props.setDataFunction(privateData);
			if (address) {
				let first4 = address.substring(0, 4);
				let last4 = address.substring(address.length - 4, address.length);
				setButtonText(`${first4}...${last4}`);
			}
		}
	}

	return (
		<Box
			sx={{
				position: `absolute`,
				right: `0`,
				top: `0`,
				margin: `2rem`,
				color: `brand.500`,
				padding: `1ex 1em`,
				border: `2px solid`,
				borderColor: `brand.500`,
				transition: `all 0.25s`,
				backgroundColor: `brand.900`,
				borderRadius: `.5rem`
			}}
			_hover={{
				cursor: 'pointer',
				backgroundColor: 'brand.500',
				color: 'brand.900'
			}}
			onClick={async () => await revealData()}>{buttonText}</Box>
	)
}