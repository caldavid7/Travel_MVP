import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { ReactElement, useRef } from "react";

interface Props {}

export default function BackButton({}: Props): ReactElement {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  return (
    <motion.div
      layout
      tabIndex={2}
      whileTap={{ scale: 0.9 }}
      whileHover={{
        scale: 1.1,
      }}
      onKeyDown={(e) => {
        if (e.key == "Enter") buttonRef.current?.click();
      }}
      className={`bubble absolute top-16 left-4 lg:left-16`}
      data-id={"Countries"}
    >
      <Link
        href="/"
        ref={buttonRef}
        tabIndex={-1}
        className="flex h-full w-full items-center gap-2"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
        Back
      </Link>
    </motion.div>
  );
}
