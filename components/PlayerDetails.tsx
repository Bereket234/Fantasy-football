interface Player {
    operatorPlayerName: string;
    team: string;
    operatorPosition: string;
    operatorSalary: number;
    fantasyPoints: number;
}

interface PlayerDetailsProps {
    player: Player;
}

const PlayerDetails = ({ player }: PlayerDetailsProps) => {
    if (!player) return <div>No player selected</div>;

    return (
        <div className="rounded-xl shadow-lg bg-[#1D1D1D] max-h-[550px]">
            <img
                src="/player.png" 
                alt={player.operatorPlayerName}
                className="w-full h- object-cover rounded-lg px-4 pt-8"
            />

            <div className="bg-[#2F2F2F] p-4 rounded-lg text-center h-1/2">
                <h2 className="text-2xl font-light mb-5 tracking-wide">
                    {player.operatorPlayerName}
                </h2>
                {player.fantasyPoints && (
                    <>
                        <h1 className="text-center text-9xl font- tracking-wider mb-3">
                            {player.fantasyPoints}
                        </h1>
                        <p>points</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default PlayerDetails;
