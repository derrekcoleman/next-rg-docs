import { ethers, BigNumber, utils } from 'ethers';

export async function getSignature() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const signer = provider.getSigner();

  const message =
    "Sign to authenticate wallet. We'll check if it's registered.";
  const signature = await signer.signMessage(message);

  return {
    message,
    signature,
  };
}
