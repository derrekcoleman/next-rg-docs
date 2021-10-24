import { getPublicDocs } from '../../lib/posts';

export default function handler(req, res) {
  const data = getPublicDocs();
  res.status(200).json({ data: data });
}
