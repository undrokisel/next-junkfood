'use client';

import React from 'react';
import { Api } from '@/services/api-client';
import Image from 'next/image';
import { IStory } from '@/services/stories';
import { cn } from '@/shared/lib/utils';
import ReactStories from 'react-insta-stories';
import { X } from 'lucide-react';
import { Container } from './container';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);
    if (story.items.length > 0) setOpen(true);
  };

  return (
    <Container
      className={cn(
        'flex items-center justify-between gap-2 my-10 overflow-x-auto',
        className
      )}
    >
      {stories.length === 0 &&
        [...Array(9)].map((_, index) => (
          <div
            key={index}
            className='w-[120px] h-[120px] bg-gray-200 rounded-full animate-pulse'
          />
        ))}

      {stories.map((story) => (
        <Image
          key={story.id}
          // eslint-disable-next-line
          onClick={() => onClickStory(story)}
          height={120}
          width={120}
          alt='сторис'
          className='rounded-full cursor-pointer border-2 border-primary min-h-[120px] object-scale-down object-center bg-primary/20'
          src={`/${story.previewImageUrl}`}
        />
      ))}

      {open && (
        <div className=' fixed left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30'>
          <div
            className='relative flex justify-center items-center'
            style={{ width: 420 }}
          >
            <button
              className='absolute -right-10 -top-5 z-30'
              onClick={() => setOpen(false)}
            >
              <X className='absolute top-0 right-0 w-8 h-8 text-white/50' />
            </button>

            <ReactStories
              storyContainerStyles={{
                background: 'hsl(142.1 76.2% 36.3%)',
                borderRadius: '30px',
                padding: '0 60px 0 ',
                margin: '0 auto',
              }}
              storyStyles={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onAllStoriesEnd={() => setOpen(false)}
              stories={
                selectedStory?.items.map((item) => ({
                  url: `/${item.sourceUrl}`,
                  header: {
                    heading: 'Это твоя шаурма',
                    subheading: 'ммм-м-м- как вкусно',
                    profileImage: ``,
                  },
                })) || []
              }
              defaultInterval={3000}
              keyboardNavigation
              width={420}
              height={400}
            />
          </div>
        </div>
      )}
    </Container>
  );
};
