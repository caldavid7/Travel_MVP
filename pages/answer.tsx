import Logo from "@/components/Logo";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

interface Props {}
interface Result {
  preferences: {
    category: string;
    type: string;
  }[];
  answer: string;
  question: string;
}

export default function Answer({}: Props): ReactElement {
  const router = useRouter();
  let response: Result;
  try {
    response = JSON.parse(router.query.result as string);
  } catch (e) {
    console.log(e);
    return <div></div>;
  }

  return (
    <div className="bg-black h-screen w-screen grid grid-cols-[1.2fr_1fr] text-white overflow-hidden">
      <article className="p-10 flex flex-col max-h-screen relative">
        <div className="space-y-8">
          <div className="flex items-center justify-between ">
            {/*// TODO add a logo of the super guest */}
            <Logo></Logo>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative isolate group flex items-center gap-2 bg-white hover:text-white rounded-xl text-lg text-red-500 py-2 px-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                height={"18"}
                width="18"
                version="1.1"
                viewBox="0 0 481.6 481.6"
              >
                <g>
                  <path d="M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8   c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5   l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9   l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1   c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8   c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5   c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z" />
                </g>
              </svg>
              <div className="absolute duration-300 -z-10 inset-0 w-full h-full transition-all scale-0 group-hover:scale-100 group-hover:bg-red-500  rounded-xl"></div>
              Share
            </motion.button>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold text-white">
              {response.question}
            </h1>
            {/* {response.preferences.map((value, index) => {
              return (
                <motion.div
                  layout
                  key={index}
                  whileTap={{ scale: 0.9 }}
                  className={`bubble`}
                >
                  #{value.type}
                </motion.div>
              );
            })} */}
            <span className="mt-6 text-lg text-white/70">
              {response.question}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-hidden space-y-2 overflow-y-auto answerContainer"></div>

        <div className="absolute left-0 bottom-0 w-full flex justify-center p-4 bg-gradient-to-b from-black/20 to-black/80">
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="rounded-lg bg-red-500 hover:bg-red-400 px-4 py-2 text-center text-white  font-bold cursor-pointer"
          >
            Regenerate
          </motion.div>
        </div>
      </article>
      <div className="bg-red-500"></div>
    </div>
  );
}
