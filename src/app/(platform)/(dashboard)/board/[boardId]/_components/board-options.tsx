"use client"

import { Board } from "@prisma/client"

import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { MoreHorizontal, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger, PopoverClose } from "@/components/ui/popover";
import { toast } from "sonner";
import { deleteBoard } from "@/actions/delete-board";

interface BoardOptionsProps {
  id: string;
}

export const BoardOptions = ({ id }: BoardOptionsProps) => {

  const { executeAction, isLoading } = useAction(deleteBoard, {
    onSuccess: (data: Board) => {
      toast.success(`Board "${data.title}" deleted successfully`)
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const onDelete = () => {
    executeAction({ id })
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 pt-3 pb-3">
        <div className="text-sm font-medium text-center text-neutral-600">Board Actions</div>
        <PopoverClose asChild>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>

        <Button
          variant="ghost"
          onClick={onDelete}
          disabled={isLoading}
          className="rounded-none w-full m-2 justify-start p-2 px-5 h-auto text-neutral-600 font-normal text-sm"
        >
          Delete Board
        </Button>
      </PopoverContent>
    </Popover>
  )
}