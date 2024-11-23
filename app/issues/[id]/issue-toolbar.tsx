"use client";

import Link from "next/link";
import { AlertDialog, Button, Select, Spinner } from "@radix-ui/themes";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Issue } from "@prisma/client";
import Skeleton from "react-loading-skeleton";
import useUsers from "@/lib/hooks/useUsers";
import toast, { Toaster } from "react-hot-toast";

export default function IssueToolbar({ issue }: { issue: Issue }) {
  return (
    <div className="flex flex-col gap-2">
      <AssigneeSelect issue={issue} />
      <EditButton issueId={issue.id} />
      <DeleteButton issueId={issue.id} />
      <Toaster />
    </div>
  );
}

function EditButton({ issueId }: { issueId: number }) {
  return (
    <Link href={`/issues/edit/${issueId}`}>
      <Button color="blue" style={{ width: "100%", cursor: "pointer" }}>
        <Pencil2Icon />
        Edit
      </Button>
    </Link>
  );
}

function DeleteButton({ issueId }: { issueId: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState({} as any);

  async function handleDeleteIssue(id: number) {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/issues/${id}`);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) setErrors(error?.response?.data.errors);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" style={{ cursor: "pointer" }} disabled={isDeleting}>
          {isDeleting && <Spinner />}
          <TrashIcon />
          Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deleting</AlertDialog.Title>
        <AlertDialog.Description>Are you sure you want to delete this issue? This action cannot be undone.</AlertDialog.Description>
        <div className="flex gap-3 mt-4">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft" style={{ cursor: "pointer" }}>
              <MdCancel />
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button style={{ cursor: "pointer" }} onClick={() => handleDeleteIssue(issueId)}>
              <IoIosCheckmarkCircle />
              Delete Issue
            </Button>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>

      <AlertDialog.Root open={errors?.other}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>{errors?.other}</AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft" style={{ cursor: "pointer", marginTop: "2rem" }}>
              Ok
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </AlertDialog.Root>
  );
}

function AssigneeSelect({ issue }: { issue: Issue }) {
  const { data, error, isLoading } = useUsers();

  async function handleAssignIssue(userId: string) {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        userId: userId == "unassigned" ? null : userId,
      });
      toast.success("Saved!");
    } catch {
      toast.error("Changes could not be saved!");
    }
  }

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  return (
    <Select.Root onValueChange={handleAssignIssue} defaultValue={issue.userId || ""}>
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
