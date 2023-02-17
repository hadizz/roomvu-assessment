import React from 'react';
import Link from "next/link";
import {Post, ReactKey} from "@/types";
import routes from "@/constants/routes";

type PostPreviewProps = Post & ReactKey

const PostPreview: React.FC<PostPreviewProps> = ({id, title, body, date, key}) => {
    return (
        <article className='mb-32' key={key}>
            <h3 className='link-no-decoration fontSizeLarge'><Link href={`/${routes.post}/${id}`}>{title}</Link></h3>
            <small className='fontFamilySecondary'>{date}</small>
            <p>{body.substring(0, 60)}...</p>
        </article>
    );
};

export default PostPreview;
