"use client";
import { useState } from "react";
import { useGetForms } from "@/hooks/queries";
import MailCard from "@/components/ui/MailCard";
export default function Home() {
  // const title, tags, sortByCopyCount
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [sortByCopyCount, setSortByCopyCount] = useState<boolean>(true);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetForms({ tags, sortByCopyCount });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error loading posts</div>;

  return (
    <div>
      <div className="grid gird-cols-3">
        {data.pages.map((page, i) => (
          <div key={i}>
            {page.forms.map((form, idx) => (
              <MailCard
                key={idx}
                id={form.id}
                title={form.Title}
                tags={form.tags}
                writer={form.Writer}
              />
            ))}
          </div>
        ))}
      </div>

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isFetchingNextPage ? "Loading more..." : "Load More"}
        </button>
      )}
    </div>
  );
}
