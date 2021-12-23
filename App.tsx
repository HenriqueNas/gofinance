import React from 'react';
import { ThemeProvider } from 'styled-components/native';

import {
	useFonts,
	Poppins_400Regular,
	Poppins_500Medium,
	Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

import { Dashboard } from './src/screens/Dashboard/intex';
import theme from './src/global/styles/theme';
import { StatusBar } from 'expo-status-bar';

export default function App() {
	const [fontsLoaded] = useFonts({
		Poppins_400Regular,
		Poppins_500Medium,
		Poppins_700Bold,
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<ThemeProvider theme={theme}>
			<StatusBar style="light" backgroundColor={theme.colors.primary} />
			<Dashboard />
		</ThemeProvider>
	);
}
