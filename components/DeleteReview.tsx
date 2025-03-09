"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DeleteReview = ({ id }: { id: string }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch("/api/reviews/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        // gelen id string o yüzden {} ile body'nin JSON olması lazım ki req.body'nin düzgün parse edebilsin.
        body: JSON.stringify({ id }),
      });
      router.push("/");
      if (!res.ok) throw new Error("Failed to delete the post.");
      toast("Post deleted successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the post.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-5 border-2 border-slate-400"
    >
      {isDeleting ? "Deleting..." : "Delete Post"}
    </button>
  );
};

export default DeleteReview;
