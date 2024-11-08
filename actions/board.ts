"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export type State = {
  errors?: {
    title?: string;
  },
  message?: string | null;
}

// Revalidate the path after creating a board
const callback = () => redirect("/organization/org_2bHJV8YtIPBJ8rx4VWsqF5mO4La")

// Board Schema
const CreateBoard = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters",
  }),
});

// Create Board
export async function createBoard(prevState: State, formData: FormData) {
  const validatedFields = CreateBoard.safeParse({
    title: formData.get("title"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing required fields"
    }
  }

  const { title } = validatedFields.data
  try {
    await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      message: "Database Error"
    }
  }

  callback()
}

// Delete Board
export async function deleteBoard(id: string) {
  await db.board.delete({
    where: {
      id
    }
  })
  callback()
}