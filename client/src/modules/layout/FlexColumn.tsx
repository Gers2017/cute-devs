import React from "react";
interface FlexColumnProps {
  children?: React.ReactNode;
  py?: number;
  px?: number;
  gap?: number;
  reverse?: boolean;
}
export default function FlexColumn({
  children,
  py = 0,
  px = 0,
  gap = 4,
  reverse,
}: FlexColumnProps) {
  return (
    <ul
      className={`flex ${
        reverse ? "flex-col-reverse" : "flex-col"
      } items-stretch list-none gap-${gap} px-${px} py-${py}`}
    >
      {children}
    </ul>
  );
}
