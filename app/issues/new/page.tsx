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
import ErrorMessage from "@/components/error-message";

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
        <ErrorMessage>{formState.errors.title.message!}</ErrorMessage>
      )}

      {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} className="p-0" />
        )}
      />

      {formState.errors.description && (
        <ErrorMessage>{formState.errors.description.message!}</ErrorMessage>
      )}

      {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}

      <Button>Submit New Issue</Button>
    </form>
  );
}
