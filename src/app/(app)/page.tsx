import { Button } from "~/components/ui/button";
import { auth, signOut } from "~/server/auth";
import { AddForm } from "./_components/add-form";
import { db } from "~/server/db";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return;
  }

  const commands = await db.query.commands.findMany({
    where: (t, { eq }) => eq(t.ownerId, session.user.id),
  });

  return (
    <main className="px-24 py-8">
      <div className="inline-flex w-full items-center justify-between">
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
        <div>
          <AddForm />
        </div>
      </div>
      <div>{JSON.stringify(commands)}</div>
    </main>
  );
}
