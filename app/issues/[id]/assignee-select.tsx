"use client";

import useUsers from "@/lib/hooks/useUsers";
import Issue from "@/types/Issue";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

export default function AssigneeSelect({ issue }: { issue: Issue }) {
  const router = useRouter();
  const { data, error, isLoading } = useUsers();

  async function handleAssignIssue(userId: string) {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        userAssignedIssueId: userId == "unassigned" ? null : userId,
      });
      router.refresh();
      toast.success("Saved!");
    } catch {
      toast.error("Changes could not be saved!");
    }
  }

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  return (
    <Select.Root onValueChange={handleAssignIssue} defaultValue={issue.userAssignedIssueId || ""}>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">Unassigned</Select.Item>
          {data?.map((user) => (
            <Select.Item key={user.id} value={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
