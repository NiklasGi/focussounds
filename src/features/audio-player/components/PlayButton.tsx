"use client";
import { PlayIcon } from "lucide-react"
import { PauseIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

const PlayButton = ({ isPlaying, onClick }: PlayButtonProps) => {
  return (
    <Button className="rounded-full" onClick={onClick}>
        {isPlaying ? (
            <PauseIcon className="h-4 w-4" />
        ) : (
            <PlayIcon className="h-4 w-4" />
        )}
    </Button>
  );
};

export default PlayButton