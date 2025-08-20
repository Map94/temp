import { Todo } from "./todos.types";

const todosData: Todo[] = [
  { id: 0, content: "Lav en todo app", completed: false },
];

export const todos = {
  async list(): Promise<Todo[]> {
    return Promise.resolve(todosData);
  },
  // async add(content: string): Promise<Todo> {}
  // async toggle(id: number): Promise<boolean> {}
  // async remove(id: number) {}
};
