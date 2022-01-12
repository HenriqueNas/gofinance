import React, { createContext, ReactNode, useContext, useState } from 'react';

import * as AuthSession from 'expo-auth-session';

interface AuthContextProps {
	user: UserProps;
	isAuth: boolean;
	loginWithGoogle: () => Promise<void>;
	logOut: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

interface AuthResponse {
	type: 'success' | string;
	params: {
		access_token: string;
	};
}

interface UserProps {
	id: string;
	name: string;
	email: string;
	photo?: string;
}

const Auth = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [user, setUser] = useState<UserProps>({} as UserProps);

	async function loginWithGoogle() {
		try {
			const CLIENT_ID =
				'1009444040279-n9bj0knh8io6bjvaqcls4agmfcqtgm96.apps.googleusercontent.com';
			const REDIRECT_URI = 'https://auth.expo.io/@henriquenas/gofinance';
			const RESPONSE_TYPE = 'token';
			const SCOPE = encodeURI('profile email');

			const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

			const { type, params } = (await AuthSession.startAsync({
				authUrl,
			})) as AuthResponse;

			if (type === 'success') {
				try {
					const response = await fetch(
						`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
					);
					const userInfo = await response.json();

					setUser({
						id: userInfo.id,
						name: userInfo.name,
						email: userInfo.email,
						photo: userInfo.picture,
					});
					setIsAuth(true);
				} catch (error) {
					throw new Error(error);
				}
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	function logOut() {
		setUser({} as UserProps);
		setIsAuth(false);
	}

	return (
		<Auth.Provider
			value={{
				user,
				isAuth,
				loginWithGoogle,
				logOut,
			}}
		>
			{children}
		</Auth.Provider>
	);
}

export function useAuth() {
	return useContext(Auth);
}
