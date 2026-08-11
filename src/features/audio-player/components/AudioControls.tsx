"use client"

import { Button } from "@/components/ui/button";
import PlayButton from "./PlayButton";
import LayerVolumeSlider from "./VolumeSlider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SlidersHorizontalIcon } from "lucide-react";
import VolumesMenu from "./VolumesMenu";

const AudioControls = () => {

    return (
        <div className="flex flex-row items-center justify-center gap-4">
            <PlayButton />
            {/* <LayerVolumeSlider layer="master" /> */}
            <VolumesMenu />
        </div >
    );
};

export default AudioControls;