"use client";

import { Suspense } from "react";
import IssuesTable from "./issues-table";
import IssuesToolbar from "./issues-toolbar";
import Issue from "@/types/Issue";

export default function ClientIssuesSection({ issues }: { issues: Issue[] }) {
  return (
    <div>
      <Suspense fallback>
        <IssuesToolbar />
        <IssuesTable issues={issues} />
      </Suspense>
    </div>
  );
}
