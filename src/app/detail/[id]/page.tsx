import { DetailProps } from "@/types/types";

export default function Page(Props: DetailProps) {
  return <div>detail{Props.params.id}</div>;
}
