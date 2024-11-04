'use client';

import { ProductWithRelations } from '@/@types/prisma';
import { ChoosePizzaForm } from './choose-pizza-form';
import { ChooseProductForm } from './choose-product-form';
import toast from 'react-hot-toast';
import { useCartStore } from '@/shared/store';

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm: React.FC<Props> = ({ product, onSubmit: _onSubmit }) => {
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem?.pizzaType);

  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onSubmit = async (productId: number, ingredients: number[]) => {
    try {
      const itemId = productId ?? firstItem.id;

      await addCartItem({ productId: itemId, ingredients });

      toast.success(product.name + ' added to cart');

      _onSubmit?.();
    } catch (error) {
      toast.error('Failed to add pizza to cart');
      console.error(error);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        items={product.items}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      //@ts-ignore
      onSubmit={onSubmit}
      price={firstItem.price}
      loading={loading}
    />
  );
};
