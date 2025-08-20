import { TodoInputField } from "@/components/todos/input-field"
import { TodosList } from "@/components/todos/list"
import { todosService } from "@/service/todos"

export default async function Page() {
	const todos = await todosService.list()
	return (
		<div className="space-y-2 min-w-lg">
			<h1 className="text-2xl tracking-tighter font-bold">Todos</h1>
			<TodoInputField />
			<TodosList todos={todos} />
		</div>
	)
}
