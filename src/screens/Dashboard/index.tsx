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

export interface TransactionProps extends TransactionCardProps {
	id: string;
}

export function Dashboard() {
	const dataKey = '@gofinance:transactions';
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

		const transactionFormatted: TransactionProps[] = parsedData.map(
			(item: TransactionProps) => {
				if (item.type === 'income') {
					incomeTotal += Number(item.amount);
				} else {
					outcomeTotal += Number(item.amount);
				}

				const amount = Number(item.amount).toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				});

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

		function toBRLCurrency(value: number): string {
			return value.toLocaleString('pt-BR', {
				style: 'currency',
				currency: 'BRL',
			});
		}

		setTransactions(transactionFormatted);
		setHighlightCardData({
			income: {
				value: toBRLCurrency(incomeTotal),
				date: '12/12',
			},
			outcome: {
				value: toBRLCurrency(outcomeTotal),
				date: '12/12',
			},
			total: {
				value: toBRLCurrency(incomeTotal - outcomeTotal),
				date: '12/12',
			},
		});
		setIsLoading(false);
	}

	useEffect(() => {
		console.log('hello');
		loadTransactions();
	}, []);

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
									<Picture
										source={{
											uri: 'https://avatars.githubusercontent.com/u/51311423?v=4',
										}}
									/>
									<View>
										<Greeting>Olá,</Greeting>
										<Name>Henrique</Name>
									</View>
								</User>

								<Button onPress={() => {}}>
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
