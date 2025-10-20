import getData from "@/services/GetData";
import PostList from "@/components/post/PostList";

const PostsPage = async () => {
  const posts = await getData({ url: `posts/random/` });
  return (
    <PostList posts={posts}/>
  )
}

export default PostsPage