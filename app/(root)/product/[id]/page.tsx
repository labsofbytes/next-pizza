import { Container, GroupVariants, PizzaImage, Title } from '@/shared/components/shared';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function ProductPage({ params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className='flex flex-col my-10'>
      <div className='flex flex-1'>
        <PizzaImage imageUrl={product.imageUrl} size={40} />

        <div className='w-[490px] bg-[#f7f6f5] p-7'>
          <Title text={product.name} size='md' className='font-extrabold mb-1' />

          <GroupVariants
            selectedValue={'2'}
            items={[
              { value: '1', text: 'Small' },
              { value: '2', text: 'Medium' },
              { value: '3', text: 'Large' },
            ]}
          />

          <p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
      </div>
    </Container>
  );
}
