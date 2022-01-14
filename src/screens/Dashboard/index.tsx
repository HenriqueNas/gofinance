import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, View, ActivityIndicator } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from 'styled-components/native';

import {
	HighlightCards,
	HighlightCardsProps,
} from '../../components/HighlightCards';
import {
	TransactionCard,
	TransactionCardProps,
	TransactionType,
} from '../../components/TransactionCard';

import {
	HeaderWrapper,
	User,
	Picture,
	Greeting,
	Name,
	LogoutIcon,
	Header,
	Container,
	Transaction,
	Title,
	TransactionsList,
	Button,
	LoadContainer,
} from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../../context/auth';

export interface TransactionProps extends TransactionCardProps {
	id: string;
}

export function Dashboard() {
	const { user, logOut } = useAuth();
	const dataKey = `@gofinance:transactions:@user_id:${user.id}`;
	const theme = useTheme();

	const [isLoading, setIsLoading] = useState(true);
	const [transactions, setTransactions] = useState<TransactionProps[]>([]);
	const [highlightCardProps, setHighlightCardData] =
		useState<HighlightCardsProps>({} as HighlightCardsProps);

	async function loadTransactions() {
		const jsonData = await AsyncStorage.getItem(dataKey);
		const parsedData: TransactionProps[] = JSON.parse(jsonData) ?? [];

		let incomeTotal = 0;
		let outcomeTotal = 0;

		function toBRLCurrency(value: number): string {
			return value.toLocaleString('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			});
		}

		const transactionFormatted: TransactionProps[] = parsedData.map(
			(item: TransactionProps) => {
				if (item.type === 'income') {
					incomeTotal += Number(item.amount);
				} else {
					outcomeTotal += Number(item.amount);
				}

				const amount = toBRLCurrency(Number(item.amount));

				const date = Intl.DateTimeFormat('pt-BR', {
					day: '2-digit',
					month: '2-digit',
					year: '2-digit',
				}).format(new Date(item.date));

				return {
					id: item.id,
					title: item.title,
					category: item.category,
					type: item.type,
					amount,
					date,
				};
			}
		);

		function getDateLastTransaction(type: TransactionType) {
			const maxTimeStamp = Math.max.apply(
				Math,
				parsedData
					.filter((transaction) => transaction.type === type)
					.map((transaction) => new Date(transaction.date).getTime())
			);

			return new Date(maxTimeStamp);
		}

		function getTotalTransactionDateRange() {
			const minTimeStamp = Math.min.apply(
				Math,
				parsedData.map((transaction) =>
					new Date(transaction.date).getTime()
				)
			);

			const maxTimeStamp = Math.max.apply(
				Math,
				parsedData.map((transaction) =>
					new Date(transaction.date).getTime()
				)
			);

			return [new Date(minTimeStamp), new Date(maxTimeStamp)];
		}

		const lastTransIncome = getDateLastTransaction('income');
		const lastTransOutcome = getDateLastTransaction('outcome');

		setTransactions(transactionFormatted);
		setHighlightCardData({
			income: {
				value: toBRLCurrency(incomeTotal),
				date: [lastTransIncome],
			},
			outcome: {
				value: toBRLCurrency(outcomeTotal),
				date: [lastTransOutcome],
			},
			total: {
				value: toBRLCurrency(incomeTotal - outcomeTotal),
				date: getTotalTransactionDateRange(),
			},
		});
		setIsLoading(false);
	}

	useFocusEffect(
		useCallback(() => {
			loadTransactions();
		}, [])
	);

	return (
		<>
			<SafeAreaView style={{ backgroundColor: theme.colors.primary }} />
			<Container>
				{isLoading ? (
					<LoadContainer>
						<ActivityIndicator
							color={theme.colors.primary}
							size="large"
						/>
					</LoadContainer>
				) : (
					<>
						<HeaderWrapper>
							<Header>
								<User>
									<Picture source={{ uri: user.photo }} />
									<View>
										<Greeting>Olá,</Greeting>
										<Name>{user.name}</Name>
									</View>
								</User>

								<Button onPress={logOut}>
									<LogoutIcon />
								</Button>
							</Header>
						</HeaderWrapper>

						<HighlightCards
							income={highlightCardProps.income}
							outcome={highlightCardProps.outcome}
							total={highlightCardProps.total}
						/>

						<Transaction>
							<Title>Listagem</Title>

							<TransactionsList
								data={transactions}
								keyExtractor={(item) => item.id}
								renderItem={({ item }) => (
									<TransactionCard data={item} />
								)}
							/>
						</Transaction>
					</>
				)}
			</Container>
		</>
	);
}
