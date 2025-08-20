import { todos } from "@/data/todos.memory";
import { Todo } from "@/data/todos.types";

export const todosService = {
  async list(): Promise<Todo[]> {
    return todos.list();
  },
};
