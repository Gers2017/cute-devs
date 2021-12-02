import { IconProps } from "@customTypes/IconProps";

export default function Star({
  width = "4",
  height = "4",
  strokeWidth = 30,
}: IconProps) {
  return (
    <svg
      className={`inline-block w-${width} h-${height}`}
      viewBox="0 0 343 330"
      fill="none">
      <path
        id="Star"
        opacity="1"
        d="M269.497 321.567L165.013 268.837L66.8576 318.076L84.7191 202.411L7.55872 124.275L123.082 105.52L173.549 7.99121L227.085 112.065L335.436 129.924L253 213L269.497 321.567Z"
        stroke="#F9FAFB"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
