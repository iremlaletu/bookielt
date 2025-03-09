import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { REVIEWS_BY_ID_QUERY } from "@/sanity/lib/queries";

import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import Image from "next/image";
import { auth } from "@/auth";
import DeleteReview from "@/components/DeleteReview";
import Link from "next/link";

const md = markdownit();

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(REVIEWS_BY_ID_QUERY, { id });
  if (!post) return notFound();

  const parsedContent = md.render(post?.body || "");

  // Postun sahibi ile session'daki kullanıcı id'yi kontrol ediyoruz
  const session = await auth();
  const isOwner = session?.id === post.author._id;

  return (
    <>
      <section className="w-full hero flex justify-center items-center flex-col py-10 px-6 min-h-[230px]">
        <p className="px-6 py-3 font-bold rounded-sm uppercase relative before:content-[''] before:absolute before:top-2 before:left-2 before:border-t-[10px] before:border-t-black before:border-r-[10px] before:border-r-transparent after:content-[''] after:absolute after:bottom-2 after:right-2 after:border-b-[10px] after:border-b-black after:border-l-[10px] after:border-l-transparent; ">
          {formatDate(post?._createdAt)}
        </p>

        <h1 className="uppercase bg-black px-6 py-3 font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5">
          {post.title}
        </h1>
        <p className="font-medium text-[20px] max-w-5xl text-center break-words">
          {post.description}
        </p>
      </section>

      <section className="px-6 py-10 max-w-7xl mx-auto">
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex justify-between items-center gap-5">
            <div className="flex gap-2 items-center mb-3">
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full"
              />

              <div>
                <p className="text-[20px] ">{post.author.name}</p>
              </div>
            </div>
          </div>

          {parsedContent ? (
            <article
              className=" prose max-w-4xl break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
          <Link href="/" className="ml-auto block w-fit">
            Back
          </Link>
          <div>{isOwner && <DeleteReview id={id} />}</div>
        </div>

        <hr className="border-dotted bg-zinc-400 max-w-4xl my-10 mx-auto" />

        <Suspense
          fallback={
            <Skeleton className="bg-zinc-400 h-10 w-24 rounded-lg fixed bottom-3 right-3" />
          }
        >
          {/* how many views for this particular post DYNAMICALLY */}
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default Page;
