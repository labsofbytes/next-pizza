'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import Link from 'next/link';
import { CartDrawerItem } from '.';
import { getCartItemDetails } from '@/shared/lib';

type Props = {};

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className='flex flex-col justify-between pb-0 bg-[#f4f1ee]'>
        <SheetHeader>
          <SheetTitle>
            In becket <span className='font-bold'>3 products</span>
          </SheetTitle>
        </SheetHeader>

        <div className='-mx-6 mt-3 overflow-auto flex-1'>
          <div className='mb-2'>
            <CartDrawerItem
              id={0}
              imageUrl={'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp'}
              details={getCartItemDetails(2, 30, [{ name: 'Cheese' }, { name: 'Mushrooms' }])}
              name={'Cheese'}
              price={110}
              quantity={1}
            />
          </div>
        </div>

        <SheetFooter className='-mx-6 bg-white p-8'>
          <div className='w-full'>
            <div className='flex mb-4'>
              <span className='flex flex-1 text-lg text-neutral-500'>
                Total
                <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
              </span>

              <span className='font-bold text-lg'>75 $</span>
            </div>

            <Link href='/cart'>
              <Button type='submit' className='w-full h-12 text-base'>
                Place your order
                <ArrowRight className='w-5 ml-2' />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
