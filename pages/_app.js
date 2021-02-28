import React from "react";
import App from 'next/app';
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react'
import '@shopify/polaris/dist/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import Cookies from 'js-cookie';
import ApolloClient from 'apollo-boost';
// import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
// import { ApolloProvider } from '@apollo/client'
// import { createHttpLink } from "apollo-link-http";
// import { InMemoryCache } from 'apollo-cache-inmemory';


// const { ApolloClient } = require('apollo-client')

const client = new ApolloClient({
    // uri: 'https://public-apps.com/graphql',
    fetchOptions: {
        credentials: 'include'
    }
});

// const cache = new InMemoryCache();

// const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link: createHttpLink({
//     //   uri: API_URL,
//       fetch: fetch,
//     }),
//   })


// const link = createHttpLink({
//     uri: '/graphql',
//     credentials: 'same-origin'
//   });
  
//   const client = new ApolloClient({
//     cache: new InMemoryCache(),
//     link,
//   });


class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props;
        const config = { apiKey: API_KEY, shopOrigin: Cookies.get('shopOrigin'), forceRedirect: true }

        return (
            <React.Fragment>
                <Head>
                    <title>Sample App</title>
                    <meta charSet="utf-8" />
                </Head>
                <Provider config={config}>
                    <AppProvider i18n={translations}>
                        <ApolloProvider client={client}>
                            <Component {...pageProps} />
                        </ApolloProvider>
                    </AppProvider>
                </Provider>
            </React.Fragment>
        );
    }
}

export default MyApp;