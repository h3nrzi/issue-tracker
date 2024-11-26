"use client";

import NewButton from "./new-button";
import StatusFilter from "./status-filter";

export default function IssuesToolbar() {
  return (
    <div className="flex justify-between items-center mb-5">
      <NewButton />
      <StatusFilter />
    </div>
  );
}
