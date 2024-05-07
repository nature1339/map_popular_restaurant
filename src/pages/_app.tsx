import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  console.info("session", session);
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </SessionProvider>
  );
}
