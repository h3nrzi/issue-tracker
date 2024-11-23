"use client";

import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { IssueFormSkeleton } from "@/components";

const IssueFormCsr = dynamic(() => import("@/components/issue-form"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default IssueFormCsr