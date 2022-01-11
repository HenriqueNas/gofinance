import React, { useCallback, useEffect, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { categories } from '../../utils/categories';

import { Header } from '../../components/Header';
import { TransactionProps } from '../Dashboard';
import { HistoricTransactionCard } from '../../components/HistoricTransactionCard';

import theme from '../../global/styles/theme';
import {
	ChartContainer,
	Container,
	HistoricTransactions,
	SelectMonthComponent,
	SelectMonthButton,
	SelectMonthIcon,
	MonthText,
	LoadContainer,
} from './styles';
import { ActivityIndicator } from 'react-native';

export interface CategoryData {
	id: string;
	name: string;
	amount: string;
	total: number;
	color: string;
	percent: string;
}

export function Resume() {
	const [isLoading, setIsLoading] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
		[]
	);

	async function loadTransactions() {
		setIsLoading(true);

		const dataKey = '@gofinance:transactions';
		const jsonData = await AsyncStorage.getItem(dataKey);
		const parsedData: TransactionProps[] = JSON.parse(jsonData) ?? [];

		const categoriesTotal: CategoryData[] = [];

		const filteredTransactions = parsedData.filter((item) => {
			return (
				item.type === 'outcome' &&
				new Date(item.date).getMonth() === selectedDate.getMonth() &&
				new Date(item.date).getFullYear() === selectedDate.getFullYear()
			);
		});

		const outcomesTotal = filteredTransactions.reduce(
			(acummulator: number, outcome: TransactionProps) => {
				return acummulator + Number(outcome.amount);
			},
			0
		);

		categories.forEach((category) => {
			let sumByCategory = 0;

			filteredTransactions.forEach((trans) => {
				if (trans.category.key === category.key) {
					sumByCategory += Number(trans.amount);
				}
			});

			if (sumByCategory > 0) {
				const amount = sumByCategory.toLocaleString('pt-BR', {
					style: 'currency',
					currency: 'BRL',
				});

				const percent = `${(
					(sumByCategory / outcomesTotal) *
					100
				).toFixed(0)}%`;

				categoriesTotal.push({
					id: category.key,
					name: category.name,
					amount,
					percent,
					total: sumByCategory,
					color: category.color,
				});
			}
		});

		setTotalByCategories(categoriesTotal);
		setIsLoading(false);
	}

	function handleDateChange(action: 'previous' | 'next') {
		if (action === 'next') {
			const newDate = addMonths(selectedDate, 1);
			setSelectedDate(newDate);
		} else {
			const newDate = subMonths(selectedDate, 1);
			setSelectedDate(newDate);
		}
	}

	useFocusEffect(
		useCallback(() => {
			loadTransactions();
		}, [selectedDate])
	);

	return (
		<Container>
			<Header title="Resumo por categoria" />

			{isLoading ? (
				<LoadContainer>
					<ActivityIndicator
						color={theme.colors.primary}
						size="large"
					/>
				</LoadContainer>
			) : (
				<>
					<ChartContainer>
						<SelectMonthComponent>
							<SelectMonthButton
								onPress={() => handleDateChange('previous')}
							>
								<SelectMonthIcon name="chevron-left" />
							</SelectMonthButton>

							<MonthText>
								{format(selectedDate, 'MMMM, yyyy', {
									locale: ptBR,
								})}
							</MonthText>

							<SelectMonthButton
								onPress={() => handleDateChange('next')}
							>
								<SelectMonthIcon name="chevron-right" />
							</SelectMonthButton>
						</SelectMonthComponent>

						<VictoryPie
							data={totalByCategories}
							x="percent"
							y="total"
							colorScale={totalByCategories.map(
								(category) => category.color
							)}
							labelRadius={70}
							style={{
								labels: {
									fontSize: RFValue(18),
									fill: theme.colors.shape,
								},
							}}
						/>
					</ChartContainer>

					<HistoricTransactions
						data={totalByCategories}
						keyExtractor={(item) => item.id}
						contentContainerStyle={{
							paddingBottom: 44,
						}}
						renderItem={({ item }) => (
							<HistoricTransactionCard
								title={item.name}
								amount={item.amount}
								color={item.color}
							/>
						)}
					/>
				</>
			)}
		</Container>
	);
}
