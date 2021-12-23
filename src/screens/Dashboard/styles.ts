import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
	flex: 1;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderWrapper = styled.View`
	width: 100%;
	height: ${RFPercentage(32)}px;

	padding: 24px;

	background-color: ${({ theme }) => theme.colors.primary};
`;

export const Header = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const User = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const Picture = styled.Image`
	width: 48px;
	height: 48px;
	margin-right: 16px;
	border-radius: 10px;
`;

export const Greeting = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${RFValue(18)}px;
`;

export const Name = styled.Text`
	font-family: ${({ theme }) => theme.fonts.bold};
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${RFValue(18)}px;
`;

export const SignOut = styled(Feather)`
	color: ${({ theme }) => theme.colors.secondary};
	font-size: ${RFValue(24)}px;
`;

export const Transaction = styled.View`
	flex: 1;
	margin-top: ${RFPercentage(12)}px;
	padding: 0 24px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(18)}px;

	margin-bottom: 24px;
`;

export const TransactionsList = styled.FlatList``;