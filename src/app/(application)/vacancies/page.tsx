import { Container } from '@/components/shared';
import { Chat } from '@/shared/lib/ElfsightWidget';
import { faqsKitchen } from '@/shared/constants/mockData/faqs/faqs-kitchen';
import { faqsСourier } from '@/shared/constants/mockData/faqs/faqs-courier';
import { IncomeCalculator } from '@/components/shared/Income-calculator';
import { VacancyForm } from '@/components/shared/vacancy-form';
import { HeroVacancy } from '@/components/shared/hero-vacancy';
import FAQS from '../../../components/shared/faqs';

export default async function VacanciesPage() {
  return (
    <div className='relative min-h-[1500px] '>
      {/* Фоновое изображение */}
      <div
        className='fixed top-0 left-0 right-0 bottom-0 -z-10'
        style={{
          backgroundImage: "url('/images/vacancies/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className='absolute inset-0 bg-black/50' />
      </div>

      <HeroVacancy />
      <Container className='md:mt-[40px]'>
        <div className='flex justify-center' id='calculator'>
          <IncomeCalculator />
        </div>
        <div className='flex justify-center' id='form'>
          <VacancyForm />
        </div>
        <FAQS
          faqs={faqsKitchen}
          title='Часто задаваемые вопросы о работе на кухне'
        />
        <FAQS
          faqs={faqsСourier}
          title='Часто задаваемые вопросы о работе курьером'
        />
        <div className='overflow-hidden bg-green-50'>
          <Chat />
        </div>
      </Container>
    </div>
  );
}
