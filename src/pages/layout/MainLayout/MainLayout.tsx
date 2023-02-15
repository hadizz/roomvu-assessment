import React from 'react';
import Header from "@/pages/layout/Header/Header";
import Footer from "@/pages/layout/Footer/Footer";
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
