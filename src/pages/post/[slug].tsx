import React from 'react';
import PostLayout from "@/pages/layout/PostLayout/PostLayout";
import {useRouter} from "next/router";

const Post = ({}) => {
    const router = useRouter()
    const { slug } = router.query
    return (
        <div>
            {slug}
        </div>
    );
};

Post.Layout = PostLayout;

export default Post;
