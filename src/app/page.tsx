import Link from "next/link";

import { LatestPost } from "@/app/_components/post";
import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import PostForm from "@/components/PostForm";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  const themes = [{ id: 1, name: "Theme 1" }, { id: 2, name: "Theme 2" }];
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
       
{/* <PostForm themes={themes} />
         */}
      </main>
    </HydrateClient>
  );
}
