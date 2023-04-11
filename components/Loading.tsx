import React, { ReactElement } from "react";

interface Props {}

export default function Loading({}: Props): ReactElement {
  return (
    <div className="flex items-center bg-gray-500/30 justify-center min-h-screen absolute inset-0 z-50">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
      ></div>
    </div>
  );
}
