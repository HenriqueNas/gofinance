import React, { useState } from 'react';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '../../components/Header';
import { Button } from '../../components/Form/Button';
import { InputForm } from '../../components/Form/InputForm';
import { SelectInput } from '../../components/Form/SelectInput';
import { Category, CategoryModal } from '../Modals/CategoryModal';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

import { Container, Form, Fields, TransactionsTypes } from './styles';

interface FormData {
	name: string;
	amount: string;
}

const schema = Yup.object().shape({
	name: Yup.string().required('Nome é obrigatório'),
	amount: Yup.number()
		.typeError('Informe um valor numérico')
		.positive('O valor precisa ser positivo'),
});

export function Register() {
	const [transactionType, setTransactionType] = useState<
		'income' | 'outcome' | null
	>(null);

	const [categoryModal, setCategoryModal] = useState(false);
	const [category, setCategory] = useState<Category>({
		key: 'category',
		name: 'Categoria',
		icon: '',
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

	function handleRegister(form: FormData) {
		if (!transactionType) {
			return Alert.alert('Selecione o tipo da transação');
		}

		if (category.key === 'category') {
			return Alert.alert('Selecione uma categoria para a transação');
		}

		const data = {
			name: form.name,
			amount: form.amount,
			type: transactionType,
			category: category.key,
		};

		console.log(data);
	}

	const {
		control,
		handleSubmit,
		formState: { errors },
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
							name="name"
							control={control}
							placeholder="Nome"
							autoCorrect={false}
							autoCapitalize="sentences"
							error={errors.name && errors.name.message}
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
