import Status from "@/types/Status";
import { Card, Text } from "@radix-ui/themes";
import Link from "next/link";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

export default function IssuesSummary({ closed, inProgress, open }: Props) {
  const containers: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <div className="flex gap-4">
      {containers.map((container) => (
        <Link key={container.label} href={`/issues/list?status=${container.status}`}>
          <Card className="hover:bg-slate-200">
            <div className="flex flex-col gap-1 text-center">
              <Text size="2">{container.label}</Text>
              <Text size="5" className="font-bold">
                {container.value}
              </Text>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
