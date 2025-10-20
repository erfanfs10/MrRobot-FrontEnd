import getData from "@/services/GetData";
import PostDetail from "@/components/post/PostDetail";
import { Suspense } from "react";
import Loading from "./loading";

const PostDetailPage = async ({ params }) => {
  const { postSlug } = await params;
  const data = await getData({ url: `posts/${postSlug}/` });
  return (
    <Suspense fallback={<Loading />}>
      <PostDetail data={data} />
    </Suspense>
  );
};

export default PostDetailPage;
