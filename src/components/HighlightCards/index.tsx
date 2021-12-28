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

function Card({ value, lastTransaction, type }: TypeCardsProps) {
	return (
		<Container type={type}>
			<Header>
				<Title type={type}>{title[type]}</Title>
				<Icon name={iconName[type]} type={type} />
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
