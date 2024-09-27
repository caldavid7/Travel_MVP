import React from "react";
import { motion } from "framer-motion";
import styles from "@/components/Popup/FullScreenOverlay.module.css";
import { TextButton } from "@/components/Button/TextButton/TextButton";

interface FullScreenOverlayProps {
    isVisible: boolean;
    textContent: string;
    cancelText: string;
    confirmText: string;
    onCancel: () => void;
    onConfirm: () => void;
}

export const FullScreenOverlay: React.FC<FullScreenOverlayProps> = ({
    isVisible,
    textContent,
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
}) => {
    return (
        <>
            {isVisible && (
                <motion.div
                    className={`${styles.overlay} space-y-0`}
                    style={{ margin: "0px" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}>
                    <motion.div
                        className={styles.overlayContent}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                        transition={{ duration: 0.5 }}>
                        <div className='text-white/60'>
                            <h1>
                                {textContent}
                            </h1>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: "20px",
                                gap: "210px",
                            }}>
                            <TextButton
                                text={cancelText}
                                style={{ width: "120px" }}
                                onClick={onCancel}
                                colorClasses='bg-transparent hover:bg-white text-middle-gray hover:text-red-500'
                            />

                            <TextButton
                                text={confirmText}
                                style={{ width: "250px" }}
                                onClick={onConfirm}
                                colorClasses='bg-white hover:bg-red-500 text-middle-gray hover:text-white'
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};
