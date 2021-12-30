import React from 'react';
import { RectButtonProps } from 'react-native-gesture-handler';
import { Container, Category, Title, Icon } from './styles';

interface SelectProps extends RectButtonProps {
	title: string;
	icon: string;
}

export function SelectInput({ title, icon, ...rest }: SelectProps) {
	return (
		<Container {...rest}>
			<Category>
				<Icon name={icon} />
				<Title>{title}</Title>
			</Category>
			<Icon name="chevron-down" />
		</Container>
	);
}
