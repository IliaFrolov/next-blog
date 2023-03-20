import { NextApiHandler } from "next"
import fs from 'fs'
import path from 'path'
import matter, { GrayMatterFile } from 'gray-matter';
import { PostType } from "../blogs";

type PostFileContent = {
    data: PostType;
    content: string;
}
const handler: NextApiHandler = (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET": {
            const data = readPostsInfo((file: GrayMatterFile<string>) => file.data as PostType);
            return res.json({ postInfo: data });
        }
        default: return res.status(404).send('NotFound')
    }

}

export const readPostsInfo = (mapper: (file: GrayMatterFile<string>) => any) => {
    const dirPathToRead = path.join(process.cwd(), "posts")
    const dirs = fs.readdirSync(dirPathToRead);
    return dirs.map((fileName) => {
        const filePathToRead = path.join(process.cwd(), "posts/" + fileName);
        const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' })
        return mapper((matter(fileContent)));
    });
}
export default handler