import Link from "next/link";

interface OpenedNavigationProps {
  setIsNavBarOpen: (a: boolean) => void;
}

const OpenedNavigation: React.FC<OpenedNavigationProps> = ({
  setIsNavBarOpen,
}) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="hidden md:flex justify-end align-top">
        <button
          type="button"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none 
      focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center ml-2
      justify-center me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
      h-[35px] mt-1
      "
          onClick={() => setIsNavBarOpen(false)}
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
              d="M13 5H1m0 0l4 4M1 5l4-4"
            />
          </svg>
          <span className="sr-only">Icon description</span>
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-grow justify-center items-center">
        <div className="p-10">
          <h1 className="font-extrabold text-5xl text-center text-slate-100">
            MailCanvas
          </h1>
          <h3 className="font-bold text-xl text-slate-100">
            어려운 메일보내기를 간편하게
          </h3>
          <div className="flex justify-center">
            <Link href="/create">
              <button
                className="relative inline-flex items-center 
          justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium 
          text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300
           group-hover:from-teal-300 group-hover:to-lime-300 dark:text-white 
           dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-lime-200 
           dark:focus:ring-lime-800 mt-2"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  나만의 양식 배포하기
                </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenedNavigation;
