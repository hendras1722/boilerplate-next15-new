"use client";
import { useSelectedLayoutSegments } from "next/navigation";

export default function Page() {
  const segments = useSelectedLayoutSegments();
  console.log(segments);
  return <div>Helloworld</div>;
}
