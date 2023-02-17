import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import {NextComponentType, NextPageContext} from "next/dist/shared/lib/utils";
import React from "react";
import {ReactChildren} from "@/types";

export interface RoomvuAppProps extends Omit<AppProps, 'Component'> {
    Component: NextComponentType<NextPageContext, any, any> & { Layout: React.FC<ReactChildren> }
}

export default function App({Component, pageProps}: RoomvuAppProps) {
    const Layout = Component.Layout || MainLayout;

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
