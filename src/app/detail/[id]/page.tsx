import { db } from "@/firebase/firebaseClient";
import { DetailProps, Form } from "@/types/types";
import { doc, getDoc } from "firebase/firestore";
import CopyButton from "../_components/CopyButton";

export default async function Page({ params }: DetailProps) {
  const { id } = await params;
  const _doc = await getDoc(doc(db, "forms", id));
  const data = _doc.data() as Form;

  if (!data) {
    return <div>404</div>;
  }

  return (
    <div>
      <div>{data.Title}</div>
      <div>{data.Content}</div>
      <div>{data.CopiedCount}</div>
      <div>{data.Email}</div>
      <div>{data.Writer}</div>
      <div>{data.tags}</div>
      <CopyButton data={data.Content} />
    </div>
  );
}
