import { NextApiHandler } from "next"
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter';

const handler: NextApiHandler = (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET": {
            const data = readPostInfo();
            return res.json({ postInfo: data });
        }
        default: return res.status(404).send('NotFound')
    }

}
const readPostInfo = () => {
    const dirPathToRead = path.join(process.cwd(), "posts")
    const dirs = fs.readdirSync(dirPathToRead);
    return dirs.map((fileName) => {
        const filePathToRead = path.join(process.cwd(), "posts/" + fileName);
        const fileContent = fs.readFileSync(filePathToRead, { encoding: 'utf-8' })
        return (matter(fileContent)).data;
    });
}
export default handler