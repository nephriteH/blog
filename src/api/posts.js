import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { cache } from "react";

export const getPostDataFromCache = cache(async (id) => {
  const data = await getPostData(id);
  return data;
});

export const getSortedPostsDataFromCache = cache(async () => {
  const data = await getSortedPostsData();
  return data;
});

const postsDirectory = path.join(process.cwd(), "/posts");

export async function getSortedPostsData() {
  // Get file names under /posts
  const dirNames = fs.readdirSync(postsDirectory);
  const allPostsData = dirNames.map((dirName) => {
    const filePath = path.join(postsDirectory, dirName);
    const fileNames = fs.readdirSync(filePath);
    const files = fileNames.map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, dirName, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);
      // Combine the data with the id
      return {
        ...matterResult.data,
      };
    });
    files.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
    return {
      files,
    };
  });

  // Sort posts by date
  return allPostsData;
}

export async function getPostData(id) {
  // Get file names under /posts
  const dirNames = fs.readdirSync(postsDirectory);
  // 记录匹配到的文章
  var matterResult;
  // 记录匹配到的文章的上一篇
  var preMatterResult;
  // 记录匹配到的文章的下一篇
  var nextMatterResult;
  for (let i = 0; i < dirNames.length; i++) {
    const dirName = dirNames[i];
    const filePath = path.join(postsDirectory, dirName);
    const fileNames = fs.readdirSync(filePath);
    for (let j = 0; j < fileNames.length; j++) {
      const fileName = fileNames[j];
      const fullPath = path.join(postsDirectory, dirName, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResultTemp = matter(fileContents);
      if (id == matterResultTemp.data.id) {
        matterResult = matterResultTemp;
        // 获取下一篇文章
        if (j + 1 < fileNames.length) {
          const nextFileName = fileNames[j + 1];
          const nextFullPath = path.join(postsDirectory, dirName, nextFileName);
          const nextFileContents = fs.readFileSync(nextFullPath, "utf8");
          nextMatterResult = matter(nextFileContents);
        }
        break;
      }
      preMatterResult = matterResultTemp;
    }
    if (matterResult) {
      break;
    }
    preMatterResult = null;
  }

  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    contentHtml,
    matterResult,
    preMatterResult,
    nextMatterResult,
  };
}
