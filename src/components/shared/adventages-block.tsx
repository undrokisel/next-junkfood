import { cn } from '@/shared/lib/utils';
import { Adventage } from '../../shared/constants/mockData/adventages/adventages';
import { FadeLeft } from './animation/FadeLeft';
import { AdvantageCard } from './advantage-card';
import { FadeRight } from './animation/FadeRight';
import { FadeVisible } from './animation/FadeVisible';

type Props = {
  adventages: Adventage[];
  className?: String;
};

export const AdventagesBlock = ({ adventages, className }: Props) => {
  return (
    <div className={cn(`grid grid-cols-1 gap-6 md:grid-cols-3`, className)}>
      {adventages.map((adventage, index) => {
        if (index === 0)
          return (
            <FadeLeft key={index}>
              <AdvantageCard adventage={adventage} />
            </FadeLeft>
          );
        if (index === 2)
          return (
            <FadeRight key={index}>
              <AdvantageCard adventage={adventage} />
            </FadeRight>
          );
        return (
          <FadeVisible key={index}>
            <AdvantageCard adventage={adventage} />
          </FadeVisible>
        );
      })}
    </div>
  );
};
