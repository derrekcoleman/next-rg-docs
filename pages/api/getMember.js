import { ethers, BigNumber, utils } from 'ethers'

export const checkSignature = (message, signature) => {
	const msgHash = utils.hashMessage(message)
	const msgHashBytes = utils.arrayify(msgHash)
	const account = utils.recoverAddress(msgHashBytes, signature)
	return account.toLowerCase() || ''
}

export default async function isMember() {
	//Need to add 'Please switch to the approripate network' if not xDai
	const provider = new ethers.providers.Web3Provider(window.ethereum)

	// Prompt user for account connections
	//let result = await provider.send('eth_requestAccounts', [])
	//console.log('The address is ', result[0])

	const signer = provider.getSigner()
	const userAddress = await signer.getAddress()

	const message = 'Sign here.'
	const signature = await signer.signMessage(message)
	const accountFromSignature = checkSignature(message, signature)
	console.log('Account from signature is ', accountFromSignature)


	// anything that needs 'contactAddress' needs to be in a /api/[file]
	const contractAddress = ''
	const abi = [
		{
			type: 'function',
			stateMutability: 'view',
			payable: false,
			outputs: [
				{ type: 'address', name: 'delegateKey' },
				{ type: 'uint256', name: 'shares' },
				{ type: 'uint256', name: 'loot' },
				{ type: 'bool', name: 'exists' },
				{ type: 'uint256', name: 'highestIndexYesVote' },
				{ type: 'uint256', name: 'jailed' },
			],
			name: 'members',
			inputs: [{ type: 'address', name: '' }],
			constant: true,
		},
	]
	const contract = new ethers.Contract(contractAddress, abi, provider)
	const memberData = await contract.members(userAddress)
	const existence = memberData.exists
	return existence
}