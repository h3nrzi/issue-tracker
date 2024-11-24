import { Pagination } from "@/components";

export default function HomePage() {
  return (
    <div>
      <Pagination itemCount={100} pageSize={10} currentPage={10}/>
    </div>
  );
}
