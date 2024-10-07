'use client';

import React from 'react';

import { FilterCheckbox } from './filter-checkbox';
import { RangeSlider } from './range-slider';
import { Input } from '@/components/ui/input';
import { Title } from './title';
import { CheckboxFiltersGroup } from './checkbox-filter-group';
import { useFilterIngredient } from '@/app/hooks/useFilterIngredients';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, isLoading, onAddId, selectedIds } = useFilterIngredient();

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: ingredient.id.toString(),
  }));

  return (
    <div className={className}>
      <Title text='Filters' size='sm' className='mb-5 font-bold' />

      <div className='flex flex-col gap-4'>
        <FilterCheckbox name='ingredients-1' text='Can be assembled' value='1' />
        <FilterCheckbox name='ingredients-2' text='New arrivals' value='2' />
      </div>

      <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
        <p className='font-bold mb-3'>Price from and to:</p>
        <div className='flex gap-3 mb-5'>
          <Input type='number' placeholder='0' min={0} max={1000} defaultValue={0} />
          <Input type='number' min={100} max={1000} placeholder='1000' />
        </div>
        <RangeSlider min={0} max={1000} step={10} value={[0, 1000]} />
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
        selectedIds={selectedIds}
      />
    </div>
  );
};
