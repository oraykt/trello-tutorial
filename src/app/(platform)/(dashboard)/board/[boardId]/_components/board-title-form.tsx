"use client"
import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button"
import { useAction } from "@/hooks/use-action";
import { Board } from "@prisma/client"

import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}


export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {

  const { executeAction } = useAction(updateBoard, {
    onSuccess: (data: Board) => {
      toast.success(`Board "${data.title}" updated successfully`)
      setTitle(data.title)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
      disableEditing()
    }
  })

  const [title, setTitle] = useState(data.title)
  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)
  const [isEditting, setIsEditting] = useState(false)

  const enableEditing = () => {
    setIsEditting(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 250)
  }

  const disableEditing = () => {
    setIsEditting(false)
  }

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    executeAction({
      title,
      id: data.id
    });
  }

  if (isEditting) {
    return (
      <form
        className="flex items-center gap-x-2"
        ref={formRef}
        action={onSubmit}
      >
        <FormInput
          ref={inputRef}
          id="title"
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
        <Button type="submit">Save</Button>
      </form >
    )
  }

  return (
    <Button variant="transparent" onClick={enableEditing}>
      {title}
    </Button>
  )
} 
