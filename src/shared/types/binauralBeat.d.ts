import type { Sound } from "./sound";
import { SoundCategory } from "./soundCategory";

export interface BinauralBeat extends Sound {
    category: SoundCategory.BinauralBeats;
    frequency: number;
}