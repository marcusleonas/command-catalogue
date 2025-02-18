"use server";

import { eq } from "drizzle-orm";
import { env } from "~/env";
import { db } from "~/server/db";
import { accounts, sessions, users } from "~/server/db/schema";

export async function deleteUser(userId: string) {
  "use server";
  console.log("Deleting user:", userId);

  try {
    const user = await db.query.users.findFirst({
      where: (t, { eq }) => eq(t.id, userId),
    });

    if (!user)
      return {
        success: false,
        message: "User does not exist.",
      };

    if (user.email === env.ADMIN_EMAIL)
      return {
        success: false,
        message: "Cannot delete this user.",
      };

    console.log("Deleting sessions...");
    await db.delete(sessions).where(eq(sessions.userId, userId));

    console.log("Deleted sessions, now deleting account...");
    await db.delete(accounts).where(eq(accounts.userId, userId));

    console.log("Deleted account, now deleting user...");
    await db.delete(users).where(eq(users.id, userId));

    console.log("User deleted!");

    return {
      success: true,
      message: `User ${user.id} successfully deleted!`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
