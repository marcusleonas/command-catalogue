"use server";

import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { commands } from "~/server/db/schema";

export async function handleAddForm(formData: FormData) {
  try {
    const command = formData.get("command");
    const description = formData.get("description");

    if (!command == null) {
      console.log("Null command!");
      return {
        success: false,
        message: "Command is blank",
      };
    }
    if (!description == null) {
      console.log("Null description!");
      return {
        success: false,
        message: "Description is blank.",
      };
    }

    const session = await auth();
    if (!session) {
      console.log("Unauthorized!");
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await db.insert(commands).values({
      command: command as string,
      description: description as string,

      ownerId: session.user.id,
    });

    return {
      success: true,
      message: `Added command: ${command as string}`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
