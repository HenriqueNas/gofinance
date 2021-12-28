import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title, Icon } from './styles';

export type TransactionType = 'income' | 'outcome';

interface ButtonProps extends TouchableOpacityProps {
	type: TransactionType;
	title: string;
	isActive: boolean;
}

export function TransactionTypeButton({
	type,
	title,
	isActive,
	...rest
}: ButtonProps) {
	return (
		<Container {...rest} isActive={isActive} type={type}>
			<Icon
				type={type}
				name={
					type === 'income' ? 'arrow-up-circle' : 'arrow-down-circle'
				}
			/>
			<Title>{title}</Title>
		</Container>
	);
}
