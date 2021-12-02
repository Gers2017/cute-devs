// using tailwindcss width and height classes
type sizeType = "2" | "4" | "5" | "6" | "8" | "10" | "12" | "16" | "20" | "24";

export interface IconProps {
  width?: sizeType | number;
  height?: sizeType | number;
  strokeWidth?: number;
}
