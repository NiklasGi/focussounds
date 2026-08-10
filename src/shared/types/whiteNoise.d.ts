import type { Sound } from "./sound";
import { SoundCategory } from "./soundCategory";

export interface WhiteNoise extends Sound {
    category: SoundCategory.WhiteNoise;
}