import { Button, Text } from "@radix-ui/themes";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

export default function Pagination({ itemCount, pageSize, currentPage }: Props) {
  const pageCount = Math.ceil(itemCount / pageSize);
  const lastPage = pageCount;
  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center gap-2">
      <Text size="2">Page {currentPage} of {pageCount} </Text>
      <Button variant="soft" className="!cursor-pointer" disabled={currentPage === 1}>
        <DoubleArrowLeftIcon/>
      </Button>
      <Button variant="soft" className="!cursor-pointer" disabled={currentPage === 1}>
        <ChevronLeftIcon/>
      </Button>
      <Button variant="soft" className="!cursor-pointer" disabled={currentPage === lastPage}>
        <ChevronRightIcon/>
      </Button>
      <Button variant="soft" className="!cursor-pointer" disabled={currentPage === lastPage}>
        <DoubleArrowRightIcon/>
      </Button>
    </div>
  );
};