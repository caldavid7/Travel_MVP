import Background from "@/components/Location/Background";
import SearchBoxForLocation from "@/components/Location/SearchBoxForLocation";
import React, { ReactElement } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {}

export default function Preferences({}: Props): ReactElement {
  return (
    <>
      <Background></Background>

      <ToastContainer />
      <div className="h-screen w-screen grid place-items-center bg-transparent">
        <SearchBoxForLocation></SearchBoxForLocation>
      </div>
    </>
  );
}
export function getStaticProps() {
  return {
    props: {
      variants: {
        initialState: {
          x: "-100%",
        },
        animateState: {
          x: 0,
        },
        exitState: {
          x: "-100%",
        },
      },
    },
  };
}
