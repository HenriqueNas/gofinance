import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Input } from '../Input';

import { Container, Error } from './styles';

interface Props extends TextInputProps {
	name: string;
	control: Control;
	error: string;
}

export function InputForm({ name, control, error, ...rest }: Props) {
	return (
		<Container>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value } }) => (
					<Input {...rest} onChangeText={onChange} value={value} />
				)}
			/>
			{error && <Error>{error}</Error>}
		</Container>
	);
}
