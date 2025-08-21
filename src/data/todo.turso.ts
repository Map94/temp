import { db } from "@/lib/database/connection";
import { todosTable } from "@/lib/database/schema";
import { Todo } from "./todos.types";
import { eq, not } from "drizzle-orm";

export const todoTurso = {

    async list(): Promise<Todo[]> {
        return await db.select().from(todosTable);
      },

    async add(content: string): Promise<Todo> {
        const [todo] = await db
            .insert(todosTable)
            .values({ content, completed: false })
            .returning();
        return todo;
    },

    async toggle(id: number): Promise<Boolean> {
        const result = await db
            .update(todosTable)
            .set({ completed: not(todosTable.completed) })
            .where(eq(todosTable.id, id) )
        return result.rowsAffected==1;
    },

    async remove(id: number): Promise<Boolean> {
        const result = await db
            .delete(todosTable)
            .where(eq(todosTable.id, id));
            return result.rowsAffected===1;
    }
}