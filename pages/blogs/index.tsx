import BlogCard from "@/components/BlogCart";
import { readPostsInfo } from "@/lib/helpers";
import { FileType, PostApiResponse, PostType } from "@/types";
import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { useEffect, useState } from "react";

interface BlogsProps {
  posts: PostType[];
}

const Blogs: NextPage<BlogsProps> = ({ posts }) => {
  if (!posts?.length) return null;
  return (
    <div className="max-w-3xl mx-auto p-5 space-y-5">
      {posts.map(({ title, slug, meta }) => (
        <BlogCard key={slug} slug={slug} title={title} description={meta} />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<BlogsProps> = async () => {
  // try {
  //   const { postInfo }: PostApiResponse = await fetch(
  //     "http://localhost:3000/api/posts"
  //   ).then((data) => data.json());
  //   return {
  //     props: { posts: postInfo },
  //   };
  // } catch (err) {
  //   console.error(err);
  //   return {
  //     props: { error: `${err}`, posts: [] },
  //   };
  // }
  const postInfo: PostType[] = readPostsInfo(
    (file: FileType) => file.data as PostType
  );
  return {
    props: {
      posts: postInfo,
    },
  };
};

export default Blogs;
