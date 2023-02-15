import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import MainLayout from "@/pages/layout/MainLayout/MainLayout";
import {NextComponentType, NextPageContext} from "next/dist/shared/lib/utils";
import React from "react";

export interface RoomvuAppProps extends Omit<AppProps, 'Component'> {
    Component: NextComponentType<NextPageContext, any, any> & { Layout: JSX.Element }
}

export default function App({Component, pageProps}: RoomvuAppProps) {
    const Layout = (Component.Layout || MainLayout) as any;

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
