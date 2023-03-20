import BlogCard from "@/components/BlogCart";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface BlogsProps {}
type PostType = {
  title: string;
  slug: string;
  meta: string;
};
const Blogs: NextPage = ({}: BlogsProps) => {
  const [posts, setPost] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts").then((data) => data.json());
        setPost(res.postInfo);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  if (!posts?.length) return null;
  return (
    <div className="max-w-3xl mx-auto p-5 space-y-5">
      {posts.map(({ title, slug, meta }) => (
        <BlogCard title={title} description={meta} />
      ))}
    </div>
  );
};

export default Blogs;
