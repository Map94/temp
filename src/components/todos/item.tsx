"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Todo } from "@/data/todos.types";
import { ComboBoxResponsive } from "./prioritybox";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
  return (
    <div className="relative p-4 flex flex-col justify-between rounded-md border shadow-sm h-72 select-none">
      {/* Top section with content */}
      <div className="flex items-center justify-between ">
        <span className="text-sm text-muted-foreground font-medium">
          #{todo.id}
        </span>
        {todo.completed && (
          <div className="flex items-center gap-1 text-green-600">
            <Check className="h-4 w-4" />
            <span className="text-sm font-medium">Done</span>
          </div>
        )}
        {/* Priority box positioned at top right of each card */}
        <div className="flex items-end">
          <ComboBoxResponsive todo={todo} />
        </div>
      </div>
      <div className="flex justify-center">
        <span
          className={cn(
            "transition-all duration-200 text-center",
            todo.completed &&
              "line-through decoration-1 decoration-green-600 text-muted-foreground"
          )}
        >
          {todo.content}
        </span>
      </div>

      {/* Bottom section with centered buttons */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onToggle(todo.id)}
          className={cn(
            "h-8 w-8 p-0",
            todo.completed && "bg-green-50 border-green-200 hover:bg-green-100"
          )}
        >
          <Check
            className={cn(
              "h-4 w-4",
              todo.completed ? "text-green-600" : "text-muted-foreground"
            )}
          />
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => onRemove(todo.id)}
          className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
