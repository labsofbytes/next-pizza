'use client';

import React, { FC, useEffect, useState } from 'react';

import { RangeSlider } from './range-slider';
import { Input } from '@/components/ui/input';
import { Title } from './title';
import { CheckboxFiltersGroup } from './checkbox-filter-group';
import { useFilterIngredient } from '@/app/hooks/use-filter-ingredients';
import { useSet } from 'react-use';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';

interface Props {
  className?: string;
}

interface PriceProps {
  priceFrom?: number;
  priceTo?: number;
}

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

const maxPrice = 500;

export const Filters: FC<Props> = ({ className }) => {
  const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
  const router = useRouter();
  const { ingredients, isLoading, onAddId, selectedIngredients } = useFilterIngredient(
    searchParams.get('ingredients')?.split(',') || []
  );
  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(new Set<string>(searchParams.get('sizes')?.split(',') || []))
  );
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(new Set<string>(searchParams.get('pizzaTypes')?.split(',') || []))
  );

  const [{ priceFrom, priceTo }, setPrise] = useState<PriceProps>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined,
  });

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }));

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrise((prevPrices) => ({ ...prevPrices, [name]: value }));
  };

  useEffect(() => {
    const filter = {
      priceFrom,
      priceTo,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
    };

    const query = qs.stringify(filter, {
      arrayFormat: 'comma',
    });

    router.push(`?${query}`, {
      scroll: false,
    });
  }, [selectedIngredients, pizzaTypes, sizes, priceFrom, priceTo]);

  return (
    <div className={className}>
      <Title text='Filters' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        title='Type of dough'
        name='pizzaTypes'
        className='mb-5'
        onClickCheckbox={togglePizzaTypes}
        selected={pizzaTypes}
        items={[
          { text: 'Thin', value: '1' },
          { text: 'Traditional', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title='Sizes'
        name='Sizes'
        className='mb-5'
        onClickCheckbox={toggleSizes}
        selected={sizes}
        items={[
          { text: '20 cm', value: '20' },
          { text: '30 cm', value: '30' },
          { text: '40 cm', value: '40' },
        ]}
      />

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Price from and to:</p>
        <div className='flex gap-3 mb-5'>
          <Input
            type='number'
            placeholder='0'
            min={0}
            max={maxPrice}
            value={String(priceFrom)}
            onChange={(e) => updatePrice('priceFrom', Number(e.target.value))}
          />
          <Input
            type='number'
            min={100}
            max={maxPrice}
            placeholder={String(maxPrice)}
            value={String(priceTo)}
            onChange={(e) => updatePrice('priceTo', Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={maxPrice}
          step={10}
          value={[priceFrom || 0, priceTo || maxPrice]}
          onValueChange={([from, to]) => setPrise({ priceFrom: from, priceTo: to })}
        />
      </div>

      <CheckboxFiltersGroup
        className='mt-5'
        title='Format'
        name='ingredients'
        limit={6}
        defaultItems={items.slice(0, 6)}
        items={items}
        loading={isLoading}
        onClickCheckbox={onAddId}
        selected={selectedIngredients}
      />
    </div>
  );
};
