import AudioControllerInitializer from "@/features/audio-player/components/AudioControllerInitializer";
import AudioControls from "@/features/audio-player/components/AudioControls";
import SoundCardRow from "@/features/audio-player/components/SoundCardRow";
import { BinauralBeat } from "@/shared/types/binauralBeat";
import { MusicTrack } from "@/shared/types/musicTrack";
import { getBinauralBeats, getMusicTracks } from "@/features/audio-player/soundService";

export default function Home() {
  
  const binauralBeats: BinauralBeat[] = getBinauralBeats();
  const musicTracks: MusicTrack[] = getMusicTracks();

  return (
    <main className="flex flex-col min-h-full h-full items-center p-16 pb-4 ">
      <AudioControllerInitializer />
      <div className="flex flex-col flex-1 gap-8 w-full">
        <SoundCardRow sounds={musicTracks} label="Music" />
        <SoundCardRow sounds={binauralBeats} label="Binaural Beats" />
      </div>
      <div className="flex flex-col items-center sm:items-start">
        <AudioControls />
      </div>
    </main>
  );
}
