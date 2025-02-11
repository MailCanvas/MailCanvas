import { db } from "@/firebase/firebaseClient";
import { addDoc, collection } from "firebase/firestore";

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    alert("클립보드에 복사되었습니다.");
  } catch (error) {
    console.error(error);
  }
};

export const creatEventApplies = async (_data: { content: string }) => {
  const time = new Date();
  const data = {
    Content: _data.content,
  };
  const res = await addDoc(collection(db, "eventApplies"), data);
  return res;
};
