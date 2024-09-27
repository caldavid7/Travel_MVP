import { IconButton } from "@/components/Button/IconButton/IconButton";
import { FullScreen } from "@/components/Svgs";
import { Hotel } from "@/utils/getOpenaiResponse";
import { motion } from "framer-motion";
import React, { useState } from "react";
import iconButtonStyles from "@/components/Button/IconButton/IconButton.module.css";
import { TextButton } from "@/components/Button/TextButton/TextButton";
import { FullScreenOverlay } from "@/components/Popup/Popup";
import { generateGoogleTravelUrl } from "@/utils/getTravelUrl";

type ItemProps = {
    hotel: Hotel;
    index: number;
};

export function HotelItem({ hotel, index }: ItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            <motion.div
                initial={{ x: "-90%" }}
                animate={{
                    x: 0,
                    transition: { delay: 0.2 * index },
                }}
                className={`group rounded-lg border border-transparent hover:bg-[rgba(35,35,35,0.64)] hover:border-gray-500 p-2 lg:max-w-[90%] ${iconButtonStyles.hoverContainer}`}
                style={{
                    ...(isExpanded && {
                        border: "1px solid red",
                        transition: "border 1s ease",
                    }),
                }}>
                <h1 className='group-hover:text-red-500  lg:text-xl font-semibold '>
                    {index + 1}. {hotel.hotel_name}
                </h1>
                <span className='text-white/60 px-2'>
                    {hotel.brief_description}
                </span>
                <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: isExpanded ? "auto" : 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        overflow: "hidden",
                    }}>
                    <div className='text-white/60 pt-10 pb-5 px-4'>
                        What other guests to say
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 pt-4 pb-5 text-center'>
                        {hotel.blubs.map((blub, index) => (
                            <div key={index} className='text-white/80 italic'>
                                &quot;{blub}&quot;
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "end",
                        }}>
                        <TextButton
                            text='Make A Reservations'
                            style={{ width: "210px" }}
                            onClick={() => setShowPopup(true)}
                        />
                    </div>
                </motion.div>
                <IconButton
                    className={iconButtonStyles.hidden}
                    Icon={FullScreen}
                    style={{
                        display: isExpanded ? "none" : "block",
                    }}
                    onClick={() => setIsExpanded(true)}
                />
            </motion.div>
            <FullScreenOverlay
                isVisible={showPopup}
                onCancel={() => setShowPopup(false)}
                onConfirm={() => {
                    setShowPopup(false);
                    window.open(
                        generateGoogleTravelUrl({
                            hotelName: hotel.hotel_name,
                        }),
                        "_blank"
                    );
                }}
                confirmText='Proceed to Reservation'
                cancelText='Go Back'
                textContent='Some of the links in this post may be affiliate
                                links. If you make a hotel reservation through
                                one of these links, we may earn a small
                                commission, at no extra cost to you. This helps
                                us continue providing valuable personalized
                                content and recommendations. We only share
                                hotels we genuinely recommend. Thank you for
                                your support!'
            />
        </>
    );
}
