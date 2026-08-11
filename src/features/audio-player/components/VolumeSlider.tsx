"use client";

import { Slider } from "@/components/ui/slider"
import { useState } from "react";
import { VolumeIcon, Volume1Icon, Volume2Icon, VolumeOff } from "lucide-react"
import { setMasterVolume } from "../audioEngine";
import { useAudioState } from "../providers/audioStateProvider";

interface LayerVolumeSliderProps {
    layer: Layer;
}

export function LayerVolumeSlider({ layer}: LayerVolumeSliderProps) {
    const value = useAudioState(state => state.volumes[layer] * 100);
    const [previousValue, setPreviousValue] = useState(value);
    
    const onValueChange = (newValues: number | readonly number[]) => {
        const val = Array.isArray(newValues) ? newValues[0] : newValues;
        
        if (val === 0) {
            if (value !== 0) setPreviousValue(value);
        } else {
            if (value === 0) setPreviousValue(50);
        }
        updateState(val);
    }

    const updateState = (newValue: number) => {
        useAudioState.setState((state) => ({
            volumes: {
                ...state.volumes,
                [layer]: newValue / 100,
            },
        }));
    };

    const onIconClick = () => {
        if (value === 0) {
            const restoreValue = previousValue === 0 ? 50 : previousValue;
            updateState(restoreValue);
        } else {
            setPreviousValue(value);
            updateState(0);
        }
    }
    
    return (
        <div className="flex flex-row items-center w-full min-w-[150px] gap-2">
            <div onClick={onIconClick} className="cursor-pointer">
                {value === 0 && <VolumeOff className="h-4 w-4" />}
                {value > 0 && value <= 33 && <VolumeIcon className="h-4 w-4" />}
                {value > 33 && value <= 66 && <Volume1Icon className="h-4 w-4" />}
                {value > 66 && <Volume2Icon className="h-4 w-4" />}
            </div>
            <Slider
                id="slider-volume"
                value={[value]} 
                onValueChange={onValueChange}
                min={0}
                max={100}
                step={1}
            />
        </div>
    )
}
export default LayerVolumeSlider