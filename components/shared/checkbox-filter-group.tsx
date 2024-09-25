'use client';

import React, { useState } from 'react';
import { useSet } from 'react-use';

import * as filterCheckbox from './filter-checkbox';
import { Input } from '../ui/input';

type Item = filterCheckbox.FilterCheckboxProps;

interface Props {
  title: string;
  items: Item[];
  defaultItems: Item[];
  limit?: number;
  searchInputPlaceholder?: string;
  className?: string;
  onChange?: (values: string[]) => void;
  defaultValue?: string[];
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  searchInputPlaceholder = 'Search...',
  className,
  onChange,
  defaultValue,
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [selected, { add, toggle }] = useSet<string>(new Set([]));
  const [search, setSearch] = useState('');

  const onCheckedChange = (value: string) => {
    toggle(value);
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  React.useEffect(() => {
    if (defaultValue) {
      defaultValue.forEach(add);
    }
  }, [defaultValue?.length]);

  React.useEffect(() => {
    onChange?.(Array.from(selected));
  }, [selected]);

  return (
    <div className={className}>
      <p className='font-bold mb-3'>{title}</p>

      {showAll && (
        <div className='mb-5'>
          <Input
            placeholder={searchInputPlaceholder}
            className='bg-gray-50 border-none'
            value={search}
            onChange={onChangeSearchInput}
          />
        </div>
      )}

      <div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
        {(showAll ? items.filter((item) => item.text.toLowerCase().includes(search.toLowerCase())) : defaultItems).map(
          (item) => (
            <filterCheckbox.FilterCheckbox
              onCheckedChange={() => onCheckedChange(item.value)}
              checked={selected.has(item.value)}
              key={String(item.value)}
              value={item.value}
              text={item.text}
              endAdornment={item.endAdornment}
            />
          )
        )}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
            {showAll ? 'Hide' : '+ Show all'}
          </button>
        </div>
      )}
    </div>
  );
};
