import Text from "@/components/Answer/Text";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect } from "react";
import { AI_RESPONSE } from "@/utils/getOpenaiResponse";
import Images from "@/components/Answer/Images";
import { ToastContainer } from "react-toastify";
interface Props {}

export default function Answer({}: Props): ReactElement {
  const router = useRouter();
  let response: AI_RESPONSE["response"];
  try {
    response = JSON.parse(router.query.result as string);
  } catch (e) {
    console.log(e);
    return <div></div>;
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="bg-black h-screen w-screen grid grid-cols-[1.2fr_1fr] relative z-50 text-white overflow-hidden">
        <Text response={response}></Text>
        <div className=" relative z-[60]">
          <Images></Images>
        </div>
      </div>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {
      variants: {
        initialState: {
          opacity: 0,
        },
        animateState: {
          opacity: 1,
          transition: { duration: 1 },
        },
      },
    },
  };
}
