import { motion } from "framer-motion";
import Image from "next/image";
import React, { ReactElement } from "react";
import BackgroundImage from "../../public/Background.png";
interface Props {}

export default function Background({}: Props): ReactElement {
  return (
    <div className="h-screen w-screen absolute bg-darken">
      <Image
        src={BackgroundImage}
        alt=""
        className="h-full w-full object-cover relative -z-20"
      />
    </div>
  );
}
