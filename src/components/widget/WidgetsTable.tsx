import DataTable from '@/components/table/DataTable';
import SortableHeader from '@/components/table/SortableHeader';
import { TableCell, TableHead } from '@/components/ui/table';
import Widget from '@/types/Widget';
import { ColumnDef } from '@tanstack/react-table';

const columns: ColumnDef<Widget>[] = [
  {
    accessorKey: 'name',
    meta: {
      cell: (props) => (
        <TableCell className="w-[200px] max-w-[200px]">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <>{props.getValue()}</>
          </div>
        </TableCell>
      ),
      header: ({ column }) => (
        <TableHead className="w-[200px] max-w-[200px]">
          <SortableHeader
            column={column}
            text="Name"
            className="justify-start"
            showPlaceholderSortIconSpace={false}
          />
        </TableHead>
      ),
    },
  },
  {
    accessorKey: 'description',
    meta: {
      cell: (props) => (
        <TableCell className="w-[min(400px,50%)] max-w-[400px]">
          <div className="overflow-hidden text-ellipsis whitespace-nowrap">
            <>{props.getValue()}</>
          </div>
        </TableCell>
      ),
      header: ({ column }) => (
        <TableHead className="w-[min(400px,50%)] max-w-[400px]">
          <SortableHeader
            column={column}
            text="Description"
            className="justify-start"
            showPlaceholderSortIconSpace={false}
          />
        </TableHead>
      ),
    },
  },
  {
    accessorFn: (widget) => new Date(widget.createdAt).toLocaleDateString(),
    cell: (props) => (
      <div className="text-right">
        <>{props.getValue()}</>
      </div>
    ),
    header: ({ column }) => <SortableHeader column={column} text="Date" />,
    id: 'date',
  },
];

export default function WidgetsTable({
  widgets,
  isLoading,
  linkPathname,
}: {
  widgets: Widget[];
  isLoading?: boolean;
  linkPathname: string;
}) {
  return (
    <DataTable
      columns={columns}
      data={widgets}
      isLoading={isLoading}
      linkPathname={linkPathname}
      noDataText="No widgets found"
    />
  );
}
