interface ClosedNavigationProps {
  setIsNavBarOpen: (a: boolean) => void;
}

const ClosedNavigation: React.FC<ClosedNavigationProps> = ({
  setIsNavBarOpen,
}) => {
  return (
    
    <button
      type="button"
      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
      focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center ml-2
      justify-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
      h-[35px] mt-1
      "
      onClick={() => setIsNavBarOpen(true)}
    >
      <svg
        className="w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0l-4 4m4-4l-4-4" // 화살표 방향 변경
        />
      </svg>
      <span className="sr-only">Icon description</span>
    </button>
  );
};

export default ClosedNavigation;
