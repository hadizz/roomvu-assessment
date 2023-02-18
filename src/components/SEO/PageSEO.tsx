import React from "react";
import siteMetadata from "@/constants/siteMetaData";
import CommonSEO, {CommonSEOProps} from "@/components/SEO/CommonSEO";

export const PageSEO: React.FC<CommonSEOProps> = ({title, description}) => {
    const ogImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
    const twImageUrl = siteMetadata.siteUrl + siteMetadata.socialBanner
    return (
        <CommonSEO
            title={title}
            description={description}
            ogType="website"
            ogImage={ogImageUrl}
            twImage={twImageUrl}
        />
    )
}

export default PageSEO
