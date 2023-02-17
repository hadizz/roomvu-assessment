import React from 'react';
import Header from "../Header/Header";
import {ReactChildren} from "@/types";

const PostLayout: React.FC<ReactChildren> = ({children}) => {
    return (
        <>
            <Header theme={'post'}/>
            {children}
        </>
    );
};

export default PostLayout;
