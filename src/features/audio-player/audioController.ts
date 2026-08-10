"use client";
import { useEffect } from "react";
import { setMusicTrackAsync, setIsPlaying } from "./audioEngine";
import { useAudioState } from "./providers/audioStateProvider";

export const useAudioController = () => {
    useEffect(() => {
        const unsubPlaying = useAudioState.subscribe(
            (state) => state.isPlaying,
            (isPlaying) => setIsPlaying(isPlaying),
            { fireImmediately: true }
        );

        const unsubMusic = useAudioState.subscribe(
            (state) => state.musicTrack,
            (musicTrack) => {
                setMusicTrackAsync(musicTrack);
            },
            { fireImmediately: true }
        );

        return () => {
            unsubPlaying();
            unsubMusic();
        };
    }, []);
};