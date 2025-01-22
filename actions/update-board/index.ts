"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-save-actions";
import { db } from "@/lib/db";
import { UpdateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { title, id } = data
  try {
    const board = await db.board.update({
      where: { id, orgId },
      data: { title }
    })
    return { data: board }
  } catch (error) {
    console.error(error);
    return { error: "Failed to update" }
  }
}

export const updateBoard = createSafeAction(UpdateBoard, handler);  
