"use client";

import { Button, Spinner, TextArea, TextField } from "@radix-ui/themes";
import { ErrorMessage } from "@/components/index";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { Issue } from "@prisma/client";
import "easymde/dist/easymde.min.css";

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
  const { register, handleSubmit } = useForm<IssueFormData>();

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

      <TextField.Root placeholder="Title" defaultValue={issue?.title} {...register("title")} />
      {errors?.title && <ErrorMessage>{errors.title}</ErrorMessage>}

      {/*<Controller name="description" control={control} defaultValue={issue?.description} render={({field}) => <SimpleMDE placeholder="Description" {...field} className="p-0"/>}/>*/}
      <TextArea placeholder="Description" rows={17} defaultValue={issue?.description} {...register("description")} />
      {errors?.description && <ErrorMessage>{errors.description}</ErrorMessage>}

      <Button disabled={isSubmitting}>
        {isSubmitting && <Spinner size="2" />}
        {issue ? "Update Issue" : "Submit New Issue"}
      </Button>
    </form>
  );
}
