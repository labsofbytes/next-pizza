import React from 'react';

import { FilterCheckbox } from './filter-checkbox';
import { RangeSlider } from './range-slider';
import { Input } from '@/components/ui/input';
import { Title } from './title';
import { CheckboxFiltersGroup } from './checkbox-filter-group';

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text='Filters' size='sm' className='mb-5 font-bold' />

      <div className='flex flex-col gap-4'>
        <FilterCheckbox text='Can be assembled' value='1' />
        <FilterCheckbox text='New arrivals' value='2' />
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
        limit={6}
        defaultItems={[
          {
            text: 'Cheese sauce',
            value: '1',
          },
          {
            text: 'Mozzarella',
            value: '2',
          },
          {
            text: 'Garlic',
            value: '3',
          },
          {
            text: 'Pickles',
            value: '4',
          },
          {
            text: 'Red onion',
            value: '5',
          },
          {
            text: 'Tomatoes',
            value: '6',
          },
          {
            text: 'Cheese sauce',
            value: '1',
          },
          {
            text: 'Mozzarella',
            value: '2',
          },
          {
            text: 'Garlic',
            value: '3',
          },
          {
            text: 'Pickles',
            value: '4',
          },
          {
            text: 'Red onion',
            value: '5',
          },
          {
            text: 'Tomatoes',
            value: '6',
          },
        ]}
        items={[
          {
            text: 'Cheese sauce',
            value: '1',
          },
          {
            text: 'Mozzarella',
            value: '2',
          },
          {
            text: 'Garlic',
            value: '3',
          },
          {
            text: 'Pickles',
            value: '4',
          },
          {
            text: 'Red onion',
            value: '5',
          },
          {
            text: 'Tomatoes',
            value: '6',
          },
          {
            text: 'Cheese sauce',
            value: '1',
          },
          {
            text: 'Mozzarella',
            value: '2',
          },
          {
            text: 'Garlic',
            value: '3',
          },
          {
            text: 'Pickles',
            value: '4',
          },
          {
            text: 'Red onion',
            value: '5',
          },
          {
            text: 'Tomatoes',
            value: '6',
          },
        ]}
      />
    </div>
  );
};
