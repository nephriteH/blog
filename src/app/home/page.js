import { getSortedPostsData } from "@/app/api/posts";
import Link from "next/link";

export default function Index() {
  console.log("1111");
  const allPostsData = getSortedPostsData();
  return (
    <div id="main">
      {allPostsData.map((e) => {
        return (
          <>
            <Link href={`/posts/${e.id}`}>
              <div>{e.title}</div>
            </Link>
          </>
        );
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
