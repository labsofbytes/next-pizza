import { Container, Filters, Title, TopBar } from '@/shared/components/shared';
import { ProductsGroupList } from '@/shared/components/shared/product-group-list';
import { prisma } from '@/prisma/prisma-client';

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  return (
    <div>
      <Container className='mt-10'>
        <Title text='All pizzas' size='lg' className='font-extrabold' />
      </Container>

      <TopBar categories={categories.filter((category) => category.products.length > 0)} />

      <Container className='pb-14 mt-10'>
        <div className='flex gap-[60px]'>
          <div className='w-[250px]'>
            <Filters />
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
