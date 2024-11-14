import { Card } from "@radix-ui/themes";
import { Skeleton } from "@/components";

export default function LoadingIssueDetailPage() {
  return (
    <div>
      <Skeleton width="10rem" />
      <div className="flex items-center gap-4 my-2">
        <Skeleton width="5rem" />
        <Skeleton width="5rem" />
      </div>
      <Card className="prose mt-4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Card>
    </div>
  );
}
