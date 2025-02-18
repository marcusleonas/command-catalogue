import { redirect } from "next/navigation";
import { env } from "~/env";
import { auth } from "~/server/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return;
  }

  if (session.user.email !== env.ADMIN_EMAIL) {
    return redirect("/");
  }

  return <>{children}</>;
}
