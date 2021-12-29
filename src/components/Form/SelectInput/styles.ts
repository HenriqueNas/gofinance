import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity.attrs({
	activeOpacity: 0.7,
})`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	padding: 16px 18px;
	border-radius: 5px;

	background-color: ${({ theme }) => theme.colors.shape};
`;

export const Category = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const Title = styled.Text`
	margin-left: 8px;

	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
	color: ${({ theme }) => theme.colors.text};
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(14)}px;
	color: ${({ theme }) => theme.colors.text};
`;
