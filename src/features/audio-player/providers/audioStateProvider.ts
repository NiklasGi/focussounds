import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { Sound } from "@/shared/types/sound";
import { MusicTrack } from "@/shared/types/musicTrack";

interface AudioState {
    isPlaying: boolean;
    musicTrack: MusicTrack | null;
    binauralBeat: Sound | null;
    whitenoise: Sound | null;
    togglePlaying: () => void;
    setMusicTrack: (sound: MusicTrack | null) => void;
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
                }),
                {
                    name: 'audio-state-storage',
                },
            ),
        ),
    ),
)

