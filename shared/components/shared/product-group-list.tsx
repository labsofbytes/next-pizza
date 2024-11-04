'use client';

import React from 'react';
import { useCategoryStore } from '@/shared/store/category';
import { useIntersection } from 'react-use';

import { Title } from './title';
import { ProductCard } from './product-card';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
  title: string;
  items: ProductWithRelations[];
  categoryId: number;
  className?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, className, categoryId }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, categoryId]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      {items.length > 0 && <Title text={title} size='lg' className='font-extrabold mb-5' />}
      <div className='grid grid-cols-3 gap-[50px]'>
        {items.map((item, index) => (
          <ProductCard
            key={item.id}
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.items[0].price}
            count={index % 2}
            ingredients={item.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
