import styled from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	height: ${RFPercentage(14)}px;
	margin: 0 24px;
	background-color: ${({ theme }) => theme.colors.primary};
`;

export const Div = styled.View`
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

export const SignOut = styled.TouchableOpacity`
	width: 48px;
	height: 48px;
	border-radius: 50px;

	background-color: red;
`;
