import AudioControllerInitializer from "@/features/audio-player/components/AudioControllerInitializer";
import AudioControls from "@/features/audio-player/components/AudioControls";
import SoundCardRow from "@/features/audio-player/components/SoundCardRow";
import { BinauralBeat } from "@/shared/types/binauralBeat";
import { MusicTrack } from "@/shared/types/musicTrack";
import { SoundCategory } from "@/shared/types/soundCategory";

export default function Home() {
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

  const binauralBeats: BinauralBeat[] = [
    {
      id: "binaural1",
      title: "Binaural 1",
      category: SoundCategory.BinauralBeats,
      carrier: 200,
      delta: 40,
    }
  ];

  return (
    <main className="flex flex-col min-h-full h-full items-center p-16 pb-4 ">
      <AudioControllerInitializer />
      <div className="flex flex-col flex-1 gap-12 w-full">
        <SoundCardRow sounds={musicTracks} label="Music" />
        <SoundCardRow sounds={binauralBeats} label="Binaural Beats" />
      </div>
      <div className="flex flex-col items-center sm:items-start">
        <AudioControls />
      </div>
    </main>
  );
}
