import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput, FormTextarea } from '..';

type Props = {
  className?: string;
};

export const CheckoutAddressFrom = ({ className }: Props) => {
  return (
    <WhiteBlock title='3. Delivery details' className={className}>
      <div className='flex flex-col gap-5'>
        <FormInput name='address' className='text-base' placeholder='Address' />
        <FormTextarea rows={5} name='comment' className='text-base' placeholder='Comments to delivery' />
      </div>
    </WhiteBlock>
  );
};
