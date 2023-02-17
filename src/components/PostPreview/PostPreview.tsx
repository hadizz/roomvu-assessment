import React from 'react';
import Link from "next/link";
import {Post, ReactKey} from "@/types";
import routes from "@/constants/routes";
import Typography from "@/components/Typography/Typography";

type PostPreviewProps = Post & ReactKey

const PostPreview: React.FC<PostPreviewProps> = ({id, title, body, date, key}) => {
    return (
        <article className='mb-32' key={key}>
            <Typography variant='heading3' color='link-no-decoration'><Link
                href={`/${routes.post}/${id}`}>{title}</Link></Typography>
            <Typography variant='small' fontFamily='secondary' className='d-block mt-8' >{date}</Typography>
            <Typography variant='body1' fontFamily='secondary' >{body.substring(0, 60)}...</Typography>
        </article>
    );
};

export default PostPreview;
