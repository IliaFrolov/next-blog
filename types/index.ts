import { GrayMatterFile } from 'gray-matter';

export type FileType = GrayMatterFile<string>;

export interface PostApiResponse {
    postInfo: PostType[];
}

export type PostType = {
    title: string;
    slug: string;
    meta: string;
};