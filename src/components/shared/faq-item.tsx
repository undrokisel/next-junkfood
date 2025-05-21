'use client';

import {
  CollapsibleTrigger,
  CollapsibleContent,
  CollapsiblePrimitive,
} from '@/components/ui/collapsible';
import { baseBgInteractiveClass } from '@/shared/constants/classes/classes';
import { cn } from '@/shared/lib/utils';
import { ChevronDownCircleIcon, ChevronUpCircleIcon } from 'lucide-react';
import { useState } from 'react';

export interface IFAQ {
  ask: string;
  ans: string;
}

export default function FaqItem(props: { question: IFAQ }) {
  const [open, setOpen] = useState(false);

  const {
    question: { ask, ans },
  } = props;
  return (
    <CollapsiblePrimitive.Root
      className='space-y-4'
      open={open}
      onOpenChange={setOpen}
    >
      <CollapsibleTrigger
        className={cn(
          `flex w-full items-center justify-between gap-2 
        rounded-md bg-muted px-4 py-3 text-left font-medium 
        transition-colors hover:bg-muted/50 focus:outline-none 
        focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75`,
          baseBgInteractiveClass
        )}
      >
        <span className='sm:text-lg'>{ask}</span>
        {open ? (
          <div className='min-h-5 min-w-5'>
            <ChevronUpCircleIcon className='h-5 w-5  text-muted-foreground transition-transform duration-300' />
          </div>
        ) : (
          <div className='min-h-5 min-w-5'>
            <ChevronDownCircleIcon className='h-5 w-5 text-muted-foreground transition-transform duration-300' />
          </div>
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className='px-4 pt-2 pb-4'>
        <p className='sm:text-lg text-amber-50'>{ans}</p>
      </CollapsibleContent>
    </CollapsiblePrimitive.Root>
  );
}
