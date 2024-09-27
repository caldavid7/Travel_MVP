import Background from "@/components/Location/Background";
import SearchBoxForLocation from "@/components/Location/SearchBoxForLocation";
import Logo from "@/components/Logo";
import React, { ReactElement } from "react";
import { ToastContainer } from "react-toastify";
interface Props {}

export default function Preferences({}: Props): ReactElement {
    return (
        <div className='h-full'>
            <div className='absolute z-50 top-16 left-1/2 isolate -translate-x-1/2 sm:p-4'>
                <Logo></Logo>
            </div>

            <Background></Background>

            <ToastContainer />
            <div className='h-full w-full grid place-items-center bg-transparent'>
                <SearchBoxForLocation></SearchBoxForLocation>
            </div>
            <div
                style={{
                    position: "absolute",
                    bottom: 10,
                    left: 0,
                    right: 0,
                    textAlign: "center",
                }}>
                <div className='text-white/100 text-sm'>
                    Trusted by over 1000+ guests globally. All Rights Reserved
                    2024. Giving Guests Superpowers since 2023
                </div>
                <div className='text-white/100 text-sm'>Superguest AI LLC</div>
            </div>
        </div>
    );
}
export function getStaticProps() {
    return {
        props: {
            variants: {
                animateState: {
                    opacity: 1,
                },
                exitState: {
                    opacity: 0,
                },
            },
        },
    };
}
