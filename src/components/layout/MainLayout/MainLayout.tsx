import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {ReactChildren} from "@/types";

const MainLayout: React.FC<ReactChildren> = ({children}) => {
    return (
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    );
};

export default MainLayout;
