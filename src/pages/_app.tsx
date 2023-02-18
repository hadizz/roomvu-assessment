import '@/styles/index.sass'
import type {AppProps} from 'next/app'
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import {NextComponentType, NextPageContext} from "next/dist/shared/lib/utils";
import React from "react";
import {ReactChildren} from "@/types";
import {nextReduxWrapper} from "@/store";
import {Provider} from "react-redux";

export interface RoomvuAppProps extends Omit<AppProps, 'Component'> {
    Component: NextComponentType<NextPageContext, any, any> & { Layout: React.FC<ReactChildren> }
}

const MyApp = ({Component, ...pageProps}: RoomvuAppProps) => {
    const {store, props} = nextReduxWrapper.useWrappedStore(pageProps);

    const Layout = Component.Layout || MainLayout;

    return (
        <Provider store={store}>
            <Layout>
                <Component {...props.pageProps} />
            </Layout>
        </Provider>
    )
}

export default MyApp

