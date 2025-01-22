"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import { createSafeAction } from "@/lib/create-save-actions";
import { db } from "@/lib/db";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate-path";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: "Unauthorized" }

  const { id } = data
  try {
    await db.board.delete({ where: { id, orgId } })
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete" }
  }
  revalidatePath(`/organization/${orgId}`)
  redirect(`/organization/${orgId}`)

}

export const deleteBoard = createSafeAction(DeleteBoard, handler);

