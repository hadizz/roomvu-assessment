// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'
import postUrls from "@/services/post";

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const postsResponse = await fetch(postUrls.getPosts + req.query.slug).then(r => r.json())
    res.status(200).setHeader('cache-control', 'public,max-age=31536000,immutable').json(postsResponse)
}
