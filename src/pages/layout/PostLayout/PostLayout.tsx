import React from 'react';
import Header from "@/pages/layout/Header/Header";
import {ReactChildren} from "@/types";

const PostLayout: React.FC<ReactChildren> = ({children}) => {
    return (
        <div>
            <Header theme={'post'}/>
            {children}
        </div>
    );
};

export default PostLayout;
