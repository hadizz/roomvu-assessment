import React from 'react';
import PostLayout from "@/components/layout/PostLayout/PostLayout";
import {Post} from "@/types";
import {getPostsService} from "@/services/post";
import {GetStaticPaths, GetStaticProps} from "next";
import cache from "@/libs/cache";
import {CACHE_KEY_POSTS} from "@/constants/cache";
import Typography from "@/components/Typography/Typography";
import {BlogSEO} from "@/components/SEO";
import siteMetaData from "@/constants/siteMetaData";

interface PostPageProps {
    postData?: Post;
}

const Post = ({postData}: PostPageProps) => {
    return (
        <>
            <BlogSEO
                title={postData?.title || siteMetaData.title}
                description={postData?.body.substring(20) || siteMetaData.description}
                date={postData?.date || ''}
                lastmod={postData?.date || ''}
            />
            <div>
                {!postData ? 'no data to show' : <div>
                    <Typography variant={'heading1'}>{postData.title}</Typography>
                    <Typography className='mt-8' variant='body1' fontFamily='secondary'>{postData.date}</Typography>
                    <Typography className='mt-16' variant='body1' fontFamily='secondary'>{postData.body}</Typography>
                </div>}
            </div>
        </>
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
    const posts = await getPostsService()
    cache.set(CACHE_KEY_POSTS, posts);

    return {
        props: {cached: false, postData: posts.find(p => p.id.toString() === params?.slug)},
        revalidate: 60 * 60
    }
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
    return {
        paths: Array.from({length: 100}).map((_, i) => ({
            params: {
                slug: (i + 1).toString()
            },
        })),
        fallback: 'blocking',
    }
}

// @ts-ignore
Post.Layout = PostLayout;

export default Post;
