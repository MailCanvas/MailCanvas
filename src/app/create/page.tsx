"use client";
import React, { useState, useRef } from "react";
import { createForm } from "./_lib/lib";
import { usePathname, useRouter } from "next/navigation";

const BlogPostForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [IsEmailVisible, SetIsEmailVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [replacementInput, setReplacementInput] = useState<string>("");
  const [replacements, setReplacements] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddReplacement = () => {
    if (
      replacementInput.trim() &&
      !replacements.includes(replacementInput.trim())
    ) {
      setReplacements([...replacements, replacementInput.trim()]);
      setReplacementInput("");
    }
  };

  const handleRemoveReplacement = (replacementToRemove: string) => {
    setReplacements(
      replacements.filter((replacement) => replacement !== replacementToRemove)
    );
    // Remove from content as well
    setContent(content.replaceAll(`\${${replacementToRemove}}$`, ""));
  };

  const insertReplacementTag = (replacement: string) => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const replacementTag = `\${${replacement}}$`;
      const newContent =
        content.substring(0, start) + replacementTag + content.substring(end);
      setContent(newContent);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content, email, name, tags, replacements });
    const _data = {
      content: content,
      email: email,
      title: title,
      writer: name,
      tags: tags,
      replacementTags: replacements,
      IsEmailVisible: IsEmailVisible,
    };
    createForm(_data);
    alert(
      "양식이 정상적으로 제출되었습니다. 양식은 관리자의 승인을 거쳐 업로드 됩니다."
    );
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-pink-50 p-6">
      <div className="max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white rounded-2xl shadow-xl p-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            새 양식 작성하기
          </h1>

          {/* Title Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              placeholder="양식 제목을 입력하세요"
            />
          </div>

          {/* Tags Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              태그
            </label>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                placeholder="추가할 태그를 입력하세요"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-200"
              >
                태그 추가
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="group inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 px-1 text-green-400 hover:text-green-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Replacement Tags Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              치환 태그
            </label>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                value={replacementInput}
                onChange={(e) => setReplacementInput(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                placeholder="추가할 치환 태그를 입력하세요"
              />
              <button
                type="button"
                onClick={handleAddReplacement}
                className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-700 transition duration-200"
              >
                치환 태그 추가
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {replacements.map((replacement) => (
                <div key={replacement} className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => insertReplacementTag(replacement)}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition duration-200"
                  >
                    {replacement}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveReplacement(replacement)}
                    className="px-2 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition duration-200"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Content Textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              양식
            </label>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              placeholder="양식을 작성하세요"
            />
          </div>

          {/* Author Information */}
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                작성자
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                placeholder="닉네임을 입력하세요. 사용자에게 실제로 보여질 닉네임이므로, 실명을 사용하지 말아주세요."
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                이메일
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                placeholder="이메일을 입력하세요"
              />
            </div>
            <div className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    checked={IsEmailVisible}
                    onChange={(e) => SetIsEmailVisible(!IsEmailVisible)}
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-green-600 checked:border-green-600"
                    id="check4"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                </label>
              </div>
              <label className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                사용자들에게 이메일을 공개하여 폼에 대한 피드백을 받습니다.
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-green-300 text-white rounded-lg hover:from-green-700 hover:to-green-500 transform hover:-translate-y-0.5 transition duration-200"
          >
            양식 제출
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogPostForm;
