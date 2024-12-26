"use server";

import { db } from "@/db/kysely";
import { getServerAuthSession } from "@/server/auth";

export const dbAndroidZipInsert = async (url: string, fileName: string) => {
  const user = await getServerAuthSession();

  if (!user) {
    return null;
  }

  const data = await db
    .insertInto("androidZip")
    .values({
      filename: fileName,
      userId: user?.user.id,
      originalUrl: url,
      progress: "PENDING",
    })
    .returningAll()
    .execute();

  return data[0];
};
