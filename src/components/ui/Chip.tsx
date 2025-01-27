import React from "react";

interface ChipProps {
  tag: string;
  useLink: boolean;
}

const Chip: React.FC<ChipProps> = ({ tag, useLink }) => {
  const chipContent = (
    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800 h-[25px] leading-[25px]">
      {tag}
    </span>
  );

  const handleClick = () => {
    // 페이지를 강제로 리로드하면서 쿼리 파라미터 변경
    window.location.href = `/?tag=${tag}`;
  };

  return (
    <>
      {useLink ? (
        // useLink가 true일 때 링크 클릭 시 강제로 리로드
        <button onClick={handleClick} className="text-green-800">
          {chipContent}
        </button>
      ) : (
        // useLink가 false일 때는 span만 렌더링
        chipContent
      )}
    </>
  );
};

export default Chip;
