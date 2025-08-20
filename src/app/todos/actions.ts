"use server";

import { revalidatePath } from "next/cache";

export async function addTodoAction(content: string) {
  console.log("action");
  revalidatePath("/todos");
}
