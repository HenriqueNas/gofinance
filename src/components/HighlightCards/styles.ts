import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { CardsType } from '.';
import theme from '../../global/styles/theme';

const iconColor = {
	income: theme.colors.success,
	outcome: theme.colors.warn,
	total: theme.colors.shape,
};

const textColor = {
	income: theme.colors.title,
	outcome: theme.colors.title,
	total: theme.colors.shape,
};

const backgroundColor = {
	income: theme.colors.shape,
	outcome: theme.colors.shape,
	total: theme.colors.secondary,
};

export const Container = styled.View<CardsType>`
	justify-content: space-between;

	width: ${RFPercentage(40)}px;
	height: ${RFPercentage(24)}px;
	margin-right: 16px;
	border-radius: 10px;
	padding: 22px 22px 42px 22px;

	background-color: ${({ type }) =>
		type === 'total' ? theme.colors.secondary : theme.colors.shape};
`;

export const Header = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const Title = styled.Text<CardsType>`
	font-size: ${RFValue(18)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ type }) => textColor[type]};
`;

export const Icon = styled(Feather)<CardsType>`
	color: ${({ type }) => iconColor[type]};
	font-size: ${RFValue(40)}px;
`;

export const Amount = styled.Text<CardsType>`
	font-size: ${RFValue(32)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ type }) => textColor[type]};
`;

export const LastTransaction = styled.Text<CardsType>`
	font-size: ${RFValue(12)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ type }) =>
		type === 'total' ? theme.colors.shape : theme.colors.text};
`;

export const ScrollCards = styled.ScrollView.attrs({
	horizontal: true,
	showsHorizontalScrollIndicator: false,
	pagingEnabled: true,
	decelerationRate: 0,
	snapToInterval: RFPercentage(40) + 24,
	snapToAlignment: 'center',
	contentContainerStyle: { paddingHorizontal: 24 },
})`
	width: 100%;
	position: absolute;
	top: ${RFPercentage(14)}px;
`;
