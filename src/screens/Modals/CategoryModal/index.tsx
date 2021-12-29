import React from 'react';

import { categories, CategoryProps } from '../../../utils/categories';
import { Button } from '../../../components/Form/Button';
import { Header } from '../../../components/Header';

import {
	Container,
	Category,
	Icon,
	Name,
	Separator,
	CategoriesList,
	Footer,
} from './styles';

export type Category = {
	key: string;
	name: string;
	icon: string;
};

interface ModalProps {
	category: Category;
	setCategory: (category: Category) => void;
	closeSelectCategory: () => void;
}

export function CategoryModal({
	category,
	setCategory,
	closeSelectCategory,
}: ModalProps) {
	function handleSetCategory(item: CategoryProps): void {
		setCategory({
			name: item.name,
			key: item.key,
			icon: item.icon,
		});
	}

	return (
		<Container>
			<Header title="Categorias" />

			<CategoriesList
				data={categories}
				keyExtractor={(item) => item.key}
				renderItem={({ item }) => (
					<Category
						onPress={() => handleSetCategory(item)}
						isActive={category.key === item.key}
					>
						<Icon name={item.icon} />
						<Name>{item.name}</Name>
					</Category>
				)}
				ItemSeparatorComponent={() => <Separator />}
			/>

			<Footer>
				<Button
					title="Selecionar Categoria"
					onPress={closeSelectCategory}
				/>
			</Footer>
		</Container>
	);
}
