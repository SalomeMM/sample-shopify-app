import React from "react";
// import ReactDOM from 'react-dom';

import App from "next/app";
import Head from "next/head";
import { AppProvider } from "@shopify/polaris"; // wraps the whole component in a component called "AppProvider" from Polaris. Thanks to this we can use Polaris components throughout the whole application.
import { Provider } from "@shopify/app-bridge-react";
import "@shopify/polaris/dist/styles.css"; // styles from Polaris
import translations from "@shopify/polaris/locales/en.json"; // mandatory, required. Shopify wants to be global-friendly
import Cookies from "js-cookie"; // this is how we pass our shopOrigin in the server.js

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const config = {
      apiKey: API_KEY,
      shopOrigin: Cookies.get("shopOrigin"),
      forceRedirect: true,
    } // in the server we were setting the cookies and here we are getting them
    return (
      <React.Fragment>
        <Head>
          <title> Sample App </title> <meta charSet="utf-8" />
        </Head>
        <Provider config={config}>
        <AppProvider i18n={translations}>
          <Component {...pageProps} />
        </AppProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

export default MyApp;
