import { ReactNode } from "react"

interface SectionCardProps {
  title?: string | null
  children: ReactNode
  className?: string
  action?: ReactNode
}

export default function SectionCard({
  title,
  children,
  className,
  action,
}: SectionCardProps) {
  return (
    <div className={`rounded-md bg-white p-5 shadow-xs ${className ?? ""}`}>
      {/* header */}
      {title && <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-sm text-gray-500">{title}</h2>
        {action}
      </div>}

      {/* body */}
      {children}
    </div>
  )
}
