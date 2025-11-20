import { getSortedPostsDataFromCache } from "@/api/posts";
import Link from "next/link";

export default async function Index() {
  const allPostsData = await getSortedPostsDataFromCache();
  return (
    <div id="main">
      {allPostsData.map((e) => {
        return e.files.map((file) => {
          return (
            <>
              <Link href={`/posts/${file.id}`}>
                <div>{file.title}</div>
              </Link>
            </>
          );
        });
      })}
    </div>
  );
}
