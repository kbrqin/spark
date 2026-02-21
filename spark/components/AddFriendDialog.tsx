"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { sbAddFriendByUsername } from "@/actions/friends";
import { FriendError } from "@/types/errors";


interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onFriendAdded?: () => void; 
}

export default function AddFriendDialog({
  open,
  onOpenChange,
  onFriendAdded,
}: Props) {
  const [username, setUsername] = useState("");
  const [pending, startTransition] = useTransition();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAddFriend = () => {
    setErrorMsg(null);

    startTransition(async () => {
      const res = await sbAddFriendByUsername(username);

      if (!res.ok) {
        if (res.error === FriendError.InvalidUsername) {
          setErrorMsg("User not found :(");
        } else {
          setErrorMsg("Something went wrong");
        }
        return;
      }

      // success
      setUsername("");
      onOpenChange(false);

      // refresh friends
      if (onFriendAdded) onFriendAdded();
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add friend</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Button
            onClick={handleAddFriend}
            disabled={pending || !username.trim()}
            className="w-full"
          >
            Add friend
          </Button>
          {errorMsg && <p className="text-sm text-red-500 mt-2">{errorMsg}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
