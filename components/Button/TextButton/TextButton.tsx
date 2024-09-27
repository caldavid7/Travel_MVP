import { motion } from "framer-motion";
import React, { CSSProperties } from "react";

type TextButtonProps = {
    text: string;
    style: CSSProperties;
    onClick: () => void;
    colorClasses: string;
}

export function TextButton({ text, style, onClick, colorClasses }: TextButtonProps) {
    if (!colorClasses) {
        colorClasses = "bg-red-500 hover:bg-red-400 text-white hover:text-white";
    }

    return (
        <motion.button
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.9 }}
            className={`rounded-lg ${colorClasses} px-4 py-2 text-center font-bold cursor-pointer transition-colors duration-300 ease-in-out`}
            style={style}
            onClick={onClick}
        >
            {text}
        </motion.button>
    );
}
