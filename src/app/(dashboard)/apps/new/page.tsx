"use client"

import { BreadcrumbsTitle } from "@/components/breadcrumbs"
import { useGenerateKey } from "@/data/gateway/hooks"
import { Box, Button, Group, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { valibotResolver } from "mantine-form-valibot-resolver"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import * as v from "valibot"

const schema = v.object({
	name: v.pipe(v.string(), v.minLength(1)),
})

type FormData = v.InferInput<typeof schema>

export default function Page() {
	const form = useForm<FormData>({
		initialValues: {
			name: "",
		},
		validate: valibotResolver(schema),
	})
	const generateKey = useGenerateKey()
	const router = useRouter()

	const createNew = useCallback(
		(values: FormData) =>
			generateKey.mutate(
				{
					name: values.name,
				},
				{
					onError: (error) => {
						showNotification({
							color: "red",
							title: "Error",
							message: error.message,
						})
					},
					onSuccess: (data) => {
						router.push(`/apps/${data.id}`)
					},
				},
			),
		[generateKey, router],
	)

	return (
		<>
			<Group>
				<BreadcrumbsTitle
					items={[
						{ href: "/apps", label: "Apps" },
						{ href: "/apps/new", label: "New" },
					]}
				/>
			</Group>

			<Box maw={300}>
				<form onSubmit={form.onSubmit((values) => createNew(values))}>
					<TextInput mt="md" label="Name" {...form.getInputProps("name")} />

					<Button mt="md" type="submit" loading={generateKey.isPending}>
						Create
					</Button>
				</form>
			</Box>
		</>
	)
}
