import { Todo } from "./todos.types";

const todosData: Todo[] = [
  { id: 0, content: "Lav en todo app", completed: false, priority: 0 },
];

export const todos = {
  async list(): Promise<Todo[]> {
    return Promise.resolve(todosData);
  },
  async add(content: string): Promise<Todo> {
    const newTodo: Todo = {
      id: todosData.length,
      content,
      completed: false,
      priority: 0,
    }
    todosData.push(newTodo);
    return Promise.resolve(newTodo);
  },
  async toggle(id: number): Promise<boolean> {
    const todo = todosData.find(todo => todo.id == id);
    if (!todo) {
      return Promise.resolve(false);
      
    }
    todo.completed = !todo.completed;
      return Promise.resolve(todo.completed);

  },
  async remove(id: number) {
    const index = todosData.findIndex(todo => todo.id == id);
    if (index === -1) {
      return Promise.resolve(false);
    }
    todosData.splice(index, 1);
    return Promise.resolve(true);
  }
};
