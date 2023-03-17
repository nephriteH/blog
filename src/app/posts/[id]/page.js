import styles from "./page.module.scss";
import { getPostDataFromCache, getSortedPostsDataFromCache } from "@/api/posts";
import Date from "@/components/date";
import Link from "next/link";
import "./posts.scss";

export async function generateMetadata({ params }) {
  const postData = await getPostDataFromCache(params.id);
  return { title: postData.matterResult.data.title };
}

export default async function Post({ params }) {
  const postData = await getPostDataFromCache(params.id);

  function preButton(preMatterResult) {
    if (preMatterResult) {
      return (
        <Link href={`/posts/${preMatterResult.data.id}`}>
          <div>上一篇文章</div>
        </Link>
      );
    }
  }

  function nextButton(nextMatterResult) {
    if (nextMatterResult) {
      return (
        <Link href={`/posts/${nextMatterResult.data.id}`}>
          <div>下一篇文章</div>
        </Link>
      );
    }
  }

  return (
    <>
      <main className={styles.main}>
        <article>
          <h1 className={styles.headingXl}>{postData.matterResult.data.title}</h1>
          <div className={styles.date}>
            <Date dateString={postData.matterResult.data.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
        {preButton(postData.preMatterResult)}
        {nextButton(postData.nextMatterResult)}
        <Link href="/posts">
          <div>返回列表页</div>
        </Link>
      </main>
    </>
  );
}
