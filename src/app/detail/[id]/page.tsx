import { db } from "@/firebase/firebaseClient";
import { DetailProps, Form } from "@/types/types";
import { doc, getDoc } from "firebase/firestore";

export default async function Page({ params }: DetailProps) {
  const { id } = await params;
  const _doc = await getDoc(doc(db, "forms", id));
  const data = _doc.data() as Form;

  if (!data) {
    return <div>404</div>;
  }

  return <div>{data.Title}</div>;
}
