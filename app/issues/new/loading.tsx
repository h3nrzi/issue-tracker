import { Skeleton } from "@/components";

export default function LoadingNewIssuePage() {
  return (
    <div className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </div>
  );
}
