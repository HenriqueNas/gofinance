import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useTheme } from 'styled-components/native';

import { HighlightCards } from '../../components/HighlightCards';
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
} from './styles';

export interface DataListProps extends TransactionCardProps {
	id: string;
}

export function Dashboard() {
	const theme = useTheme();

	const transactionData: DataListProps[] = [
		{
			id: '1',
			type: 'income',
			title: 'Desenvolvimento de site',
			amount: '12.000,00',
			date: new Date().toLocaleDateString('pt-BR'),
			category: {
				name: 'Vendas',
				icon: 'dollar-sign',
			},
		},
		{
			id: '2',
			type: 'outcome',
			title: 'Hamburgueria Pizzy',
			amount: '59,00',
			date: new Date().toLocaleDateString('pt-BR'),
			category: {
				name: 'Alimentação',
				icon: 'coffee',
			},
		},
		{
			id: '3',
			type: 'outcome',
			title: 'Aluguel Apartamento',
			amount: '1600,00',
			date: new Date().toLocaleDateString('pt-BR'),
			category: {
				name: 'Alimentação',
				icon: 'shopping-bag',
			},
		},
	];

	return (
		<>
			<SafeAreaView style={{ backgroundColor: theme.colors.primary }} />
			<Container>
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
					income={{ value: 123000, lastTransaction: new Date() }}
					outcome={{ value: 47000, lastTransaction: new Date() }}
					total={{ value: 80500, lastTransaction: new Date() }}
				/>

				<Transaction>
					<Title>Listagem</Title>

					<TransactionsList
						data={transactionData}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<TransactionCard data={item} />
						)}
					/>
				</Transaction>
			</Container>

			<SafeAreaView style={{ backgroundColor: theme.colors.primary }} />
		</>
	);
}
