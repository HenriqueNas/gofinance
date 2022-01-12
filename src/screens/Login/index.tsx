import React from 'react';
import { Alert, Platform } from 'react-native';
import { useAuth } from '../../context/auth';

import {
	Container,
	Header,
	TitleWrapper,
	Logo,
	CallText,
	LoginText,
	Footer,
	LoginButton,
	GoogleIcon,
	AppleIcon,
	Divider,
	ButtonText,
} from './styles';

export function Login() {
	const { loginWithGoogle } = useAuth();

	function handleLoginWithGoogle() {
		try {
			const response = loginWithGoogle();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível fazer login com conta google');
		}
	}

	return (
		<Container>
			<Header>
				<TitleWrapper>
					<Logo />
					<CallText>
						Controle suas finanças de forma muito simples
					</CallText>
				</TitleWrapper>

				<LoginText>Faça seu login com uma das contas abaixo</LoginText>
			</Header>

			<Footer>
				<LoginButton onPress={() => handleLoginWithGoogle()}>
					<GoogleIcon />
					<Divider />
					<ButtonText>Entrar com Google</ButtonText>
				</LoginButton>

				{Platform.OS === 'ios' && (
					<LoginButton>
						<AppleIcon />
						<Divider />
						<ButtonText>Entrar com Apple</ButtonText>
					</LoginButton>
				)}
			</Footer>
		</Container>
	);
}
