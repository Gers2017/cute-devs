import React from "react";
import { IconProps } from "@customTypes/IconProps";

export default function Comment({
  width = "6",
  height = "4",
  strokeWidth = 30,
}: IconProps) {
  return (
    <svg
      className={`inline-block w-${width} h-${height}`}
      viewBox="0 0 356 347"
      fill="none">
      <g id="Comment">
        <path
          id="rect929"
          opacity="0.996"
          d="M211.491 27.3141L201.396 21.4854C191.174 15.5838 178.103 19.0861 172.202 29.3081L21.304 290.67C15.4023 300.892 18.9046 313.963 29.1266 319.865L39.2221 325.693C49.4441 331.595 62.5148 328.093 68.4165 317.871L219.314 56.5085C225.216 46.2865 221.713 33.2157 211.491 27.3141Z"
          stroke="#F9FAFB"
          stroke-width="15"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="rect931"
          opacity="0.996"
          d="M326.893 27.3141L316.798 21.4854C306.576 15.5838 293.505 19.0861 287.603 29.308L136.706 290.67C130.804 300.892 134.306 313.963 144.528 319.865L154.624 325.693C164.846 331.595 177.917 328.093 183.818 317.871L334.716 56.5084C340.617 46.2865 337.115 33.2158 326.893 27.3141Z"
          stroke="#F9FAFB"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
