"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/schema/issue.schema";
import { CreateIssueDto } from "@/dto/issue.dto";

interface ErrorForm {
  title?: string[];
  description?: string[];
}

export default function NewIssuePage() {
  const router = useRouter();

  const { register, control, handleSubmit, formState } =
    useForm<CreateIssueDto>({ resolver: zodResolver(createIssueSchema) });

  const [errors, setErrors] = useState<ErrorForm>({} as ErrorForm);

  async function handleCreateIssue(data: CreateIssueDto) {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (err: any) {
      setErrors(err.response.data.errors);
    }
  }

  console.log(formState.errors);

  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit(handleCreateIssue)}
    >
      <TextField.Root placeholder="Title" {...register("title")} />

      {formState.errors.title && (
        <Callout.Root color="red">
          <Callout.Text>{formState.errors.title.message}</Callout.Text>
        </Callout.Root>
      )}

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

      {formState.errors.description && (
        <Callout.Root color="red">
          <Callout.Text>{formState.errors.description.message}</Callout.Text>
        </Callout.Root>
      )}

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
