import ReviewCard, { ReviewTypeCard } from "@/components/ReviewCard";
import SearchForm from "@/components/SearchForm";
import { SanityLive, sanityFetch } from "@/sanity/lib/live";
import { REVIEWS_QUERY } from "@/sanity/lib/queries";
import { auth } from "@/auth";

export const experimental_ppr = true;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  // extracting query
  const query = (await searchParams).query;
  const params = { search: query || null };
  const session = await auth();

  // real data from sanity
  const { data: posts } = await sanityFetch({
    query: REVIEWS_QUERY,
    params,
  });

  return (
    <>
      <section className="w-full min-h-[550px] hero flex flex-col justify-between items-center py-20 px-3">
        <h1 className="heading">Discover. Share. Read. 📚</h1>
        <p className="font-medium text-[20px] max-w-3xl break-words">
          Write reviews, find recommendations..{" "}
        </p>

        <div className="w-full flex justify-center mt-auto">
          {/* passing the query as a param */}
          <SearchForm query={query} />
        </div>
      </section>
      {/* wrapping recomendation cards */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
        <p className="text-lg font-semibold">
          {query ? ` Search results for "${query}" ` : "All Reviews"}
        </p>
        <ul className=" mt-7 grid md:grid-cols-3 sm:grid-cols-2 gap-5">
          {posts?.length > 0 ? (
            posts.map((post: ReviewTypeCard) => (
              <ReviewCard key={post?._id} post={post} />
            ))
          ) : (
            <p className=""> No Reviews Found </p>
          )}
        </ul>
        {!session && (
          <p className="text-center text-gray-600 mt-6">
            Sign in to create your review.
          </p>
        )}
      </section>
      <SanityLive />
    </>
  );
}
