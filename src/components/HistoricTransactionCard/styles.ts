import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface ContainerProps {
	color: string;
}

export const Container = styled.View<ContainerProps>`
	width: 100%;
	padding: 12px 24px;
	margin-bottom: 10px;

	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	border-radius: 5px;
	border-left-width: 4px;
	border-left-color: ${({ color }) => color};

	background-color: ${({ theme }) => theme.colors.shape};
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
	font-family: ${({ theme }) => theme.fonts.bold};
	font-size: ${RFValue(15)}px;
	color: ${({ theme }) => theme.colors.title};
`;
