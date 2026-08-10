"use client"

import PlayButton from "./PlayButton";
import VolumeSlider from "./VolumeSlider";

const AudioControls = () => {
    return (
        <div className="flex flex-row items-center justify-center gap-4">
            <PlayButton />
            <VolumeSlider />
        </div>
    );
};

export default AudioControls;