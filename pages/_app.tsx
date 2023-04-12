import { motion, AnimatePresence } from "framer-motion";
import "../styles/globals.css";
import { useRouter } from "next/router";
import PreferenceProvider from "@/context/PreferenceContext";
import { AppProps } from "next/app";
import Head from "next/head";

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
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 0.75,
          }}
          variants={{
            initialState: {
              opacity: 0,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            },
            animateState: {
              opacity: 1,
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            },
            exitState: {
              clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
            },
          }}
        >
          <PreferenceProvider>
            <Component {...pageProps} />
          </PreferenceProvider>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
