import { Suspense } from 'react';
import { Container, Filters, Title, TopBar } from '@/shared/components/shared';
import { ProductsGroupList } from '@/shared/components/shared/product-group-list';
import { findPizzas } from '@/shared/lib/find-pizzas';
import { GetSearchParams } from '@/shared/lib/find-pizzas';

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzas(searchParams);

  return (
    <div>
      <Container className='mt-10'>
        <Title text='All pizzas' size='lg' className='font-extrabold' />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container className='pb-14 mt-10'>
        <div className='flex gap-[60px]'>
          <div className='w-[250px]'>
            <Suspense>
              <Filters />
            </Suspense>
          </div>

          <div className='flex-1'>
            <div className='flex flex-col gap-16'>
              {categories.map(
                (category) =>
                  categories.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      categoryId={category.id}
                      title={category.name}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
