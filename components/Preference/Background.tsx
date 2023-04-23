import { motion } from "framer-motion";
import React, { ReactElement } from "react";
import BackgroundImage from "../../public/BackgroundOfPreferenceRoute.png";
import Image from "next/image";
interface Props {}

export default function Background({}: Props): ReactElement {
  return (
    <div className="absolute -z-10 left-0 bottom-0 bg-darken right-0 top-32">
      {/* <svg
        height={"100%"}
        width={"100%"}
        strokeDasharray={10}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1915 779"
      >
        <motion.path
          initial={{
            pathLength: 0,
            stroke: "rgba(255,255,255,0)",
          }}
          animate={{
            pathLength: 1,
            stroke: "rgba(255,255,255,1)",
            transition: { duration: 1 },
          }}
          d="M628 201.5V242C628 248.627 633.373 254 640 254H716C722.627 254 728 259.373 728 266V295.5M628 201.5V85.5M628 201.5H472M-18 489H189M249.5 644V785C249.5 791.627 244.127 797 237.5 797H87M249.5 644V571.5M249.5 644H471.5M1094.5 759.5H1223.5C1230.13 759.5 1235.5 754.127 1235.5 747.5V693.5M1094.5 759.5V301C1094.5 294.373 1099.87 289 1106.5 289H1317C1323.63 289 1329 283.627 1329 277V95.5M1094.5 759.5H963M1771 341.5V424.5C1771 431.127 1776.37 436.5 1783 436.5H1807.5M1771 341.5H1588.5M1771 341.5V82M1533.5 609H1643C1649.63 609 1655 614.373 1655 621V679M1533.5 609V414.5M1533.5 609H1295M1915 786.5H1879C1872.37 786.5 1867 781.127 1867 774.5V506.5M1708 11H1389M567 1H428.5C421.873 1 416.5 6.37258 416.5 13V111M671 386.5H428.5C421.873 386.5 416.5 391.873 416.5 398.5V477C416.5 483.627 411.127 489 404.5 489H308.5M349 201.5H141C134.373 201.5 129 196.127 129 189.5V84M533.5 717V747.5C533.5 754.127 538.873 759.5 545.5 759.5H842.5"
          strokeWidth="0.05mm"
          fill={"none"}
        />
      </svg> */}

      <Image
        className="h-full w-full object-cover"
        src={BackgroundImage}
        alt=""
      ></Image>
    </div>
  );
}
