import { auth, signOut } from "~/server/auth";
import { AddForm } from "./_components/add-form";
import { db } from "~/server/db";
import { CopyButton } from "~/components/copy-button";
import { eq } from "drizzle-orm";
import { commands } from "~/server/db/schema";
import { redirect } from "next/navigation";
import { Trash } from "lucide-react";
import { DeleteButton } from "~/components/delete-button";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return;
  }

  const userCommands = await db.query.commands.findMany({
    where: (t, { eq }) => eq(t.ownerId, session.user.id),
  });

  return (
    <main className="px-4 py-2 md:px-24 md:py-8">
      <div className="flex w-full flex-col items-center gap-2 md:flex-row md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold">Command Catalogue</h1>
          <div className="inline-flex gap-1 text-xl">
            <p>Welcome back, {session.user.name?.split(" ")[0]}.</p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="underline">Sign out</button>.
            </form>
          </div>
        </div>
        <div className="w-full md:w-max">
          <AddForm />
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-4">
        {userCommands.map((command) => (
          <div
            key={command.id}
            className="grid grid-cols-1 gap-1 rounded bg-neutral-100 p-2 md:grid-cols-2"
          >
            <div className="inline-flex items-center gap-2">
              <p>{command.command}</p> <CopyButton text={command.command} />
            </div>
            <hr className="py-1 md:hidden" />
            <div className="itens-center inline-flex justify-between">
              <p>{command.description}</p>
              <DeleteButton commandId={command.id} />
            </div>
          </div>
        ))}

        {userCommands.length === 0 && (
          <div className="flex w-full items-center justify-center p-4">
            <p>No commands found. Add one!</p>
          </div>
        )}
      </div>
    </main>
  );
}
