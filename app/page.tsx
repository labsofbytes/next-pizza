import { Categories } from '@/components/shared/categories';
import { Container } from '@/components/shared/container';
import { Header } from '@/components/shared/header';
import { Title } from '@/components/shared/title';

export default function Home() {
  return (
    <div>
      <Header />

      <Container className='mt-5'>
        <Title text='All pizzas' size='lg' className='font-extrabold' />

        <Categories />
      </Container>
    </div>
  );
}
