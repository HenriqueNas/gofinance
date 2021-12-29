import styled from 'styled-components/native';
import { FlatList, FlatListProps } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { CategoryProps } from '../../../utils/categories';

interface Category {
	isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
	flex: 1;
`;

export const CategoriesList = styled(
	FlatList as new (
		pros: FlatListProps<CategoryProps>
	) => FlatList<CategoryProps>
)`
	flex: 1;
`;

export const Category = styled.TouchableOpacity<Category>`
	flex-direction: row;
	align-items: center;

	width: 100%;
	padding: ${RFValue(15)}px;

	background-color: ${({ isActive, theme }) =>
		isActive ? theme.colors.background : theme.colors.shape};
`;

export const Icon = styled(Feather)`
	font-size: ${RFValue(18)}px;
	margin-right: 16px;
`;

export const Name = styled.Text`
	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.regular};
`;

export const Separator = styled.View`
	height: 1px;
	width: 100%;
	background-color: ${({ theme }) => theme.colors.background};
`;

export const Footer = styled.View`
	width: 100%;
	padding: 20px;
`;
