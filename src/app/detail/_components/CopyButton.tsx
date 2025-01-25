"use client";

import { useState } from "react";
import { copyToClipboard } from "../_lib/lib";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/firebase/firebaseClient";

const CopyButton = ({ id, data }: { data: string; id: string }) => {
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <button
      className="px-3 py-1 text-white text-bold rounded-md shadow-md bg-green-500"
      onClick={async () => {
        if (!copied) {
          copyToClipboard(data);
          setCopied(!copied);
          const docRef = doc(db, "forms", id);

          // Atomically increment the population of the city by 50.
          await updateDoc(docRef, {
            CopiedCount: increment(1),
          });
        }
      }}
    >
      {copied ? "copied" : "copy"}
    </button>
  );
};

export default CopyButton;
