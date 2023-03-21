import { readPostsInfo } from "@/lib/helpers";
import { NextApiHandler } from "next"
import { FileType, PostType } from "../../types";

type PostFileContent = {
    data: PostType;
    content: string;
}
const handler: NextApiHandler = (req, res) => {
    const { method } = req;

    switch (method) {
        case "GET": {
            const data = readPostsInfo((file: FileType) => file.data as PostType);
            return res.json({ postInfo: data });
        }
        default: return res.status(404).send('NotFound')
    }

}


export default handler