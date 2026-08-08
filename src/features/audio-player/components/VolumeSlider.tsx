"use client";

import { Slider } from "@/components/ui/slider"
import { useState } from "react";
import { VolumeIcon, Volume1Icon, Volume2Icon, VolumeOff } from "lucide-react"

interface VolumeSliderProps {
    value?: number;
    onChange?: (value: number) => void;
}

export function VolumeSlider({ value: defaultValue = 50, onChange }: VolumeSliderProps) {
    const [value, setValue] = useState(defaultValue)
    const [previousValue, setPreviousValue] = useState(defaultValue)

    const onValueChange = (newValues: number | readonly number[]) => {
        const val = Array.isArray(newValues) ? newValues[0] : newValues;
        
        if (val === 0) {
            if (value !== 0) setPreviousValue(value);
            setValue(0);
        } else {
            setValue(val);
        }
        onChange?.(val);
    }

    const onIconClick = () => {
        if (value === 0) {
            const restoreValue = previousValue === 0 ? 50 : previousValue;
            setValue(restoreValue);
            onChange?.(restoreValue);
        } else {
            setPreviousValue(value);
            setValue(0);
            onChange?.(0);
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
export default VolumeSlider