import React from 'react';
import { WhiteBlock } from '../white-block';
import { FormInput } from '../form';

type Props = {
  className?: string;
};

export const CheckoutPersonalInfo = ({ className }: Props) => {
  return (
    <WhiteBlock title='2. Personal details' className={className}>
      <div className='grid grid-cols-2 gap-5'>
        <FormInput name='firstName' className='text-base' placeholder='Name' />
        <FormInput name='lastName' className='text-base' placeholder='Surname' />
        <FormInput name='email' className='text-base' placeholder='Email' />
        <FormInput name='phone' className='text-base' placeholder='Phone' />
      </div>
    </WhiteBlock>
  );
};
