import { auth } from "@/auth";
import ReviewForm from "@/components/ReviewForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <>
      <section className="w-full hero flex justify-center items-center flex-col py-10 px-6 min-h-[230px]">
        <h1 className="heading">Submit Your Review</h1>
      </section>

      <ReviewForm />
    </>
  );
};

export default Page;
