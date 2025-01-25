"use client";
import { useState, useRef } from "react";
import { useGetForms } from "@/hooks/queries";
import MailCard from "@/components/ui/MailCard";
import Search from "@/components/ui/Search";
import ClosedNavigation from "@/components/ui/Navigation/ClosedNavigation";
import OpenedNavigation from "@/components/ui/Navigation/OpenedNavigation";
import { Form } from "@/types/types";
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
  } = useGetForms({ sortByCopyCount });

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
    <div className="bg-gradient-to-br from-green-50 to-pink-50 md:flex">
      {/* Navigation Bar */}
      <div className="h-screen shadow-md bg-gradient-to-br from-green-300 to-green-100">
        {IsNavBarOpen ? (
          <OpenedNavigation setIsNavBarOpen={setIsNavBarOpen} />
        ) : (
          <ClosedNavigation setIsNavBarOpen={setIsNavBarOpen} />
        )}
      </div>

      {/* Main Screen */}
      <div className="h-full w-full pl-3 p-3">
        <Search data={title} onChange={setTitle} />
        <div id="wrap-panel" className="flex flex-wrap gap-5 justify-start">
          {data.pages
            .flatMap((page) => page.forms)
            .filter((el: Form) => el.Title.includes(title))
            .map((form, idx) => (
              <MailCard
                key={idx}
                id={form.id}
                title={form.Title}
                tags={form.tags}
                writer={form.Writer}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
