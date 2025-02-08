"use client";

import { Form } from "@/types/types";
import { useEffect, useState } from "react";
import { updateForm } from "../_lib/lib";

export function EditPage({ initialData }: { initialData: Form }) {
  const [data, SetData] = useState(initialData);
  const [content, SetContent] = useState(initialData.Content);

  const handleSubmit = () => {
    updateForm({ id: data.id, content });
  };
  return (
    <div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">양식</label>
        <textarea
          value={content}
          onChange={(e) => SetContent(e.target.value)}
          rows={8}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
          placeholder="양식을 작성하세요"
        />
        <button onClick={handleSubmit}>제출</button>
      </div>
    </div>
  );
}
