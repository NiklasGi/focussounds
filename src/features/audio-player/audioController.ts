"use client";
import { useEffect } from "react";
import { setMusicTrackAsync, setBinauralBeatAsync, setIsPlaying, setWhitenoiseAsync as setWhiteNoiseAsync } from "./audioEngine";
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

        const unsubBinaural= useAudioState.subscribe(
            (state) => state.binauralBeat,
            (binauralBeat) => {
                setBinauralBeatAsync(binauralBeat);
            },
            { fireImmediately: true }
        );

        const unsubWhiteNoise = useAudioState.subscribe(
            (state) => state.whitenoise,
            (whitenoise) => {
                setWhiteNoiseAsync(whitenoise);
            },
            { fireImmediately: true }
        );

        return () => {
            unsubPlaying();
            unsubMusic();
            unsubBinaural();
            unsubWhiteNoise();
        };
    }, []);
};