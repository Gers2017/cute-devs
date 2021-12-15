import { CuteDev } from "@generated";
import { Dispatch, SetStateAction } from "react";

export default interface CutedevProfileProps {
  cuteDev: Omit<CuteDev, "updatedAt" | "posts" | "createdAt" | "__typename">;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}
