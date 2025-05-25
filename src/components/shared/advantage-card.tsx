import { cn } from '@/shared/lib/utils';
import { shadowClass } from '@/shared/constants/classes/classes';
import Image from 'next/image';
import { arrangeImgUrl } from '@/shared/lib/arrangeImgUrl';
import { Card } from '../ui/card';

interface AdventageCardProps {
  adventage: {
    imgUrl: string;
    title: string;
    text: string;
  };
}

export const AdvantageCard = ({ adventage }: AdventageCardProps) => {
  const { imgUrl, title, text } = adventage;
  return (
    <Card
      className={cn(
        'relative border-none bg-amber-200 p-6 shadow-sm h-[300px] flex flex-col justify-center items-center overflow-hidden',
        shadowClass
      )}
    >
      <Image
        src={arrangeImgUrl(imgUrl)}
        alt='adventages card'
        width={300}
        height={300}
        className='absolute inset-0 object-cover h-full w-full z-0'
      />
      <div className='bg-black/40 absolute inset-0 object-cover w-full z-0' />
      <h3 className='text-4xl font-medium text-white z-10'>{title}</h3>
      <p className='mt-2 text-lg text-white text-center z-10'>{text}</p>
    </Card>
  );
};
