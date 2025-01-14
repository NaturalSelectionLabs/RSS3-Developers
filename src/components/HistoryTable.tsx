"use client"

import {
	useGetCurrentRequestWithdrawal,
	type useGetHistoryCollection,
	type useGetHistoryDeposit,
	useGetHistoryWithdrawal,
} from "@/data/gateway/hooks"
import { rss3Chain } from "@/lib/wagmi/chain"
import { Skeleton, Table, Text } from "@mantine/core"
import { Pagination } from "@mantine/core"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function HistoryTable({
	requestFunction,
}: {
	requestFunction:
		| typeof useGetHistoryDeposit
		| typeof useGetHistoryCollection
		| typeof useGetHistoryWithdrawal
}) {
	const [activePage, setActivePage] = useState(1)
	const [maxPage, setMaxPage] = useState(0)

	const historyDeposit = requestFunction({
		page: activePage,
		limit: 5,
	})

	const currentRequestWithdrawal = useGetCurrentRequestWithdrawal({
		enabled: requestFunction === useGetHistoryWithdrawal,
	})

	useEffect(() => {
		if (!maxPage && historyDeposit?.data?.page_max) {
			setMaxPage(historyDeposit.data.page_max)
		}
	}, [historyDeposit?.data?.page_max, maxPage])

	return (
		<Skeleton visible={historyDeposit.isLoading}>
			{historyDeposit.data?.list ? (
				<Table verticalSpacing="md" striped highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Time</Table.Th>
							<Table.Th>Amount</Table.Th>
							<Table.Th>Transaction</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{requestFunction === useGetHistoryWithdrawal &&
							currentRequestWithdrawal.data &&
							currentRequestWithdrawal.data.amount !== 0 && (
								<Table.Tr key="currentRequestWithdrawal">
									<Table.Td>(Pending)</Table.Td>
									<Table.Td>{currentRequestWithdrawal.data.amount}</Table.Td>
									<Table.Td>(Pending)</Table.Td>
								</Table.Tr>
							)}
						{historyDeposit.data.list.map((deposit) => (
							<Table.Tr key={deposit.index}>
								<Table.Td>
									{new Date(deposit.block_timestamp).toLocaleString()}
								</Table.Td>
								<Table.Td>{deposit.amount}</Table.Td>
								<Table.Td>
									<Link
										href={`${rss3Chain.blockExplorers.default.url}/tx/${deposit.tx_hash}`}
										// href={`https://${TESTNET ? "sepolia." : ""}etherscan.io/tx/${
										//   deposit.tx_hash
										// }`}
										className="underline"
										target="_blank"
									>
										{deposit.tx_hash.slice(0, 7)}...{deposit.tx_hash.slice(-5)}
									</Link>
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			) : (
				<Text c="dimmed">No Data</Text>
			)}

			{maxPage > 1 && (
				<Pagination
					className="mt-4"
					total={maxPage || 1}
					value={activePage}
					onChange={setActivePage}
				/>
			)}
		</Skeleton>
	)
}
