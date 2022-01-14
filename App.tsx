import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { ThemeProvider } from 'styled-components/native';
import { Routes } from './src/routes';

import { AuthProvider, useAuth } from './src/context/auth';
import theme from './src/global/styles/theme';

export default function App() {
	const { isLoadingData } = useAuth();

	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!fontsLoaded || isLoadingData) {
		return <AppLoading />;
	}

	return (
		<ThemeProvider theme={theme}>
			<StatusBar style="light" backgroundColor={theme.colors.primary} />
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</ThemeProvider>
	);
}
