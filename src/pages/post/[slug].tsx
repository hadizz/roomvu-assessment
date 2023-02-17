import React from 'react';
import PostLayout from "@/components/layout/PostLayout/PostLayout";
import axios from 'axios'
import {Post} from "@/types";
import postUrls from "@/services/post/urls";
import {GetStaticPaths, GetStaticProps} from "next";
import cache from "@/libs/cache";
import {CACHE_KEY_POSTS} from "@/constants/cache";

interface PostPageProps {
    postData?: Post;
    cached: boolean;
}

const Post = ({postData, cached}: PostPageProps) => {
    // const router = useRouter()
    // const {slug} = router.query
    // const [isLoading, setIsLoading] = useState<Readonly<boolean>>(true)
    // const [postData, setPostData] = useState<Readonly<Post> | null>(null);
    // const mounted = useMounted()
    // useEffect(() => {
    //     if (slug) {
    //         axios.get('http://localhost:3000/api/post/' + slug).then(res => {
    //             mounted && setPostData(res.data)
    //         }).catch(console.error)
    //             .finally(() => mounted && setIsLoading(false))
    //     }
    // }, [mounted, slug, setIsLoading])

    return (
        <div>
            <h1 style={{color: cached ? 'green' : 'red'}}>{cached ? 'cached' : 'no cached'}</h1>
            {!postData ? 'no data to show' : <div>
                <h2>{postData.title}</h2>
                <div>{new Date(postData.id).toString()}</div>
                <section>{postData.body}</section>
            </div>}
        </div>
    );
};

// use lru cache
export const getStaticProps: GetStaticProps<PostPageProps, { slug: string }, any> = async ({params}) => {
    // check if the data is already in the cache
    const cachedData = cache.get(CACHE_KEY_POSTS) as Post[];
    if (cachedData) {
        return {
            props: {cached: true, postData: cachedData.find(p => p.id.toString() === params?.slug)},
            revalidate: 60 * 60
        }
    }
    // fetch the data from your data source
    const posts = await axios.get<Post[]>(postUrls.getPosts)

    // store the data in the cache
    cache.set(CACHE_KEY_POSTS, posts.data);

    return {
        props: {cached: false, postData: posts.data.find(p => p.id.toString() === params?.slug)},
        revalidate: 60 * 60
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    // const response = await axios.get<Post[]>(postUrls.getPosts)
    return {
        paths: Array.from({length: 100}).map((_, i) => ({
            params: {
                slug: (i + 1).toString()
            },
        })),
        fallback: false,
    }
}

// @ts-ignore
Post.Layout = PostLayout;

export default Post;
