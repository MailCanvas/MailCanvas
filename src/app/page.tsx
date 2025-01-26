"use client";
import { useState, useRef } from "react";
import { useGetForms } from "@/hooks/queries";
import { useSearchParams } from "next/navigation";
import MailCard from "@/components/ui/MailCard";
import Search from "@/components/ui/Search";
import ClosedNavigation from "@/components/ui/Navigation/ClosedNavigation";
import OpenedNavigation from "@/components/ui/Navigation/OpenedNavigation";
import Chip from "@/components/ui/Chip";
import Loading from "./loading";
import { Form } from "@/types/types";
export default function Home() {
  // const title, tags, sortByCopyCount
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [sortByCopyCount, setSortByCopyCount] = useState<boolean>(true);
  const [IsNavBarOpen, setIsNavBarOpen] = useState<boolean>(true);
  const loader = useRef<IntersectionObserver | null>(null);

  const searchParams = useSearchParams();

  const tag = searchParams.get("tag");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetForms({ sortByCopyCount, tag });

  if (status === "pending") return <Loading />;
  if (status === "error") return <div>500 데이터를 불러오지 못했습니다.</div>;

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
      <div className="h-screen bg-gradient-to-b from-green-300 to-purple-300">
        {IsNavBarOpen ? (
          <OpenedNavigation setIsNavBarOpen={setIsNavBarOpen} />
        ) : (
          <ClosedNavigation setIsNavBarOpen={setIsNavBarOpen} />
        )}
      </div>

      {/* Main Screen */}
      <div className="h-full w-full pl-3 p-3">
        {/* 검색바 */}
        <Search data={title} onChange={setTitle} />

        {/* chip버튼 필터 */}
        <div className="space-x-1.5 mt-5">
          <Chip tag="성적이의신청" useLink={true} />
          <Chip tag="학점" useLink={true} />
          <Chip tag="수강신청" useLink={true} />
          <Chip tag="팀플" useLink={true} />
          <Chip tag="과제" useLink={true} />
          <Chip tag="연구" useLink={true} />
          <Chip tag="대학원" useLink={true} />
          <Chip tag="복수전공" useLink={true} />
          <Chip tag="휴학" useLink={true} />
          <Chip tag="장학금" useLink={true} />
          <Chip tag="교환학생" useLink={true} />
          <Chip tag="학술대회" useLink={true} />
        </div>

        {/* 메일 리스트 */}
        <div
          id="scrollbar-1"
          className="flex flex-wrap gap-5 content-start justify-center h-[85vh] overflow-y-auto"
        >
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
          <div
            ref={observer}
            className="my-3 flex w-full items-center justify-center text-2xl"
          />
        </div>
      </div>
    </div>
  );
}
