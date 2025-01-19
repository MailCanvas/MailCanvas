"use client";
import { useState } from "react";
import { useGetForms } from "@/hooks/queries";
import MailCard from "@/components/ui/MailCard";
import Search from "@/components/ui/Search";
import ClosedNavigation from "@/components/ui/Navigation/ClosedNavigation";
import OpenedNavigation from "@/components/ui/Navigation/OpenedNavigation";
export default function Home() {
  // const title, tags, sortByCopyCount
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [sortByCopyCount, setSortByCopyCount] = useState<boolean>(true);
  const [IsNavBarOpen, setIsNavBarOpen] = useState<boolean>(true);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetForms({ tags, sortByCopyCount });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error loading posts</div>;

  return (
    <div
      className="bg-[#a2cf6e] h-screen grid "
      style={{ gridTemplateColumns: IsNavBarOpen ? "1fr 1.3fr" : "50px 1fr" }}
    >
      {/* Navigation Bar */}
      <div style={{ boxShadow: "5px 0 5px rgba(0, 0, 0, 0.2)" }}>
        {IsNavBarOpen ? (
          <OpenedNavigation setIsNavBarOpen={setIsNavBarOpen} />
        ) : (
          <ClosedNavigation setIsNavBarOpen={setIsNavBarOpen} />
        )}
      </div>

      {/* Main Screen */}
      <div className="mx-5">
        <Search />
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
    </div>
  );
}
