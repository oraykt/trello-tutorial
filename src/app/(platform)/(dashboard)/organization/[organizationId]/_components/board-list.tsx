import { FormPopover } from "@/components/form/form-popover"
import { Hint } from "@/components/hint"
import { HelpCircle, User2 } from "lucide-react"

export const BoardList = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center font-semibold text-lg text-neutral-700">
        <User2 className="h-6 w-6 mr-2" />
        Your boards
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-1 lg:gap-cols-4">
        <FormPopover side="right" sideOffset={10}>
          <div role="button"
            className="aspect-video 
          relative 
          h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center transition hover:opacity-75">
            <p className="text-sm">
              Create new board
            </p>
            <span className="text-xs">
              X Remaining
            </span>
            <Hint description="Free workspaces can have up to 5 open boards." side="top" sideOffset={5}>
              <HelpCircle className="absolute right-2 bottom-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  )
}