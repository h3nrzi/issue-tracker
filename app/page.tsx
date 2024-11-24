import { Pagination } from "@/components";

interface Props {
  searchParams: { page?: string };
}

export default function HomePage({ searchParams }: Props) {
  return (
    <div>
      <Pagination itemCount={50} pageSize={10} currentPage={+searchParams.page! || 1}/>
    </div>
  );
}
