import React, { useState } from 'react';
import { Modal } from 'react-native';

import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';

import { Container, Form, Fields, TransactionsTypes } from './styles';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { SelectInput } from '../../components/Form/SelectInput';
import { Category, CategoryModal } from '../Modals/CategoryModal';
import { categories } from '../../utils/categories';

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

	return (
		<Container>
			<Header title="Cadastro" />

			<Form>
				<Fields>
					<Input placeholder="Nome" />
					<Input placeholder="Preço" />

					<TransactionsTypes>
						<TransactionTypeButton
							onPress={() => handleSetTransactionType('income')}
							title="Entrada"
							type="income"
							isActive={transactionType === 'income'}
						/>
						<TransactionTypeButton
							onPress={() => handleSetTransactionType('outcome')}
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
				<Button title="Enviar" />
			</Form>

			<Modal visible={categoryModal}>
				<CategoryModal
					category={category}
					setCategory={setCategory}
					closeSelectCategory={handleCloseCategoryModal}
				/>
			</Modal>
		</Container>
	);
}
