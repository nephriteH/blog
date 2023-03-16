import { getSortedPostsData } from "@/api/posts";
import Link from "next/link";

export default function Index() {
  const allPostsData = getSortedPostsData();
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

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData,
//     },
//   };
// }
