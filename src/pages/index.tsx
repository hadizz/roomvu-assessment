import {getPostsService} from "@/services/post";
import {Post} from "@/types/Models/post";
import cache from "@/libs/cache";
import {CACHE_KEY_POSTS} from "@/constants/cache";
import Bio from "@/components/Bio/Bio";
import PostPreview from "@/components/PostPreview/PostPreview";
import {GetStaticProps} from "next";
import {PageSEO} from "@/components/SEO";
import siteMetaData from "@/constants/siteMetaData";

export default function Home({posts}: { posts: Post[] }) {

    return (
        <>
            <PageSEO title={siteMetaData.title} description={siteMetaData.description}/>
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
        revalidate: 60 * 60,
    }
}

