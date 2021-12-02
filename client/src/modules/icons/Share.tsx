import React from "react";
import { IconProps } from "@customTypes/IconProps";

export default function Share({
  width = "4",
  height = "4",
  strokeWidth = 30,
}: IconProps) {
  return (
    <svg
      className={`inline-block w- w-${width} h-${height}`}
      viewBox="0 0 335 300"
      fill="none">
      <path
        id="Share"
        d="M55.7583 292.39C55.7583 292.39 41.9196 189.469 101.61 165.641C164.994 140.338 217.568 158.103 217.568 158.103V220.539L327 112L217.568 7.71341V67.0572C217.568 67.0572 95.5219 52.8085 42.0726 103.785C-1.83722 145.663 -9.42322 245.939 55.7583 292.39Z"
        stroke="#F9FAFB"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
