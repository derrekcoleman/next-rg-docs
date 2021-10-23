---
id: files-and-folders
title: Files and Folders
sidebar_label: Files and Folders
category: Using Web3 Docs
private: false
---

Web3 Documentation (Working Title) uses a File and Folder structure to create a documentation site.

## Folders

We look for a folder in your projects `/src/` called `docs` and read its contents to construct the sidebar.
Web3 Documentation currently expects to find subfolders called `public` and `private`, and expects them to contain `Category` folders for grouping specific files.

## Files

Web3 Documentation uses `react-markdown` and `remark` to render markdown. Just create .md files, add front-matter, write markdown as normal, and it'll be displayed at `url/category/file-id`.

## Front Matter

We use a markdown metadata system called `front-matter` to organize your documentation.
All that's required is for you to add (and populate) the following lines at the beginning of each markdown file:

![http://localhost:3000/docImages/frontmatter.png](http://localhost:3000/docImages/frontmatter.png)