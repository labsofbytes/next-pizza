'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  CheckoutAddressFrom,
  CheckoutCart,
  CheckoutPersonalInfo,
  Container,
  Title,
  CheckoutSidebar,
} from '@/shared/components';
import { checkoutFormSchema, CheckoutFormValues } from '@/shared/constants';
import { useCart } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';
import toast from 'react-hot-toast';
import { createOrder } from '@/app/actions';
import { useSession } from 'next-auth/react';
import { Api } from '@/shared/services/api-client';

export default function CheckoutPage() {
  const [submitting, setSubmitting] = React.useState(false);
  const { removeCartItem, updateItemQuantity, totalAmount, items, loading } = useCart();
  const { data: session } = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      comment: '',
    },
  });

  React.useEffect(() => {
    async function fetchUserInfo() {
      const data = await Api.auth.getMe();

      const [firstName, lastName] = data.fullName.split(' ');

      form.setValue('firstName', firstName);
      form.setValue('lastName', lastName);
      form.setValue('email', data.email);
    }

    if (session) {
      fetchUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setSubmitting(true);

      const url = await createOrder(data);

      toast.success('Order created! Redirecting you to the payment page', { icon: '✅' });

      if (url) {
        // location.href = url; correct!
        setTimeout(() => window.location.assign(url), 1500);
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      toast.error('Failed to create order', { icon: '❌' });
    }
  };

  const onClickCountButton = (id: number, quantity: number, type: 'plus' | 'minus') => {
    const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  return (
    <Container className='mt-10'>
      <Title text='Checkout' className='font-extrabold mb-8 text-[36px]' />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex gap-10'>
            {/* Left */}
            <div className='flex flex-col gap-10 flex-1 mb-20'>
              <CheckoutCart
                items={items}
                onClickCountButton={onClickCountButton}
                removeCartItem={removeCartItem}
                loading={loading}
              />

              <CheckoutPersonalInfo className={cn({ 'opacity-50 pointer-events-none': loading })} />

              <CheckoutAddressFrom className={cn({ 'opacity-50 pointer-events-none': loading })} />
            </div>

            {/* Right */}
            <div className='w-[450px]'>
              <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
