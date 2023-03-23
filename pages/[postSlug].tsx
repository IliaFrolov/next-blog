import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { readPostsInfo } from "../lib/helpers";
import fs from "fs";
import path from "path";
import { ParsedUrlQuery } from "querystring";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import {} from "@tailwindcss/typography";
import { FileType } from "@/types";

interface PostProps {
  post: {
    content: MDXRemoteSerializeResult;
    title: string;
  };
}

interface IStaticProps extends ParsedUrlQuery {
  postSlug: string;
}

const Post: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  if (!post) return null;
  const { title, content } = post;
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-bold text-3xl py-5">{title}</h1>
      <div className="prose pb-20">
        <MDXRemote {...content} />
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  try {
    const { postSlug } = params as IStaticProps;
    const filePathToRead = path.join(
      process.cwd(),
      "posts/" + postSlug + ".md"
    );
    const fileContent = fs.readFileSync(filePathToRead, { encoding: "utf-8" });
    const source: any = await serialize(fileContent, {
      parseFrontmatter: true,
    });

    return {
      props: {
        post: { content: source, title: source?.frontmatter?.title },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = () => {
  const paths = readPostsInfo((file: FileType) => ({
    params: {
      postSlug: file.data.slug,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
export default Post;
