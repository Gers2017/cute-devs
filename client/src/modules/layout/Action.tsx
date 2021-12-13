import React from 'react'
interface ActionProps {
  children?: React.ReactNode
}
export default function Action({ children }: ActionProps) {
  return (
    <div className="flex justify-start w-full items-center gap-6">
      {children}
    </div>
  )
}
