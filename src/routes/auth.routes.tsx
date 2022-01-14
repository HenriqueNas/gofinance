import React from 'react';

import { useTheme } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';

import { Login } from '../screens/Login';

const { Navigator, Screen } = createStackNavigator();

export function AuthRoutes() {
	return (
		<Navigator
			initialRouteName={'Login'}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Screen name="Login" component={Login} />
		</Navigator>
	);
}
