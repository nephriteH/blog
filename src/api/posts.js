import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "/src/posts");

export function getSortedPostsData() {
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
  var matterResult;
  dirNames.map((dirName) => {
    const filePath = path.join(postsDirectory, dirName);
    const fileNames = fs.readdirSync(filePath);
    fileNames.map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, dirName, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResultTemp = matter(fileContents);
      if (id == matterResultTemp.data.id) {
        matterResult = matterResultTemp;
      }
    });
  });
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    contentHtml,
    ...matterResult.data,
  };
}
