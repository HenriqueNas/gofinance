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

interface CardsData {
	value: string;
	date: string;
}
export interface HighlightCardsProps {
	income: CardsData;
	outcome: CardsData;
	total: CardsData;
}

export function HighlightCards({
	income,
	outcome,
	total,
}: HighlightCardsProps) {
	return (
		<ScrollCards>
			<Card
				type="income"
				value={income.value ?? 'R$ 0,00'}
				date={income.date ?? ''}
			/>
			<Card
				type="outcome"
				value={outcome.value ?? 'R$ 0,00'}
				date={outcome.date ?? ''}
			/>
			<Card
				type="total"
				value={total.value ?? 'R$ 0,00'}
				date={total.date ?? ''}
			/>
		</ScrollCards>
	);
}

type CardsDataWithType = CardsData & { type: 'income' | 'outcome' | 'total' };

const title = {
	income: 'Entradas',
	outcome: 'Saídas',
	total: 'Total',
};

const iconName = {
	income: 'arrow-up-circle',
	outcome: 'arrow-down-circle',
	total: 'dollar-sign',
};

function Card({ value, date, type }: CardsDataWithType) {
	return (
		<Container type={type}>
			<Header>
				<Title type={type}>{title[type]}</Title>
				<Icon name={iconName[type]} type={type} />
			</Header>
			<View>
				<Amount type={type}>R$ {value}</Amount>
				<LastTransaction type={type}>{date}</LastTransaction>
			</View>
		</Container>
	);
}
