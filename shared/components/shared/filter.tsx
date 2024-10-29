'use client';

import React, { FC } from 'react';

import { RangeSlider } from './range-slider';
import { Input } from '@/shared/components/ui/input';
import { Title } from './title';
import { CheckboxFiltersGroup } from './checkbox-filter-group';

import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks';

interface Props {
  className?: string;
}

const maxPrice = 500;

export const Filters: FC<Props> = ({ className }) => {
  const { ingredients, isLoading } = useIngredients();
  const filters = useFilters();

  useQueryFilters(filters);

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }));

  const updatePrice = (values: number[]) => {
    filters.setPrices('priceFrom', values[0]);
    filters.setPrices('priceTo', values[1]);
  };

  return (
    <div className={className}>
      <Title text='Filters' size='sm' className='mb-5 font-bold' />

      <CheckboxFiltersGroup
        title='Type of dough'
        name='pizzaTypes'
        className='mb-5'
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.pizzaTypes}
        items={[
          { text: 'Thin', value: '1' },
          { text: 'Traditional', value: '2' },
        ]}
      />

      <CheckboxFiltersGroup
        title='Sizes'
        name='Sizes'
        className='mb-5'
        onClickCheckbox={filters.setSizes}
        selected={filters.sizes}
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
            value={String(filters.priceFrom)}
            onChange={(e) => {
              filters.setPrices('priceFrom', Number(e.target.value));
            }}
          />
          <Input
            type='number'
            min={100}
            max={maxPrice}
            placeholder={String(maxPrice)}
            value={String(filters.priceTo)}
            onChange={(e) => {
              filters.setPrices('priceTo', Number(e.target.value));
            }}
          />
        </div>

        <RangeSlider
          min={0}
          max={maxPrice}
          step={10}
          value={[filters.priceFrom || 0, filters.priceTo || maxPrice]}
          onValueChange={updatePrice}
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
        onClickCheckbox={filters.setSelectedIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};
