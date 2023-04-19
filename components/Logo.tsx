import React, { ReactElement } from "react";
import Image from "next/image";
import LogoImage from "../public/Logo.svg";
interface Props {}

export default function Logo({}: Props): ReactElement {
  return (
    <div>
      <Image src={LogoImage} alt="" />
    </div>
  );
}
