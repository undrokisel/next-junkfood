'use-client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import React, { useRef } from 'react';
import Image from 'next/image';
import { Navigation, Pagination } from 'swiper/modules';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { baseBgInteractiveClass } from '@/shared/constants/classes/classes';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent } from '../ui/card';

interface TeamMember {
  imageUrl: string;
  name: string;
  position: string;
}

interface TeamSliderProps {
  members: TeamMember[];
}

const TeamSlider: React.FC<TeamSliderProps> = ({ members }) => {
  const swiperTeamRef = useRef<any>(null);

  return (
    <div className='relative w-full team-block'>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        spaceBetween={16}
        pagination={{
          clickable: true,
          el: '.custom-team-pagination',
        }}
        breakpoints={{
          500: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
        onSwiper={(swiper) => {
          swiperTeamRef.current = swiper;
        }}
        className='flex justify-between w-full'
      >
        {members.map((member, index) => (
          <SwiperSlide key={index}>
            <Card className='overflow-hidden border-none bg-amber-100 shadow-md h-[330px]'>
              <div className='h-40 h-[14rem] sm:h-52 md:h-52 lg:h-48 w-full overflow-hidden'>
                <Image
                  src={member.imageUrl}
                  alt='Команда'
                  width={400}
                  height={300}
                  className='h-full w-full object-cover object-top'
                />
              </div>
              <CardContent className='p-4'>
                <h3 className='text-xl font-medium text-green-800'>
                  {member.name}
                </h3>
                <p className='text-green-700'>{member.position}</p>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='hidden xl:block absolute top-[-125px]  right-4 z-10 space-x-2'>
        <button onClick={() => swiperTeamRef.current?.slidePrev()} className=''>
          <GoArrowLeft
            className={cn(
              baseBgInteractiveClass,
              `size-[32px] text-primary rounded-full`
            )}
          />
        </button>
        <button onClick={() => swiperTeamRef.current?.slideNext()} className=''>
          <GoArrowRight
            className={cn(
              baseBgInteractiveClass,
              `size-[32px] text-primary rounded-full`
            )}
          />
        </button>
      </div>
      <div className='custom-team-pagination relative bottom-[34px] z-20 flex lg:hidden justify-center items-center gap-2 mt-4' />
    </div>
  );
};

export default TeamSlider;
