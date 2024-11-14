"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { Button, Spinner, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/schema/issue.schema";
import { CreateIssueDto } from "@/dto/issue.dto";
import { ErrorMessage } from "@/components";

interface ErrorForm {
  title?: string[];
  description?: string[];
}

export default function NewIssuePage() {
  const router = useRouter();

  const { register, control, handleSubmit, formState } =
    useForm<CreateIssueDto>({ resolver: zodResolver(createIssueSchema) });

  const [errors, setErrors] = useState<ErrorForm>({} as ErrorForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateIssue = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (err: any) {
      setErrors(err.response.data.errors);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <form className="max-w-xl space-y-3" onSubmit={handleCreateIssue}>
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

      <Button disabled={isSubmitting}>
        {isSubmitting && <Spinner size="2" />}
        Submit New Issue
      </Button>
    </form>
  );
}
