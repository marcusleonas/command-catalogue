"use client";

import { Trash } from "lucide-react";
import { deleteUser } from "./actions";
import { toast } from "~/hooks/use-toast";
import { Dialog } from "~/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export function DeleteUser({ userId }: { userId: string }) {
  const router = useRouter();

  return (
    // <button
    //   onClick={async () => {
    //     const res = await deleteUser(userId);

    //     if (res.success) {
    //       toast({
    //         title: res.message,
    //       });
    //       window.location.reload();
    //       return;
    //     }

    //     if (!res.success) {
    //       toast({
    //         title: res.message,
    //         variant: "destructive",
    //       });
    //       return;
    //     }
    //   }}
    // >
    //   <Trash />
    // </button>
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center">
        <Trash size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            user&apos;s account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const res = await deleteUser(userId);

              if (res.success) {
                toast({
                  title: res.message,
                });

                window.location.reload();
              }

              if (!res.success) {
                toast({
                  title: res.message,
                  variant: "destructive",
                });
              }
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
