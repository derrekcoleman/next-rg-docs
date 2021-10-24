import { getPublicDocs } from '../../lib/posts';

export default function handler(req, res) {
	console.log("Hello I'm Public Doc");
  const data = getPublicDocs();
  res.status(200).json({ data: data });
}
