import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Resume } from '../screens/Resume';
import { useAuth } from '../context/auth';
import { Login } from '../screens/Login';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppRoutes() {
	const { isAuth } = useAuth();
	const theme = useTheme();

	if (!isAuth) {
		return <Login />;
	}

	return (
		<Navigator
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: theme.colors.secondary,
				tabBarInactiveTintColor: theme.colors.text,
				tabBarLabelPosition: 'beside-icon',
				tabBarStyle: {
					height: 88,
					paddingVertical: 20,
				},
			}}
		>
			<Screen
				name="Listagem"
				component={Dashboard}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Feather name="list" size={size} color={color} />
					),
				}}
			/>
			<Screen
				name="Cadastrar"
				component={Register}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Feather name="dollar-sign" size={size} color={color} />
					),
				}}
			/>
			<Screen
				name="Resumo"
				component={Resume}
				options={{
					tabBarIcon: ({ size, color }) => (
						<Feather name="pie-chart" size={size} color={color} />
					),
				}}
			/>
		</Navigator>
	);
}
