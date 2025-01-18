import { useState } from "react";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#4caf50] focus:border-[#4caf50] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#4caf50] dark:focus:border-[#4caf50]"
        placeholder="제목으로 검색하세요..."
        required
        value={searchText} // 상태로 바인딩된 값
        onChange={(e) => setSearchText(e.target.value)} // 입력값이 변경될 때마다 상태 업데이트
      />
    </div>
  );
}
