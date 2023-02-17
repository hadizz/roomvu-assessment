import React from 'react';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {ReactChildren} from "@/types";

const MainLayout: React.FC<ReactChildren> = ({children}) => {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
};

export default MainLayout;
