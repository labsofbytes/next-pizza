'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/shared/store';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { ChooseProductForm, ChoosePizzaForm } from '..';
import { ProductWithRelations } from '@/@types/prisma';

type Props = {
  product: ProductWithRelations;
};

export const ChooseProductModal = ({ product }: Props) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem?.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const onAddProduct = () => {
    addCartItem({ productId: firstItem.id });
  };

  const onAddPizza = (productId: number, ingredients: number[]) => {
    addCartItem({ productId, ingredients });
  };

  return (
    <Dialog open={Boolean(product.name)} onOpenChange={() => router.back()}>
      <DialogContent className='p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.items}
            onSubmit={onAddPizza}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onSubmit={onAddProduct}
            price={firstItem.price}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
