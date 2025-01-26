"use client";
import React, { useState, useEffect, useRef } from "react";

const Tooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        ref={triggerRef}
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        onMouseEnter={() => {
          setIsVisible(true);
        }}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-10 p-2 -top-10 left-1/2 transform -translate-x-1/2
        bg-gray-100 text-black 
            px-4 py-3 rounded-lg shadow-xl 
            transition-all duration-300 ease-in-out 
            origin-center text-left leading-relaxed
            break-words whitespace-pre-wrap w-64"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
