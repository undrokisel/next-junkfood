'use client';

import React from 'react';
import { Api } from '@/services/api-client';
import Image from 'next/image';
import { IStory } from '@/services/stories';
import { cn } from '@/shared/lib/utils';
import ReactStories from 'react-insta-stories';
import { X } from 'lucide-react';
import { useWindowSize } from 'react-use';
import { arrangeImgUrl } from '@/shared/lib/arrangeImgUrl';
import { Container } from './container';

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  const { width, height } = useWindowSize();

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
        'flex items-center justify-between gap-2 my-10 overflow-x-auto scrollbar',
        className
      )}
    >
      {stories.length === 0 &&
        [...Array(9)].map((_, index) => (
          <div
            key={index}
            className={`
              _min-w-[120px] _h-[120px] _rounded-full 
              min-w-[150px] h-[220px] rounded-3xl 
              animate-pulse
              bg-gray-200 
              `}
          />
        ))}

      {stories.map((story) => (
        <div
          key={story.id}
          className={`
          relative  min-h-[220px] min-w-[150px] overflow-hidden
          rounded-3xl
        `}
        >
          <Image
            // eslint-disable-next-line
            onClick={() => onClickStory(story)}
            height={220}
            width={150}
            alt='сторис'
            className={`
            _rounded-full 
            rounded-3xl
            cursor-pointer 
            min-h-[220px] min-w-[150px] 
            max-h-[220px] max-w-[150px] 
            h-full
            bg-primary/20
            `}
            style={{
              objectPosition: story.imgPosition,
              objectFit: story.objectFit || undefined,
            }}
            src={arrangeImgUrl(story.previewImageUrl)}
          />
          <div
            className={`absolute left-5 text-2xl 
              ${story?.text_color ? `text-[${story.text_color}]` : 'text-black'}
              `}
            style={{
              color: story?.text_color ?? 'inherit',
              [story.textPosition]: '0.75rem',
              fontSize: story.textSize ?? '1.5rem',
            }}
          >
            {story?.text ?? ''}
          </div>
        </div>
      ))}

      {open && (
        <div
          className={`
          fixed left-0 top-0 w-full h-full 
          bg-black/80 flex items-center justify-center z-30
        `}
        >
          <div className='relative flex justify-center items-center'>
            <button
              className='absolute -right-10 -top-5 z-30'
              onClick={() => setOpen(false)}
            >
              <X className='absolute top-0 right-0 w-8 h-8 text-white/50' />
            </button>

            <ReactStories
              storyContainerStyles={{
                // background: 'hsl(142.1 76.2% 36.3%)',
                // background: '#dcfce7',
                borderRadius: '30px',
                // padding: '0 60px 0 ',
                // margin: '0 auto',
                overflow: 'hidden',
                // objectFit: 'cover',
                // objectPosition: 'right',
                // minWidth: '100%',
                display: 'flex',
                justifyContent: 'top',
                alignItems: 'center',
                position: 'relative',
              }}
              storyInnerContainerStyles={{
                background: 'gray-400',
                overflow: 'hidden',
                position: 'absolute',
                top: '0px',
                left: '0px',
                right: '0px',
                bottom: '0px',
              }}
              storyStyles={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onAllStoriesEnd={() => setOpen(false)}
              stories={
                selectedStory?.items.map((item) => ({
                  url: arrangeImgUrl(item.sourceUrl),
                  header: {
                    heading: item?.heading || '',
                    subheading: item?.subheading || '',
                    profileImage: ``,
                  },
                })) || []
              }
              defaultInterval={1000000}
              keyboardNavigation
              width={width > 700 ? '610px' : '90vw'}
              height={
                // eslint-disable-next-line
                height > 700 && width > 700
                  ? '610px'
                  : height > 700 && width < 700
                    ? '550px'
                    : '90vh'
              }
            />
          </div>
        </div>
      )}
    </Container>
  );
};
