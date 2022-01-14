import React from 'react';

import { useAuth } from '../context/auth';
import { NavigationContainer } from '@react-navigation/native';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export function Routes() {
	const { isAuth } = useAuth();

	return (
		<NavigationContainer>
			{isAuth ? <AppRoutes /> : <AuthRoutes />}
		</NavigationContainer>
	);
}
