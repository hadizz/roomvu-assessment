import React from "react";
import {useRouter} from "next/router";
import Head from "next/head";
import siteMetadata from "@/constants/siteMetaData";

export interface CommonSEOProps {
    title?: string;
    description?: string;
    ogType?: string;
    ogImage?: { url: string }[] | string;
    twImage?: string;
    canonicalUrl?: string;
}

const CommonSEO: React.FC<CommonSEOProps> = ({title, description, ogType, ogImage, twImage, canonicalUrl}) => {
    const router = useRouter()
    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content="follow, index"/>
            <meta name="description" content={description}/>
            <meta property="og:url" content={`${siteMetadata.siteUrl}${router.asPath}`}/>
            <meta property="og:type" content={ogType}/>
            <meta property="og:site_name" content={siteMetadata.title}/>
            <meta property="og:description" content={description}/>
            <meta property="og:title" content={title}/>
            {ogImage?.constructor.name === 'Array' ? (
                (ogImage as { url: string }[]).map(({url}) => <meta property="og:image" content={url} key={url}/>)
            ) : (
                <meta property="og:image" content={ogImage as string} key={ogImage as string}/>
            )}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content={siteMetadata.twitter}/>
            <meta name="twitter:title" content={title}/>
            <meta name="twitter:description" content={description}/>
            <meta name="twitter:image" content={twImage}/>
            <link
                rel="canonical"
                href={canonicalUrl ? canonicalUrl : `${siteMetadata.siteUrl}${router.asPath}`}
            />
        </Head>
    )
}

export default CommonSEO;
