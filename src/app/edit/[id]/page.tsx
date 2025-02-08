import React, { useState, useRef } from "react";
import { db } from "@/firebase/firebaseClient";
import { doc, getDoc } from "firebase/firestore";
import { EditPage } from "../_components/EditPage";
import { Form } from "@/types/types";

async function getFormData(id: string) {
  const formDoc = await getDoc(doc(db, "forms", id));
  const formData = formDoc.data() as Form;
  formData.id = id;

  return {
    formData,
  };
}

export default async function generatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const { formData } = await getFormData(id);

  if (!formData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-4xl font-bold text-red-500">404</h1>
          <p className="text-gray-600 mt-2">양식을 찾을 수 없습니다</p>
        </div>
      </div>
    );
  }

  return <EditPage initialData={formData} />;
}
