import { Player } from "@/types/Player";
import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";


interface PlayerTableProps {
    players: Player[];
    onPlayerSelect: (player: Player) => void;
    selectedPlayer: Player | null;
}

const PlayerTable = ({
    players,
    onPlayerSelect,
    selectedPlayer,
}: PlayerTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const paginatedPlayers = players.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    const totalPages = Math.ceil(players.length / rowsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const generateOptions = () => {
        const options = [];
        for (let i = 5; i <= players.length; i += 1) {
            options.push(i);
        }
        return options;
    };


    return (
        <div className="w-full col-span-2">
            <table className="min-w-full table-auto text-xl font-light text-start rounded-t-xl">
                <thead className="bg-[#1D1D1D] rounded rounded-t-xl">
                    <tr>
                        <th className="px-8 py-4 border-none font-light text-start">
                            Name
                        </th>
                        <th className="px-8 py-4 border-none font-light">
                            Team
                        </th>
                        <th className="px-8 py-4 border-none font-light">
                            Position
                        </th>
                        <th className="px-8 py-4 border-none font-light">
                            Salary
                        </th>
                        <th className="px-8 py-4 border-none font-light">
                            Points
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-[#2F2F2F]">
                    {paginatedPlayers.map((player, index) => (
                        <tr
                            key={index}
                            onClick={() => onPlayerSelect(player)}
                            className={`cursor-pointer ${
                                selectedPlayer === player
                                    ? "bg-[#807B0F]"
                                    : "hover:bg-[#262626]"
                            }`}
                        >
                            <td className="px-8 py-4 border-none">
                                {player.operatorPlayerName}
                            </td>
                            <td className="px-8 py-4 border-none text-center">
                                {player.team}
                            </td>
                            <td className="px-8 py-4 border-none text-center">
                                {player.operatorPosition}
                            </td>
                            <td className="px-8 py-4 border-none text-center">
                                ${player.operatorSalary}
                            </td>
                            <td className=" px-8 py-4 border-none text-end">
                                {player.fantasyPoints}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between px-8 py-4 bg-[#262626] rounded-b-xl">
                <div>
                    <label className="mr-2 text-xl font-light">page</label>
                    <select
                        value={currentPage}
                        onChange={(e) =>
                            setCurrentPage(parseInt(e.target.value))
                        }
                        className="rounded p-1 bg-black focus:outline-none max-h-12 overflow-y-auto"
                    >
                        {pageNumbers.map((page) => (
                            <option
                                key={page}
                                value={page}
                                className="max-h-[50%] text-xl max-h-12 overflow-y-auto"
                            >
                                {page}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mr-2 text-xl">Rows per page</label>
                    <select
                        onChange={(e) =>
                            setRowsPerPage(parseInt(e.target.value))
                        }
                        className="rounded p-1 text-xl bg-black focus:outline-none"
                    >
                        {generateOptions().map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                </div>
                <div>
                    <button
                        onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        className="text-start"
                    >
                        <MdNavigateNext
                            className="rotate-180 text-start"
                            size={30}
                        />
                    </button>
                    <button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        className="text-xl whitespace-pre"
                    >
                        <MdNavigateNext size={30} />
                    </button>
                </div>
            </div>
        </div>
    );
};


export default PlayerTable;
