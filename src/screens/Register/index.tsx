import React, { useState } from 'react';
import { Header } from '../../components/Header';
import { Input } from '../../components/Form/Input';

import { Container, Form, Fields, TransactionsTypes } from './styles';
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';

export function Register() {
	const [transactionType, setTransactionType] = useState<
		'income' | 'outcome' | null
	>(null);

	function handleTransactionType(type: 'income' | 'outcome'): void {
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
							onPress={() => handleTransactionType('income')}
							title="Entrada"
							type="income"
							isActive={transactionType === 'income'}
						/>
						<TransactionTypeButton
							onPress={() => handleTransactionType('outcome')}
							title="Saída"
							type="outcome"
							isActive={transactionType === 'outcome'}
						/>
					</TransactionsTypes>
				</Fields>
				<Button title="Enviar" />
			</Form>
		</Container>
	);
}
