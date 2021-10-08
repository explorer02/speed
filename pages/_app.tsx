import React from "react";

// styles
import "../styles/globals.css";
import "fontsource-roboto";

// components
import { Layout } from "components/Layout";

// types
import { AppProps } from "next/app";
import { NextPage } from "next";

function MyApp({ Component, pageProps }: AppProps): NextPage {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  ) as unknown as NextPage;
}
export default MyApp;
