import AudioControllerInitializer from "@/features/audio-player/components/AudioControllerInitializer";
import AudioControls from "@/features/audio-player/components/AudioControls";
import SoundCardGrid from "@/features/audio-player/components/SoundCardGrid";

export default function Home() {
  return (
    <main className="flex flex-col min-h-full h-full items-center  pt-32">
      <AudioControllerInitializer />
      <div className="flex flex-1">
        <SoundCardGrid />
      </div>
      <div className="flex flex-col items-center sm:items-start">
        <AudioControls />
      </div>
    </main>
  );
}
