import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { IssueFormSkeleton } from "@/components";

const IssueForm = dynamic(() => import("@/components/issue-form"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function NewIssuePage() {
  return <IssueForm />;
}
