'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { ChooseProductForm, ChoosePizzaForm } from '..';
import { ProductWithRelations } from '@/@types/prisma';

type Props = {
  product: ProductWithRelations;
};

export const ChooseProductModal = ({ product }: Props) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  return (
    <Dialog open={Boolean(product.name)} onOpenChange={() => router.back()}>
      <DialogContent className='p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
        {isPizzaForm ? (
          <ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={product.ingredients} />
        ) : (
          <ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
        )}
      </DialogContent>
    </Dialog>
  );
};
