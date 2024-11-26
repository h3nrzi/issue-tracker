"use client";

import { Suspense } from "react";
import NewButton from "./new-button";
import StatusFilter from "./status-filter";

export default function IssuesToolbar() {
  return (
    <div className="flex justify-between items-center mb-5">
      <NewButton />
      <Suspense fallback>
        <StatusFilter />
      </Suspense>
    </div>
  );
}
