"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Todo } from "@/data/todos.types"

interface TodoItemProps {
	todo: Todo
	onToggle: (id: number) => void
	onRemove: (id: number) => void
}

export function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
	return (
		<div className="p-4 flex items-center gap-3 rounded-md border shadow-sm">
			<div className="flex items-center gap-2 flex-1">
				<span className="text-sm text-muted-foreground font-mono">#{todo.id}</span>
				<span className={cn("flex-1 transition-all duration-200", todo.completed && "line-through text-muted-foreground")}>
					{todo.content}
				</span>
				{todo.completed && (
					<div className="flex items-center gap-1 text-green-600">
						<Check className="h-4 w-4" />
						<span className="text-sm font-medium">Done</span>
					</div>
				)}
			</div>

			<div className="flex items-center gap-1">
				<Button
					variant="outline"
					size="sm"
					onClick={() => onToggle(todo.id)}
					className={cn("h-8 w-8 p-0", todo.completed && "bg-green-50 border-green-200 hover:bg-green-100")}
				>
					<Check className={cn("h-4 w-4", todo.completed ? "text-green-600" : "text-muted-foreground")} />
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
	)
}
