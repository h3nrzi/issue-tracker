"use client";

import { Button, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

export default function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const router = useRouter();
  const currentQueryString = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  const lastPage = pageCount;

  function handleChangePage(page: number) {
    const newQueryString = new URLSearchParams(currentQueryString);
    newQueryString.set("page", String(page));
    router.push(`?${newQueryString}`);
  }

  if (pageCount <= 1)
    return null;

  return (
    <div className="flex items-center gap-2">
      <Text size="1">Page {currentPage} of {pageCount} </Text>
      <Button variant="soft" className="!cursor-pointer" disabled={currentPage === 1} onClick={() => handleChangePage(1)}>
        <DoubleArrowLeftIcon/>
      </Button>
      <Button variant="soft" className="!cursor-pointer" disabled={currentPage === 1} onClick={() => handleChangePage(currentPage - 1)}>
        <ChevronLeftIcon/>
      </Button>
      <Button variant="soft" className="!cursor-pointer" disabled={currentPage === lastPage} onClick={() => handleChangePage(currentPage + 1)}>
        <ChevronRightIcon/>
      </Button>
      <Button variant="soft" className="!cursor-pointer" disabled={currentPage === lastPage} onClick={() => handleChangePage(lastPage)}>
        <DoubleArrowRightIcon/>
      </Button>
    </div>
  );
};