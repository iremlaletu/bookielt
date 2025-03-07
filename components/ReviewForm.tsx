"use client";

import React, { useActionState, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { toast } from "sonner";
import { z } from "zod";
import { createBody } from "@/lib/action";

const ReviewForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [body, setBody] = useState("");
  const router = useRouter();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        writername: formData.get("writername") as string,
        bookname: formData.get("bookname") as string,
        body,
      };

      await formSchema.parseAsync(formValues);

      const result = await createBody(prevState, formData, body);

      if (result.status == "SUCCESS") {
        toast("Your review has been created successfully");

        router.push(`/review/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast("Please check your inputs and try again");

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }
      toast("An unexpected error has occurred here");

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  // useActionState is a Hook that allows you to update state based on the result of a form action. more info check: https://react.dev/reference/react/useActionState
  return (
    <form action={formAction} className="review-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div>
            <label htmlFor="title" className="review-form_label">
              Title
            </label>
            <Input
              id="title"
              name="title"
              className="review-form_input"
              required
              placeholder="Review Title"
            />
            {errors.title && (
              <p className="review-form_error">{errors.title}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="review-form_label">
              Short Description
            </label>
            <Textarea
              id="description"
              name="description"
              className="review-form_textarea"
              required
              placeholder="Review Description"
            />
            {errors.description && (
              <p className="review-form_error">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <label htmlFor="writername" className="review-form_label">
              Writer Name
            </label>
            <Input
              id="writername"
              name="writername"
              className="review-form_input"
              required
              placeholder="Writer Name"
            />
            {errors.writername && (
              <p className="review-form_error">{errors.writername}</p>
            )}
          </div>

          <div>
            <label htmlFor="bookname" className="review-form_label">
              Book Name
            </label>
            <Input
              id="bookname"
              name="bookname"
              className="review-form_input"
              required
              placeholder="Book Name"
            />
            {errors.bookname && (
              <p className="review-form_error">{errors.bookname}</p>
            )}
          </div>
        </div>
      </div>

      <div data-color-mode="light">
        <label htmlFor="body" className="review-form_label">
          Review
        </label>
        <MDEditor
          value={body}
          onChange={(value) => setBody(value as string)}
          id="body"
          preview="edit"
          height={300}
          style={{
            borderRadius: 20,
            borderWidth: "2px",
            borderColor: "#94a3b8",
            overflow: "hidden",
          }}
          textareaProps={{
            placeholder: "Briefly describe your review",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />
        {errors.body && <p className="review-form_error">{errors.body}</p>}
      </div>
      <Button type="submit" className="review-form_btn" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Your Review"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default ReviewForm;
