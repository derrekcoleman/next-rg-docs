import { ethers } from 'ethers';

export const verifyUser = async (userAddress) => {
	const provider = new ethers.getDefaultProvider(process.env.CONTRACT_CHAIN_RPC);

	const contractAddress = process.env.CONTRACT_ADDRESS;

	// get state off of a subgraph
	// eg xdai subgraph for daohaus
	// abstract to a strategy file, mark in Readme that it is the first of any implementations with instructions for extension

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
	];

	const contract = new ethers.Contract(contractAddress, abi, provider);
	const memberData = await contract.members(userAddress);
	// end subgraph check

	// return true IFF member has more than 1 share
	return (memberData.shares >= 1) ? true : false
}


