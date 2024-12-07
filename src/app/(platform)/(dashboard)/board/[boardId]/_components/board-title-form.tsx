"use client"
import { FormInput } from "@/components/form/form-input";
import { Button } from "@/components/ui/button"
import { Board } from "@prisma/client"

import { ElementRef, useRef, useState } from "react";

interface BoardTitleFormProps {
  data: Board;
}


export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {

  const formRef = useRef<ElementRef<"form">>(null)
  const inputRef = useRef<ElementRef<"input">>(null)
  const [isEditting, setIsEditting] = useState(false)

  const enableEditing = () => {
    setIsEditting(true)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  const disableEditing = () => {
    setIsEditting(false)
  }

  if (isEditting) {
    return (
      <form className="flex items-center gap-x-2" ref={formRef}>
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={() => { }}
          defaultValue={data.title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
        <Button onClick={disableEditing}>Save</Button>
      </form>
    )
  }

  return (
    <Button variant="transparent" onClick={enableEditing}>
      {data.title}
    </Button>
  )
} 
