'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { registerUser } from '@/app/actions';
import { TFormRegisterValues, formRegisterSchema } from './schemas';
import { FormInput } from '../../../form';
import { Button } from '@/shared/components/ui';

interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      // toast.error('Registration is successful 📝. Confirm your email', {
      //   icon: '✅',
      // });

      toast.error('Registration was successful 📝. Please log in to your profile.', {
        icon: '✅',
      });

      onClose?.();
    } catch (error) {
      return toast.error('Invalid e-mail or password', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className='flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name='email' label='Email' required />
        <FormInput name='fullName' label='Full Name' required />
        <FormInput name='password' label='Password' type='password' required />
        <FormInput name='confirmPassword' label='Confirm Password' type='password' required />

        <Button loading={form.formState.isSubmitting} className='h-12 text-base' type='submit'>
          Register
        </Button>
      </form>
    </FormProvider>
  );
};
