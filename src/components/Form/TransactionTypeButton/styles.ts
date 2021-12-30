import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

import { TransactionType } from '../../TransactionCard';
import theme from '../../../global/styles/theme';

interface IconProps {
	type: TransactionType;
}

interface ContainerProps {
	isActive: boolean;
	type: TransactionType;
}

const backgroundColor = {
	income: theme.colors.success_light,
	outcome: theme.colors.warn_light,
};

export const Container = styled.View<ContainerProps>`
	width: 48%;

	border-radius: 5px;
	border-style: solid;
	border-color: ${theme.colors.text};
	border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;

	background-color: ${({ isActive, type }) =>
		isActive ? backgroundColor[type] : theme.colors.background};
`;

export const Button = styled(RectButton)`
	flex-direction: row;
	align-items: center;
	justify-content: center;

	padding: 18px;
`;

export const Title = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.title};
`;

export const Icon = styled(Feather)<IconProps>`
	color: ${({ type, theme }) =>
		type === 'income' ? theme.colors.success : theme.colors.warn};
	font-size: ${RFValue(24)}px;
	margin-right: 12px;
`;
