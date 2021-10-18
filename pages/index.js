import { useEffect } from 'react'
import { Center, Heading, Box, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { ethers } from "ethers";
export default function Home() {



	// EnterApp component in this file should be the event trigger for opening the web3 portion of the app.
	// Confirming web3 existence and current network *could* happen on this page

	const goToDocsIndex = async () => {
		await getMetamask()
		window.location.pathname = '/docs';
	}
	async function getMetamask() {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		console.log(provider);
		await provider.send("eth_requestAccounts", []);
		const signer = provider.getSigner()
		await signer.getAddress()
	}

	return (
		<Box h="100vh" w="100vw" overflow="hidden" sx={{ position: `relative` }}>
			<Center bg="brand.900" h="100vh" w="100vw" color="brand.500" sx={{ position: `absolute`, top: 0, left: 0, userSelect: 'none' }}>
				<SlayingMoloch />
				<VStack align="center" spacing="3rem" sx={{ zIndex: `2` }}>
					<Heading as="h2" size="xl" sx={{ textAlign: `center`, textShadow: `0px 4px black` }}>Hark! Adventurers!<br /> Observe a new tool for slaying Moloch:</Heading>
					<Heading as="h1" size="3xl" sx={{ textAlign: `center`, textShadow: `0px 4px black` }}>Web3 Powered Documentation</Heading>
					<Heading as="h2" size="xl" sx={{ textAlign: `center`, textShadow: `0px 4px black` }}>Smart-Contract Secured Arcana</Heading>
					<EnterApp onClick={async () => await goToDocsIndex()} />
				</VStack>
			</Center>
			<ByRaidGuild />
		</Box>
	);
}

function ByRaidGuild() {

	return (
		<a href="https://www.raidguild.org/" target="_blank" rel="author">
			<Box
				border="1px"
				borderColor="brand.500"
				sx={{ position: "absolute", bottom: "0", right: "0", padding: "1rem", margin: '2rem' }}
				color="brand.500"
				_hover={{ background: "brand.500", color: "white" }}
			>
				<Heading sx={{ fontSize: `1rem` }}>Built by RaidGuild</Heading>
			</Box>
		</a>
	)
}

function SlayingMoloch() {
	return (
		<Box
			sx={{
				position: 'absolute',
				opacity: 0.1,
				width: `100vw`,
				height: `100vh`,
				overflow: `hidden`,
				display: `grid`,
				placeItems: `center`,
				zIndex: `0`
			}}

		>
			<img src="/raidBanner.png" alt="Adventurers Slaying Moloch" style={{ height: `150vh`, transform: `translateY(-15%)` }} />
		</Box>
	)
}

function EnterApp(props) {

	return (
		<Box
			border="3px solid"
			borderColor="brand.500"
			color="brand.500"
			borderRadius="3"
			_hover={{ background: "brand.500", color: "white", cursor: `pointer` }}
			onClick={props.onClick}
		>
			<Heading sx={{ padding: "1.5ex", paddingTop: `1ex` }}>Obtain New Powers</Heading>
		</Box>
	)
}