import WidgetsTable from '@/components/widget/WidgetsTable';
import { fakeWidget } from '@/lib/fakes/widget.fake';
import { Meta, StoryObj } from '@storybook/react';
import _ from 'lodash';

const meta: Meta<typeof WidgetsTable> = {
  component: WidgetsTable,
};

export default meta;
type Story = StoryObj<typeof WidgetsTable>;

export const WithPagination: Story = {
  render: () => {
    const widgets = _.times(50, () => fakeWidget());

    return (
      <div className="rounded-md border max-w-[768px]">
        <WidgetsTable widgets={widgets} linkPathname="#" />
      </div>
    );
  },
};

export const WithoutPagination: Story = {
  render: () => {
    const widgets = _.times(10, () => fakeWidget());

    return (
      <div className="rounded-md border max-w-[768px]">
        <WidgetsTable widgets={widgets} linkPathname="#" />
      </div>
    );
  },
};
