import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function TodoInputField() {
	return (
		<div className="flex items-center gap-2">
			<Input placeholder="Hvad skal du lave i dag?" />
			<Button className="flex items-center gap-2">
				<p>Opret</p>
				<Plus />
			</Button>
		</div>
	)
}
