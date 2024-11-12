'use client';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { useQueryState } from 'nuqs';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  fetchAction: (page: number) => Promise<void>;
  total: number;
  limit: number;
}

export function DataTablePagination<TData>(props: DataTablePaginationProps<TData>) {
  const { table, fetchAction, total, limit } = props;
  const [currentPage, setCurrentPage] = useQueryState('page', {
    parse: (value) => Number(value) || 1,
    defaultValue: 1,
  });
  const maxPage = Math.floor(total / limit) + 1;

  const handleFetchPage = async (page: number) => {
    await fetchAction(page);
    await setCurrentPage(page);
  };

  if (!total) return null;
  return (
    <div className="mt-5 flex w-full items-center justify-end px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/*<div className="flex items-center space-x-2">*/}
        {/*  <p className="text-[16px] font-medium">Rows per page</p>*/}
        {/*  <Select*/}
        {/*    value={`${table.getState().pagination.pageSize}`}*/}
        {/*    onValueChange={(value) => {*/}
        {/*      table.setPageSize(Number(value));*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <SelectTrigger className="h-8 w-[70px]">*/}
        {/*      <SelectValue placeholder={table.getState().pagination.pageSize} />*/}
        {/*    </SelectTrigger>*/}
        {/*    <SelectContent side="top">*/}
        {/*      {[8, 20, 30, 40, 50].map((pageSize) => (*/}
        {/*        <SelectItem key={pageSize} value={`${pageSize}`}>*/}
        {/*          {pageSize}*/}
        {/*        </SelectItem>*/}
        {/*      ))}*/}
        {/*    </SelectContent>*/}
        {/*  </Select>*/}
        {/*</div>*/}
        <div className="flex w-[100px] items-center justify-center text-[16px] font-medium">
          Page {currentPage || 1} of {maxPage}
        </div>
        <div className="flex items-center space-x-1">
          <Button
            size="icon"
            variant="link"
            className="hidden w-10 border-gray-400 p-0 md:h-2 lg:flex"
            onClick={() => handleFetchPage(1)}
            disabled={+(currentPage || 1) === 1}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="link"
            onClick={async () => handleFetchPage(+(currentPage || 1) - 1)}
            disabled={+currentPage === 1}
            className="border-gray-400 p-0 px-2"
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <p>{currentPage}</p>
          <Button
            size="icon"
            variant="link"
            onClick={() => handleFetchPage(+currentPage + 1)}
            disabled={+currentPage === maxPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="link"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => handleFetchPage(maxPage)}
            disabled={+currentPage === maxPage}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
