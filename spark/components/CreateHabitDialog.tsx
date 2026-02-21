"use client";

import { useState, useTransition } from "react";
import { sbCreateHabit } from "@/actions/habit";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreateHabitDialog({ open, onOpenChange }: Props) {
  const [pending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleSubmit = () => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("dueTime", dueTime);

      await sbCreateHabit(formData);

      // reset
      setName("");
      setDueTime("");

      onOpenChange(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create habit</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label htmlFor="name">Habit name</Label>
            <Input
              id="name"
              placeholder="Drink water"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueTime">Due time (optional)</Label>
            <Input
              id="dueTime"
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={pending || !name.trim()}
            className="w-full"
          >
            {pending ? "Creating..." : "Create habit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}