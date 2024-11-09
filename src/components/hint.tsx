import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface HintProps {
  children: React.ReactNode
  description: string
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}

export const Hint = ({
  children,
  description,
  side = "top",
  sideOffset = 5,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className="text-xs break-words" // max-w-[220px]
          side={side}
          sideOffset={sideOffset}
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
} 
