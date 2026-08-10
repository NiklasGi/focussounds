"use client";

import { MusicTrack } from "@/shared/types/musicTrack";
import { SoundCategory } from "@/shared/types/soundCategory";
import SoundCard from "./SoundCard";
import { useAudioState } from "../providers/audioStateProvider";

const SoundCardGrid = () => {
    const track: MusicTrack = { id: "piano1.ogg", title: "Piano 1", category: SoundCategory.Music };
    const track2: MusicTrack = { id: "piano2.ogg", title: "Piano 2", category: SoundCategory.Music };
    const tracks: MusicTrack[] = [track, track2];
    const activeMusicTrack = useAudioState((state) => state.musicTrack);
    const setMusicTrack = useAudioState((state) => state.setMusicTrack);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tracks.map((track) => (
                <SoundCard key={track.id} sound={track} isActive={activeMusicTrack?.id === track.id} onClick={() => setMusicTrack(activeMusicTrack?.id === track.id ? null : track)} />
            ))}
        </div>
    );
};

export default SoundCardGrid;