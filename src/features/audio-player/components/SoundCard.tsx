import { Card } from "@/components/ui/card";
import PlayingIndicator from "./PlayingIndicator";
import { Sound } from "../../../shared/types/sound";

interface SoundCardProps {
    sound: Sound;
    isActive?: boolean;
    onClick?: () => void;
}

const SoundCard = ({ sound, isActive, onClick }: SoundCardProps) => {
    const cardTheme = isActive ? "bg-zinc-100 text-black" : undefined;

    return (
        <Card className={`max-h-36 min-h-36 h-36 w-36 flex font-semibold flex-col items-start justify-end p-4 cursor-pointer transition-colors duration-300 ${cardTheme}`} onClick={onClick}>
            {isActive && <PlayingIndicator />}
            <h3>{sound.title}</h3>
        </Card>
    );
};

export default SoundCard;