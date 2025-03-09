import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";

import Link from "next/link";
import { Button } from "./ui/button";
import { Review, Author } from "@/sanity/types";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

export type ReviewTypeCard = Omit<Review, "author"> & { author?: Author };

const ReviewCard = ({ post }: { post: ReviewTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    _id,
    description,
    bookname,
    writername,
  } = post;

  return (
    <li className="review-card group flex flex-col">
      <div className="flex justify-between">
        <p className="review_card_date">{formatDate(_createdAt)}</p>

        <div className="flex flex-col gap-2 items-start">
          <div className="flex gap-2">
            <EyeIcon className="size-6 text-red-500" />
            <span> {views} </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <Image
              src={author?.image! as string}
              alt={author?.name!}
              className="rounded-full"
              width={48}
              height={48}
            />
          </Link>
          <Link href={`/user/${author?._id}`}>
            <p className="font-semibold text-xl line-clamp-1 ">
              {author?.name}
            </p>
          </Link>
          <br />
          <Link href={`/review/${_id}`}>
            <h3 className="font-semibold text-xl line-clamp-2">
              Reviewed: {bookname} - {writername}
            </h3>
          </Link>
        </div>
      </div>
      <p className="review-card_desc"> {title} </p>
      <p className="review-card_desc"> {description} </p>
      <div className="flex-grow"></div>
      <div className="mt-auto self-end gap-3">
        <Button className="review-card_btn" asChild>
          <Link href={`/review/${_id}`}> Read </Link>
        </Button>
      </div>
    </li>
  );
};

export const ReviewCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="review-card_skeleton" />
      </li>
    ))}
  </>
);

export default ReviewCard;
