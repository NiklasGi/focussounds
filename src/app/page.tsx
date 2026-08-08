import AudioControls from "@/features/audio-player/components/AudioControls";

export default function Home() {
  return (
    <main className="flex flex-col min-h-full h-full items-center  pt-32">
      <div className="flex flex-1">
      </div>
      <div className="flex flex-col items-center sm:items-start">
        <AudioControls />
      </div>
    </main>
  );
}
