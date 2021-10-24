import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

//Finding directory named "docs" from the current working directory of Node.
const postDirectory = path.join(process.cwd(), 'docs');

export const getPublicDocs = () => {
  const folderNames = fs.readdirSync(postDirectory);
  const allPostsData = folderNames.map((folder, index) => {
    const loc = path.join(postDirectory, folder);
    const fileNames = fs.readdirSync(loc);
    const postData = fileNames.map((fileName) => {
      const slug = fileName.replace('.md', '');
      const fullPath = path.join(loc, fileName);
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContent);
      if (!data.private) {
        return {
          slug,
          ...data,
          fileContent,
        };
      }
      if (data.private) {
        return null;
      }
    });

    // no private data :)
    const filteredData = postData.filter((item) => item !== null);

    return {
      folder: folder,
      filteredData,
    };
  });

  // convert all posts to be flat, organize later by category
  let postCount = 0;
  let flatPosts = [];
  allPostsData.forEach((folder) => {
    folder.filteredData.forEach((post) => {
      flatPosts[postCount] = post;
      postCount++;
    });
  });

  return flatPosts;
};

export const getPrivateDocs = () => {
  const folderNames = fs.readdirSync(postDirectory);

  const allPostsData = folderNames.map((folder) => {
    const loc = path.join(postDirectory, folder);
    const fileNames = fs.readdirSync(loc);
    const allPosts = fileNames.map((fileName) => {
      const slug = fileName.replace('.md', '');
      const fullPath = path.join(loc, fileName);
      const fileContent = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContent);
      // return everything
      return {
        slug,
        ...data,
        fileContent,
      };
    });

    return {
      folder: folder,
      allPosts,
    };
  });

  // convert all posts to be flat, organize later by category
  let postCount = 0;
  let flatPosts = [];
  allPostsData.forEach((folder) => {
    folder.allPosts.forEach((post) => {
      flatPosts[postCount] = post;
      postCount++;
    });
  });

  return flatPosts;
};

export const getPublicPostData = async (slug) => {
  const fullPath = path.join(publicDirectory, `${slug}.md`);
  const postContent = fs.readFileSync(fullPath, 'utf8');
  return postContent;
};

export const getPublicPostSlugs = () => {
  const fileNames = fs.readdirSync(publicDirectory);

  return fileNames.map((filename) => {
    return {
      params: {
        slug: filename.replace('.md', ''),
      },
    };
  });
};


export const countFiles = () => {
  const folderNames = fs.readdirSync(postDirectory);
  let fileCount = 0;

  folderNames.forEach(folder => {
    const loc = path.join(postDirectory, folder);
    const fileNames = fs.readdirSync(loc);
    fileCount += fileNames.length;
    console.log(fileCount);
  });

  return fileCount;
}