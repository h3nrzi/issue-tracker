"use client";

import { ErrorMessage } from "@/components";
import { Button, Spinner, TextField } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

interface SignupFormError {
  name: string[];
  email: string[];
  password: string[];
  error: string;
}

export default function SignupPage() {
  const [errors, setErrors] = useState<SignupFormError | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const { register, handleSubmit } = useForm<SignupFormData>();

  async function submitHandler(data: SignupFormData) {
    setIsSubmitting(true);

    try {
      await axios.post("/api/signup", data);
      router.push("/api/auth/signin");
    } catch (err) {
      if (err instanceof AxiosError) setErrors(err.response?.data.errors);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="max-w-xl m-auto space-y-3" onSubmit={handleSubmit(submitHandler)}>
      {errors?.error && <ErrorMessage>{errors.error}</ErrorMessage>}

      <TextField.Root placeholder="Name" {...register("name")} />
      {errors?.name && <ErrorMessage>{errors.name}</ErrorMessage>}

      <TextField.Root placeholder="Email" {...register("email")} />
      {errors?.email && <ErrorMessage>{errors.email}</ErrorMessage>}

      <TextField.Root placeholder="Password" {...register("password")} />
      {errors?.password && <ErrorMessage>{errors.password}</ErrorMessage>}

      <Button disabled={isSubmitting}>
        {isSubmitting && <Spinner size="2" />}
        Sign Up
      </Button>
    </form>
  );
}
