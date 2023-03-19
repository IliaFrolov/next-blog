import { NextPage } from "next";

interface BlogPostProps {
  title: string;
  description: string;
}

const BlogPost: NextPage<BlogPostProps> = ({
  title,
  description,
}: BlogPostProps) => {
  return (
    <div className="bg-green-100 p-2 rounded">
      <h1 className="text-3xl text-gray-900 font-semibold">{title}</h1>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default BlogPost;
