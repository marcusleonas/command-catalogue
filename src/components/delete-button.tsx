"use client";

import { Trash } from "lucide-react";
import { deleteCommand } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "~/hooks/use-toast";

export function DeleteButton({ commandId }: { commandId: number }) {
  const router = useRouter();

  return (
    <form
      action={async () => {
        const res = await deleteCommand(commandId);
        if (res.success) {
          toast({
            title: "Deleted command!",
          });
          router.push("/");
        }
      }}
    >
      <button type="submit">
        <Trash size={20} />
      </button>
    </form>
  );
}
