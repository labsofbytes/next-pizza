import React from 'react';

import { Container, Header } from '@/shared/components/shared';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Pizza | Checkout',
  description: 'Checkout page',
};

type Props = {
  children: React.ReactNode;
};

export default function CheckoutLayout({ children }: Props) {
  return (
    <main className='min-h-screen bg-[#f4f1ee]'>
      <Container>
        <Header hasCart={false} hasSearch={false} className='border-gray-200' />
        {children}
      </Container>
    </main>
  );
}
