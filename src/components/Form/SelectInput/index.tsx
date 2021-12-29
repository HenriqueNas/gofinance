import React from 'react';
import { Container, Category, Title, Icon } from './styles';

interface SelectProps {
	title: string;
	icon: string;
	onPress: () => void;
}

export function SelectInput({ title, icon, onPress }: SelectProps) {
	return (
		<Container onPress={onPress}>
			<Category>
				<Icon name={icon} />
				<Title>{title}</Title>
			</Category>
			<Icon name="chevron-down" />
		</Container>
	);
}
