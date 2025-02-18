import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

/**
 * Redirect a user to login if not authenticated.
 */
export default async function AuthRedirect({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return redirect("/api/auth/signin");
  }

  return <>{children}</>;
}
