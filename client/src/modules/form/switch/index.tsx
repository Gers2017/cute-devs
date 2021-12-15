import React from 'react'
import { Link } from "react-router-dom"
interface SwitchProps {
  label: string
  to: string;
  linkMessage: string
}
export default function Switch({ label, linkMessage, to }: SwitchProps) {
  return (
    <div className="flex justify-start items-center gap-2">
      <p>{label}</p>
      <Link to={to} className="text-blue-500">
        {linkMessage}
      </Link>
    </div>
  )
}
