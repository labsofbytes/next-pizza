import React from 'react';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import Link from 'next/link';
import { Ingredient } from '@prisma/client';
// import { CountButton } from './count-button';

interface Props {
  id: number;
  name: string;
  price: number;
  count?: number;
  imageUrl?: string;
  ingredients: Ingredient[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ name, price, count, imageUrl, id, ingredients, className }) => {
  return (
    <Link href={`/product/${id}`} className={cn(className)}>
      <div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
        <img className='w-[215px] h-[215px]' src={imageUrl} alt='Logo' />
      </div>
      <Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
      <p className='text-sm text-gray-400'>
        {ingredients.map((ingredient, index) => (
          <span key={index}>
            {ingredient.name}
            {index < ingredients.length - 1 && ', '}
          </span>
        ))}
      </p>

      <div className='flex justify-between items-center mt-4'>
        <span className='text-[20px]'>
          from <b>{price} $</b>
        </span>

        {count ? null : ( //   <CountButton value={count} size="lg" />
          <Button variant='secondary'>
            <Plus className='w-4 h-4 mr-1' />
            Add
          </Button>
        )}
      </div>
    </Link>
  );
};
