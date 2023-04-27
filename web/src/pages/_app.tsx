import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/share-tech-mono";
import theme from "../../theme";
import { Provider, Client, cacheExchange, fetchExchange } from "urql";
import Head from "next/head";
import Script from "next/script";

const client = new Client({
  url: "http://localhost:4000/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    credentials: "include",
  },
});

export default function App({ Component, pageProps }: any) {
  return (
    <>
      <Provider value={client}>
        <ChakraProvider theme={theme}>
          <Head>
            <title>{"mODVIEW"}</title>
          </Head>
          <Script
            async
            strategy="afterInteractive"
            type="module"
            src="https://unpkg.com/@google/model-viewer@^2.1.1/dist/model-viewer.min.js"
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}
