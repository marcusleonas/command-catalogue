import Link from "next/link";
import { useMemo } from "react";
import { db } from "~/server/db";

export default async function Page() {
  const allUsers = await db.query.users.findMany();
  const allCommands = (await db.query.commands.findMany()).sort(
    (a, b) => a.id - b.id,
  );

  return (
    <main className="px-4 py-2 md:px-24 md:py-8">
      <h1 className="text-4xl font-semibold">Admin Panel</h1>
      <Link className="underline" href={"/"}>
        Back Home
      </Link>

      <section className="pt-4">
        <h2 className="text-2xl font-semibold">Users</h2>
        <div className="flex flex-col gap-1">
          <p>Total Users: {allUsers.length}</p>
          {allUsers.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-3 gap-1 rounded bg-neutral-100 p-1"
            >
              <p>{user.id}</p>
              <p>{user.email}</p>
              <p>{user.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-4">
        <h2 className="text-2xl font-semibold">Commands</h2>
        <div className="flex flex-col gap-1">
          <p>Total Users: {allCommands.length}</p>
          {allCommands.map((command) => (
            <div
              key={command.id}
              className="grid grid-cols-[0.05fr_1fr_1fr_1fr] gap-1 rounded bg-neutral-100 p-1"
            >
              <p>{command.id}</p>
              <p>{command.ownerId}</p>
              <p>{command.command}</p>
              <p>{command.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
