import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton } from 'react-native-gesture-handler';

import AppleSvg from '../../global/assets/apple.svg';
import GoogleSvg from '../../global/assets/google.svg';
import GoLogo from '../../global/assets/logo.svg';

export const Container = styled.View`
	flex: 1;
`;

export const Header = styled.View`
	width: 100%;
	height: 70%;

	align-items: center;
	justify-content: flex-end;

	background-color: ${({ theme }) => theme.colors.primary};
`;

export const TitleWrapper = styled.View`
	align-items: center;

	padding: 0 48px;
	margin-bottom: ${RFValue(100)}px;
`;

export const Logo = styled(GoLogo)`
	width: ${RFValue(120)}px;
	height: ${RFValue(68)}px;

	margin-bottom: 40px;
`;

export const CallText = styled.Text`
	font-size: ${RFValue(30)}px;
	font-family: ${({ theme }) => theme.fonts.regular};

	text-align: center;
	color: ${({ theme }) => theme.colors.background};
`;

export const LoginText = styled.Text`
	padding: 0 60px;
	margin-bottom: ${RFValue(60)}px;

	font-size: ${RFValue(16)}px;
	font-family: ${({ theme }) => theme.fonts.medium};

	text-align: center;
	color: ${({ theme }) => theme.colors.background};
`;

export const Footer = styled.View`
	width: 100%;
	height: 30%;
	align-items: center;

	padding: 0 32px;

	background-color: ${({ theme }) => theme.colors.secondary};
`;

export const LoginButton = styled(RectButton)`
	position: relative;
	top: -27px;

	flex-direction: row;
	align-items: center;

	width: 100%;
	margin-bottom: 16px;

	border-radius: 5px;

	background-color: ${({ theme }) => theme.colors.shape};
`;

export const GoogleIcon = styled(GoogleSvg)`
	margin: 16px;
`;

export const AppleIcon = styled(AppleSvg)`
	margin: 16px;
`;

export const Divider = styled.View`
	height: 100%;
	width: 1px;

	background-color: ${({ theme }) => theme.colors.background};
`;

export const ButtonText = styled.Text`
	flex: 1;

	font-size: ${RFValue(14)}px;
	font-family: ${({ theme }) => theme.fonts.medium};

	text-align: center;
	color: ${({ theme }) => theme.colors.title};
`;
