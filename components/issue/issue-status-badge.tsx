import { Badge } from "@radix-ui/themes";

const statusMap: Record<string, { label: string; color: "red" | "violet" | "green" }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

export default function IssueStatusBadge({ status }: { status: string }) {
  return <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>;
}
