import { SoundCategory } from "@/shared/types/soundCategory";
import type { MusicTrack } from "@/shared/types/musicTrack";
import { BinauralBeat } from "@/shared/types/binauralBeat";


type Layer = SoundCategory | "master";

let isPlaying = false;
//These need to be nullable because the AudioContext is not available on the server side
let audioContext: AudioContext | null;
let gains: Record<Layer, GainNode> | null;

//Storing the promises to avoid race conditions when loading the same audio file multiple times
const audioBufferPromisesCache = new Map<string, Promise<AudioBuffer>>();
//Storing the audio buffers to avoid reloading the same audio file multiple times
const audioBuffersCache = new Map<string, AudioBuffer>();
const layerVolumes: Record<Layer, number> = {
    master: 0.5,
    music: 0.5,
    whitenoise: 0.5,
    binauralbeats: 0.1,
};
const audioSources: Record<SoundCategory, AudioBufferSourceNode | null> = {
    [SoundCategory.Music]: null,
    [SoundCategory.WhiteNoise]: null,
    [SoundCategory.BinauralBeats]: null,
};
const audioBuffers: Record<SoundCategory, AudioBuffer | null> = {
    [SoundCategory.Music]: null,
    [SoundCategory.WhiteNoise]: null,
    [SoundCategory.BinauralBeats]: null,
};
let binauralOscillators: OscillatorNode[] | null = null;
const ensureInitialized = () => {
    if (audioContext && gains) {
        if (audioContext.state === "suspended") void audioContext.resume();
        return audioContext;
    }

    const constructor = window.AudioContext ?? (window as any).webkitAudioContext;
    audioContext = new constructor();

    const masterGain = audioContext!.createGain();
    masterGain.gain.value = layerVolumes.master;
    masterGain.connect(audioContext!.destination);

    const createCategoryGain = (layer: SoundCategory) => {
        const gain = audioContext!.createGain();
        gain.gain.value = layerVolumes[layer];
        gain.connect(masterGain);
        return gain;
    }

    gains = {
        master: masterGain,
        music: createCategoryGain(SoundCategory.Music),
        whitenoise: createCategoryGain(SoundCategory.WhiteNoise),
        binauralbeats: createCategoryGain(SoundCategory.BinauralBeats),
    };

    gains[SoundCategory.Music].gain.value = layerVolumes.music;
    gains[SoundCategory.WhiteNoise].gain.value = layerVolumes.whitenoise;
    gains[SoundCategory.BinauralBeats].gain.value = layerVolumes.binauralbeats;

    return audioContext;
};

export const setVolume = (layer: Layer, volume: number) => {
    if (!gains) return;
    gains[layer].gain.value = volume;
    layerVolumes[layer] = volume;
};


const switchAudioBufferForCategory = (layer: SoundCategory, audioBuffer: AudioBuffer) => {
    ensureInitialized();
    stopAudioSourceForLayer(layer);
    audioBuffers[layer] = audioBuffer;
}

export const stopAudioSourceForLayer = (layer: SoundCategory) => {
    ensureInitialized();
    const source = audioSources[layer];
    if (source) {
        try {
            source.stop();
        } catch (e) { }
        source.disconnect();
        audioSources[layer] = null;
    }
};

export const stopAllAudioLayers = () => {
    console.log("Stopping all audio layers");
    ensureInitialized();
    for (const layer of Object.keys(audioSources) as SoundCategory[]) {
        stopAudioSourceForLayer(layer);
    }
};

export const startAllAudioLayers = () => {
    console.log("Starting all audio layers");
    console.log("Audio buffers:", audioBuffers);
    ensureInitialized();
    for (const layer of Object.keys(audioSources) as SoundCategory[]) {
        startAudioSourceForLayer(layer);
    }
};

export const startAudioSourceForLayer = (layer: SoundCategory) => {
    if (!audioBuffers[layer]) return;
    const audioContext = ensureInitialized();
    const newSource = audioContext!.createBufferSource();
    newSource.buffer = audioBuffers[layer];
    newSource.loop = true;
    newSource.connect(gains![layer]);
    audioSources[layer] = newSource;
    newSource.start();
};

const getSoundUrl = (sound: MusicTrack) => {
    return `/sounds/${sound.category}/${sound.id}`;
};

const loadBuffer = async (url: string): Promise<AudioBuffer> => {
    //check immediately if the buffer is already loaded
    if (audioBuffersCache.has(url)) return audioBuffersCache.get(url)!;

    //check if the buffer is already being loaded
    if (audioBufferPromisesCache.has(url)) return audioBufferPromisesCache.get(url)!;

    //load the buffer and store the promise to avoid race conditions
    const fetchPromise = (async () => {
        const res = await fetch(url);

        if (!res.ok) throw new Error(`Failed to fetch audio file: ${res.statusText}`);

        const bytes = await res.arrayBuffer();
        audioBufferPromisesCache.delete(url);
        audioBuffersCache.set(url, await audioContext!.decodeAudioData(bytes));
        return audioBuffersCache.get(url)!;
    })();
    fetchPromise.catch(() => audioBufferPromisesCache.delete(url));

    audioBufferPromisesCache.set(url, fetchPromise);
    return fetchPromise;
};

export const setIsPlaying = (playing: boolean) => {
    isPlaying = playing;
    if (isPlaying) {
        startAllAudioLayers();
    } else {
        stopAllAudioLayers();
    }
};


//Music -------------------------------------------------------------------------------------------------

export const setMusicTrackAsync = async (track: MusicTrack | null) => {
    ensureInitialized();
    if (!track) {
        stopAudioSourceForLayer(SoundCategory.Music);
        return;
    }
    const url = getSoundUrl(track);
    const buffer = await loadBuffer(url);
    if (buffer.length === 0) return;
    switchAudioBufferForCategory(track.category, buffer);
    if (isPlaying) startAudioSourceForLayer(track.category);
}

//Binaural -------------------------------------------------------------------------------------------------

export const setBinauralBeatAsync = async (track: BinauralBeat | null) => {
    const context = ensureInitialized();
    console.log("Setting binaural beat:", track);
    if (!track) {
        console.log("Stopping binaural beat");
        binauralOscillators?.map((osc) => {
            try {
                osc.stop();
            } catch (e) { }
            osc.disconnect();
        });
        binauralOscillators = null;
        return;
    }

    const getOscillator = (frequency: number, side: "left" | "right"): OscillatorNode => {
        const osc = context.createOscillator();
        osc.type = "sine";
        osc.frequency.value = frequency;
        const pan = context.createStereoPanner();
        pan.pan.value = side === "left" ? -1 : 1;
        osc.connect(pan);
        return osc;
    }

    const oscL = getOscillator(track.carrier, "left");
    const oscR = getOscillator(track.carrier + track.delta, "right");
    oscL.connect(gains![SoundCategory.BinauralBeats]);
    oscR.connect(gains![SoundCategory.BinauralBeats]);
    oscL.start();
    oscR.start();
    binauralOscillators = [oscL, oscR];
    // switchAudioBufferForCategory(track.category);
    if (isPlaying) startAudioSourceForLayer(track.category);
}

