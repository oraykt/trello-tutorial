import { z } from "zod";
import { Board } from "@prisma/client";
import { ActionState } from "@/lib/create-save-actions";

export const UpdateBoard = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  id: z.string()
});

export type InputType = z.infer<typeof UpdateBoard>
export type ReturnType = ActionState<InputType, Board>
