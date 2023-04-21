import { AnimatePresence, motion } from "framer-motion";
import React, { ReactElement, useState } from "react";
import Logo from "../Logo";
import { AI_RESPONSE, getOpenAIResponse } from "@/utils/getOpenaiResponse";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";

interface Props {
  response: AI_RESPONSE["response"];
}

export default function Text({ response }: Props): ReactElement {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <article className="p-10 flex flex-col max-h-screen relative z-50">
      <div className="space-y-8">
        <div className="flex items-center justify-between ">
          {/*// TODO add a logo of the super guest */}
          <Link href="/">
            <Logo></Logo>
          </Link>
          <motion.button
            onClick={async () => {
              await navigator.clipboard.writeText(window.location.href);
              toast.success("Copied Link to the clipboard", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }}
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
            {localStorage.getItem("prompt")
              ? localStorage.getItem("prompt")
              : "Best hotels"}
          </h1>
          <div className="flex items-center gap-2">
            {response.preferences.map((value, index) => {
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
            })}
          </div>
          <span className="text-lg mb-2 text-white/70">
            {response.question}
          </span>
        </div>
      </div>

      <motion.div className="flex-1 overflow-hidden space-y-2 overflow-y-auto answerContainer">
        {response.answer.map((hotel, index) => {
          return (
            <motion.div
              key={hotel.hotel_name}
              initial={{ x: "-90%" }}
              animate={{
                x: 0,
                transition: { delay: 0.2 * index },
              }}
              className="group rounded-lg border border-transparent hover:bg-[rgba(35,35,35,0.64)] hover:border-gray-500 p-2 max-w-[90%]"
            >
              <h1 className="group-hover:text-red-500 text-xl font-semibold ">
                {index + 1}. {hotel.hotel_name}
              </h1>
              <span className="text-white/60 px-2">
                {hotel.brief_description}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="absolute left-0 bottom-0 w-full flex justify-center p-4 bg-gradient-to-b from-black/20 to-black/80">
        <AnimatePresence>
          {!loading && (
            <motion.button
              exit={{ opacity: 0 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-lg bg-red-500 hover:bg-red-400 px-4 py-2 text-center text-white  font-bold cursor-pointer"
              onClick={regenerateHandler}
            >
              Regenerate
            </motion.button>
          )}
          {loading && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              disabled={true}
              className="py-2 px-4 mr-2  text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
            >
              <svg
                aria-hidden="true"
                role="status"
                className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                ></path>
              </svg>
              Loading...
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
  async function regenerateHandler() {
    try {
      setLoading(true);
      const location = localStorage.getItem("location") as string;
      const prompt = localStorage.getItem("prompt") as string;
      const preferences = JSON.parse(localStorage.getItem("preferences")!);

      const response = await getOpenAIResponse({
        preferences,
        prompt,
        location,
      });
      router.push(
        "/answer?result=" +
          encodeURIComponent(JSON.stringify(response?.response))
      );
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  }
}
