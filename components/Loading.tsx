import { motion } from "framer-motion";
import React, { ReactElement, useEffect, useRef } from "react";

interface Props {}

export default function Loading({}: Props): ReactElement {
  const textContainer = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout>();
  useEffect(() => {
    const handler = () => {
      if (textContainer.current) {
        textContainer.current.textContent = "Finalizing your personalized recommendations";
      }

      timer.current = setTimeout(() => {
        if (textContainer.current) {
          textContainer.current.textContent = "Almost there";
        }

        timer.current = setTimeout(() => {
          if (textContainer.current)
            textContainer.current.textContent = "Finalizing answer";
        }, 15000);
      }, 20000);
    };
    timer.current = setTimeout(handler, 5000);

    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="flex items-center justify-center gap-4 p-4"
    >
      <Spinner></Spinner>
      <div
        ref={textContainer}
        className="text-white font-bold text-2xl tracking-wider"
      >
        Finding your perfect stay
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <motion.div
      initial={{
        scale: 0.5,
        rotate: "0deg",
        clipPath: "circle(50% at 50% 50%)",
      }}
      animate={{
        scale: 1,
        rotate: "360deg",
        clipPath: "circle(50% at 50% 50%)",
        transition: { duration: 2, repeatType: "reverse", repeat: Infinity },
      }}
      className="bg-gradient-to-r from-black/70
       to-red-500  h-10 w-10"
    ></motion.div>
  );
}
export function ProgressBar() {
  return (
    <motion.div
      className="h-0.5 bg-red-500 absolute left-0 top-0"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 40 }}
    ></motion.div>
  );
}
