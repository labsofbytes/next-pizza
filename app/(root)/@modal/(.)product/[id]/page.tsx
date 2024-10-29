import { Container } from '@/shared/components/shared';
import { ChooseProductModal } from '@/shared/components/shared/modals';
import { ingredients } from '@/prisma/constants';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
// include: {
//     ingredients: true,
//     items: {
//       include: {
//         product: {
//           include: {
//             items: true,
//           },
//         },
//       },
//     },
//   },
