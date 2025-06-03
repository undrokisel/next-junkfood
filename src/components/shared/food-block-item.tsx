import Image from 'next/image';
import { arrangeImgUrl } from '@/shared/lib/arrangeImgUrl';
import Link from 'next/link';
import { baseBgInteractiveClass } from '@/shared/constants/classes/classes';
import { cn } from '@/shared/lib/utils';
import { Card } from '../ui/card';
import { Button } from '../ui';

type Props = {
  item: {
    imgUrl: string;
    title: string;
    text: string;
    href: string;
  };
};

export const FoodBlockItem = ({ item }: Props) => {
  const { imgUrl, title, text, href } = item;
  return (
    <Card className='flex-[50%] relative border-none bg-amber-200 p-6 shadow-sm h-[300px] flex flex-col justify-center items-center overflow-hidden'>
      <Image
        src={arrangeImgUrl(imgUrl)}
        alt='adventages card'
        width={300}
        height={300}
        className='absolute inset-0 object-cover h-full w-full z-0'
      />
      <div className='bg-black/40 absolute inset-0 object-cover w-full z-0' />
      <h3 className='text-3xl sm:text-6xl font-medium text-white z-10 text-center'>
        {title}
      </h3>
      <p className='mt-2 text-lg sm:text-2xl text-white text-center z-10'>
        {text}
      </p>
      <Link href={href} className=' mt-10 z-10'>
        <Button
          variant='outline'
          size='lg'
          className={cn(
            baseBgInteractiveClass,
            `min-w-[250px] bg-transparent text-white text-lg transition-all
             border-white`
          )}
        >
          Перейти
        </Button>
      </Link>
    </Card>
  );
};

export default FoodBlockItem;
