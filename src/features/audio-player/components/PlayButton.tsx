"use client";
import { PlayIcon, SquareIcon } from "lucide-react"
import { useAudioState } from "../providers/audioStateProvider";
import { Button } from "@/components/ui/button"

const PlayButton = () => {
  const { isPlaying, togglePlaying } = useAudioState();
  const onClick = () => {
    togglePlaying();
  };

  return (
    <Button className="rounded-full" onClick={onClick}>
        {isPlaying ? (
            <SquareIcon className="h-4 w-4" />
        ) : (
            <PlayIcon className="h-4 w-4" />
        )}
    </Button>
  );
};

export default PlayButton