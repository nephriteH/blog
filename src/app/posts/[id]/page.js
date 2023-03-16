import utilStyles from "./page.module.css";
import { getPostData } from "@/api/posts";
import Date from "@/components/date";
export default async function Post({ params }) {
  const postData = await getPostData(params.id);
  return (
    <>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </>
  );
}
