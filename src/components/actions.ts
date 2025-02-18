"use server";

import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { commands } from "~/server/db/schema";

export async function deleteCommand(commandId: number) {
  try {
    await db.delete(commands).where(eq(commands.id, commandId));
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
