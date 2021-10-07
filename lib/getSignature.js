import { ethers, BigNumber, utils } from 'ethers'




export async function getSignature() {
	//Need to add 'Please switch to the approripate network' if not xDai
	// const xDaiProvider = new ethers.getDefaultProvider('https://rpc.xdaichain.com/'); -> comparing this object doesn't contribute to above logic
	const provider = new ethers.providers.Web3Provider(window.ethereum)

	const signer = provider.getSigner()

	const message = 'Sign here.'
	const signature = await signer.signMessage(message);

	return {
		message,
		signature
	}
}