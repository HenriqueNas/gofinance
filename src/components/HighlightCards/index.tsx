import React from 'react';
import { View } from 'react-native';
import {
	Container,
	Header,
	Title,
	Icon,
	Amount,
	LastTransaction,
	ScrollCards,
} from './styles';

interface HightlightCardsProps {
	income: CardsProps;
	outcome: CardsProps;
	total: CardsProps;
}

export function HighlightCards({
	income,
	outcome,
	total,
}: HightlightCardsProps) {
	return (
		<ScrollCards>
			<Card
				type="income"
				value={income.value}
				lastTransaction={income.lastTransaction}
			/>
			<Card
				type="outcome"
				value={outcome.value}
				lastTransaction={outcome.lastTransaction}
			/>
			<Card
				type="total"
				value={total.value}
				lastTransaction={total.lastTransaction}
			/>
		</ScrollCards>
	);
}

export interface CardsType {
	type: 'income' | 'outcome' | 'total';
}

interface CardsProps {
	value: number;
	lastTransaction: Date;
}

type TypeCardsProps = CardsProps & CardsType;

function Card({ value, lastTransaction, type }: TypeCardsProps) {
	const title = {
		income: 'Entradas',
		outcome: 'Saídas',
		total: 'Total',
	};

	return (
		<Container type={type}>
			<Header>
				<Title type={type}>{title[type]}</Title>
				<Icon
					name={type === 'total' ? 'dollar-sign' : 'arrow-up-circle'}
					type={type}
				/>
			</Header>
			<View>
				<Amount type={type}>R$ {value}</Amount>
				<LastTransaction type={type}>
					{lastTransaction.toLocaleDateString('pt-BR')}
				</LastTransaction>
			</View>
		</Container>
	);
}
