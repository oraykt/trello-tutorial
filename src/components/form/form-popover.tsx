"use client";

import { Popover, PopoverClose, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { useAction } from "@/hooks/use-action";
import { createBoard } from "@/actions/create-board/index";

import { FormInput } from "./form-input";
import { FormSubmit } from "./form-submit";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { ElementRef, useRef } from "react";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export const FormPopover = ({
  children,
  side = "bottom",
  align = "start",
  sideOffset = 0,
}: FormPopoverProps) => {
  const closeRef = useRef<ElementRef<"button">>(null);
  const router = useRouter();

  const { executeAction, fieldErrors } = useAction(createBoard, {
    onSuccess: (data: any) => {
      toast.success("Board created successfully")
      closeRef.current?.click()
      router.push(`/board/${data.id}`)
    },
    onError: (error: string) => {
      toast.error(error)
      console.log(error)
    },
    onComplete: () => {
      //      console.log("complete")
    }
  })

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    executeAction({ title, image })
  }
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side={side}
        align={align}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create a new board
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600" variant="ghost">
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit} className="space-y-4">
          <div className="space-y-4">
            <FormPicker
              id="image"
              errors={fieldErrors}
            />
            <FormInput id="title" label="Title" placeholder="Enter a board title" errors={fieldErrors} />
          </div>
          <FormSubmit className="w-full">
            Create
          </FormSubmit>
        </form>
      </PopoverContent>

    </Popover>
  )
}