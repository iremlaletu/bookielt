import { auth } from "@/auth";
import { ReviewCardSkeleton } from "@/components/ReviewCard";
import UserReview from "@/components/UserReview";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });
  if (!user) return notFound();

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <Image
            src={user.image}
            alt={user.name}
            width={220}
            height={220}
            className="rounded-full object-cover border-2 border-black;"
          />
          <h3 className="text-center line-clamp-1">@{user.name}</h3>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-2">
          <p className="text-30-bold">
            {session?.id === id ? "Your" : "All"} Reviews
          </p>
          <ul className="grid sm:grid-cols-2 gap-5">
            <Suspense fallback={<ReviewCardSkeleton />}>
              <UserReview id={id} />
            </Suspense>
          </ul>
          <Link href="/" className="text-right">
            Back
          </Link>
        </div>
      </section>
    </>
  );
};

export default Page;
