import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
	margin-bottom: 16px;
	padding: 16px 24px;
	border-radius: 5px;

	background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.success};

	margin-top: 2px;
`;

export const Footer = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	margin-top: ${RFPercentage(4)}px;
`;

export const Category = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(20)}px;
	color: ${({ theme }) => theme.colors.text};

	margin-right: 18px;
`;

export const CategoryName = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text};
`;

export const Date = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text};
`;
