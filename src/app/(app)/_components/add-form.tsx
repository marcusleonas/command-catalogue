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

export function AddForm() {
  async function formAction(formData: FormData) {
    console.log("form submitted");
  }

  return (
    <Dialog>
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
            <Input type="text" name="command" placeholder="git add -A" />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              placeholder="Stages all unstaged files"
            />
          </div>

          <Button type="submit">Add Command</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
