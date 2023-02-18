import Head from 'next/head'
import {getPostsService} from "@/services/post";
import {Post} from "@/types/Models/post";
import cache from "@/libs/cache";
import {CACHE_KEY_POSTS} from "@/constants/cache";
import Bio from "@/components/Bio/Bio";
import PostPreview from "@/components/PostPreview/PostPreview";
import {GetStaticProps} from "next";

export default function Home({posts}: { posts: Post[] }) {

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="blog using nextjs"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Bio/>
            <main>
                {
                    !!posts && !!posts.length && posts.map(post =>
                        (<PostPreview {...post} key={post.id}/>))
                }
            </main>
        </>
    )
}


interface MainPageGetStaticProps {
    posts: Post[];
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export const getStaticProps: GetStaticProps<MainPageGetStaticProps> = async () => {
    const cachedData = cache.get(CACHE_KEY_POSTS);
    if (cachedData) {
        return {props: {posts: cachedData as Post[]}};
    }
    const posts = await getPostsService()
    cache.set(CACHE_KEY_POSTS, posts)

    return {
        props: {
            posts,
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
