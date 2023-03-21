import { NextPage } from "next";
import Link from "next/link";

interface BlogPostProps {
  title: string;
  description: string;
  slug: string;
}

const BlogPost: NextPage<BlogPostProps> = ({
  title,
  description,
  slug,
}: BlogPostProps) => {
  return (
    <Link href={`/blogs/${slug}`} className="bg-gray-100 p-2 rounded block">
      <h1 className="text-3xl text-gray-900 font-semibold">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </Link>
  );
};

export default BlogPost;
