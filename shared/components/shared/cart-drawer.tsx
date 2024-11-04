'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { CartDrawerItem, Title } from '.';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';
import { cn } from '@/shared/lib/utils';
import { useCart } from '@/shared/hooks';

type Props = {};

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  const { totalAmount, items, updateItemQuantity, removeCartItem } = useCart();
  const [redirect, setRedirect] = React.useState(false);

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className='flex flex-col justify-between pb-0 bg-[#f4f1ee]'>
        <div className={cn('flex flex-col h-full', { 'justify-center': totalAmount === 0 })}>
          {totalAmount > 0 && (
            <>
              <SheetHeader>
                <SheetTitle>
                  In basket <span className='font-bold'>{items.length} products</span>
                </SheetTitle>
              </SheetHeader>
            </>
          )}

          {totalAmount === 0 && (
            <div className='flex flex-col justify-center items-center w-72 mx-auto'>
              <Image src={'/assets/images/empty-box.png'} alt='Empty cart' width={120} height={120} />
              <Title size='sm' text='Your cart is empty' className='text-center font-bold my-2' />
              <p className='text-center text-neutral-500 mb-5'>Please, add some products to the cart</p>

              <SheetClose>
                <Button className='w-56 h-12 text-base' size='lg'>
                  <ArrowLeft className='w-5 mr-2' />
                  Continue shopping
                </Button>
              </SheetClose>
            </div>
          )}

          {totalAmount > 0 && (
            <>
              <div className='-mx-6 mt-3 overflow-auto flex-1'>
                {items.map((item) => (
                  <div className='mb-2' key={item.id}>
                    <CartDrawerItem
                      key={item.id}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      details={getCartItemDetails(
                        item.ingredients,
                        item.pizzaType as PizzaType,
                        item.pizzaSize as PizzaSize
                      )}
                      disabled={item.disabled}
                      name={item.name}
                      price={item.price}
                      quantity={item.quantity}
                      onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                      onClickRemove={() => removeCartItem(item.id)}
                    />
                  </div>
                ))}
              </div>

              <SheetFooter className='-mx-6 bg-white p-8'>
                <div className='w-full'>
                  <div className='flex mb-4'>
                    <span className='flex flex-1 text-lg text-neutral-500'>
                      Total
                      <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
                    </span>

                    <span className='font-bold text-lg'>{totalAmount} $</span>
                  </div>

                  <Link href='/checkout'>
                    <Button
                      onClick={() => setRedirect(true)}
                      disabled={redirect}
                      loading={redirect}
                      type='submit'
                      className='w-full h-12 text-base'
                    >
                      Place your order
                      <ArrowRight className='w-5 ml-2' />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
