import BlogCard from "@/components/BlogCart";
import { NextPage } from "next";

interface BlogsProps {}

const Blogs: NextPage = ({}: BlogsProps) => {
  return (
    <div className="max-w-3xl mx-auto p-5 space-y-5">
      <BlogCard
        title="Lorem ipsum dolor sit amet."
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, laborum eligendi. Maiores assumenda impedit possimus modi laboriosam, in deleniti voluptate?"
      />
      <BlogCard
        title="Lorem ipsum dolor sit amet."
        description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eius, laborum eligendi. Maiores assumenda impedit possimus modi laboriosam, in deleniti voluptate?"
      />
    </div>
  );
};

export default Blogs;
