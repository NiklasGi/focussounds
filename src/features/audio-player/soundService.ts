import { BinauralBeat } from "@/shared/types/binauralBeat";
import { MusicTrack } from "@/shared/types/musicTrack";
import { SoundCategory } from "@/shared/types/soundCategory";
import { WhiteNoise } from "@/shared/types/whitenoise";

export const getBinauralBeats = (): BinauralBeat[] => {
    const binauralBeats: BinauralBeat[] = [
        {
            id: "binaural1",
            title: "Focus",
            category: SoundCategory.BinauralBeats,
            carrier: 150,
            delta: 40,
        },
        {
            id: "binaural2",
            title: "Alertness",
            category: SoundCategory.BinauralBeats,
            carrier: 160,
            delta: 20,
        },
        {
            id: "binaural3",
            title: "Calmness",
            category: SoundCategory.BinauralBeats,
            carrier: 200,
            delta: 10,
        }
    ];
    return binauralBeats;
};

export const getWhiteNoise = (): WhiteNoise[] => {
    const whiteNoises: WhiteNoise[] = [
        {
            id: "gentle-rain.wav",
            title: "Gentle Rain",
            category: SoundCategory.WhiteNoise,
        },
        {
            id: "fireplace.wav",
            title: "Fireplace",
            category: SoundCategory.WhiteNoise,
        },
        {
            id: "thunder.wav",
            title: "Thunder",
            category: SoundCategory.WhiteNoise,
        }
    ];
    return whiteNoises;
};

export const getMusicTracks = (): MusicTrack[] => {
    const musicTracks: MusicTrack[] = [
        {
            id: "piano1.ogg",
            title: "Piano 1",
            category: SoundCategory.Music,
        },
        {
            id: "piano2.ogg",
            title: "Piano 2",
            category: SoundCategory.Music,
        },
    ];
    return musicTracks;
};  