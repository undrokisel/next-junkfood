'use client';

import FaqItem from './faq-item';
import { Heading } from './heading';

export interface IFAQ {
  ask: string;
  ans: string;
}

interface FAQSProps {
  title: string;
  faqs: IFAQ[];
}

export default function FAQS({ faqs, title }: FAQSProps) {
  return (
    <section className='container mx-auto py-12 px-4 md:px-6'>
      <div className='max-w-3xl mx-auto space-y-6'>
        <Heading title={title} className='text-amber-100' />
        {faqs.length > 0 &&
          faqs.map((faq, index) => <FaqItem question={faq} key={index} />)}
      </div>
    </section>
  );
}
