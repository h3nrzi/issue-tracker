import Skeleton from "./skeleton";

export default function IssueFormSkeleton() {
  return (
    <div className="max-w-xl">
      <Skeleton height="2rem" className="mb-2" />
      <Skeleton height="22rem" />
    </div>
  );
}
