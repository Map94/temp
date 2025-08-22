"use server";

import { todosService } from "@/service/todos";
import { revalidatePath } from "next/cache";

export async function addTodoAction(content: string) {
  const todo = await todosService.add(content);
  if (!todo) {
    throw new Error("Todo content cannot be empty");
  }
  revalidatePath("/todos");
}

export async function toggleTodoAction(id: number) {
  const success = await todosService.toggle(id);
  if (!success) {
    throw new Error("Failed to toggle todo");
  }
  revalidatePath("/todos");
}
export async function removeTodoAction(id: number) {
  const success = await todosService.remove(id);
  if (!success) {
    throw new Error("Failed to remove todo");
    
  }
  revalidatePath("/todos");


  
}
  export async function updateTodoPriorityAction(id: number, priority: number) {
  const success = await todosService.updatePriority(id, priority);
  
  if (success) {
    revalidatePath("/"); // Revalidate the page to show updated data
    return { success: true };
  }
  
  throw new Error("Failed to update priority");
}


