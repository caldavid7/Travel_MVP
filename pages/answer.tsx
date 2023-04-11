import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

interface Props {}

export default function Answer({}: Props): ReactElement {
  const router = useRouter();
  let response;
  try {
    response = JSON.parse(router.query.result as string);
  } catch (e) {
    console.log(e);
    return <div>Something Went Wrong</div>;
  }
  return (
    <div className="bg-secondary-black h-screen w-screen text-white overflow-y-scroll">
      <nav className="p-2">
        <Link href="/">
          <div className="w-20 px-2 py-1  flex font-semibold text-black items-center justify-center gap-1 bg-white border border-primary-red rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height={24}
              width={24}
              viewBox="0 0 448 512"
            >
              <path
                fill="black"
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
              />
            </svg>
            Back
          </div>
        </Link>
      </nav>
      <h1 className="heading">{response?.question}</h1>
      <div className="mx-auto mt-8 max-w-3xl text-xl whitespace-pre-line">
        {response?.answer}
      </div>
    </div>
  );
}
