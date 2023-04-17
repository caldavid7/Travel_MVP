import { motion } from "framer-motion";
import React, { ReactElement } from "react";

interface Props {}

export default function Background({}: Props): ReactElement {
  return (
    <div className="absolute inset-0 bg-darken">
      <motion.img
        src="/Background.png"
        alt=""
        className="h-full w-full object-cover relative -z-20"
      />
    </div>
  );
}
