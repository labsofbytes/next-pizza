'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { ProductWithRelations } from '@/@types/prisma';
import { ProductForm } from '../product-form';

type Props = {
  product: ProductWithRelations;
};

export const ChooseProductModal = ({ product }: Props) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product.name)} onOpenChange={() => router.back()}>
      <DialogContent className='p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
        <ProductForm product={product} onSubmit={() => router.back()} />
        <DialogTitle hidden>x</DialogTitle>
      </DialogContent>
    </Dialog>
  );
};
