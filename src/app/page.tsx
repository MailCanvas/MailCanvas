"use client";
import { useState, useRef } from "react";
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
  const loader = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetForms({ tags, sortByCopyCount });

  if (status === "pending") return <div>Loading...</div>;
  if (status === "error") return <div>Error loading posts</div>;

  const fetchWithDelay = () => {
    setTimeout(() => {
      fetchNextPage();
    }, 1000);
  };

  const observer = (node: HTMLDivElement) => {
    if (isFetching || isFetchingNextPage) return;
    if (loader.current) loader.current.disconnect();

    loader.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchWithDelay();
      }
    });

    if (node) loader.current.observe(node);
  };

  return (
    <div className="bg-[#a2cf6e] h-full flex">
      {/* Navigation Bar */}
      <div className="shadow-md">
        {IsNavBarOpen ? (
          <OpenedNavigation setIsNavBarOpen={setIsNavBarOpen} />
        ) : (
          <ClosedNavigation setIsNavBarOpen={setIsNavBarOpen} />
        )}
      </div>

      {/* Main Screen */}
      <div className="h-screen w-full pl-3 p-3">
        <Search />
        <div
          id="scrollbar-1"
          className="h-[90vh] mt-3 overflow-y-scroll grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-5"
        >
          {data.pages
            .flatMap((page) => page.forms)
            .map((form, idx) => (
              <MailCard
                key={idx}
                id={form.id}
                title={form.Title}
                tags={form.tags}
                writer={form.Writer}
              />
            ))}
          <div
            ref={observer}
            className="my-3 flex min-w-[1080px] items-center justify-center text-2xl"
          />
        </div>
      </div>
    </div>
  );
}
