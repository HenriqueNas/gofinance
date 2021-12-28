import React from 'react';

import {
	Container,
	Title,
	Amount,
	Footer,
	Category,
	Icon,
	CategoryName,
	Date,
} from './styles';

interface Category {
	name: string;
	icon: string;
}

interface CardProps {
	data: TransactionCardProps;
}

export type TransactionType = 'income' | 'outcome';

export interface TransactionCardProps {
	type: TransactionType;
	title: string;
	amount: string;
	date: string;
	category: Category;
}

export function TransactionCard({ data }: CardProps) {
	return (
		<Container>
			<Title>{data.title}</Title>

			<Amount type={data.type}>
				{data.type === 'outcome' && '-'} R$ {data.amount}
			</Amount>

			<Footer>
				<Category>
					<Icon name={data.category.icon} />
					<CategoryName>{data.category.name}</CategoryName>
				</Category>
				<Date>{data.date}</Date>
			</Footer>
		</Container>
	);
}
