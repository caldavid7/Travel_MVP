import Background from "@/components/Location/Background";
import SearchBoxForLocation from "@/components/Location/SearchBoxForLocation";
import Logo from "@/components/Logo";
import React, { ReactElement } from "react";
import { ToastContainer } from "react-toastify";
interface Props {}

export default function Preferences({}: Props): ReactElement {
  return (
    <>
      <div className="absolute z-50 top-16 left-1/2 isolate -translate-x-1/2">
        <Logo></Logo>
      </div>

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
        animateState: {
          opacity: 1,
        },
        exitState: {
          opacity: 0,
        },
      },
    },
  };
}
