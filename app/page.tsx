import { Container, Filters, Header, Title, TopBar } from '@/components/shared';
import { ProductsGroupList } from '@/components/shared/product-group-list';

export default function Home() {
  return (
    <div>
      <Header />

      <Container className='mt-10'>
        <Title text='All pizzas' size='lg' className='font-extrabold' />
      </Container>

      <TopBar />

      <Container className='pb-14 mt-10'>
        <div className='flex gap-[60px]'>
          <div className='w-[250px]'>
            <Filters />
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              <ProductsGroupList title='Pizzas' items={[1, 2, 3, 4, 5]} categoryId={1} />
              <ProductsGroupList title='Combos' items={[1, 2, 3, 4, 5]} categoryId={2} />
            </div>

            {/* <div className='flex items-center gap-6 mt-12'>
              <Pagination pageCount={3} />
              <span className='text-sm text-gray-400'>5 of 65</span>
            </div> */}
          </div>
        </div>
      </Container>
    </div>
  );
}
