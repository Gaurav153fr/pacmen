"use client";

import { useTransition } from "react";
import { createPost } from "@/lib/Post";

interface Theme {
  id: number;
  name: string;
}

interface PostFormProps {
  themes: Theme[];
}

export default function PostForm({ themes }: PostFormProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        startTransition(() => createPost(formData))
      }
      className="space-y-4 max-w-md"
    >
      <input
        name="title"
        placeholder="Title"
        required
        className="border p-2 w-full"
      />

      <input
        name="url"
        placeholder="URL"
        required
        className="border p-2 w-full"
      />

      <input
        name="devpostId"
        type="number"
        placeholder="Devpost ID"
        required
        className="border p-2 w-full"
      />

      <select
        name="openState"
        required
        className="border p-2 w-full"
      >
        <option value="">Select state</option>
        <option value="open">Open</option>
        <option value="upcoming">Upcoming</option>
        <option value="closed">Closed</option>
      </select>

      <div className="space-y-2">
        <label className="font-semibold">Themes</label>
        {themes.map((theme) => (
          <label key={theme.id} className="flex gap-2">
            <input
              type="checkbox"
              name="themes"
              value={theme.id}
            />
            {theme.name}
          </label>
        ))}
      </div>

      <label className="flex gap-2">
        <input type="checkbox" name="featured" />
        Featured
      </label>

      <label className="flex gap-2">
        <input type="checkbox" name="winnersAnnounced" />
        Winners Announced
      </label>

      <label className="flex gap-2">
        <input type="checkbox" name="inviteOnly" />
        Invite Only
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white px-4 py-2"
      >
        {isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}