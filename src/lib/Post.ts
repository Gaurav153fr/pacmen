"use server";

import { db } from "@/server/db";

 async function createPost(formData: FormData) {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const devpostId = Number(formData.get("devpostId"));
  const openState = formData.get("openState") as string;
  const featured = formData.get("featured") === "on";
  const winnersAnnounced = formData.get("winnersAnnounced") === "on";
  const inviteOnly = formData.get("inviteOnly") === "on";

  const themeIds = formData.getAll("themes") as string[];

  await db.post.create({
    data: {
      title,
      url,
      devpostId,
      openState,
      featured,
      winnersAnnounced,
      inviteOnly,
      themes: {
        connect: themeIds.map((id) => ({
          id: Number(id),
        })),
      },
    },
  });
}

export interface Theme {
    id: number;
    name: string;
  }
  
  export interface Post {
    id: string;
    devpostId: number;
    title: string;
    url: string;
    thumbnailUrl?: string;
  
    locationIcon?: string;
    location?: string;
  
    openState: "open" | "upcoming" | "closed";
    timeLeft?: string;
    submissionPeriodDates?: string;
  
    prizeAmountRaw?: string;
    prizeAmountValue?: number;
  
    cashPrizesCount?: number;
    otherPrizesCount?: number;
  
    registrationsCount?: number;
    featured: boolean;
  
    organizationName?: string;
    winnersAnnounced: boolean;
  
    submissionGalleryUrl?: string;
    startSubmissionUrl?: string;
  
    inviteOnly: boolean;
    eligibilityDescription?: string;
  
    themes: Theme[];
  
    createdAt: Date;
    updatedAt: Date;
  }



  export{ createPost};