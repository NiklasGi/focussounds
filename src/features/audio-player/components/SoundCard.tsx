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
        <Card className={`max-h-32 min-h-32 h-32 w-32 flex font-semibold flex-col items-start justify-end p-4 cursor-pointer transition-colors duration-300 ${cardTheme}`} onClick={onClick}>
            {isActive && <PlayingIndicator />}
            <h3>{sound.title}</h3>
        </Card>
    );
};

export default SoundCard;