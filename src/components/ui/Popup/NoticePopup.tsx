"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "notice_popup_closed_date";

const NoticePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // 공지 리스트
  const notices = ["- 패치노트 모달 추가", "- 이벤트 페이지 추가"];

  useEffect(() => {
    const savedVersion = localStorage.getItem(STORAGE_KEY);
    setIsOpen(savedVersion !== "ver0.2.0");
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(STORAGE_KEY, "ver0.2.0");
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
      onClick={handleClose} // 배경 클릭 시 닫기
    >
      <div
        className="bg-white p-6 shadow-xl rounded-lg w-80 z-[10000]"
        onClick={(e) => e.stopPropagation()} // 팝업 클릭 시 닫히지 않게 방지
      >
        <p className="text-lg font-bold text-gray-800 mb-5">
          📢 ver0.2.0 업데이트
        </p>
        <ul className="text-base text-gray-700 space-y-2">
          {notices.map((notice, index) => (
            <li key={index} className="flex items-center">
              {notice}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="dont-show-today"
            className="w-5 h-5 mr-3 accent-blue-500"
            checked={dontShowAgain}
            onChange={(e) => setDontShowAgain(e.target.checked)}
          />
          <label
            htmlFor="dont-show-today"
            className="text-base font-medium text-gray-700"
          >
            다시 보지 않기
          </label>
        </div>

        <button
          onClick={handleClose}
          className="mt-6 w-full bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 text-base font-semibold"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default NoticePopup;
