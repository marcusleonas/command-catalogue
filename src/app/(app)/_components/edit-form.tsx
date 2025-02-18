"use client";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { mutate } from "./actions";
import { toast } from "~/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil } from "lucide-react";

export function EditForm({
  commandId,
  command,
  description,
}: {
  commandId: number;
  command: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);

  async function formAction(formData: FormData) {
    console.log("form submitted");
    const res = await mutate(formData, commandId);

    if (!res.success) {
      toast({
        title: "Something went wrong!",
        description: res.message,
        variant: "destructive",
      });
      return;
    }

    if (res.success) {
      toast({
        title: res.message,
      });
      setOpen(false);
      window.location.reload();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Pencil size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Command</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="command">Command</Label>
            <Input type="text" name="command" defaultValue={command} required />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              defaultValue={description}
              required
            />
          </div>

          <Button type="submit">Edit Command</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
