"use client";

import SoundCard from "./SoundCard";

const SoundCardGrid = () => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <SoundCard isActive={true} title="Sound 1" onClick={() => console.log("Sound 1 clicked")} />
        </div>
    );
};

export default SoundCardGrid;