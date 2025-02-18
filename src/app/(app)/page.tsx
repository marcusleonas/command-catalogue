import { auth } from "~/server/auth";

export default async function HomePage() {
  const session = await auth();

  if (!session) {
    return;
  }

  return (
    <main className="px-24 py-8">
      <div className="inline-flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold">Command Catalogue</h1>
          <p className="text-xl">
            Welcome back, {session.user.name?.split(" ")[0]}.
          </p>
        </div>
        <div></div>
      </div>
    </main>
  );
}
