import React from 'react';
import { Container } from './container';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';
import { cn } from '@/shared/lib/utils';
import { Category } from '@prisma/client';

type Props = {
  categories: Category[];
};

export const TopBar = ({ categories }: Props) => {
  return (
    <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10')}>
      <Container className='flex items-center justify-between'>
        <Categories items={categories} />
        <SortPopup />
      </Container>
    </div>
  );
};
