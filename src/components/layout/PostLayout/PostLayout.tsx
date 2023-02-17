import React from 'react';
import Header from "../Header/Header";
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
