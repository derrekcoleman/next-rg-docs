---
id: fetching
title: Fetching
sidebar_label: Fetching
category: Using Web3 Docs
private: false
---

Fetching is currently done dynamically over http to ensure security of private data, and there are two fetch cases.

The public data fetch flow is:

1. Check if data is currently stored in sessionStorage
   - If so, parse and display that data
   - If not, fetch data
2. If fetching data, we use node's `fs` filesystem utility to read all the contents in a folder named `docs` into a multidimensional array.
   1. We filter any files that have their `private` frontmatter tag set to `true`.
   2. We flatten the array and return to the front end.
3. When data is available to the front end, the `sidebar` component reads the array and collects `id`, `sidebar_label`, and `category`
   1. it then creates category lists based on each `category` it sees (in the order it sees them, ie matching the contents of `docs`)
   2. it then populates the category lists with links that display the `sidebar-label` as text, and link to `url/{category}/{id}`
4. On the `pages/[category]/[slug].js` page, the `window.uri.pathname` is parsed into a two element array
5. We search the public data array for an item that has an ID matching the second element of the `pathname` array
6. That element is an object that has a `fileContent` key that contains the markdown, which is passed to a markdown parser to render the page.

The private data fetch flow is similar:

1. Check if data is currently stored in sessionStorage
   - If so, parse and display that data
   - If not, go to Public Data Flow step 1
2. When the user clicks on the Log In button, they are asked to sign a message.
3. This signature is processed in a file called `verifyUser
4. If fetching data, we use node's `fs` filesystem utility to read all the contents in a folder named `docs` into a multidimensional array.
   1. We filter any files that have their `private` frontmatter tag set to `true`.
   2. We flatten the array and return to the front end.
5. When data is available to the front end, the `sidebar` component reads the array and collects `id`, `sidebar_label`, and `category`
   1. it then creates category lists based on each `category` it sees (in the order it sees them, ie matching the contents of `docs`)
   2. it then populates the category lists with links that display the `sidebar-label` as text, and link to `url/{category}/{id}`
6. On the `pages/[category]/[slug].js` page, the `window.uri.pathname` is parsed into a two element array
7. We search the public data array for an item that has an ID matching the second element of the `pathname` array
8. That element is an object that has a `fileContent` key that contains the markdown, which is passed to a markdown parser to render the page.
