"use server";

import { desc, eq } from "drizzle-orm";
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

export async function mutate(formData: FormData, commandId: number) {
  try {
    const command = formData.get("command");
    const description = formData.get("description");

    const session = await auth();
    if (!session) {
      console.log("Unauthorized!");
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const currentCommand = await db.query.commands.findFirst({
      where: (t, { eq }) => eq(t.id, commandId),
    });

    const updates: { command?: string; description?: string } = {};

    if (currentCommand?.command !== command) {
      updates.command = command as string;
    }

    if (currentCommand?.description !== description) {
      updates.description = description as string;
    }

    if (Object.keys(updates).length > 0) {
      await db.update(commands).set(updates).where(eq(commands.id, commandId));
    }

    return {
      success: true,
      message: "Update Successful!",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
}
