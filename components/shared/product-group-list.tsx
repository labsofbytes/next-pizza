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
    threshold: 0.4,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveCategoryId(categoryId);
    }
  }, [intersection?.isIntersecting, categoryId]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size='lg' className='font-extrabold mb-5' />
      <div className='grid grid-cols-3 gap-[50px]'>
        {items.map((item, index) => (
          <ProductCard
            key={item.id}
            id={index + 1}
            name={item.name}
            imageUrl={item.imageUrl}
            price={item.price}
            count={index % 2}
          />
        ))}
      </div>
    </div>
  );
};
