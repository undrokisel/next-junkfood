import { cn } from '@/shared/lib/utils';
import { FoodsItem } from '@/shared/constants/mockData/foods-block/foods-block';
import { FoodBlockItem } from './food-block-item';
import { FadeUp } from './animation/FadeUp';

type Props = {
  foodsBlockData: FoodsItem[];
  className?: String;
};

export const FoodsBlock = ({ foodsBlockData, className }: Props) => {
  return (
    <div className={cn(`flex flex-wrap gap-6`, className)}>
      {foodsBlockData.map((item, index) => (
        <FadeUp key={index}>
          <FoodBlockItem item={item} />
        </FadeUp>
      ))}
    </div>
  );
};
