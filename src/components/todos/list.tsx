"use client";

import { Todo } from "@/data/todos.types";
import { TodoItem } from "./item";
import { useTransition, useState } from "react";
import { toggleTodoAction } from "@/app/todos/actions";
import { removeTodoAction } from "@/app/todos/actions";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  todos: Todo[];
}

export function TodosList({ todos }: Props) {
  const [pending, startTransition] = useTransition();
  function onToggle(id: number) {
    startTransition(async () => {
      try {
        await toggleTodoAction(id);
        toast.success("Success", {
          description:
            "keep going buddy, you're doing great, its absolutely amazing, you are on fucking fire mate WOOHOO",
        });
      } catch (error) {
        toast.error(
          "Something went wrong, someone should do something about it, oh well"
        );
      }
    });
  }

  function onRemove(id: number) {
    startTransition(async () => {
      try {
        await removeTodoAction(id);
        toast.success("Success", {
          description:
            "removed task tsk tsk, i judge you very much, you should complete em, not remove em",
        });
      } catch (error) {
        toast.error("Failed to remove task, suck it boso");
      }
    });
  }

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        dragFree: true,
      }}
      className="w-full max-w-2xl min-w-2xl select-none"
    >
      <CarouselContent className="-mx-2">
        {todos.map((todo) => (
          <CarouselItem className="basis-1/3 px-2" key={todo.id}>
            <div>
              <TodoItem todo={todo} onToggle={onToggle} onRemove={onRemove} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
