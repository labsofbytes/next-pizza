'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useClickAway } from 'react-use';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  return (
    <>
      {focused && <div className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30' />}

      <div ref={ref} className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', { className })}>
        <Search className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
        <input
          className='rounded-2xl outline-none w-full bg-gray-50 pl-11'
          type='text'
          placeholder='Find the pizza...'
          onFocus={() => setFocused(true)}
        />

        <div
          className={cn(
            'absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
            { 'visible opacity-100 top-12': focused }
          )}
        >
          <Link href='/product/1' className='flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10'>
            <img
              className='rounded-sm h-8 w-8'
              src='https://media.istockphoto.com/id/645243318/photo/delicious-classic-italian-pizza-pepperoni-with-sausages-and-cheese-mozzarella.jpg?s=612x612&w=0&k=20&c=J3ZWNXmghZu-Wad1anCfplOnW0JoqK1zCD24fMmkt9o='
              alt='pizza'
            />
            <span> Pizza</span>
          </Link>
        </div>
      </div>
    </>
  );
};
