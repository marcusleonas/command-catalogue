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
import { handleAddForm } from "./actions";
import { toast } from "~/hooks/use-toast";
import { useState } from "react";
import { Textarea } from "~/components/ui/textarea";

export function AddForm() {
  const [open, setOpen] = useState(false);

  async function formAction(formData: FormData) {
    console.log("form submitted");
    const res = await handleAddForm(formData);

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
      <DialogTrigger asChild>
        <Button>Add New</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Command</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="command">Command</Label>
            <Textarea name="command" placeholder="git add -A" required />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Stages all unstaged files"
              required
            />
          </div>

          <Button type="submit">Add Command</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
