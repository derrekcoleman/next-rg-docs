//import { markdownData } from "/markdownFile";

export default function handleRequest(req, res) {
  //const data = markdownData();
  const data = `A paragraph with *emphasis* and **strong importance**.
	> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

	* Lists
	* [ ] todo
	* [x] done

	A table:

	| a | b |
	| - | - |`;
  //console.log(JSON.parse(req.body));

  const incomingData = JSON.parse(req.body);

  if (req.method === 'POST' && incomingData.membership === true) {
    res.status(200).json({ msg: data });
  }
}
