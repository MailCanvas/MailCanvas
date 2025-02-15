"use client";

import { useState } from "react";

interface PatchNotesModalProps {
  version: string; // props로 받는 버전 정보
}

const PatchNotesModal = ({ version }: PatchNotesModalProps) => {
  const [isOpen, setIsOpen] = useState(false); // 모달 상태 관리

  const openModal = () => setIsOpen(true); // 모달 열기
  const closeModal = () => setIsOpen(false); // 모달 닫기

  return (
    <>
      {/* 버전 정보 클릭 시 모달 열기 */}
      <a href="#" onClick={openModal} className="text-sm cursor-pointer">
        ver {version}
      </a>

      {/* 모달 */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">패치노트</h2>
            </div>
            {/* 버전 정보를 왼쪽 정렬 */}
            <p className="text-xl text-gray-500 font-semibold text-left">
              ver0.2.0
            </p>
            <p className="text-sm text-black font-normal text-left">
              - 패치노트 모달 추가
            </p>
            <p className="text-sm text-black font-normal text-left">
              - 이벤트 페이지 추가
            </p>

            <div className="flex justify-between items-center mt-4 h-[25px]">
              {/* "다시 보지 않기" 체크박스 */}
              <div className="flex items-center text-sm">
                {/* <input
                  type="checkbox"
                  id="dontShowAgain"
                  className="mr-2 text-sm"
                />
                <label
                  htmlFor="dontShowAgain"
                  className="text-sm text-gray-700"
                >
                  다시 보지 않기
                </label> */}
              </div>

              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded-full h-[25px] text-sm"
                onClick={closeModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PatchNotesModal;
