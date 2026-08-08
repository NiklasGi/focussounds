const PlayingIndicator = ({ playing = true }) => {
    const state = playing ? "running" : "paused";
    const delays = [0, 0.15, 0.32];
    return (
        <span className="inline-flex items-end gap-0.5 h-[15px]">
            {delays.map((delay, index) => (
                <i key={index} className="w-0.5 h-full bg-black origin-bottom animate-eq"
                    style={{ animationPlayState: state, animationDelay: `${delay}s` }} />
            ))}
        </span>
    );
};


export default PlayingIndicator;