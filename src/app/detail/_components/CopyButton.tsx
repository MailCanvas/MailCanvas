"use client";

import { useState } from "react";
import { copyToClipboard } from "../_lib/lib";

const CopyButton = ({ data }: { data: string }) => {
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <button
      className="px-3 py-1 text-white text-bold rounded-md shadow-md bg-blue-500"
      onClick={() => {
        if (!copied) {
          copyToClipboard(data);
          setCopied(!copied);
        }
      }}
    >
      {copied ? "copied" : "copy"}
    </button>
  );
};

export default CopyButton;
