---
id: front-matter
title: Front Matter
sidebar_label: Front Matter
category: Using Web3 Docs
private: false
---

We use a markdown metadata system called `front-matter` to organize your documentation.
All that's required is for you to add (and populate) the following lines at the beginning of each markdown file:

```
---
id: {string: url-slug}
title: {string: Title Metadata}
sidebar_label: {string: Text for sidebar link}
category: {string: Category to display under}
private: {string: for privatizing}
---
```

All parameters are required. Often, the title and sidebar_label will be identical, the category will match the folder name, and the id will be a skewer-case version of the title.
