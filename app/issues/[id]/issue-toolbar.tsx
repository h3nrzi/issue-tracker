"use client";

import Link from "next/link";
import { AlertDialog, Button, Spinner } from "@radix-ui/themes";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function IssueToolbar({ issueId }: { issueId: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState({} as any);

  async function handleDeleteIssue(id: number) {
    setIsDeleting(true);
    try {
      await axios.delete(`/api/issues/${id}`);
      router.push("/issues");
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) setErrors(error?.response?.data.errors);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Link href={`/issues/${issueId}/edit`}>
        <Button color="blue" style={{ width: "100%", cursor: "pointer" }}>
          <Pencil2Icon />
          Edit
        </Button>
      </Link>

      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" style={{ cursor: "pointer" }}>
            {isDeleting ? (
              <Spinner />
            ) : (
              <>
                <TrashIcon />
                Delete
              </>
            )}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deleting</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue? This action cannot be
            undone.
          </AlertDialog.Description>
          <div className="flex gap-3 mt-4">
            <AlertDialog.Cancel>
              <Button color="gray" variant="soft" style={{ cursor: "pointer" }}>
                <MdCancel />
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                style={{ cursor: "pointer" }}
                onClick={() => handleDeleteIssue(issueId)}
              >
                <IoIosCheckmarkCircle />
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={errors?.other}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>{errors.other}</AlertDialog.Description>
          <AlertDialog.Cancel>
            <Button
              color="gray"
              variant="soft"
              style={{ cursor: "pointer", marginTop: "2rem" }}
            >
              Ok
            </Button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}
