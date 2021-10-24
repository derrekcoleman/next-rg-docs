---
id: files-and-folders
title: Files and Folders
sidebar_label: Files and Folders
category: Using Web3 Docs
private: false
---

Web3 Documentation (Working Title) uses a File and Folder structure to create a documentation site.

## Folders

We look for a folder in your projects `/src/` called `docs` and read it's contents to construct the sidebar.
Web3 Documentation currently expects to find `category` subfolders. These the subfolder names are not displayed on the front end, but are 0-z sorted (numbers rank higher than letters, then it's alphabetical) and control the order in which sidebar categories are created.

## Files

Web3 Documentation uses `react-markdown`, `remark`, and `rehype` to render markdown. Just create .md files, add front-matter, write markdown as normal, and it'll be displayed at `[your-url]/[category]/[file-id]`.
