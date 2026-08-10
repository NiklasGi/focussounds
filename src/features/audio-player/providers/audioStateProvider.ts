import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { Sound } from "@/shared/types/sound";
import { MusicTrack } from "@/shared/types/musicTrack";
import { BinauralBeat } from "@/shared/types/binauralBeat";
import { WhiteNoise } from "@/shared/types/whitenoise";

interface AudioState {
    isPlaying: boolean;
    musicTrack: MusicTrack | null;
    binauralBeat: BinauralBeat | null;
    whitenoise: WhiteNoise | null;
    togglePlaying: () => void;
    setMusicTrack: (sound: MusicTrack | null) => void;
    setBinauralBeat: (sound: BinauralBeat | null) => void;
    setWhiteNoise: (sound: WhiteNoise | null) => void;
}

export const useAudioState = create<AudioState>()(
    devtools(
        subscribeWithSelector(
            persist(
                (set) => ({
                    isPlaying: false,
                    musicTrack: null,
                    binauralBeat: null,
                    whitenoise: null,
                    togglePlaying: () => {
                        set((state) => ({ isPlaying: !state.isPlaying }));
                    },
                    setMusicTrack: async (track: MusicTrack | null) => {
                        set((_) => ({ musicTrack: track }));
                    },
                    setBinauralBeat: async (beat: BinauralBeat | null) => {
                        set((_) => ({ binauralBeat: beat }));
                    },
                    setWhiteNoise: async (whitenoise: WhiteNoise | null) => {
                        set((_) => ({ whitenoise: whitenoise }));
                    },
                }),
                {
                    name: 'audio-state-storage',
                },
            ),
        ),
    ),
)

