import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { Header } from '../../components/Header';
import { Button } from '../../components/Form/Button';
import { InputForm } from '../../components/Form/InputForm';
import { SelectInput } from '../../components/Form/SelectInput';
import { CategoryModal } from '../Modals/CategoryModal';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { Container, Form, Fields, TransactionsTypes } from './styles';
import { TransactionProps } from '../Dashboard';
import { CategoryProps } from '../../components/TransactionCard';

interface FormData {
	title: string;
	amount: string;
}

const schema = Yup.object().shape({
	title: Yup.string().required('Nome é obrigatório'),
	amount: Yup.number()
		.typeError('Informe um valor numérico')
		.positive('O valor precisa ser positivo'),
});

export function Register() {
	const navigation = useNavigation();
	const dataKey = '@gofinance:transactions';

	const [transactionType, setTransactionType] = useState<
		'income' | 'outcome' | null
	>(null);

	const [categoryModal, setCategoryModal] = useState(false);
	const [category, setCategory] = useState<CategoryProps>({
		key: 'category',
		name: 'Categoria',
	});

	function handleOpenCategoryModal(): void {
		setCategoryModal(true);
	}

	function handleCloseCategoryModal(): void {
		setCategoryModal(false);
	}

	function handleSetTransactionType(type: 'income' | 'outcome'): void {
		setTransactionType(type);
	}

	async function handleRegister(form: FormData) {
		if (!transactionType) {
			return Alert.alert('Selecione o tipo da transação');
		}

		if (category.key === 'category') {
			return Alert.alert('Selecione uma categoria para a transação');
		}

		const newRegister: TransactionProps = {
			id: String(uuid.v4()),
			title: form.title,
			amount: form.amount,
			type: transactionType,
			category,
			date: new Date().toString(),
		};

		try {
			const jsonRegisters = await AsyncStorage.getItem(dataKey);
			const registers = jsonRegisters ? JSON.parse(jsonRegisters) : [];

			const data = [...registers, newRegister];

			await AsyncStorage.setItem(dataKey, JSON.stringify(data));
		} catch (error) {
			console.error(error);
			Alert.alert('Não foi possível registrar sua operação');
		} finally {
			reset();
			setTransactionType(null);
			setCategory({
				key: 'category',
				name: 'Categoria',
			});

			navigation.navigate('Listagem');
		}
	}

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<Container>
				<Header title="Cadastro" />

				<Form>
					<Fields>
						<InputForm
							name="title"
							control={control}
							placeholder="Nome"
							autoCorrect={false}
							autoCapitalize="sentences"
							error={errors.title && errors.title.message}
						/>
						<InputForm
							name="amount"
							control={control}
							placeholder="Preço"
							keyboardType="numeric"
							error={errors.amount && errors.amount.message}
						/>

						<TransactionsTypes>
							<TransactionTypeButton
								onPress={() =>
									handleSetTransactionType('income')
								}
								title="Entrada"
								type="income"
								isActive={transactionType === 'income'}
							/>
							<TransactionTypeButton
								onPress={() =>
									handleSetTransactionType('outcome')
								}
								title="Saída"
								type="outcome"
								isActive={transactionType === 'outcome'}
							/>
						</TransactionsTypes>

						<SelectInput
							icon={category.icon}
							title={category.name}
							onPress={handleOpenCategoryModal}
						/>
					</Fields>
					<Button
						title="Enviar"
						onPress={handleSubmit(handleRegister)}
					/>
				</Form>

				<Modal visible={categoryModal}>
					<CategoryModal
						category={category}
						setCategory={setCategory}
						closeSelectCategory={handleCloseCategoryModal}
					/>
				</Modal>
			</Container>
		</TouchableWithoutFeedback>
	);
}
