import { db } from "@/firebase/firebaseClient";
import { DetailProps, Form } from "@/types/types";
import { doc, getDoc } from "firebase/firestore";

export default async function Page({ params }: DetailProps) {
  const _doc = await getDoc(doc(db, "forms", params.id));
  const data = _doc.data() as Form;
  return <div>{data.Title}</div>;
}
