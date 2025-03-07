"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "@/sanity/lib/write-client";

export const createBody = async (
  state: any,
  form: FormData,
  body: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, writername, bookname } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "body"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const review = {
      title,
      description,
      writername,
      bookname,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      body,
    };

    const result = await writeClient.create({ _type: "review", ...review });

    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponse({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};