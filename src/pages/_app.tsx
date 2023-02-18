import '@/styles/index.sass'
import type {AppContext, AppProps} from 'next/app'
import App from "next/app";
import MainLayout from "@/components/layout/MainLayout/MainLayout";
import {NextComponentType, NextPageContext} from "next/dist/shared/lib/utils";
import React from "react";
import {ReactChildren} from "@/types";
import {nextReduxWrapper} from "@/store";

export interface RoomvuAppProps extends Omit<AppProps, 'Component'> {
    Component: NextComponentType<NextPageContext, any, any> & { Layout: React.FC<ReactChildren> }
}

// const MyApp = ({Component, pageProps}: RoomvuAppProps) => {
//     const Layout = Component.Layout || MainLayout;
//
//     return (
//         <Layout>
//             <Component {...pageProps} />
//         </Layout>
//     )
// }
//
// export default nextReduxWrapper.withRedux(MyApp)

class WrappedApp extends App<RoomvuAppProps> {
    public static getInitialProps = async ({Component, ctx}: AppContext) => {
        // Keep in mind that this will be called twice on server, one for page and second for error page
        ctx?.store?.dispatch({type: "APP", payload: "was set in _app"});
        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps
                    ? await Component.getInitialProps(ctx)
                    : {}),
                // Some custom thing for all pages
                appProp: ctx.pathname
            }
        };
    };

    public render() {
        const {Component, pageProps} = this.props;
        const Layout = Component.Layout || MainLayout;
        return (
            <Layout>
                <Component {...pageProps} />
            </Layout>
        )
    }
}

export default nextReduxWrapper.withRedux(WrappedApp);
