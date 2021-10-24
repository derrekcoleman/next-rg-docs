import {countFiles} from '../../lib/posts';

export default function handler(req, res) {

    const count = countFiles();
    if (typeof count !== 'undefined' && req.method === 'GET') {
        res.status(200).json({'count': count});
    }
    if (req.method !== 'GET') {
        res.status(405);
    }
    if (typeof count === 'undefined') {
        res.status(500).json({msg: `couldn't count files.`});
    }
}