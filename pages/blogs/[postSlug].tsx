import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { readPostsInfo } from "../api/posts";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { ParsedUrlQuery } from "querystring";

interface PostProps {
  post: {
    content: string;
    title: string;
  };
}

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  return (
    <>
      <h1 className="text-lg">{post.title}</h1>
      <p>{post.content}</p>
    </>
  );
};

export const getStaticProps: GetStaticProps<PostProps> = ({ params }) => {
  const { postSlug } = params as IStaticProps;
  const filePathToRead = path.join(process.cwd(), "posts/" + postSlug + ".md");
  const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" });
  const { content, data } = matter(fileContent);
  return {
    props: {
      post: { content, title: data.title },
    },
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = readPostsInfo((file) => ({
    params: {
      postSlug: file.data.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};
export default Post;
