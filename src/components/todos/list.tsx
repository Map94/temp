"use client"

import { Todo } from "@/data/todos.types"
import { TodoItem } from "./item"

interface Props {
	todos: Todo[]
}

export function TodosList({ todos }: Props) {
	function onToggle(id: number) {
		console.log("i toggle, tihi", id)
	}

	function onRemove(id: number) {
		console.log("be gone!", id)
	}

	return (
		<div>
			{todos.map(todo => <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onRemove={onRemove} />)}
		</div>
	)
}

