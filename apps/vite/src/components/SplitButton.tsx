import React from "react"
import { cn } from "@/lib/utils"

const SplitButton = ({
  buttons,
  selectedView,
  setView,
}: {
  buttons: { id: string; children: React.ReactNode }[]
  selectedView: string
  setView: (view: string) => void
}) => {
  return (
    <div className="bg-gray-200 text-sm text-gray-500 leading-none border-2 border-gray-200 rounded-md inline-flex">
      {buttons.map((button) => (
        <button
          key={button.id}
          className={cn(
            "inline-flex items-center transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 rounded-md px-2 py-2",
            selectedView === button.id ? "bg-white" : ""
          )}
          id={button.id}
          onClick={() => setView(button.id)}
        >
          {button.children}
        </button>
      ))}
    </div>
  )
}

export default SplitButton
