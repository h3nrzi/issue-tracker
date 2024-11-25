"use client";

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Spinner } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

export default function DeleteButton({ issueId }: { issueId: number }) {
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
