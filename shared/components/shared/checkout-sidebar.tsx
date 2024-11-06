import React from 'react';
import { WhiteBlock } from './white-block';
import { CheckoutItemDetails } from './checkout-item-details';
import { ArrowRight, Package, Percent, Truck } from 'lucide-react';
import { Button, Skeleton } from '../ui';

type Props = {
  totalAmount: number;
  loading?: boolean;
};

const VAT = 8;
const DELIVERY_PRICE = 25;

export const CheckoutSidebar = ({ totalAmount, loading }: Props) => {
  const vatPrice = totalAmount * (VAT / 100);
  const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <WhiteBlock className='p-6 sticky top-4'>
      <div className='flex flex-col gap-1'>
        <span className='text-xl'>Total price:</span>
        <span className='text-[34px] font-extrabold h-11'>
          {loading ? <Skeleton className='bg-gray-200 h-11 w-48 ' /> : <>{totalPrice} $</>}
        </span>
      </div>

      <CheckoutItemDetails
        title={
          <div className='flex items-center gap-2'>
            <Package size={18} className='text-gray-400' />
            Total amount:
          </div>
        }
        value={loading ? <Skeleton className='bg-gray-200 h-6 w-16' /> : <>{totalAmount} $</>}
      />
      <CheckoutItemDetails
        title={
          <div className='flex items-center gap-2'>
            <Percent size={18} className='text-gray-400' />
            Vat:
          </div>
        }
        value={loading ? <Skeleton className='bg-gray-200 h-6 w-16' /> : <>{vatPrice} $</>}
      />
      <CheckoutItemDetails
        title={
          <div className='flex items-center gap-2'>
            <Truck size={18} className='text-gray-400' />
            Delivery:
          </div>
        }
        value={loading ? <Skeleton className='bg-gray-200 h-6 w-16' /> : <>{DELIVERY_PRICE} $</>}
      />

      <Button loading={loading} type='submit' className='w-full h-14 rounded-2xl mt-6 text-base font-bold'>
        Go to payment
        <ArrowRight className='w-5 ml-2' />
      </Button>
    </WhiteBlock>
  );
};
