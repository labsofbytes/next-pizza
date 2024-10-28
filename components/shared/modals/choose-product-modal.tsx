'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Product } from '@prisma/client';
import React from 'react';
import { Title } from '../title';
import { useRouter } from 'next/navigation';

type Props = {
  product: Product;
};

export const ChooseProductModal = ({ product }: Props) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product.name)} onOpenChange={() => router.back()}>
      <DialogContent className='p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden'>
        <Title text={product.name} />
      </DialogContent>
    </Dialog>
  );
};
