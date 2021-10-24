import { utils } from 'ethers';

export const getPrivateData = async (data) => {
  function hashSig(msg) {
    return utils.hashMessage(msg);
  }

  const body = {
    signature: data.signature,
    hash: hashSig(data.message),
  };

  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };

  const privateResponse = await fetch(
    `${window?.location.hostname}/api/getPrivateDocs`,
    req,
  ).then((response) => response.json());
  return privateResponse;
};
