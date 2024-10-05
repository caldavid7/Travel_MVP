import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { ReactElement, useRef } from "react";

interface Props {
    classNames?: string;
}

export default function BackButton({ classNames = 'left-4 top-8' }: Props): ReactElement {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  return (
    <Link
      href="/"
      ref={buttonRef}
      className={`absolute lg:top-16 lg:left-16 rounded-lg focus:outline-transparent focus:border focus:border-gray-500 ${classNames}`}
    >
      <motion.div
        layout
        tabIndex={-1}
        whileTap={{ scale: 0.9 }}
        whileHover={{
          scale: 1.1,
        }}
        data-id={"Countries"}
        className="rounded-lg border overflow-hidden whitespace-nowrap border-gray-500 bg-transparent p-1.5 md:px-2 md:py-1 text-center text-white cursor-pointer h-8 w-max flex items-center gap-1 md:gap-2"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
        Back
      </motion.div>
    </Link>
  );
}
