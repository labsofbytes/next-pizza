import React from 'react';
import { cn } from '@/shared/lib/utils';
import { PizzaImage } from './pizza-image';
import { Title } from './title';
import { Button } from '../ui';
import { GroupVariants } from './group-variants';
import { PizzaSize, pizzaSize, PizzaType } from '@/shared/constants/pizza';
import { IngredientsItem } from './ingredients-item';

interface Props {
  imageUrl: string;
  name: string;
  ingredients: any[];
  items?: any[];
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChoosePizzaForm: React.FC<Props> = ({ imageUrl, name, ingredients, items, onClickAdd, className }) => {
  const [size, setSize] = React.useState<PizzaSize>(30);
  const [type, setType] = React.useState<PizzaType>(1);

  const textDetails = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';
  const totalPrice = 70;

  return (
    <div className={cn(className, 'flex flex-1')}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className='w-[490px] bg-[#f7f6f5] p-7'>
        <Title text={name} size='md' className='font-extrabold mb-1' />

        <p className='text-gray-400'>{textDetails}</p>

        <div className='flex flex-col gap-4 mt-5'>
          <GroupVariants
            items={pizzaSize}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />
          <GroupVariants
            items={PizzaType}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className='mt-5  bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'>
          <div className='grid grid-cols-3 gap-3'>
            {ingredients.map(({ imageUrl, name, id, price }) => (
              <IngredientsItem
                key={id}
                imageUrl={imageUrl}
                name={name}
                price={price}
                active={false}
                onClick={onClickAdd}
              />
            ))}
          </div>
        </div>

        <Button className='h-[55px] px-10 text-base rounded-[18px] w-full mt-10'>
          Add into basket for {totalPrice} $
        </Button>
      </div>
    </div>
  );
};
