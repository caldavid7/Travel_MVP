import React, { ReactElement } from "react";
import Image from "next/image";
import { Logo as LogoImage } from "@/components/Svgs";
interface Props {}

export default function Logo({}: Props): ReactElement {
  return (
    <div>
      <LogoImage width='296px' height='48px' />
    </div>
  );
}
