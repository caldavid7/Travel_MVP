import { motion } from "framer-motion";
import React, { ReactElement } from "react";

interface Props {}

export default function Background({}: Props): ReactElement {
  return (
    <div className="absolute inset-0  bg-gradient-to-b from-transparent via-black/30 to-black ">
      <motion.img
        src="/background6.jpg"
        alt=""
        className="h-full w-full object-cover relative -z-10"
      />
    </div>
  );
}
