import { Skeleton } from '@/components/ui/skeleton';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  render: () => {
    return <Skeleton className="h-6 w-[250px]" />;
  },
};

export const CardWithText: Story = {
  render: () => {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[200px]" />
        </div>
      </div>
    );
  },
};

export const RoundWithText: Story = {
  render: () => {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-[250px]" />
          <Skeleton className="h-6 w-[200px]" />
        </div>
      </div>
    );
  },
};
