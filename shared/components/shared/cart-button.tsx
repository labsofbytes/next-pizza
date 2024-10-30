import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Button } from '../ui';
import { CartDrawer } from '.';

type Props = {};
export const CartButton = ({}: Props) => {
  return (
    <CartDrawer>
      <Button className='group relative'>
        <b>520 ₽</b>
        <span className='h-full w-[1px] bg-white/30 mx-3' />
        <div className='flex items-center gap-1 transition duration-300 group-hover:opacity-0'>
          <ShoppingCart className='h-4 w-4 relative' strokeWidth={2} />
          <b>3</b>
        </div>
        <ArrowRight className='w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0' />
      </Button>
    </CartDrawer>
  );
};
