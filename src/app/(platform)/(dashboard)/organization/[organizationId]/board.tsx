import { Button } from "@/components/ui/button";
import { deleteBoard } from "../../../../../../actions/board";
import { FormDelete } from "./form-delete";

interface BoardProps {
  id: string;
  title: string;
}

export const Board = ({
  id,
  title,
}: BoardProps) => {

  const deleteBoardWithId = deleteBoard.bind(null, id)
  return (
    <form className="flex items-center gap-x-2" action={deleteBoardWithId}>
      <p>Board Title: {title}</p>
      <FormDelete />
    </form>
  )
};