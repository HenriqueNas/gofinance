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
	data: TransactionProps;
}

export interface TransactionProps {
	type: 'income' | 'outcome';
	title: string;
	amount: string;
	category: Category;
	date: string;
}

export function TransactionCard({ data }: CardProps) {
	return (
		<Container>
			<Title>{data.title}</Title>

			<Amount>R$ {data.amount}</Amount>

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