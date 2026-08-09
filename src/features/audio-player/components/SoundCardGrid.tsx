"use client";

import { MusicTrack } from "@/shared/types/musicTrack";
import { setMusicTrackAsync, startAudioSourceForLayer, stopAudioSourceForLayer } from "../audioEngine";
import { SoundCategory } from "@/shared/types/soundCategory";
import SoundCard from "./SoundCard";
import { useState } from "react";

const SoundCardGrid = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const track: MusicTrack = { id: "piano1.ogg", title: "Piano 1", category: SoundCategory.Music };
    const handleCardClick = async () => {
        if (isPlaying) {
            stopAudioSourceForLayer(track.category);
        } else {
            await setMusicTrackAsync(track);
        }
        setIsPlaying(!isPlaying);
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <SoundCard isActive={isPlaying} sound={track} onClick={handleCardClick} />
        </div>
    );
};

export default SoundCardGrid;