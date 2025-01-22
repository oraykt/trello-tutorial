"use server";

import { db } from "@/lib/db";
import { InputType, ReturnType } from "./types";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { createSafeAction } from "@/lib/create-save-actions";
import { CreateBoard } from "./schema";

const callback = (redirectionUrl: string) => revalidatePath(redirectionUrl)

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  if (!userId || !orgId) return { error: "Unauthorized" }

  let board
  const { title, image } = data
  const [
    imageId,
    imageThumbUrl,
    imageFullUrl,
    imageLinkHTML,
    imageUserName,
  ] = image.split("|")
  if (!imageId || !imageThumbUrl || !imageFullUrl || !imageLinkHTML || !imageUserName) {
    return { error: "Missing fields. Failed to create board." }
  }
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageLinkHTML,
        imageUserName,
      },
    });

    callback(`/board/${board.id}`)
    return { data: board }
  } catch (error) {
    console.error(error);
    return { error: "Database Error" }
  }
}

export const createBoard = createSafeAction(CreateBoard, handler);

// Delete Board
export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id
    }
  })
  // callback()
}