"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-save-actions";
import { db } from "@/lib/db";
import { UpdateBoard } from "./schema";
import { revalidatePath } from "next/cache";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { title, id } = data
  let board
  try {
    board = await db.board.update({
      where: { id, orgId },
      data: { title }
    })
  } catch (error) {
    console.error(error);
    return { error: "Failed to update" }
  }
  revalidatePath(`/board/${id}`)
  return { data: board }
}

export const updateBoard = createSafeAction(UpdateBoard, handler);  
