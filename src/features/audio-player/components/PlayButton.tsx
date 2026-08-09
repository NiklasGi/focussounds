"use client";
import { PlayIcon } from "lucide-react"
import { SquareIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { startAllAudioLayers, stopAllAudioLayers } from "../audioEngine";

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
}

const PlayButton = ({ isPlaying, onClick }: PlayButtonProps) => {

  const onClickLocal = () => {
    if(isPlaying) {
      stopAllAudioLayers();
    }else {
      startAllAudioLayers();
    }
    onClick();
  };

  return (
    <Button className="rounded-full" onClick={onClickLocal}>
        {isPlaying ? (
            <SquareIcon className="h-4 w-4" />
        ) : (
            <PlayIcon className="h-4 w-4" />
        )}
    </Button>
  );
};

export default PlayButton