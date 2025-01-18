"use client";
import { useState } from "react";
import { useGetForms } from "@/hooks/queries";
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
      {data.pages.map((page, i) => (
        <div key={i}>
          {page.forms.map((form, idx) => (
            <div key={idx} className="border p-4 mb-4 rounded-lg">
              <h2 className="text-xl font-bold">{form.Title}</h2>
              <p>{form.Content}</p>
              <span className="text-gray-500">{form.CopiedCount}</span>
            </div>
          ))}
        </div>
      ))}

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
