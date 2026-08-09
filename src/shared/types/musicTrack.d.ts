import type { Sound } from "./sound";
import { SoundCategory } from "./soundCategory";

export interface MusicTrack extends Sound {
    category: SoundCategory.Music;
}