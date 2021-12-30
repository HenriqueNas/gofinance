import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title, Icon, Button } from './styles';

export type TransactionType = 'income' | 'outcome';

interface ButtonProps extends RectButtonProps {
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
		<Container isActive={isActive} type={type}>
			<Button {...rest}>
				<Icon
					type={type}
					name={
						type === 'income'
							? 'arrow-up-circle'
							: 'arrow-down-circle'
					}
				/>
				<Title>{title}</Title>
			</Button>
		</Container>
	);
}
