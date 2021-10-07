import { getPrivateDocs } from '../../lib/posts';
import { utils } from 'ethers'
import { verifyUser } from '../../lib/verifyUser';

export const checkSignature = (message, signature) => {
	const msgHash = utils.hashMessage(message)
	const msgHashBytes = utils.arrayify(msgHash)
	const account = utils.recoverAddress(msgHashBytes, signature)
	return account.toLowerCase() || ''
}

export default async function handler(req, res) {

	// Not sure?
	// const parsedBody = JSON.parse(req.body);
	// console.log(parsedBody);
	const message = req.body.message;
	const signature = req.body.signature;

	const accountFromSignature = checkSignature(message, signature)
	//console.log('Account from signature is ', accountFromSignature);

	const isUserVerified = await verifyUser(accountFromSignature);

	if (typeof isUserVerified === 'boolean' && isUserVerified === true) {
		const data = getPrivateDocs();
		res.status(200).json({ data });
	}
	if (typeof isUserVerified === 'boolean' && isUserVerified === false) {
		res.status(500).json({ 'msg': 'You are not authorized to view private information.' });
		// todo: add a modal to display msg.
	}

}
