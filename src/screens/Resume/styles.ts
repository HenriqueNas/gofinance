import { FlatList, FlatListProps } from 'react-native';
import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { CategoryData } from '.';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
	flex: 1;
`;

export const ChartContainer = styled.View`
	width: 100%;
	align-items: center;

	padding: 40px 24px 0 24px;
`;

export const HistoricTransactions = styled(
	FlatList as new (
		pros: FlatListProps<CategoryData>
	) => FlatList<CategoryData>
).attrs({
	showsVerticalScrollIndicator: false,
})`
	padding: 0 24px;
`;

export const SelectMonthComponent = styled.View`
	width: 100%;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const SelectMonthButton = styled(BorderlessButton)``;

export const SelectMonthIcon = styled(Feather)`
	font-size: ${RFValue(24)}px;
	color: ${({ theme }) => theme.colors.text_dark};
`;

export const MonthText = styled.Text`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.text_dark};
	font-family: ${({ theme }) => theme.fonts.regular};
`;

export const LoadContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;
