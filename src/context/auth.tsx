import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

interface AuthContextProps {
	user: UserProps;
	isAuth: boolean;
	loginWithGoogle: () => Promise<void>;
	loginWithApple: () => Promise<void>;
	logOut: () => Promise<void>;
	isLoadingData: boolean;
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
	photo: string;
	type: 'google' | 'apple';
}

const Auth = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
	const authKey = '@gofinance:user';
	const [isAuth, setIsAuth] = useState<boolean>(false);
	const [user, setUser] = useState<UserProps>({} as UserProps);
	const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

	async function loginWithGoogle() {
		try {
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

					const userLogged: UserProps = {
						id: userInfo.id,
						name: userInfo.given_name,
						email: userInfo.email,
						photo: userInfo.picture,
						type: 'google',
					};

					setUser(userLogged);
					setIsAuth(true);

					await AsyncStorage.setItem(
						authKey,
						JSON.stringify(userLogged)
					);
				} catch (error) {
					throw new Error(error);
				}
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	async function loginWithApple() {
		try {
			const credentials = await AppleAuthentication.signInAsync({
				requestedScopes: [
					AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
					AppleAuthentication.AppleAuthenticationScope.EMAIL,
				],
			});

			if (credentials) {
				const fullName = credentials.fullName;

				const userLogged: UserProps = {
					id: credentials.user,
					name: fullName.givenName,
					email: credentials.email,
					type: 'apple',
					photo: `https://ui-avatars.com/api/?name=${fullName.givenName}+${fullName.familyName}`,
				};

				setUser(userLogged);
				setIsAuth(true);

				await AsyncStorage.setItem(authKey, JSON.stringify(userLogged));
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	useEffect(() => {
		(async () => {
			const jsonAuth = await AsyncStorage.getItem(authKey);

			if (jsonAuth) {
				setUser(JSON.parse(jsonAuth));
				setIsAuth(true);
			}

			setIsLoadingData(false);
		})();
	}, []);

	async function logOut() {
		setUser({} as UserProps);
		setIsAuth(false);

		await AsyncStorage.removeItem(authKey);
	}

	return (
		<Auth.Provider
			value={{
				user,
				isAuth,
				isLoadingData,
				loginWithGoogle,
				loginWithApple,
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
