"use client";

import Link from "next/link";
import { AlertDialog, Button } from "@radix-ui/themes";
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

export default function IssueToolbar({ issueId }: { issueId: number }) {
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
            <TrashIcon />
            Delete
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
              <Button style={{ cursor: "pointer" }}>
                <IoIosCheckmarkCircle />
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}
