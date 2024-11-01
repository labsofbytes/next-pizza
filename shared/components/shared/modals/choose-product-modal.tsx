'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/shared/store';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { ChooseProductForm, ChoosePizzaForm } from '..';
import { ProductWithRelations } from '@/@types/prisma';
import toast from 'react-hot-toast';

type Props = {
  product: ProductWithRelations;
};

export const ChooseProductModal = ({ product }: Props) => {
  const router = useRouter();
  const firstItem = product.items[0];
  const isPizzaForm = Boolean(firstItem?.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onSubmit = async (productId: number, ingredients: number[]) => {
    try {
      const itemId = productId ?? firstItem.id;

      await addCartItem({ productId: itemId, ingredients });

      toast.success(product.name + ' added to cart');
      router.back();
    } catch (error) {
      toast.error('Failed to add pizza to cart');
      console.error(error);
    }
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
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            //@ts-ignore
            onSubmit={onSubmit}
            price={firstItem.price}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
