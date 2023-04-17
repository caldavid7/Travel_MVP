import React, { ReactElement } from "react";
interface Props {}

export default function Logo({}: Props): ReactElement {
  return (
    <div>
      <img src="/Logo.svg" alt="" />
    </div>
  );
}
