import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/utils';
import { Container } from './container';
import { Button } from '../ui/button';
import { SearchInput } from './search-input';
import { CartButton } from './cart-button';

interface Props {
  hasCart?: boolean;
  hasSearch?: boolean;
  className?: string;
}

export const Header: React.FC<Props> = ({ className, hasCart = true, hasSearch = true }) => {
  return (
    <header className={cn('border-b border-gray-100', className)}>
      <Container className='flex items-center justify-between py-8'>
        <Link href='/' className='flex items-center gap-4'>
          <Image src='/logo.png' width={35} height={35} alt='Logo' />
          <div>
            <h1 className='text-2xl uppercase font-black'>Next Pizza</h1>
            <p className='text-sm text-gray-400 leading-3'>it can't get tastier</p>
          </div>
        </Link>

        <div className='mx-10 flex-1'>{hasSearch && <SearchInput />}</div>

        <div className='flex items-center gap-3'>
          <Button variant='outline'>Log In</Button>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};
