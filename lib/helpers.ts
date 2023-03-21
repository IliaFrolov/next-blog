import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';
import { FileType } from '@/types';

export const readPostsInfo = (mapper: (file: FileType) => any) => {
    const dirPathToRead = path.join(process.cwd(), "posts")
    const dirs = fs.readdirSync(dirPathToRead);
    return dirs.map((fileName) => {
        const filePathToRead = path.join(process.cwd(), "posts/" + fileName);
        const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' })
        return mapper((matter(fileContent)));
    });
}
// try {
//     const { postInfo }: PostApiResponse = await fetch(
//       "http://localhost:3000/api/posts"
//     ).then((data) => data.json());
//     return {
//       props: { posts: postInfo },
//     };
//   } catch (err) {
//     console.error(err);
//     return {
//       props: { error: `${err}`, posts: [] },
//     };
//   }