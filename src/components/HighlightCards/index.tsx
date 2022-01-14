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
	date: Date[];
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
			<Card type="income" value={income.value} date={income.date} />
			<Card type="outcome" value={outcome.value} date={outcome.date} />
			<Card type="total" value={total.value} date={total.date} />
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
	function getFormatterLastTransaction() {
		const valueNumber = Number(value.replace(/\D/g, ''));
		if (valueNumber === 0) return 'Sem operações';

		const monthName = date[0].toLocaleString('pt-BR', { month: 'long' });
		return type === 'total'
			? `${date[0].getDate()} à ${date[1].getDate()} de ${monthName}`
			: `Última ${
					type === 'income' ? 'entrada' : 'saída'
			  }  dia ${date[0].getDate()} de ${monthName}`;
	}

	return (
		<Container type={type}>
			<Header>
				<Title type={type}>{title[type]}</Title>
				<Icon name={iconName[type]} type={type} />
			</Header>
			<View>
				<Amount type={type}>{value}</Amount>
				<LastTransaction type={type}>
					{getFormatterLastTransaction()}
				</LastTransaction>
			</View>
		</Container>
	);
}
