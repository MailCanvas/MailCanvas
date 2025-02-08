import { db } from "@/firebase/firebaseClient";
import { Form } from "@/types/types";
import { updateDoc, doc } from "firebase/firestore";

export const updateForm = (_data: { id: string; content: string }) => {
  const formRef = doc(db, "forms", _data.id); // 문서 참조 생성
  console.log(_data.content);
  console.log(_data.id);
  updateDoc(formRef, {
    Content: _data.content,
  }).then(() => alert("수정완료료"));
};
