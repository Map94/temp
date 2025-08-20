import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren { }

export default async function TodosLayout({ children }: Props) {
	return (
		<section className="min-h-screen flex justify-center p-16">{children}</section>
	)
}
