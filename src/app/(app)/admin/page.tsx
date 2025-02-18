import Link from "next/link";
import { useMemo } from "react";
import { db } from "~/server/db";
import { DeleteUser } from "./_components/delete-user";
import { auth } from "~/server/auth";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return;
  }

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
          <div className="grid grid-cols-[0.6fr_1fr_1fr_0.1fr] gap-1 rounded p-1">
            <p>ID</p>
            <p>Email</p>
            <p>Name</p>
            <p>Actions</p>
          </div>
          {allUsers.map((user) => (
            <div
              key={user.id}
              className="grid grid-cols-[0.6fr_1fr_1fr_0.1fr] gap-1 rounded bg-neutral-100 p-1"
            >
              <p>{user.id}</p>
              <p>{user.email}</p>
              <p>{user.name}</p>
              <div className="flex justify-end">
                {user.id !== session.user.id && <DeleteUser userId={user.id} />}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-4">
        <h2 className="text-2xl font-semibold">Commands</h2>
        <div className="flex flex-col gap-1">
          <p>Total Commands: {allCommands.length}</p>
          <div className="grid grid-cols-[0.05fr_0.6fr_1fr_1fr] gap-1 p-1">
            <p>ID</p>
            <p>Owner ID</p>
            <p>Command</p>
            <p>Description</p>
          </div>
          {allCommands.map((command) => (
            <div
              key={command.id}
              className="grid grid-cols-[0.05fr_0.6fr_1fr_1fr] gap-1 rounded bg-neutral-100 p-1"
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
