import { todoTurso } from "@/data/todo.turso";
import { todos } from "@/data/todos.memory";
import { Todo } from "@/data/todos.types";

export const todosService = {
  async list(): Promise<Todo[]> {
    return await todoTurso.list();
  },
  async add (content: string): Promise<Todo|undefined> {
    if (content.trim()== "") {
      return undefined;
    }
    return await todoTurso.add(content);
  },
  async toggle(id: number): Promise<boolean> {
    return !!(await todoTurso.toggle(id));
  },

  async remove(id: number): Promise<boolean> {
    return !!(await todoTurso.remove(id));
  },

  async updatePriority(id: number, priority: number): Promise<boolean> {
  return !!(await todoTurso.updatePriority(id, priority));
}
};