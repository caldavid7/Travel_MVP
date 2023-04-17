import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { ReactElement } from "react";

interface Props {}

export default function BackButton({}: Props): ReactElement {
  return (
    <motion.div
      layout
      whileTap={{ scale: 0.9 }}
      whileHover={{
        scale: 1.1,
      }}
      className={`bubble absolute top-16 left-16`}
      data-id={"Countries"}
    >
      <Link href="/" className="flex items-center gap-2">
        <FontAwesomeIcon icon={faAngleLeft} />
        Back
      </Link>
    </motion.div>
  );
}
