'use client';

import { CheckoutItem, CheckoutItemDetails, Container, Title } from '@/shared/components/shared';
import { CheckoutSidebar } from '@/shared/components/shared/checkout-sidebar';
import { WhiteBlock } from '@/shared/components/shared/white-block';
import { Button, Input, Textarea } from '@/shared/components/ui';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { useCart } from '@/shared/hooks';
import { getCartItemDetails } from '@/shared/lib';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import React from 'react';

type Props = {};

export default function CheckoutPage({}: Props) {
  const { addCartItem, removeCartItem, updateItemQuantity, totalAmount, items } = useCart();

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className='mt-10'>
      <Title text='Checkout' className='font-extrabold mb-8 text-[36px]' />

      <div className='flex gap-10'>
        {/* Left */}
        <div className='flex flex-col gap-10 flex-1 mb-20'>
          <WhiteBlock title='1. Cart'>
            <div className='flex flex-col gap-5'>
              {items.map((item) => (
                <CheckoutItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  quantity={item.quantity}
                  details={getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )}
                  disabled={item.disabled}
                  onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                  onClickRemove={() => removeCartItem(item.id)}
                />
              ))}
            </div>
          </WhiteBlock>

          <WhiteBlock title='2. Personal details'>
            <div className='grid grid-cols-2 gap-5'>
              <Input name='name' className='text-base' placeholder='Name' />
              <Input name='lastName' className='text-base' placeholder='Surname' />
              <Input name='email' className='text-base' placeholder='Email' />
              <Input name='phone' className='text-base' placeholder='Phone' />
            </div>
          </WhiteBlock>

          <WhiteBlock title='3. Delivery details'>
            <div className='flex flex-col gap-5'>
              <Input name='address' className='text-base' placeholder='Address' />
              <Textarea rows={5} name='address' className='text-base' placeholder='Comments to delivery' />
            </div>
          </WhiteBlock>
        </div>

        {/* Right */}
        <div className='w-[450px]'>
          <CheckoutSidebar totalAmount={totalAmount} />
        </div>
      </div>
    </Container>
  );
}
