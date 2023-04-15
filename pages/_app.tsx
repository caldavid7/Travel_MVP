import { motion, AnimatePresence } from "framer-motion";
import "../styles/globals.css";
import { useRouter } from "next/router";
import PreferenceProvider from "@/context/PreferenceContext";
import { AppProps } from "next/app";
import Head from "next/head";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
        <title>Travel With Ease</title>
        <meta
          name="description"
          content="Callum Travel is a full-service travel agency that helps you find the perfect accommodation. Search for the best hotels in the world with Callum Travel "
        />
        <meta
          name="keywords"
          content="travel agency, vacation, destination, booking, AI,Chat gpt, Best Hotels,Find best hotels"
        />
        <meta name="author" content="Callum Amor" />
        <meta name="robots" content="index,follow" />
      </Head>
      <div style={{ perspective: -500 }}>
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={router.route}
            initial="initialState"
            animate="animateState"
            exit="exitState"
            transition={{
              duration: 1,
            }}
            variants={pageProps.variants}
          >
            <PreferenceProvider>
              <Component {...pageProps} />
            </PreferenceProvider>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
