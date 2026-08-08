"use client"
import { useState } from "react";
import PlayButton from "./PlayButton";
import VolumeSlider from "./VolumeSlider";

const AudioControls = () => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="flex flex-row items-center justify-center gap-4">
            <PlayButton isPlaying={isPlaying} onClick={() => setIsPlaying(!isPlaying)} />
            <VolumeSlider />
        </div>
    );
};

export default AudioControls;