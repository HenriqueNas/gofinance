import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	width: 100%;
`;

export const Error = styled.Text`
	font-size: ${RFValue(12)}px;
	font-family: ${({ theme }) => theme.fonts.medium};
	color: ${({ theme }) => theme.colors.warn};

	margin-top: -4px;
	margin-bottom: 12px;
	margin-left: 8px;
`;
