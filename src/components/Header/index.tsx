import React from 'react';
import { View } from 'react-native';

import { Container, Div, Picture, Greeting, Name, SignOut } from './styles';

export function Header() {
	return (
		<Container>
			<Div>
				<Picture
					source={{
						uri: 'https://avatars.githubusercontent.com/u/51311423?v=4',
					}}
				/>
				<View>
					<Greeting>Olá,</Greeting>
					<Name>Henrique</Name>
				</View>
			</Div>
			<SignOut />
		</Container>
	);
}
