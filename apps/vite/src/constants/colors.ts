const colors: {
  [key: string]: string
} = {
  // for undefined the color is called who knows #475569
  "1": "#7986cb",
  "2": "#33b679",
  "3": "#8e24aa",
  "4": "#e67c73",
  "5": "#f6c026",
  "6": "#f5511d",
  "7": "#039be5",
  "8": "#616161",
  "9": "#3f51b5",
  "10": "#0b8043",
  "11": "#d60000",
}

export const getEventColorInTwClasses = (colorId?: string) => {
  const colors = {
    "1": {
      bg: "bg-indigo-100",
      text: "text-indigo-600",
      border: "border-indigo-200",
    },
    "2": {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-200",
    },
    "3": {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
    },
    "4": {
      bg: "bg-rose-100",
      text: "text-rose-600",
      border: "border-rose-200",
    },
    "5": {
      bg: "bg-amber-100",
      text: "text-amber-600",
      border: "border-amber-200",
    },
    "6": {
      bg: "bg-orange-100",
      text: "text-orange-600",
      border: "border-orange-200",
    },
    "7": {
      bg: "bg-sky-100",
      text: "text-sky-600",
      border: "border-sky-200",
    },
    "8": {
      bg: "bg-neutral-100",
      text: "text-neutral-600",
      border: "border-neutral-200",
    },
    "9": {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    "10": {
      bg: "bg-lime-100",
      text: "text-lime-600",
      border: "border-lime-200",
    },
    "11": {
      bg: "bg-red-100",
      text: "text-red-600",
      border: "border-red-200",
    },
    default: {
      bg: "bg-slate-100",
      text: "text-slate-600",
      border: "border-slate-200",
    },
  }

  return colors[colorId as keyof typeof colors] || colors.default
}

export default colors
