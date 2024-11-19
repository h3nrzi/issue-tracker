"use client";

import { Button, Spinner, TextField } from "@radix-ui/themes";
import { ErrorMessage } from "@/components/index";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/schema/issue.schema";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Issue } from "@prisma/client";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

interface IssueFormData {
  title: string;
  description: string;
}

interface IssueFormError {
  title?: string[];
  description?: string[];
  other?: string;
}

export default function IssueForm({ issue }: { issue?: Issue }) {
  const router = useRouter();

  const [errors, setErrors] = useState<IssueFormError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, control, handleSubmit, formState } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
  });

  async function submitHandler(data: IssueFormData) {
    setIsSubmitting(true);

    try {
      if (issue) await axios.patch(`/api/issues/${issue.id}`, data);
      else await axios.post("/api/issues", data);

      router.push("/issues/list");
      router.refresh();
    } catch (err) {
      if (err instanceof AxiosError) setErrors(err.response?.data.errors);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleSubmit(submitHandler)}>
      {errors?.other && <ErrorMessage>{errors?.other}</ErrorMessage>}

      <TextField.Root
        placeholder="Title"
        defaultValue={issue?.title}
        {...register("title")}
      />
      {formState.errors.title && (
        <ErrorMessage>{formState.errors.title.message!}</ErrorMessage>
      )}
      {errors?.title && <ErrorMessage>{errors.title}</ErrorMessage>}

      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} className="p-0" />
        )}
      />
      {formState.errors.description && (
        <ErrorMessage>{formState.errors.description.message!}</ErrorMessage>
      )}
      {errors?.description && <ErrorMessage>{errors.description}</ErrorMessage>}

      <Button disabled={isSubmitting}>
        {isSubmitting && <Spinner size="2" />}
        {issue ? "Update Issue" : "Submit New Issue"}
      </Button>
    </form>
  );
}
