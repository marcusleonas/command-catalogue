import { Button } from "~/components/ui/button";
import { auth, signOut } from "~/server/auth";
import { AddForm } from "./_components/add-form";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return;
  }

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
    </main>
  );
}
