"use client";


import { createBoard } from "../../../../../../actions/board/index";
import { useAction } from "../../../../../../config/use-action";
import { FormInput } from "./_components/form/form-input";
import { FormSubmit } from "./_components/form/form-submit";


export const Form = () => {

  const { executeAction, fieldErrors, error, data, isLoading } = useAction(createBoard, {
    onSuccess: (data: any) => {
      console.log(data)
    },
    onError: (error: string) => {
      console.log(error)
    },
    onComplete: () => {
      console.log("complete")
    }
  })

  const onSubmit = (formData: FormData) => {
    console.log(formData)
    executeAction(formData)
  }
  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput id="title" label="Title" placeholder="Enter a board title" errors={fieldErrors} />
      </div>
      <FormSubmit>
        Save
      </FormSubmit>
    </form>
  )
}
