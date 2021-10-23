import { getPrivateDocs } from '../../lib/posts';
import { utils } from 'ethers';
import { verifyUser } from '../../lib/verifyUser';

export const checkSignature = (hash, signature) => {
  const msgHashBytes = utils.arrayify(hash);
  const account = utils.recoverAddress(msgHashBytes, signature);
  return account.toLowerCase() || '';
};

export default async function handler(req, res) {
  const accountFromSignature = checkSignature(
    req.body.hash,
    req.body.signature,
  );
  const isUserVerified = await verifyUser(accountFromSignature);

  if (typeof isUserVerified === 'boolean' && isUserVerified === true) {
    const data = getPrivateDocs();
    res.status(200).json({ data });
  }
  if (typeof isUserVerified === 'boolean' && isUserVerified === false) {
    res
      .status(500)
      .json({ msg: 'You are not authorized to view private information.' });
  }
}
