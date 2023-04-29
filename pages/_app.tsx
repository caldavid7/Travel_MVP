import { motion, AnimatePresence } from "framer-motion";
import "../styles/globals.css";
import { useRouter } from "next/router";
import PreferenceProvider from "@/context/PreferenceContext";
import { AppProps } from "next/app";
import Head from "next/head";
import { Work_Sans, Inter } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";

const WorkSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const InterFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <main className={`${InterFont.className} h-full w-full`}>
      <Head>
        <link rel="shortcut icon" href="/Logo.svg" />
        <title>Find the perfect accommodation with ease</title>
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
      <div className="h-full">
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
    </main>
  );
}
