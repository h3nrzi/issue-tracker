"use client";

import { Button, TextField, Callout } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

interface ErrorForm {
  title?: string[];
  description?: string[];
}

export default function NewIssuePage() {
  const router = useRouter();

  const { register, control, handleSubmit } = useForm<IssueForm>();

  const [errors, setErrors] = useState<ErrorForm>({} as ErrorForm);

  async function handleCreateIssue(data: IssueForm) {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (err: any) {
      setErrors(err.response.data.errors);
    }
  }

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(handleCreateIssue)}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      {errors.title &&
        errors.title.map((msg, i) => (
          <Callout.Root key={i} color="red">
            <Callout.Text>{msg}</Callout.Text>
          </Callout.Root>
        ))}

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} className="p-0" />
        )}
      />
      {errors.description &&
        errors.description.map((msg, i) => (
          <Callout.Root key={i} color="red">
            <Callout.Text>{msg}</Callout.Text>
          </Callout.Root>
        ))}

      <Button>Submit New Issue</Button>
    </form>
  );
}
