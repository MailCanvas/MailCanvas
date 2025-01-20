import { db } from "@/firebase/firebaseClient";
import { Form } from "@/types/types";
import { addDoc, collection } from "firebase/firestore";

export const createForm = async (_data: {
  content: string;
  email: string;
  title: string;
  writer: string;
  tags: string[];
  replacementTags: string[];
  IsEmailVisible: boolean;
}) => {
  const time = new Date();
  const data: Form = {
    id: "null",
    Content: _data.content,
    CopiedCount: 0,
    Email: _data.email,
    IsOfficial: false,
    IsValid: false,
    LikeCount: 0,
    Title: _data.title,
    Writer: _data.writer,
    tags: _data.tags,
    replacementTags: _data.replacementTags,
    timestamp: time.getTime(),
    IsEmailVisible: _data.IsEmailVisible,
  };
  const res = await addDoc(collection(db, "forms"), data);
  return res;
};
