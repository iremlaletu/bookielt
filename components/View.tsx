import { client } from "@/sanity/lib/client";
import { REVIEWS_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(REVIEWS_VIEWS_QUERY, { id });

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit()
  );

  return (
    <div className="flex justify-end items-center mt-5 fixed bottom-3 right-3">
      <p className="font-medium text-[16px] bg-slate-400 px-4 py-2 rounded capitalize">
        <span>{totalViews} views</span>
      </p>
    </div>
  );
};

export default View;
