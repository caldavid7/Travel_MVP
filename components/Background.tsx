import { motion } from "framer-motion";
import React, { ReactElement } from "react";

interface Props {}

export default function Background({}: Props): ReactElement {
  return (
    <div className="absolute inset-0">
      <motion.img
        transition={{
          duration: 0.75,
        }}
        variants={{
          initialState: {
            opacity: 0,
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          },
          animateState: {
            opacity: 1,
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
          },
          exitState: {
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          },
        }}
        initial="initialState"
        animate="animateState"
        src="/background6.jpg"
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  );
}
