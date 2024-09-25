'use client';

import React from 'react';
import { useCategoryStore } from '@/store/category';
import { useIntersection } from 'react-use';

import { Title } from './title';
import { ProductCard } from './product-card';

interface Props {
  title: string;
  items: any[];
  categoryId: number;
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, className, categoryId }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 1,
  });

  React.useEffect(() => {
    if (intersection?.intersectionRatio) {
      setActiveCategoryId(categoryId);
    }

    console.log('categoryId:', categoryId);
  }, [title, intersection?.intersectionRatio, categoryId]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />
      <div className='grid grid-cols-3 gap-[50px]'>
        {items.map((item, i) => (
          <ProductCard
            key={item.id}
            name='Margarita'
            imageUrl='https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp'
            price={390}
            count={i % 2}
          />
        ))}
      </div>
    </div>
  );
};
