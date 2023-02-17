import Head from 'next/head'
import postUrls from "@/services/post/urls";
import Link from "next/link";
import {GetPostServiceResponse, Post} from "@/types/Models/post";
import cache from "@/libs/cache";
import {CACHE_KEY_POSTS} from "@/constants/cache";
import axios from "axios";

export default function Home({posts, cached}: { cached: boolean; posts: GetPostServiceResponse }) {
    // const {
    //     data,
    //     error,
    //     isLoading,
    //     isValidating,
    // } = useSWR<GetPostServiceResponse>(postUrls.getPosts, baseFetcher)

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="blog using nextjs"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <br/>
            <h1 style={{color: cached ? 'green' : 'red'}}>{cached ? 'cached' : 'no cached'}</h1>
            <br/>
            <div>
                {
                    !!posts && !!posts.length && posts.map(post =>
                        (<div key={post.id}>
                            <Link href={'/post/' + post.id}><h4>{post.title}</h4></Link>
                            <div>{new Date(post.id).toString()}</div>
                        </div>))
                }
            </div>
        </>
    )
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
    const cachedData = cache.get(CACHE_KEY_POSTS);
    if (cachedData) {
        return {props: {cached: true, posts: cachedData}};
    }
    const res = await axios.get<Post[]>(postUrls.getPosts)
    const posts = res.data;

    cache.set(CACHE_KEY_POSTS, posts)

    return {
        props: {
            posts,
            cached: false
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 1 hour
        revalidate: 60 * 60, // In seconds
    }
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
// export async function getStaticPaths() {
//     const res = await fetch(postUrls.getPosts)
//     const posts = await res.json()
//
//     // Get the paths we want to pre-render based on posts
//     const paths = posts.map((post: Post) => ({
//         params: { id: post.id },
//     }))
//
//     // We'll pre-render only these paths at build time.
//     // { fallback: blocking } will server-render pages
//     // on-demand if the path doesn't exist.
//     return { paths, fallback: 'blocking' }
// }
