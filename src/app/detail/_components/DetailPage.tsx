"use client";
import { Form } from "@/types/types";
import { useEffect, useState } from "react";
import CopyButton from "../_components/CopyButton";
import Chip from "@/components/ui/Chip";

export function DetailPage({
  initialData,
  backgroundImage,
}: {
  initialData: Form;
  backgroundImage?: string | null;
}) {
  const [replacements, setReplacements] = useState<{ [key: string]: string }>(
    {}
  );
  const [previewContent, setPreviewContent] = useState(initialData.Content);

  // Initialize replacements with Firestore data
  useEffect(() => {
    const initialReplacements: { [key: string]: string } = {};
    initialData.replacementTags.forEach((tag) => {
      initialReplacements[tag] = "";
    });
    setReplacements(initialReplacements);
  }, [initialData.replacementTags]);

  // Update preview content when replacements change
  useEffect(() => {
    let newContent = initialData.Content;
    Object.entries(replacements).forEach(([key, value]) => {
      const regex = new RegExp(`\\$\{${key}}\\\$`, "g");
      newContent = newContent.replace(regex, value || `\${${key}}$`);
    });
    setPreviewContent(newContent);
  }, [replacements, initialData.Content]);

  const handleReplacementChange = (tag: string, value: string) => {
    setReplacements((prev) => ({
      ...prev,
      [tag]: value,
    }));
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 to-pink-50 p-6"
      style={{ backgroundImage: `url('/${backgroundImage}')` }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Header Section */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              {initialData.Title}
            </h1>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <span>작성자: {initialData.Writer}</span>
              <span>•</span>
              <span>복사 횟수: {initialData.CopiedCount}</span>
            </div>
          </div>

          {/* Tags Section */}
          <div className="flex flex-wrap gap-2">
            {initialData.tags?.map((tag, index) => (
              <Chip tag={tag} key={index} useLink={true} />
            ))}
          </div>

          {/* Replacement Inputs Section */}
          {initialData.replacementTags.length > 0 && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                치환 태그 입력
              </label>
              <div className="grid grid-cols-1 gap-4 p-4 bg-gray-50 rounded-lg">
                {initialData.replacementTags.map((tag) => (
                  <div key={tag} className="flex flex-col space-y-1">
                    <label className="text-sm text-gray-600">{tag}</label>
                    <input
                      type="text"
                      value={replacements[tag] || ""}
                      onChange={(e) =>
                        handleReplacementChange(tag, e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                      placeholder={`${tag} 내용 입력`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Content Preview Section */}
          <div className="relative space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              양식 내용
            </label>
            <div className="relative">
              <div className="w-full px-4 py-3 bg-gray-50 rounded-lg text-gray-700 min-h-[200px] whitespace-pre-wrap">
                {previewContent}
              </div>
              <div className="absolute top-2 right-2">
                <CopyButton data={previewContent} id={initialData.id} />
              </div>
            </div>
          </div>

          {/* Author Information */}
          <div className="grid grid-cols-1 gap-4 border-t pt-6 mt-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                작성자 정보
              </label>
              <div className="flex flex-col space-y-2 px-4 py-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">닉네임:</span>
                  <span className="text-gray-700">{initialData.Writer}</span>
                </div>
                {initialData.IsEmailVisible ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">이메일:</span>
                    <span className="text-gray-700">{initialData.Email}</span>
                  </div>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
