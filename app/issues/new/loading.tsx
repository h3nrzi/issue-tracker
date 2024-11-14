import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingNewIssuePage() {
  return (
    <div className="max-w-xl">
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </div>
  );
}
