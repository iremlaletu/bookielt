import { client } from "@/sanity/lib/client";
import { REVIEWS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import ReviewCard, { ReviewTypeCard } from "./ReviewCard";

const UserReview = async ({ id }: { id: string }) => {
  const reviews = await client.fetch(REVIEWS_BY_AUTHOR_QUERY, { id });
  return (
    <>
      {reviews.length > 0 ? (
        reviews.map((review: ReviewTypeCard) => (
          <ReviewCard key={review._id} post={review} />
        ))
      ) : (
        <p className="no-result">No posts yet</p>
      )}
    </>
  );
};

export default UserReview;
