import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { HighlightCards } from '../../components/HighlightCards';
import {
	TransactionCard,
	TransactionProps,
} from '../../components/TransactionCard';

import theme from '../../global/styles/theme';
import {
	HeaderWrapper,
	User,
	Picture,
	Greeting,
	Name,
	SignOut,
	Header,
	Container,
	Transaction,
	Title,
	TransactionsList,
} from './styles';

export function Dashboard() {
	const transactionData: TransactionProps[] = [
		{
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
			type: 'outcome',
			title: 'Hamburgueria Pizzy',
			amount: '59,00',
			date: new Date().toLocaleDateString('pt-BR'),
			category: {
				name: 'Alimentação',
				icon: 'coffee',
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
						<SignOut name="power" />
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
						renderItem={({ item }) => (
							<TransactionCard data={item as TransactionProps} />
						)}
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{
							paddingBottom: 24,
						}}
					/>
				</Transaction>
			</Container>

			<SafeAreaView style={{ backgroundColor: theme.colors.primary }} />
		</>
	);
}
