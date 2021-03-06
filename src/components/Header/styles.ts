import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
	background-color: ${({ theme }) => theme.colors.primary};

	align-items: center;
	justify-content: flex-end;

	width: 100%;
	height: ${RFValue(113)}px;
	padding-bottom: 20px;
`;

export const Title = styled.Text`
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.shape};
	font-size: ${RFValue(18)}px;
`;
