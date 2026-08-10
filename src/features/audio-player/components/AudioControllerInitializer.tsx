"use client";

import { useAudioController } from "../audioController";

export default function AudioInitializer() {
    useAudioController();
    return null;
}