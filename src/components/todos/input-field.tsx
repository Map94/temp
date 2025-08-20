"use client"

import { Loader2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { addTodoAction } from "@/app/todos/actions";

export function TodoInputField() {
	const [pending, startTransition] = useTransition()
	const [content, setContent] = useState<string>('')

	function onAdd(content: string) {
		startTransition(async () => {
			await addTodoAction(content)
		})
	}

	return (
		<div className="flex items-center gap-2">
			<Input
				type="text"
				value={content}
				onChange={e => setContent(e.target.value)}
				placeholder="Hvad skal du lave i dag?"
			/>
			<Button
				className="flex items-center gap-2"
				onClick={() => onAdd(content)}
			>
				{pending ? <Loader2 className="animate-spin" /> : <Plus />}
				<p>Opret</p>
			</Button>
		</div>
	)
}
