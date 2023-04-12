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

    return <div></div>;
  }

  return response?.answer ? (
    <div className="bg-secondary-black h-screen w-screen text-white overflow-y-scroll">
      <nav className="p- absolute top-4 left-2">
        <Link href="/">
          <button className="group rounded-2xl h-12 w-32 bg-green-500 font-bold text-lg text-white relative overflow-hidden">
            Back
            <div className="absolute duration-300 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-white/30 rounded-2xl"></div>
          </button>
        </Link>
      </nav>
      <h1 className="heading">{response?.question}</h1>
      <div className="mx-auto mt-8 max-w-3xl text-xl whitespace-pre-line">
        {response?.answer}
      </div>
    </div>
  ) : (
    <div className="h-screen w-screen grid place-items-center text-4xl text-primary-red font-bold">
      Something Went Wrong
    </div>
  );
}
