import { Card } from "@/components/ui/card";
import { useState } from "react";
import PlayingIndicator from "./PlayingIndicator";

interface SoundCardProps {
    isActive?: boolean;
    title: string;
    onClick?: () => void;
}

const SoundCard = ({ isActive, title, onClick }: SoundCardProps) => {
    const [isActiveState, setActive] = useState(isActive);
    const cardTheme = isActiveState ? "bg-zinc-100 text-black" : undefined;

    const isPlaying = true; // Replace with actual playing state if needed

    const handleClick = () => {
        setActive(!isActiveState);
        onClick?.();
    };

    return (
        <Card className={`max-h-36 min-h-36 h-36 w-36 flex font-semibold flex-col items-start justify-end p-4 cursor-pointer transition-colors duration-300 ${cardTheme}`} onClick={handleClick}>
            {isActiveState && <PlayingIndicator playing={isPlaying} />}
            <h3>{title}</h3>
        </Card>
    );
};

export default SoundCard;