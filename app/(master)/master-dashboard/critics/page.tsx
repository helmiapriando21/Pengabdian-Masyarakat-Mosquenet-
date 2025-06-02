"use client"

import ListFeedbacks from "./_components/listFeedbacks";

export default function Critics() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="font-black text-3xl">Feedback Pengguna</h1>
      <ListFeedbacks />
    </div>
  );
}