import React, { useState } from 'react';
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
	const { loginWithGoogle, loginWithApple } = useAuth();

	async function handleLoginWithGoogle() {
		try {
			return await loginWithGoogle();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível fazer login com sua conta Google');
		}
	}

	async function handleLoginWithApple() {
		try {
			return await loginWithApple();
		} catch (error) {
			console.log(error);
			Alert.alert('Não foi possível fazer login com sua conta Apple');
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
				<LoginButton onPress={handleLoginWithGoogle}>
					<GoogleIcon />
					<Divider />
					<ButtonText>Entrar com Google</ButtonText>
				</LoginButton>

				{Platform.OS === 'ios' && (
					<LoginButton onPress={handleLoginWithApple}>
						<AppleIcon />
						<Divider />
						<ButtonText>Entrar com Apple</ButtonText>
					</LoginButton>
				)}
			</Footer>
		</Container>
	);
}
